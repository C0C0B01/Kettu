import { instead } from "@lib/api/patcher";
import { logger } from "@lib/utils/logger";
import { findByProps } from "@metro";

import { defineCorePlugin } from "..";

// Type for functions that need to be cleaned up when plugin is disabled
type PatchCleanupFn = () => void;

// Store all active patches for cleanup
let patches: PatchCleanupFn[] = [];

// AnalyticsUtils and other tracking utilities
const AnalyticsUtils = findByProps("AnalyticsActionHandlers");
const SuperPropUtils = findByProps("encodeProperties", "track");
const VoiceStateUtils = findByProps("getVoiceStateMetadata");
const CrashReportUtils = findByProps("submitLiveCrashReport");
const MetricsUtils = findByProps("_metrics");

// Sentry interface definition to avoid TypeScript errors
interface SentryClient {
  getOptions: () => { enabled: boolean };
  close: () => void;
  open: () => void;
}

interface SentryScope {
  clear: () => void;
}

interface SentryHub {
  getClient: () => SentryClient | undefined;
  getStackTop: () => { scope: SentryScope };
  getScope: () => SentryScope;
  addBreadcrumb?: (breadcrumb: unknown) => void;
}

interface GlobalSentry {
  hub?: SentryHub;
}

// Get Sentry objects with proper type checking
const sentryGlobal = (globalThis as unknown as { __SENTRY__?: GlobalSentry })
    .__SENTRY__;
const sentryHub = sentryGlobal?.hub;
const sentryClient = sentryHub?.getClient();

// Sentry related objects with type safety
const Sentry = {
    initializer: findByProps("initSentry"),
    main: sentryHub,
    client: sentryClient,
};

// Utility function to create no-operation patches
const noop = (prop: string, parent: Record<string, any>): PatchCleanupFn => {
    try {
        return instead(prop, parent, () => undefined);
    } catch (e) {
        return () => false;
    }
};

// Network tracking prevention
function patchNetwork(): PatchCleanupFn {
    // Analytics and tracking endpoints to block
    const analyticsTest =
    /client-analytics\.braintreegateway\.com|discord\.com\/api\/v9\/(science|track)|app\.adjust\..*|.*\.ingest\.sentry\.io/;

    try {
        const unpatch = instead(
            "send",
            XMLHttpRequest.prototype,
            function (
                this: XMLHttpRequest & { __sentry_xhr__?: { url: string } },
                args: unknown[],
                orig: Function,
            ) {
                if (
                    this.__sentry_xhr__?.url &&
          analyticsTest.test(this.__sentry_xhr__.url)
                ) {
                    return undefined;
                }
                return orig.apply(this, args);
            },
        );
        return unpatch;
    } catch (e) {
        return () => false;
    }
}

// Console patching to remove Sentry wrappers
function patchConsole(): PatchCleanupFn {
  type ConsoleFunction = Function & { __sentry_original__?: Function };
  type ConsoleFunctions = Record<string, ConsoleFunction>;

  const sentrified: ConsoleFunctions = {};

  try {
      // We need to use Object.keys because TypeScript doesn't allow indexing Console with strings
      (Object.keys(console) as Array<keyof Console>).forEach(key => {
          const consoleFunc = (console as unknown as ConsoleFunctions)[key];
          if (consoleFunc) {
              sentrified[key] = consoleFunc;
              const originalFunc = consoleFunc.__sentry_original__;
              (console as unknown as ConsoleFunctions)[key] =
          originalFunc ?? consoleFunc;
          }
      });
  } catch (e) {
      logger.log("Failed to de-sentrify console functions!", e);
  }

  return () => {
      Object.keys(sentrified).forEach(key => {
          if (sentrified[key]) {
              (console as unknown as ConsoleFunctions)[key] = sentrified[key];
          }
      });
  };
}

// Miscellaneous tracking functions
function patchMiscellaneous(): PatchCleanupFn {
    const miscPatches = [
    // Global analytics utilities
        AnalyticsUtils?.AnalyticsActionHandlers &&
      noop("handleTrack", AnalyticsUtils.AnalyticsActionHandlers),
        AnalyticsUtils?.AnalyticsActionHandlers &&
      noop("handleFingerprint", AnalyticsUtils.AnalyticsActionHandlers),

        // Super properties tracking
        SuperPropUtils && noop("track", SuperPropUtils),

        // Voice state metadata tracking
        VoiceStateUtils && noop("trackWithMetadata", VoiceStateUtils),

        // Crash reporter
        CrashReportUtils && noop("submitLiveCrashReport", CrashReportUtils),

        // Metrics
        MetricsUtils?._metrics && noop("push", MetricsUtils._metrics),
    ].filter(Boolean) as PatchCleanupFn[];

    return () => miscPatches.forEach(p => p());
}

// Sentry error reporting prevention
function patchSentry(): PatchCleanupFn {
    const sentryPatches: PatchCleanupFn[] = [];

    // Add patches if Sentry components exist
    if (Sentry.initializer) {
        sentryPatches.push(noop("initSentry", Sentry.initializer));
    }

    if (Sentry.main && Sentry.main.addBreadcrumb) {
        sentryPatches.push(noop("addBreadcrumb", Sentry.main));
    }

    // Disable Sentry client
    if (Sentry.client) {
        try {
            Sentry.client.getOptions().enabled = false;
            Sentry.client.close();

            if (Sentry.main) {
                if (Sentry.main.getStackTop) {
                    Sentry.main.getStackTop().scope.clear();
                }

                if (Sentry.main.getScope) {
                    Sentry.main.getScope().clear();
                }
            }
        } catch (e) {
            // Silent fail
        }
    }

    return () => {
        try {
            sentryPatches.forEach(p => p());

            // Re-enable Sentry client on cleanup
            if (Sentry.client) {
                Sentry.client.getOptions().enabled = true;
                Sentry.client.open();
            }
        } catch (e) {
            // Silent fail
        }
    };
}

export default defineCorePlugin({
    manifest: {
        id: "bunny.notrack",
        version: "1.0.0",
        type: "plugin",
        spec: 3,
        main: "",
        display: {
            name: "NoTrack",
            description: "Disables Discord's telemetry",
            authors: [{ name: "maisymoe" }],
        },
    },

    start() {
    // Apply all patches
        patches = [
            patchNetwork(),
            patchConsole(),
            patchMiscellaneous(),
            patchSentry(),
        ].filter(Boolean);

        logger.log("NoTrack: Enabled - all telemetry tracking disabled");
    },

    stop() {
    // Call all cleanup functions
        patches.forEach(p => p?.());
        patches = [];

        logger.log("NoTrack: Disabled - telemetry tracking restored");
    },
});
