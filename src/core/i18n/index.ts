import { logger } from "@lib/utils/logger";
import { FluxDispatcher } from "@metro/common";
import { findByNameLazy, findByStoreName } from "@metro/wrappers";
import { PrimitiveType } from "intl-messageformat";

import langDefault from "./default.json";

const IntlMessageFormat = findByNameLazy(
    "MessageFormat",
) as typeof import("intl-messageformat").default;

type I18nKey = keyof typeof langDefault;

let _currentLocale: string | null = null;
let _lastSetLocale: string | null = null;

const _loadedLocale = new Set<string>();
const _loadedStrings = {} as Record<string, typeof langDefault>;

export const Strings = new Proxy(
    {},
    {
        get: (_t, prop: keyof typeof langDefault) => {
            if (_currentLocale && _loadedStrings[_currentLocale]?.[prop]) {
                return _loadedStrings[_currentLocale]?.[prop];
            }
            return langDefault[prop];
        },
    },
) as Record<I18nKey, string>;

const languageMap: Record<string, string> = {
    "ar-SA":  "ar",
    "bn-BD":  "bn",
    "ca-ES":  "ca",
    "de-DE":  "de",
    "es-ES":  "es",
    "es-419": "es",
    "fa-IR":  "fa",
    "fi-FI":  "fi",
    "fr-FR":  "fr",
    "hi-IN":  "hi",
    "hr-HR":  "hr",
    "hu-HU":  "hu",
    "id-ID":  "id",
    "it-IT":  "it",
    "ja-JP":  "ja",
    "pl-PL":  "pl",
    "pt-BR":  "pt_BR",
    "ru-RU":  "ru",
    "sk-SK":  "sk",
    "sv-SE":  "sv",
    "tr-TR":  "tr",
    "vi-VN":  "vi",
};

function fetchLocale(locale: string) {
    const resolvedLocale = (_lastSetLocale = languageMap[locale] ?? locale);

    logger.log("[i18n] fetchLocale called:", locale, "->", resolvedLocale);

    if (!_loadedLocale.has(resolvedLocale)) {
        _loadedLocale.add(resolvedLocale);

        if (resolvedLocale.toLowerCase().startsWith("en")) {
            // use local default.json for english
            logger.log("[i18n] Using local default.json for English locale");
            _loadedStrings[resolvedLocale] = langDefault;
            _currentLocale = resolvedLocale;
        } else {
            fetch(`https://codeberg.org/cocobo1/kettu-i18n/raw/branch/main/base/${resolvedLocale}.json`)
                .then(r => r.json())
                .then(strings => {
                    logger.log("[i18n] Loaded strings for:", resolvedLocale);
                    _loadedStrings[resolvedLocale] = strings;
                    _currentLocale = resolvedLocale;
                })
                .catch(e =>
                    logger.error(`[i18n] Error fetching strings for ${resolvedLocale}: ${e}`),
                );
        }
    } else {
        _currentLocale = resolvedLocale;
    }
}

export function initFetchI18nStrings() {
    let attempts = 0;
    const checkAndFetch = () => {
        attempts++;

        try {
            const LocaleStore = findByStoreName("LocaleStore");
            logger.log("[i18n] Attempt", attempts, "- LocaleStore:", !!LocaleStore);

            if (!LocaleStore) {
                logger.log("[i18n] LocaleStore not found yet");
                return false;
            }

            if (LocaleStore?._isInitialized !== true) {
                logger.log("[i18n] LocaleStore not initialized yet");
                return false;
            }

            const locale = LocaleStore.locale;

            if (locale) {
                logger.log("[i18n] Using LocaleStore:", locale);
                fetchLocale(locale);
                return true;
            }

        } catch (e) {
            logger.log("[i18n] Error:", e);
        }
        return false;
    };

    const tryTimes = () => {
        if (checkAndFetch()) return;
        if (attempts < 15) {
            setTimeout(tryTimes, 500);
        }
    };

    tryTimes();

    const cb = (e: any) => {
        if (e?.settings?.changes?.loading) {
            logger.log("[i18n] Settings loading, skipping...");
            return;
        }

        const locale = e?.settings?.changes?.protoToSave?.localization?.locale?.value;
        logger.log("[i18n] Locale changed:", locale);
        if (locale) {
            logger.log("[i18n] Found locale in event:", locale);
            fetchLocale(locale);
        }
    };

    FluxDispatcher.subscribe("USER_SETTINGS_PROTO_UPDATE_EDIT_INFO", cb);

    return () => {
        FluxDispatcher.unsubscribe("USER_SETTINGS_PROTO_UPDATE_EDIT_INFO", cb);
    };
}

type FormatStringRet<T> = T extends PrimitiveType
  ? string
  : string | T | (string | T)[];

export function formatString<T = void>(
    key: I18nKey,
    val: Record<string, T>,
): FormatStringRet<T> {
    const str = Strings[key];
    // @ts-ignore
    return new IntlMessageFormat(str).format(val);
}
