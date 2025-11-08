import { ImageLoader } from "./";
import type { LoaderPayload } from "./types";

type InteropReturn = Promise<{ ret: string } | { err: string } | { cancelled: true; reason: string }>;

export const loaderPayload = window.__PYON_LOADER__ as LoaderPayload;

export function isModuleRegistered(module: string) {
    return loaderPayload.loader.modules[module] !== undefined;
}

export function isFunctionRegistered(module: string, function_: string) {
    return loaderPayload.loader.modules[module]?.functions[function_] !== undefined;
}

export async function callFunction(module: string, functionName: string, args: unknown[]) {
    if (!isFunctionRegistered(module, functionName)) {
        throw new Error(`Function ${module}.${functionName} is not registered`);
    }

    const promise: InteropReturn = ImageLoader.queryCache([
        "__pyon_bridge",
        JSON.stringify({ m: module, f: functionName, a: args }),
    ]);

    const result = await promise;

    if ("ret" in result) {
        return JSON.parse(result.ret);
    }

    if ("cancelled" in result) {
        throw new Error(`Function ${module}.${functionName} was cancelled: ${result.reason}`);
    }

    if ("err" in result) {
        throw new Error(result.err);
    }
}

export interface LoaderModule {
    hasFunction(functionName: string): boolean;
    callFunction(functionName: string, args: unknown[]): Promise<unknown>;
}

type ModuleProps<T extends LoaderModule> = {
    name: string;
    argumentProcessors?: Partial<{ [key in keyof T]: (args: any[]) => any[] }>;
};

export function getModule<T extends LoaderModule>({ name, argumentProcessors: processArgs }: ModuleProps<T>) {
    const module = loaderPayload.loader.modules[name];
    if (!module) {
        throw new Error(`Module ${name} is not registered`);
    }

    const baseObject: Record<string, any> = {
        hasFunction: (functionName: string) => isFunctionRegistered(name, functionName),
        callFunction: (functionName: string, args: unknown[]) => callFunction(name, functionName, args),
    };

    for (const [functionName] of Object.entries(module.functions)) {
        baseObject[functionName] = (...args: unknown[]) =>
            callFunction(
                name,
                functionName,
                // @ts-expect-error
                processArgs && functionName in processArgs ? processArgs[functionName](args) : args,
            );
    }

    return baseObject as T;
}

/**
 * Determines if safe mode is currently enabled. The result remains consistent over time.
 * This will not change until the app is restarted. For draft changes, use the InitConfigStore.
 * @returns True if safe mode is enabled for the current instance, otherwise false.
 */
export function isSafeModeEnabled() {
    return Boolean(loaderPayload.loader.initConfig.safeMode);
}