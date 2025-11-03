import { StatusBar, TextInput, Platform } from "react-native";
import { findByStoreNameLazy } from "@metro/wrappers";
import { _colorRef } from "./updater";

const ThemeStore = findByStoreNameLazy("ThemeStore");

function getBarStyle() {
    // Check for custom theme
    const custom = _colorRef.current;
    if (custom) {
        // Bunny theme (spec 3)
        if (custom.spec === 3 && custom.reference) {
            return custom.reference === "light" ? "dark-content" : "light-content";
        }
        // Vendetta theme (spec 2)
        if (custom.spec === 2 && custom.reference) {
            return custom.reference === "light" ? "dark-content" : "light-content";
        }
    }

    // Fallback to Discord theme string
    const theme = ThemeStore?.theme;
    if (typeof theme === "string") {
        const lowerTheme = theme.toLowerCase();
        return (lowerTheme.includes("dark") || lowerTheme.includes("midnight")) ? "light-content" : "dark-content";
    }

    return "dark-content";
}

export default function fixStatusBar() {

    if (Platform.OS == "android") {
        const origSetBarStyle = StatusBar.setBarStyle;
        StatusBar.setBarStyle = function (_style: any, ...args: any[]) {
            return origSetBarStyle.call(this, getBarStyle(), ...args);
        };
    }

    if (Platform.OS == "ios") {
        function applyStatusBar() {
            const style = getBarStyle();
            StatusBar.setBarStyle(style, true);
        }
    
        const unsubscribe = ThemeStore?.addChangeListener?.(applyStatusBar);
        
        StatusBar.setBarStyle(getBarStyle());
    
        let delay = 200;
        for (let i = 0; i < 5; i++, delay *= 2) {
            setTimeout(applyStatusBar, delay);
        }
    
        return unsubscribe;
    }
}