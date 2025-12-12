import { Strings } from "@core/i18n";
import { CheckState, useFileExists } from "@core/ui/hooks/useFS";
import AssetBrowser from "@core/ui/settings/pages/Developer/AssetBrowser";
import { useProxy } from "@core/vendetta/storage";
import { findAssetId } from "@lib/api/assets";
import { connectToDebugger } from "@lib/api/debug";
import { getReactDevToolsProp, getReactDevToolsVersion, isLoaderConfigSupported, isReactDevToolsPreloaded, isVendettaLoader } from "@lib/api/native/loader";
import { loaderConfig, settings } from "@lib/api/settings";
import { lazyDestructure } from "@lib/utils/lazy";
import { NavigationNative } from "@metro/common";
import { Button, LegacyFormText, Stack, TableRow, TableRowGroup, TableSwitchRow, TextInput } from "@metro/common/components";
import { findByProps } from "@metro/wrappers";
import { semanticColors } from "@ui/color";
import { ErrorBoundary } from "@ui/components";
import { createStyles, TextStyleSheet } from "@ui/styles";
import { NativeModules } from "react-native";
import { ScrollView, StyleSheet } from "react-native";
import { showToast } from "@ui/toasts";

const { hideActionSheet } = lazyDestructure(() => findByProps("openLazy", "hideActionSheet"));
const { showSimpleActionSheet } = lazyDestructure(() => findByProps("showSimpleActionSheet"));
const { openAlert } = lazyDestructure(() => findByProps("openAlert", "dismissAlert"));
const { AlertModal, AlertActionButton } = lazyDestructure(() => findByProps("AlertModal", "AlertActions"));

// todo: This link isnt minified, but it probably should be
const RDT_EMBED_LINK = "https://codeberg.org/raincord/Devtools/raw/branch/main/reactDevtools.js";

const useStyles = createStyles({
    leadingText: {
        ...TextStyleSheet["heading-md/semibold"],
        color: semanticColors.TEXT_MUTED,
        marginRight: -4
    },
});

export default function Developer() {
    const [rdtFileExists, fs] = useFileExists("preloads/reactDevtools.js");

    const styles = useStyles();
    const navigation = NavigationNative.useNavigation();

    useProxy(settings);
    useProxy(loaderConfig);

    return (
        <ErrorBoundary>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 38 }}>
                <Stack style={{ paddingVertical: 24, paddingHorizontal: 12 }} spacing={24}>

                    <TableRowGroup title={Strings.DEBUGGER_URL}>
                      <TextInput
                          placeholder="127.0.0.1:9090"
                          size="md"
                          leadingIcon={() => <LegacyFormText style={styles.leadingText}>ws://</LegacyFormText>}
                          defaultValue={settings.debuggerUrl}
                          onChange={(v: string) => settings.debuggerUrl = v}
                      />
                      <Stack style={{
                          marginTop: 4,
                          borderTopLeftRadius: 16,
                          borderTopRightRadius: 16,
                          overflow: 'hidden'
                      }}>
                        <TableSwitchRow
                            label={Strings.AUTO_DEBUGGER}
                            icon={<TableRow.Icon source={findAssetId("copy")} />}
                            value={settings.autoDebugger}
                            onValueChange={(v: boolean) => {
                                settings.autoDebugger = v;
                            }}
                        />
                      </Stack>
                      <TableRow
                          label={Strings.CONNECT_TO_DEBUG_WEBSOCKET}
                          icon={<TableRow.Icon source={findAssetId("copy")} />}
                          onPress={() => connectToDebugger(settings.debuggerUrl)}
                      />

                    </TableRowGroup>
                    {isReactDevToolsPreloaded() && <>
                      <TableRowGroup title={Strings.DEVTOOLS_URL}>

                      <TextInput
                          placeholder="127.0.0.1:8097"
                          size="md"
                          leadingIcon={() => <LegacyFormText style={styles.leadingText}>ws://</LegacyFormText>}
                          defaultValue={settings.devToolsUrl}
                          onChange={(v: string) => settings.devToolsUrl = v}
                      />
                      <Stack style={{
                          marginTop: 4,
                          borderTopLeftRadius: 16,
                          borderTopRightRadius: 16,
                          overflow: 'hidden'
                      }}>
                        <TableSwitchRow
                            label={Strings.AUTO_DEVTOOLS}
                            icon={<TableRow.Icon source={findAssetId("ic_badge_staff")} />}
                            value={settings.autoDevTools}
                            onValueChange={(v: boolean) => {
                                settings.autoDevTools = v;
                            }}
                        />
                      </Stack>
                      <TableRow
                          label={Strings.CONNECT_TO_REACT_DEVTOOLS}
                          icon={<TableRow.Icon source={findAssetId("ic_badge_staff")} />}
                          onPress={async () => {
                              if (!settings.devToolsUrl?.trim()) {
                                  showToast("Invalid devTools URL!", findAssetId("Small"));
                                  return;
                              }

                                try {
                                    const devTools = window[getReactDevToolsProp() || "__vendetta_rdc"];

                                    if (!devTools?.connectToDevTools) {
                                        showToast("Invalid devTools URL!", findAssetId("Small"));
                                        return;
                                    }

                                    await devTools.connectToDevTools({
                                        host: settings.devToolsUrl.split(":")?.[0],
                                        resolveRNStyle: StyleSheet.flatten,
                                    });
                                } catch (error) {
                                    showToast("Invalid devTools URL!", findAssetId("Small"));
                                }
                            }}

                      />
                      </TableRowGroup>
                    </>}
                    {isLoaderConfigSupported() && <>
                        <TableRowGroup title="Loader config">
                            <TableSwitchRow
                                label={Strings.LOAD_FROM_CUSTOM_URL}
                                subLabel={Strings.LOAD_FROM_CUSTOM_URL_DEC}
                                icon={<TableRow.Icon source={findAssetId("copy")} />}
                                value={loaderConfig.customLoadUrl.enabled}
                                onValueChange={(v: boolean) => {
                                    loaderConfig.customLoadUrl.enabled = v;
                                }}
                            />
                            {loaderConfig.customLoadUrl.enabled && <TableRow label={<TextInput
                                defaultValue={loaderConfig.customLoadUrl.url}
                                size="md"
                                onChange={(v: string) => loaderConfig.customLoadUrl.url = v}
                                placeholder="http://localhost:4040/kettu.js"
                                label={Strings.PUPU_URL}
                            />} />}
                            {isReactDevToolsPreloaded() && isVendettaLoader() && <TableSwitchRow
                                label={Strings.LOAD_REACT_DEVTOOLS}
                                subLabel={`${Strings.VERSION}: ${getReactDevToolsVersion()}`}
                                icon={<TableRow.Icon source={findAssetId("ic_badge_staff")} />}
                                value={loaderConfig.loadReactDevTools}
                                onValueChange={(v: boolean) => {
                                    loaderConfig.loadReactDevTools = v;
                                }}
                            />}
                        </TableRowGroup>
                    </>}
                    <TableRowGroup title="Other">
                        <TableRow
                            // Thanks for this Revenge team!
                            label={Strings.CLEAR_BUNDLE}

                            icon={<TableRow.Icon source={findAssetId("TrashIcon")} />}
                            onPress={() => {
                                openAlert("pupu-clear-bundle-reload-confirmation", <AlertModal
                                    title={Strings.MODAL_RELOAD_REQUIRED}
                                    content={Strings.MODAL_RELOAD_REQUIRED_DESC}
                                    actions={
                                        <Stack>
                                            <AlertActionButton text={Strings.RELOAD} variant="destructive" onPress={() => NativeModules.BundleUpdaterManager.reload()} />
                                            <AlertActionButton text={Strings.CANCEL} variant="secondary" />
                                        </Stack>
                                    }
                                />);
                            }}
                        />
                        <TableRow
                            arrow
                            label={Strings.ASSET_BROWSER}
                            icon={<TableRow.Icon source={findAssetId("ic_image")} />}
                            trailing={TableRow.Arrow}
                            onPress={() => navigation.push("PUPU_CUSTOM_PAGE", {
                                title: Strings.ASSET_BROWSER,
                                render: AssetBrowser,
                            })}
                        />
                        <TableRow
                            arrow
                            label={Strings.ERROR_BOUNDARY_TOOLS_LABEL}
                            icon={<TableRow.Icon source={findAssetId("ic_warning_24px")} />}
                            onPress={() => showSimpleActionSheet({
                                key: "ErrorBoundaryTools",
                                header: {
                                    title: "Which ErrorBoundary do you want to trip?",
                                    icon: <TableRow.Icon style={{ marginRight: 8 }} source={findAssetId("ic_warning_24px")} />,
                                    onClose: () => hideActionSheet(),
                                },
                                options: [
                                    // @ts-expect-error
                                    // Of course, to trigger an error, we need to do something incorrectly. The below will do!
                                    { label: Strings.PUPU, onPress: () => navigation.push("PUPU_CUSTOM_PAGE", { render: () => <undefined /> }) },
                                    { label: "Discord", isDestructive: true, onPress: () => navigation.push("PUPU_CUSTOM_PAGE", { noErrorBoundary: true }) },
                                ],
                            })}
                        />
                        <TableRow
                            label={Strings.INSTALL_REACT_DEVTOOLS}
                            subLabel={Strings.RESTART_REQUIRED_TO_TAKE_EFFECT}
                            icon={<TableRow.Icon source={findAssetId("DownloadIcon")} />}
                            trailing={
                                <Button
                                    size="sm"
                                    loading={rdtFileExists === CheckState.LOADING}
                                    disabled={rdtFileExists === CheckState.LOADING}
                                    variant={rdtFileExists === CheckState.TRUE ? "secondary" : "primary"}
                                    text={rdtFileExists === CheckState.TRUE ? Strings.UNINSTALL : Strings.INSTALL}
                                    onPress={async () => {
                                        if (rdtFileExists === CheckState.FALSE) {
                                            fs.downloadFile(RDT_EMBED_LINK, "preloads/reactDevtools.js");
                                        } else if (rdtFileExists === CheckState.TRUE) {
                                            fs.removeFile("preloads/reactDevtools.js");
                                        }
                                    }}
                                    icon={findAssetId(rdtFileExists === CheckState.TRUE ? "ic_message_delete" : "DownloadIcon")}
                                    style={{ marginLeft: 8 }}
                                />
                            }
                        />
                        <TableSwitchRow
                            label={Strings.ENABLE_EVAL_COMMAND}
                            subLabel={Strings.ENABLE_EVAL_COMMAND_DESC}
                            icon={<TableRow.Icon source={findAssetId("PencilIcon")} />}
                            value={!!settings.enableEvalCommand}
                            onValueChange={(v: boolean) => {
                                settings.enableEvalCommand = v;
                            }}
                        />
                    </TableRowGroup>
                </Stack>
            </ScrollView>
        </ErrorBoundary>
    );
}