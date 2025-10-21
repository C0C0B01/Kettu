import { tokens } from "@metro/common";
import { createStyles } from "@ui/styles";

export const usePluginCardStyles = createStyles({
    smallIcon: {
        tintColor: tokens.colors.LOGO_PRIMARY,
        height: 18,
        width: 18,
    },
    badgeIcon: {
        tintColor: tokens.colors.LOGO_PRIMARY,
        height: 12,
        width: 12,
    },
    badgesContainer: {
        flexWrap: "wrap",
        flexDirection: "row",
        gap: 6,
        borderRadius: 6,
        padding: 4
    }
});
