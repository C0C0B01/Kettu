import { findAssetId } from "@lib/api/assets";
import { purgeStorage } from "@lib/api/storage";
import { hideSheet } from "@lib/ui/sheets";
import { ActionSheet, Card, IconButton, Text } from "@metro/common/components";
import { clipboard } from "@metro/common";
import React, { ComponentProps, useEffect, useState } from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";
import { showToast } from "@ui/toasts";
import { showConfirmationAlert } from "@core/vendetta/alerts";
import { fetchTheme, removeTheme, selectTheme, VdThemeInfo, } from "@lib/addons/themes";
import { formatString, Strings } from "@core/i18n";
import { semanticColors } from "@ui/color";

interface ThemeInfoActionSheetProps {
  theme: VdThemeInfo;
  navigation: any;
}

function ThemeInfoIconButton(props: ComponentProps<typeof IconButton>) {
  const { onPress } = props;
  props.onPress &&= () => {
    hideSheet("ThemeInfoActionSheet");
    onPress?.();
  };

  return <IconButton {...props} label={props.label} />;
}

// theme title component for header
function TitleComponent({ theme }: { theme: VdThemeInfo }) {
  const { authors } = theme.data;

  return (
    <View style={{ gap: 4 }}>
      <View>
        <Text variant="heading-xl/semibold">{theme.data.name}</Text>
      </View>
      <View style={{ flexDirection: "row", flexShrink: 1 }}>
        {authors && authors.length > 0 && (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              gap: 8,
              alignItems: "center",
              paddingVertical: 4,
              paddingHorizontal: 8,
              backgroundColor: "#00000016",
              borderRadius: 32,
            }}
            disabled={!authors.some((a) => a.id)}
          >
            <Text variant="text-md/medium">
              by {authors.map((a) => a.name).join(", ")}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default function ThemeInfoActionSheet({
  theme,
  navigation,
}: ThemeInfoActionSheetProps) {
  // use component state to track theme data
  const [themeState, setThemeState] = useState({ ...theme });
  const [loading, setLoading] = useState(false);

  // periodic refresh to detect external changes to theme state
  useEffect(() => {
    const interval = setInterval(() => {
      setThemeState({ ...theme });
    }, 500);

    return () => clearInterval(interval);
  }, [theme]);

  const copyThemeUrl = () => {
    // Copy theme ID as URL
    clipboard.setString(themeState.id);
    if (typeof showToast?.showCopyToClipboard === "function") {
      showToast.showCopyToClipboard();
    } else {
      showToast("Copied to clipboard");
    }
  };

  const refetchTheme = async () => {
    setLoading(true);
    try {
      await fetchTheme(themeState.id, themeState.selected);
      showToast("Theme refreshed successfully");
    } catch (e) {
      console.error("Failed to refresh theme:", e);
      showToast("Failed to refresh theme");
    } finally {
      setLoading(false);
    }
  };

  const removeThemeHandler = () => {
    showConfirmationAlert({
      title: Strings.HOLD_UP,
      content: formatString("ARE_YOU_SURE_TO_DELETE_THEME", {
        name: themeState.data.name,
      }),
      confirmText: Strings.DELETE,
      cancelText: Strings.CANCEL,
      confirmColor: "red",
      onConfirm: async () => {
        hideSheet("ThemeInfoActionSheet");
        try {
          const wasSelected = await removeTheme(themeState.id);
          if (wasSelected) selectTheme(null);
          showToast("Theme removed successfully");
        } catch (e) {
          console.error("Failed to remove theme:", e);
          showToast("Failed to remove theme");
        }
      },
    });
  };

  const applyTheme = () => {
    try {
      selectTheme(themeState);
      hideSheet("ThemeInfoActionSheet");
      showToast(`Applied theme: ${themeState.data.name}`);
    } catch (e) {
      console.error("Failed to apply theme:", e);
      showToast("Failed to apply theme");
    }
  };

  return (
    <ActionSheet>
      <ScrollView contentContainerStyle={{ gap: 12, marginBottom: 12 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            paddingVertical: 24,
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <TitleComponent theme={themeState} />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 65,
            paddingHorizontal: 8,
          }}
        >
          <ThemeInfoIconButton
            label={Strings.REFETCH}
            variant="secondary"
            icon={findAssetId("RetryIcon")}
            onPress={refetchTheme}
            disabled={loading}
          />
          <ThemeInfoIconButton
            label={Strings.COPY_URL}
            variant="secondary"
            icon={findAssetId("LinkIcon")}
            onPress={copyThemeUrl}
          />
          <ThemeInfoIconButton
            label={Strings.UNINSTALL}
            variant="secondary"
            icon={findAssetId("TrashIcon")}
            onPress={removeThemeHandler}
          />
        </View>
        <Card>
          <Text
            variant="text-md/semibold"
            style={{
              marginBottom: 4,
              color: semanticColors.MOBILE_TEXT_HEADING_PRIMARY,
            }}
          >
            Description
          </Text>
          <Text variant="text-md/medium">
            {themeState.data.description || "No description provided."}
          </Text>
        </Card>
      </ScrollView>
    </ActionSheet>
  );
}
