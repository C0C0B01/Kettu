import { TextInput, Platform, NativeModules } from "react-native";
import { findByStoreNameLazy } from "@metro/wrappers";
import { _colorRef } from "./updater";

const ThemeStore = findByStoreNameLazy("ThemeStore");

function getKeyboardAppearance() {
  // Check for custom theme
  const custom = _colorRef.current;
  if (custom) {
    // Bunny theme (spec 3)
    if (custom.spec === 3 && custom.reference) {
      return custom.reference === "light" ? "light" : "dark";
    }
    // Vendetta theme (spec 2)
    if (custom.spec === 2 && custom.reference) {
      return custom.reference === "light" ? "light" : "dark";
    }
  }

  // Fallback to Discord theme string
  const theme = ThemeStore?.theme;
  if (typeof theme === "string") {
    const lowerTheme = theme.toLowerCase();
    return (lowerTheme.includes("dark") || lowerTheme.includes("midnight")) 
      ? "dark" 
      : "light";
  }

  return "dark";
}

export default function fixKeyboard() {
  if (Platform.OS !== "ios") return;

  const UIManager = NativeModules.UIManager;
  
  const origUpdateView = UIManager?.updateView;
  const origCreateView = UIManager?.createView;
  
  if (origUpdateView) {
    UIManager.updateView = function(viewTag: number, viewName: string, props: any) {
      if (props && typeof props === 'object') {
        if (viewName.toLowerCase().includes('text') || viewName.toLowerCase().includes('input')) {
          props.keyboardAppearance = getKeyboardAppearance();
        }
      }
      return origUpdateView.call(this, viewTag, viewName, props);
    };
  }

  if (origCreateView) {
    UIManager.createView = function(reactTag: number, viewName: string, rootTag: number, props: any) {
      if (props && typeof props === 'object') {
        if (viewName.toLowerCase().includes('text') || viewName.toLowerCase().includes('input')) {
          props.keyboardAppearance = getKeyboardAppearance();
        }
      }
      return origCreateView.call(this, reactTag, viewName, rootTag, props);
    };
  }

  return ThemeStore?.addChangeListener?.(() => {});
}