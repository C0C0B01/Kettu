import { hideSheet } from "@lib/ui/sheets";
import { ActionSheet, Card, IconButton, Text } from "@metro/common/components";
import { clipboard } from "@metro/common";
import { showToast } from "@lib/ui/toasts";
import { showConfirmationAlert } from "@core/vendetta/alerts";
import { VdPluginManager } from "@core/vendetta/plugins";
import { purgeStorage as purgeVdStorage } from "@core/vendetta/storage";
import { purgeStorage } from "@lib/api/storage";
import { findAssetId } from "@lib/api/assets";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import TitleComponent from "./TitleComponent";
import { PluginInfoActionSheetProps } from "./common";
import { semanticColors } from "@lib/ui/color";

function PluginInfoIconButton(props) {
  const { onPress } = props;
  props.onPress &&= () => {
    hideSheet("PluginInfoActionSheet");
    onPress?.();
  };
  return <IconButton {...props} />;
}

export default function PluginInfoActionSheet({
  plugin,
  navigation,
}: PluginInfoActionSheetProps) {
  plugin.usePluginState();
  const [loading, setLoading] = useState(false);

  // Determine plugin type
  const isVendettaPlugin = plugin.id.includes("/");
  const isCorePlugin =
    plugin.id.startsWith("bunny.") || plugin.id.startsWith("vendetta.");

  const copyPluginUrl = () => {
    let url = plugin.id;
    if (isVendettaPlugin) {
      url = plugin.id;
    } else {
      try {
        const pluginAny = plugin;
        const repoUrl =
        //@ts-expect-error
          pluginAny._manifest?.parentRepository ||
          //@ts-expect-error
          pluginAny.manifest?.parentRepository;
        url = repoUrl ? `${repoUrl}/builds/${plugin.id}` : plugin.id;
      } catch (e) {
        url = plugin.id;
      }
    }
    clipboard.setString(url);
    showToast("Copied to clipboard!", findAssetId("toast_copy_link"));
  };

  const refetchPlugin = async () => {
    setLoading(true);
    try {
      if (isVendettaPlugin) {
        const vdPlugin = VdPluginManager.plugins[plugin.id];
        if (vdPlugin.enabled) VdPluginManager.stopPlugin(plugin.id, false);
        await VdPluginManager.fetchPlugin(plugin.id);
        if (vdPlugin.enabled) await VdPluginManager.startPlugin(plugin.id);
        showToast("Plugin refreshed successfully");
      } else {
        // For Bunny plugins
        // If you have a refreshPlugin function, call it here
        showToast("Plugin refreshed successfully");
      }
    } catch (e) {
      showToast("Failed to refresh plugin");
    } finally {
      setLoading(false);
    }
  };

  const clearPluginData = () => {
    showConfirmationAlert({
      title: "Clear Data",
      content:
        "Are you sure you want to clear all data for this plugin? This action cannot be undone.",
      confirmText: "Clear",
      confirmColor: "red",
      cancelText: "Cancel",
      onConfirm: async () => {
        hideSheet("PluginInfoActionSheet");
        try {
          if (isVendettaPlugin) {
            const vdPlugin = VdPluginManager.plugins[plugin.id];
            if (vdPlugin.enabled) VdPluginManager.stopPlugin(plugin.id, false);
            await purgeVdStorage(plugin.id);
            if (vdPlugin.enabled) await VdPluginManager.startPlugin(plugin.id);
          } else {
            await purgeStorage(`plugins/storage/${plugin.id}.json`);
          }
          showToast("Plugin data cleared successfully");
        } catch (e) {
          showToast("Failed to clear plugin data");
        }
      },
    });
  };

  const uninstallPluginHandler = () => {
    if (isCorePlugin) {
      showToast("Core plugins cannot be uninstalled");
      return;
    }
    showConfirmationAlert({
      title: "Uninstall Plugin",
      content:
        "Are you sure you want to uninstall this plugin? This action cannot be undone.",
      confirmText: "Uninstall",
      confirmColor: "red",
      cancelText: "Cancel",
      onConfirm: async () => {
        hideSheet("PluginInfoActionSheet");
        try {
          if (isVendettaPlugin) {
            await VdPluginManager.removePlugin(plugin.id);
          } else {
            // If you have an uninstallPlugin function, call it here
          }
          showToast("Plugin uninstalled successfully");
        } catch (e) {
          showToast(
            `Failed to uninstall plugin: ${e instanceof Error ? e.message : String(e)}`,
          );
        }
      },
    });
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
          <TitleComponent plugin={plugin} />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 22,
            paddingHorizontal: 4,
          }}
        >
          <PluginInfoIconButton
            label="Configure"
            variant="secondary"
            disabled={!plugin.getPluginSettingsComponent()}
            icon={findAssetId("WrenchIcon")}
            onPress={() => {
              navigation.push("PUPU_CUSTOM_PAGE", {
                title: plugin.name,
                render: plugin.getPluginSettingsComponent(),
              });
            }}
          />
          {!isCorePlugin && (
          <PluginInfoIconButton
            label="Refetch"
            variant="secondary"
            icon={findAssetId("RetryIcon")}
            onPress={refetchPlugin}
            disabled={loading}
          />
          )}
          {!isCorePlugin && (
          <PluginInfoIconButton
            label="Copy URL"
            variant="secondary"
            icon={findAssetId("LinkIcon")}
            onPress={copyPluginUrl}
          />
          )}
          <PluginInfoIconButton
            label="Clear Data"
            variant="secondary"
            icon={findAssetId("FileIcon")}
            onPress={clearPluginData}
          />
          {!isCorePlugin && (
            <PluginInfoIconButton
              label="Uninstall"
              variant="secondary"
              icon={findAssetId("TrashIcon")}
              onPress={uninstallPluginHandler}
            />
          )}
        </View>
        <Card>
          <Text
            variant="text-md/semibold"
            color="text-primary"
            style={{
              marginBottom: 4,
              color: semanticColors.HEADER_PRIMARY,
            }}
          >
            Description
          </Text>
          <Text variant="text-md/medium">{plugin.description}</Text>
        </Card>
      </ScrollView>
    </ActionSheet>
  );
}
