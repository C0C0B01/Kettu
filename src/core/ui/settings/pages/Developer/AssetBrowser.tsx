import AssetDisplay from "@core/ui/settings/pages/Developer/AssetDisplay";
import { iterateAssets, findAssetId } from "@lib/api/assets";
import { Text } from "@metro/common/components";
import { ErrorBoundary, Search } from "@ui/components";
import { useMemo } from "react";
import { FlatList, View, ScrollView, TouchableOpacity, Image } from "react-native";

const displayable = new Set(['png', 'jpg', 'svg']);

export default function AssetBrowser() {
    const [search, setSearch] = React.useState("");
    const [showNonImages, setShowNonImages] = React.useState(false);

    const all = useMemo(() => Array.from(iterateAssets()), []);

    const filteredData = useMemo(() => {
        let result = all.filter(a => a.name.includes(search) || a.id.toString() === search);

        if (!showNonImages) {
            result = result.filter(a => displayable.has(a.type));
        }

        return result;
    }, [all, search, showNonImages]);


    return (
        <ErrorBoundary>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
                <View style={{ flex: 1, marginRight: 10 }}>
                    <Search
                        onChangeText={(v: string) => setSearch(v)}
                    />
                </View>
                <TouchableOpacity
                    style={{
                        padding: 12,
                        backgroundColor: showNonImages ? '#0f1013' : '#303139',
                        borderRadius: 8,
                        justifyContent: 'center',
                        alignItems: 'center',
                        minWidth: 44,
                        minHeight: 44,
                    }}
                    onPress={() => setShowNonImages(!showNonImages)}
                >
                    <Image
                        style={{ width: 20, height: 20 }}
                        source={findAssetId("ic_image")!}
                    />
                </TouchableOpacity>
              </View>
                <ScrollView>
                  <View style={{ flex: 1, borderRadius: 16, paddingHorizontal: 12, overflow: 'hidden', backgroundColor: 'transparent' }}>
                      {showNonImages && (
                        <Text variant='text-sm/medium' color='text-danger' style={{ marginBottom: 16 }}>Some assets types cannot be displayed and will be marked in red.</Text>
                      )}
                      <FlatList
                          data={filteredData}
                          renderItem={({ item }: any) => <AssetDisplay asset={item} showNonImages={showNonImages} />}
                          contentContainerStyle={{ overflow: 'hidden', backgroundColor: 'transparent', borderRadius: 16 }}
                          scrollEnabled={false}
                          keyExtractor={a => a.id.toString()}
                      />
                  </View>
                </ScrollView>
            </View>
        </ErrorBoundary>
    );
}
