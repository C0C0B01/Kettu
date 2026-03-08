import { findByNameLazy } from "@metro/wrappers";

type LoggerFunction = (...messages: any[]) => void;

export interface Logger {
    log: LoggerFunction;
    info: LoggerFunction;
    warn: LoggerFunction;
    error: LoggerFunction;
    time: LoggerFunction;
    trace: LoggerFunction;
    verbose: LoggerFunction;
}

export const LoggerClass = findByNameLazy("Logger");
export const logger: Logger = new LoggerClass("Kettu");

let socket: WebSocket | undefined;
let originalConsoleLog: any;
let originalConsoleError: any;
let originalConsoleWarn: any;
let originalLoggerLog: any;
let originalLoggerError: any;
let originalLoggerWarn: any;

interface LogMessage {
    type: 'log';
    data: {
        level: 'debug' | 'default' | 'warn' | 'error';
        message: any[];
    };
}

interface HelloMessage {
    type: 'hello';
    data: {
        version: number;
    };
}

const VERSION = 1;

function serializeMessage(msg: any): string {
    return JSON.stringify(msg);
}

function sendLog(level: 'debug' | 'default' | 'warn' | 'error', ...args: any[]) {
    if (socket?.readyState === WebSocket.OPEN) {
        const message: LogMessage = {
            type: 'log',
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
        sendLog('default', ...args);
    };

    originalConsoleError = console.error;
    console.error = function(...args: any[]) {
        originalConsoleError.apply(console, args);
        sendLog('error', ...args);
    };

    originalConsoleWarn = console.warn;
    console.warn = function(...args: any[]) {
        originalConsoleWarn.apply(console, args);
        sendLog('warn', ...args);
    };

    if (logger) {
        originalLoggerLog = logger.log;
        logger.log = function(...args: any[]) {
            originalLoggerLog.apply(logger, args);
            sendLog('default', ...args);
        };

        originalLoggerError = logger.error;
        logger.error = function(...args: any[]) {
            originalLoggerError.apply(logger, args);
            sendLog('error', ...args);
        };

        originalLoggerWarn = logger.warn;
        logger.warn = function(...args: any[]) {
            originalLoggerWarn.apply(logger, args);
            sendLog('warn', ...args);
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
        console.error("Invalid debugger URL!");
        return;
    }

    try {
        socket = new WebSocket(`ws://${url}`);

        socket.addEventListener("open", () => {
            console.log("Connected to debugger.");
            
            const hello: HelloMessage = {
                type: 'hello',
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
                
                if (data.type === 'run' && data.data?.code) {
                    try {
                        (0, eval)(data.data.code);
                    } catch (e) {
                        console.error("Error executing remote code:", e);
                    }
                }
            } catch (e) {
                console.error("Error processing message:", e);
            }
        });

        socket.addEventListener("close", () => {
            console.log("Disconnected from debugger.");
            unpatchConsoleAndLogger();
        });

        socket.addEventListener("error", (err: any) => {
            console.error(`Debugger error: ${err.message}`);
            unpatchConsoleAndLogger();
        });
    } catch (e) {
        console.error("Failed to connect to debugger:", e);
    }
}

export function disconnectFromDebugger() {
    if (socket) {
        unpatchConsoleAndLogger();
        socket.close();
        socket = undefined;
    }
}

export function isConnectedToDebugger(): boolean {
    return socket?.readyState === WebSocket.OPEN;
}
