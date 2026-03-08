import { getThemeFromLoader, selectTheme, themes } from "@lib/addons/themes";
import { findAssetId } from "@lib/api/assets";
import { getLoaderName, getLoaderVersion, isThemeSupported, getReactDevToolsProp, isReactDevToolsPreloaded } from "@lib/api/native/loader";
import { BundleUpdaterManager, NativeClientInfoModule, NativeDeviceModule } from "@lib/api/native/modules";
import { after } from "@lib/api/patcher";
import { settings } from "@lib/api/settings";
import { logger } from "@lib/utils/logger";
import { showToast } from "@ui/toasts";
import { version } from "bunny-build-info";
import { Platform, type PlatformConstants, StyleSheet } from "react-native";

export interface RNConstants extends PlatformConstants {
    // Android
    Version: number;
    Release: string;
    Serial: string;
    Fingerprint: string;
    Model: string;
    Brand: string;
    Manufacturer: string;
    ServerHost?: string;

    // iOS
    forceTouchAvailable: boolean;
    interfaceIdiom: string;
    osVersion: string;
    systemName: string;
}

/**
 * @internal
 */
export async function toggleSafeMode() {
    settings.safeMode = { ...settings.safeMode, enabled: !settings.safeMode?.enabled };
    if (isThemeSupported()) {
        if (getThemeFromLoader()?.id) settings.safeMode!.currentThemeId = getThemeFromLoader()!.id;
        if (settings.safeMode?.enabled) {
            await selectTheme(null);
        } else if (settings.safeMode?.currentThemeId) {
            await selectTheme(themes[settings.safeMode?.currentThemeId]);
        }
    }
    setTimeout(BundleUpdaterManager.reload, 400);
}

let socket: WebSocket | undefined;
let originalConsoleLog: any;
let originalConsoleError: any;
let originalConsoleWarn: any;
let originalLoggerLog: any;
let originalLoggerError: any;
let originalLoggerWarn: any;

const VERSION = 1;

enum MessageType {
    Hello = 'hello',
    Hi = 'hi',
    Log = 'log',
    Run = 'run',
}

enum LogLevel {
    Debug = 'debug',
    Default = 'default',
    Warn = 'warn',
    Error = 'error',
}

interface LogMessage {
    type: MessageType.Log;
    data: {
        level: LogLevel;
        message: any[];
    };
}

interface HelloMessage {
    type: MessageType.Hello;
    data: {
        version: number;
    };
}

interface RunMessage {
    type: MessageType.Run;
    data: {
        code: string;
    };
}

function serializeMessage(msg: any): string {
    return JSON.stringify(msg);
}

function sendLog(level: LogLevel, ...args: any[]) {
    if (socket?.readyState === WebSocket.OPEN) {
        const message: LogMessage = {
            type: MessageType.Log,
            data: {
                level,
                message: args
            }
        };
        socket.send(serializeMessage(message));
    }
}

function patchConsoleAndLogger() {
    originalConsoleLog = console.log;
    console.log = function(...args: any[]) {
        originalConsoleLog.apply(console, args);
        sendLog(LogLevel.Default, ...args);
    };

    originalConsoleError = console.error;
    console.error = function(...args: any[]) {
        originalConsoleError.apply(console, args);
        sendLog(LogLevel.Error, ...args);
    };

    originalConsoleWarn = console.warn;
    console.warn = function(...args: any[]) {
        originalConsoleWarn.apply(console, args);
        sendLog(LogLevel.Warn, ...args);
    };

    if (logger) {
        originalLoggerLog = logger.log;
        logger.log = function(...args: any[]) {
            originalLoggerLog.apply(logger, args);
            sendLog(LogLevel.Default, ...args);
        };

        originalLoggerError = logger.error;
        logger.error = function(...args: any[]) {
            originalLoggerError.apply(logger, args);
            sendLog(LogLevel.Error, ...args);
        };

        originalLoggerWarn = logger.warn;
        logger.warn = function(...args: any[]) {
            originalLoggerWarn.apply(logger, args);
            sendLog(LogLevel.Warn, ...args);
        };
    }
}

function unpatchConsoleAndLogger() {
    if (originalConsoleLog) {
        console.log = originalConsoleLog;
        originalConsoleLog = undefined;
    }
    if (originalConsoleError) {
        console.error = originalConsoleError;
        originalConsoleError = undefined;
    }
    if (originalConsoleWarn) {
        console.warn = originalConsoleWarn;
        originalConsoleWarn = undefined;
    }

    if (logger) {
        if (originalLoggerLog) {
            logger.log = originalLoggerLog;
            originalLoggerLog = undefined;
        }
        if (originalLoggerError) {
            logger.error = originalLoggerError;
            originalLoggerError = undefined;
        }
        if (originalLoggerWarn) {
            logger.warn = originalLoggerWarn;
            originalLoggerWarn = undefined;
        }
    }
}

export function connectToDebugger(url: string) {
    if (socket !== undefined && socket.readyState !== WebSocket.CLOSED) {
        unpatchConsoleAndLogger();
        socket.close();
    }

    if (!url) {
        showToast("Invalid debugger URL!", findAssetId("Small"));
        return;
    }

    try {
        socket = new WebSocket(`ws://${url}`);

        socket.addEventListener("open", () => {
            showToast("Connected to debugger.", findAssetId("Check"));
            
            const hello: HelloMessage = {
                type: MessageType.Hello,
                data: {
                    version: VERSION
                }
            };
            socket?.send(serializeMessage(hello));

            patchConsoleAndLogger();
        });

        socket.addEventListener("message", (message: any) => {
            try {
                const data = JSON.parse(message.data);
                
                if (data.type === MessageType.Run && data.data?.code) {
                    try {
                        (0, eval)(data.data.code);
                    } catch (e) {
                        console.error("Error executing remote code:", e);
                    }
                }
            } catch (e) {
                try {
                    (0, eval)(message.data);
                } catch (err) {
                    console.error(err);
                }
            }
        });

        socket.addEventListener("close", () => {
            showToast("Disconnected from debugger.", findAssetId("Small"));
            unpatchConsoleAndLogger();
        });

        socket.addEventListener("error", (err: any) => {
            console.log(`Debugger error: ${err.message}`);
            showToast("An error occurred with the debugger connection!", findAssetId("Small"));
            unpatchConsoleAndLogger();
        });
    } catch (e) {
        logger.error("Failed to connect to debugger:", e);
        showToast("Failed to connect to debugger!", findAssetId("Small"));
    }
}

export function disconnectFromDebugger() {
    if (socket) {
        unpatchConsoleAndLogger();
        socket.close();
        socket = undefined;
        showToast("Disconnected from debugger.", findAssetId("Check"));
    }
}

export function isConnectedToDebugger(): boolean {
    return socket?.readyState === WebSocket.OPEN;
}

const rdtPort = 8097;
export let rdtClient: WebSocket | null = null;
export let rdtConnected = false;
const changeHooks = new Set<(value: boolean) => void>();

function bump() {
    for (const x of changeHooks) x(rdtConnected);
}

function cleanupRdt() {
    rdtClient = null;
    rdtConnected = false;
    bump();
}

/** @internal */
export function connectRdt(url: string, quiet?: boolean) {
    if (!isReactDevToolsPreloaded() || rdtClient) return;

    const base = url.split(":").slice(0, -1).join(":");
    const ws = (rdtClient = new WebSocket(`ws://${base}:${rdtPort}`));

    ws.addEventListener('open', () => {
        if (!quiet) showToast("Connected to React DevTools", findAssetId("CheckmarkSmallIcon"));
        rdtConnected = true;
        bump();
    });

    ws.addEventListener('close', () => {
        cleanupRdt();
    });

    ws.addEventListener('error', (e: any) => {
        cleanupRdt();
        const err = e?.message ?? e?.stack ?? String(e);
        logger.error('React DevTools error:', err);
        if (!quiet) showToast(err, findAssetId("CircleXIcon-primary"));
    });

    const devTools = window[getReactDevToolsProp() || "__vendetta_rdc"];
    if (devTools?.connectToDevTools) {
        devTools.connectToDevTools({
            websocket: ws,
            resolveRNStyle: StyleSheet.flatten,
        });
    }
}

export function disconnectRdt() {
    rdtClient?.close();
}

export function useIsRdtConnected() {
    const [connected, update] = React.useState(rdtConnected);

    React.useEffect(() => {
        changeHooks.add(update);
        return () => void changeHooks.delete(update);
    }, []);

    return connected;
}

/**
 * @internal
 */
export function patchLogHook() {
    const unpatch = after("nativeLoggingHook", globalThis, args => {
        if (socket?.readyState === WebSocket.OPEN) {
            sendLog(args[1] === 'error' ? LogLevel.Error : args[1] === 'warn' ? LogLevel.Warn : LogLevel.Default, args[0]);
        }
        logger.log(args[0]);
    });

    return () => {
        socket && socket.close();
        unpatch();
    };
}

/** @internal */
export const versionHash = version;

export function getDebugInfo() {
    const hermesProps = window.HermesInternal.getRuntimeProperties();
    const hermesVer = hermesProps["OSS Release Version"];
    const padding = "for RN ";
    const PlatformConstants = Platform.constants as RNConstants;
    const rnVer = PlatformConstants.reactNativeVersion;

    return {
        vendetta: {
            version: versionHash.split("-")[0],
            loader: getLoaderName(),
        },
        bunny: {
            version: versionHash,
            loader: {
                name: getLoaderName(),
                version: getLoaderVersion()
            }
        },
        discord: {
            version: NativeClientInfoModule.getConstants().Version,
            build: NativeClientInfoModule.getConstants().Build,
        },
        react: {
            version: React.version,
            nativeVersion: hermesVer.startsWith(padding) ? hermesVer.substring(padding.length) : `${rnVer.major}.${rnVer.minor}.${rnVer.patch}`,
        },
        hermes: {
            version: hermesVer,
            buildType: hermesProps.Build,
            bytecodeVersion: hermesProps["Bytecode Version"],
        },
        ...Platform.select({
            android: { os: { name: "Android", version: PlatformConstants.Release, sdk: PlatformConstants.Version } },
            ios: { os: { name: PlatformConstants.systemName, version: PlatformConstants.osVersion } }
        })!,
        ...Platform.select({
            android: { device: { manufacturer: PlatformConstants.Manufacturer, brand: PlatformConstants.Brand, model: PlatformConstants.Model, codename: NativeDeviceModule.device } },
            ios: { device: { manufacturer: NativeDeviceModule.deviceManufacturer, brand: NativeDeviceModule.deviceBrand, model: NativeDeviceModule.deviceModel, codename: NativeDeviceModule.device } }
        })!
    };
}

/**
 * @internal
 */
export function initDebugger() {
    if (settings.autoDebugger) {
        try {
            connectToDebugger(settings.debuggerUrl);
        } catch (e) {
            logger.error("Failed to connect to Debugger during startup:", e);
        }
    }
    if (settings.autoDevTools) {
        try {
            if (settings.devToolsUrl) {
                connectRdt(settings.devToolsUrl, true);
            }
        } catch (e) {
            logger.error("Failed to connect to ReactDevTools during startup:", e);
        }
    }
}