import { findAssetId } from "@lib/api/assets";
import { clipboard } from "@metro/common";
import { TableRow, TableRowTrailingText } from "@metro/common/components";
import { showToast } from "@ui/toasts";
import { ImageURISource } from "react-native";

interface VersionProps {
    label: string;
    version: string;
    icon: string | ImageURISource;
}

export default function Version({ label, version, icon }: VersionProps) {
    return (
        <TableRow
            label={label}
            trailing={<TableRowTrailingText text={version} />}
            icon={<TableRow.Icon source={typeof icon === "string" ? findAssetId(icon) : icon} />}
            onPress={() => {
                clipboard.setString(`${label} - ${version}`);
                showToast.showCopyToClipboard();
            }}
        />
    );
}
