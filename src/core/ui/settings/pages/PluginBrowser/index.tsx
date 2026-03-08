import { React, NavigationNative } from "@metro/common";
import { View } from "react-native";
import { Stack, Button, IconButton, Text, Card, FlashList } from "@metro/common/components";
import { findAssetId } from "@lib/api/assets";
import safeFetch from "@lib/utils/safeFetch";
import { showToast } from "@ui/toasts";
import Search from "@ui/components/Search";
import { VdPluginManager } from "@core/vendetta/plugins";
import { installTheme, themes, removeTheme } from "@lib/addons/themes";
import { clipboard } from "@metro/common";
import { hideSheet, showSheet } from "@lib/ui/sheets";
import { AlertActionButton } from "@lib/ui/components/wrappers";
import { dismissAlert, openAlert } from "@lib/ui/alerts";
import { ActionSheet, AlertModal, AlertActions, TableRow, TableRowGroup } from "@metro/common/components";
import { lazyDestructure } from "@lib/utils/lazy";
import { findByProps } from "@metro";

const { showSimpleActionSheet } = lazyDestructure(() => findByProps("showSimpleActionSheet"));
const { hideActionSheet } = findByProps("hideActionSheet")

interface BaseAddonData {
    name: string;
    description: string;
    authors: string[];
    installUrl: string;
}

interface PluginData extends BaseAddonData {
    status: "working" | "broken" | "warning" | string;
    sourceUrl: string;
    warningMessage?: string;
}

interface ThemeData extends BaseAddonData {}

type AddonData = PluginData | ThemeData;

const PLUGIN_URL = "https://raw.githubusercontent.com/Purple-EyeZ/Plugins-List/refs/heads/main/src/plugins-data.json";
const THEME_URL = "https://raw.githubusercontent.com/kmmiio99o/theme-marketplace/refs/heads/main/themes.json";

function normalizeIdFromInstallUrl(url: string) {
    return url.endsWith("/") ? url : url + "/";
}

// @ts-ignore (i cant be bothered to type these)
function InstallButton({ addon, isPluginMode, installing, setInstalling, setRefreshTick }) {
    const normId = normalizeIdFromInstallUrl(addon.installUrl);
    const [installed, setInstalled] = React.useState(() =>
        isPluginMode ? Boolean(VdPluginManager.plugins[normId]) : Boolean(themes[addon.installUrl])
    );

    React.useEffect(() => {
        setInstalled(isPluginMode ? Boolean(VdPluginManager.plugins[normId]) : Boolean(themes[addon.installUrl]));
    }, [addon.installUrl, setRefreshTick, isPluginMode]);

    const installAddon = async () => {
        if (installing.has(normId)) return;
        setInstalling((prev: Iterable<unknown> | null | undefined) => new Set(prev).add(normId));
        try {
            if (isPluginMode) {
                await VdPluginManager.installPlugin(normId, true);
            } else {
                await installTheme(addon.installUrl);
            }
            showToast(`Installed ${addon.name}`, findAssetId("CheckIcon"));
            setInstalled(true);
        } catch (e) {
            showToast(e instanceof Error ? e.message : String(e), findAssetId("CircleXIcon-primary"));
        } finally {
            setInstalling((prev: Iterable<unknown> | null | undefined) => { const s = new Set(prev); s.delete(normId); return s; });
            setRefreshTick((t: number) => t + 1);
        }
    };

    const uninstallAddon = async () => {
        try {
            if (isPluginMode) {
                await VdPluginManager.removePlugin(normId);
            } else {
                await removeTheme(addon.installUrl);
            }
            showToast(`Uninstalled ${addon.name}`, findAssetId("TrashIcon"));
            setInstalled(false);
        } catch (e) {
            showToast(e instanceof Error ? e.message : String(e), findAssetId("CircleXIcon-primary"));
        } finally {
            setRefreshTick((t: number) => t + 1);
        }
    };

    const promptInstall = () => {
        if (!isPluginMode) return installAddon();

        const plugin = addon as PluginData;
        const needsWarn = (plugin.status && plugin.status !== "working") || (plugin.warningMessage && plugin.warningMessage.trim().length > 0);
        if (!needsWarn) return installAddon();

        const lines: string[] = [];
        if (plugin.status && plugin.status !== "working") {
            if (plugin.status === "broken") lines.push("This plugin is marked as broken, please be aware you may encounter issues");
            else if (plugin.status === "warning") lines.push("This plugin may have issues");
            else lines.push(`Status: ${plugin.status}`);
        }
        if (plugin.warningMessage) lines.push(plugin.warningMessage);

        openAlert("plugins-list-install-warning", (
            <AlertModal
                title="Warning!"
                content="This plugin may not work as expected."
                extraContent={<Text variant="text-sm/normal" color="text-muted">{lines.join("\n\n")}</Text>}
                actions={<AlertActions>
                    <AlertActionButton
                        text="Install Anyway"
                        variant="primary"
                        onPress={() => { dismissAlert("plugins-list-install-warning"); installAddon(); }}
                    />
                    <AlertActionButton
                        text="Cancel"
                        variant="secondary"
                        onPress={() => dismissAlert("plugins-list-install-warning")}
                    />
                </AlertActions>}
            />
        ));
    };

    return (
        <Button
            size="sm"
            loading={installing.has(normId)}
            text={!installed ? (installing.has(normId) ? "Installing..." : "Install") : "Uninstall"}
            disabled={installing.has(normId)}
            onPress={!installed ? promptInstall : uninstallAddon}
            variant={!installed ? "primary" : "destructive"}
            icon={findAssetId(!installed ? "DownloadIcon" : "TrashIcon")}
        />
    );
}

// @ts-ignore (i cant be bothered to type these)
function TrailingButtons({ addon, isPluginMode, installing, setInstalling, setRefreshTick }) {
    const copyAddonLink = () => {
        clipboard.setString(addon.installUrl);
        // @ts-ignore
        showToast.showCopyToClipboard?.();
    };

    const copySourceUrl = () => {
        const plugin = addon as PluginData;
        clipboard.setString(plugin.sourceUrl);
        // @ts-ignore
        showToast.showCopyToClipboard?.();
    };

    const openAddonMenu = () => {
        const actions = [
            {
                label: `Copy ${isPluginMode ? 'Plugin' : 'Theme'} Link`,
                icon: findAssetId("CopyIcon"),
                onPress: copyAddonLink
            }
        ];

        if (isPluginMode && (addon as PluginData).sourceUrl) {
            actions.push({
                label: "Copy Source URL",
                icon: findAssetId("CopyIcon"),
                onPress: copySourceUrl
            });
        }

        const sheetKey = `${isPluginMode ? 'plugin' : 'theme'}-menu`;
        showSheet(sheetKey, () => (
            <ActionSheet>
                <TableRowGroup title={`${isPluginMode ? 'Plugin' : 'Theme'} Info`}>
                    {actions.map((action, index) => (
                        <TableRow
                            key={index}
                            label={action.label}
                            icon={<TableRow.Icon source={action.icon} />}
                            onPress={() => {
                                action.onPress();
                                hideSheet(sheetKey);
                            }}
                        />
                    ))}
                </TableRowGroup>
            </ActionSheet>
        ));
    };

    return (
        <Stack spacing={8} direction="horizontal">
            <IconButton
                size="sm"
                onPress={openAddonMenu}
                variant="secondary"
                icon={findAssetId("MoreHorizontalIcon")}
            />
            <InstallButton
                addon={addon}
                isPluginMode={isPluginMode}
                installing={installing}
                setInstalling={setInstalling}
                setRefreshTick={setRefreshTick}
            />
        </Stack>
    );
}

// @ts-ignore (i cant be bothered to type these)
function AddonCard({ addon, isPluginMode, installing, setInstalling, setRefreshTick }) {
    const { name, description, authors } = addon;
    const plugin = addon as PluginData;

    let statusColor = "text-normal";
    if (isPluginMode) {
        if (plugin.status === "working") statusColor = "#4ADE80";
        if (plugin.status === "broken") statusColor = "#EF4444";
        if (plugin.status === "warning") statusColor = "#F59E0B";
    }

    return (
        <Card>
            <Stack spacing={16}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View style={{ flexShrink: 1 }}>
                        <Text numberOfLines={1} variant="heading-lg/semibold">
                            {name}
                        </Text>
                        <Text variant="text-md/semibold" color="text-muted">
                            by {authors?.join(", ") || "Unknown"}
                        </Text>
                        {isPluginMode && (
                            <Text variant="text-md/semibold" style={{ color: statusColor }}>
                                Status: {plugin.status}
                            </Text>
                        )}
                    </View>
                    <View>
                        <TrailingButtons
                            addon={addon}
                            isPluginMode={isPluginMode}
                            installing={installing}
                            setInstalling={setInstalling}
                            setRefreshTick={setRefreshTick}
                        />
                    </View>
                </View>
                <Text variant="text-md/medium">
                    {description}
                </Text>
                {isPluginMode && plugin.warningMessage && (
                    <Text variant="text-sm/medium" color="text-muted">
                        Warning: {plugin.warningMessage}
                    </Text>
                )}
            </Stack>
        </Card>
    );
}

enum Sort {
    DateNewest = "Newest",
    DateOldest = "Oldest",
    NameAZ = "Name (A–Z)",
    NameZA = "Name (Z–A)",
    WorkingFirst = "Working First",
    BrokenFirst = "Broken First",
}

export default function BrowserPage() {
    const navigation = NavigationNative.useNavigation();

    const [mode, setMode] = React.useState<"plugins" | "themes">("plugins");
    const [plugins, setPlugins] = React.useState<PluginData[]>([]);
    const [themesList, setThemesList] = React.useState<ThemeData[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [installing, setInstalling] = React.useState<Set<string>>(new Set());
    const [refreshTick, setRefreshTick] = React.useState(0);
    const [sort, setSort] = React.useState<Sort>(Sort.DateNewest);

    React.useEffect(() => {
        navigation.setOptions({
            title: "Browser"
        });
    }, [navigation]);

    const fetchData = React.useCallback(async (isPluginMode: boolean) => {
        setLoading(true);
        setError(null);
        try {
            const url = isPluginMode ? PLUGIN_URL : THEME_URL;
            const response = await safeFetch(url);
            if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            const data = await response.json();

            let addonList: AddonData[] = [];
            if (Array.isArray(data)) {
                addonList = data;
            } else if (isPluginMode && data.OFFICIAL_PLUGINS) {
                addonList = data.OFFICIAL_PLUGINS;
            } else if (!isPluginMode) {
                // Handle any other structure for themes - try common property names
                addonList = data.OFFICIAL_THEMES || data.themes || data.THEMES || data.items || [];
            }

            if (isPluginMode) {
                setPlugins(addonList as PluginData[]);
            } else {
                setThemesList(addonList as ThemeData[]);
            }
        } catch (e) {
            setError(e instanceof Error ? e.message : String(e));
            if (isPluginMode) {
                setPlugins([]);
            } else {
                setThemesList([]);
            }
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchPlugins = React.useCallback(() => fetchData(true), [fetchData]);
    const fetchThemes = React.useCallback(() => fetchData(false), [fetchData]);

    React.useEffect(() => {
        fetchPlugins();
        fetchThemes();
    }, [fetchPlugins, fetchThemes]);

    const filterList = (list: AddonData[]) => {
        if (!list) return [] as AddonData[];
        const q = searchQuery.toLowerCase();
        if (!q) return list;
        return list.filter(p =>
            p.name.toLowerCase().includes(q)
            || p.description.toLowerCase().includes(q)
            || (p.authors || []).some(a => a.toLowerCase().includes(q))
        );
    };

    const sortedAndFiltered = React.useMemo(() => {
        const list = filterList(mode === "plugins" ? plugins : themesList);

        const getStatusPriority = (status: PluginData["status"], sortBy: Sort): number => {
            if (sortBy === Sort.WorkingFirst) {
                return status === "working" || status === "warning" ? 0 : 1;
            }
            if (sortBy === Sort.BrokenFirst) {
                return status === "broken" ? 0 : 1;
            }
            return 0;
        };

        switch (sort) {
            case Sort.DateNewest:
                return [...list].reverse();
            case Sort.DateOldest:
                return [...list];
            case Sort.NameAZ:
                return [...list].sort((a, b) => a.name.localeCompare(b.name));
            case Sort.NameZA:
                return [...list].sort((a, b) => b.name.localeCompare(a.name));
            case Sort.WorkingFirst:
                if (mode === "plugins") {
                    return [...list].sort((a, b) => {
                        const pa = getStatusPriority((a as PluginData).status, Sort.WorkingFirst);
                        const pb = getStatusPriority((b as PluginData).status, Sort.WorkingFirst);
                        return pa !== pb ? pa - pb : a.name.localeCompare(b.name);
                    });
                }
                return list;
            case Sort.BrokenFirst:
                if (mode === "plugins") {
                    return [...list].sort((a, b) => {
                        const pa = getStatusPriority((a as PluginData).status, Sort.BrokenFirst);
                        const pb = getStatusPriority((b as PluginData).status, Sort.BrokenFirst);
                        return pa !== pb ? pa - pb : a.name.localeCompare(b.name);
                    });
                }
                return list;
            default:
                return list;
        }
    }, [plugins, themesList, mode, searchQuery, sort]);

    if (error) {
        return (
            <View style={{ flex: 1, paddingHorizontal: 8, justifyContent: "center", alignItems: "center" }}>
                <Card style={{ gap: 8 }}>
                    <Text style={{ textAlign: "center" }} variant="heading-lg/bold">
                        An error occurred while fetching the repository
                    </Text>
                    <Text style={{ textAlign: "center" }} variant="text-sm/medium" color="text-muted">
                        {error}
                    </Text>
                    <Button
                        size="lg"
                        text="Refetch"
                        onPress={() => fetchData(mode === "plugins")}
                        icon={findAssetId("RetryIcon")}
                    />
                </Card>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ paddingHorizontal: 10 }}>
                <Stack spacing={12}>
                    <View style={{ flexDirection: "row", paddingTop: 10 }}>
                        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                            <Button
                                size="md"
                                text="Plugins"
                                variant={mode === "plugins" ? "primary" : "secondary"}
                                onPress={() => setMode("plugins")}
                                style={{ flex: 1 }}
                            />
                            <View style={{ width: 8 }} />
                            <Button
                                size="md"
                                text="Themes"
                                variant={mode === "themes" ? "primary" : "secondary"}
                                onPress={() => setMode("themes")}
                                style={{ flex: 1 }}
                            />
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center", gap: 8, paddingBottom: 6 }}>
                        <Search
                            placeholder={`Search ${mode}...`}
                            isRound={true}
                            onChangeText={setSearchQuery}
                            style={{ flex: 1 }}
                        />
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                        <IconButton
                            size="md"
                            variant="tertiary"
                            icon={findAssetId("MoreVerticalIcon")}
                            disabled={!!searchQuery}
                            onPress={() => showSimpleActionSheet({
                                key: "AddonListSortOptions",
                                header: {
                                    title: "Sort Options",
                                    onClose: () => hideActionSheet("AddonListSortOptions"),
                                },
                                options: Object.entries(Sort).map(([key, value]) => ({
                                    label: value,
                                    onPress: () => {
                                        setSort(value as Sort);
                                    }
                                }))
                            })}
                        />
                    </View>

                    </View>
                </Stack>
            </View>

            <FlashList
                data={sortedAndFiltered}
                refreshing={loading}
                onRefresh={mode === "plugins" ? fetchPlugins : fetchThemes}
                estimatedItemSize={200}
                contentContainerStyle={{ paddingBottom: 90, paddingHorizontal: 5 }}
                ListHeaderComponent={mode === "plugins" ? (
                    <View style={{ paddingVertical: 6, paddingHorizontal: 8 }}>
                        <Card border="strong">
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                                <View style={{ gap: 6, flexShrink: 1 }}>
                                    <Text variant="heading-md/bold">Unproxied Plugins</Text>
                                    <Text variant="text-sm/medium" color="text-muted">
                                        Plugins installed from this source have not been checked for safety, install at your own risk
                                    </Text>
                                </View>
                            </View>
                        </Card>
                    </View>
                ) : null}
                //@ts-ignore
                renderItem={({ item: addon }) => (
                    <View style={{ paddingVertical: 6, paddingHorizontal: 8 }}>
                        <AddonCard
                            addon={addon}
                            isPluginMode={mode === "plugins"}
                            installing={installing}
                            setInstalling={setInstalling}
                            setRefreshTick={setRefreshTick}
                        />
                    </View>
                )}
            />
        </View>
    );
}
