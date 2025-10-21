import { after } from "@lib/api/patcher";
import { onJsxCreate } from "@lib/api/react/jsx";
import { findByName } from "@metro";
import { useEffect, useState } from "react";

import { defineCorePlugin } from "..";

interface BunnyBadge {
    label: string;
    url: string;
}

const useBadgesModule = findByName("useBadges", false);

export default defineCorePlugin({
    manifest: {
        id: "bunny.badges",
        version: "1.1.0",
        type: "plugin",
        spec: 3,
        main: "",
        display: {
            name: "Badges",
            description: "Adds badges to user's profile",
            authors: [{ name: "cocobo1" }, { name: "pylixonly" }]
        }
    },

    start() {
        let allBadges: { [x: string]: any; } | null = null;
        const badgeProps = {} as Record<string, any>;

        onJsxCreate("ProfileBadge", (component, ret) => {
            if (ret.props.id?.startsWith("bunny-")) {
                const cachedProps = badgeProps[ret.props.id];
                if (cachedProps) {
                    ret.props.source = cachedProps.source;
                    ret.props.label = cachedProps.label;
                    ret.props.id = cachedProps.id;
                }
            }
        });

        onJsxCreate("RenderedBadge", (component, ret) => {
            if (ret.props.id?.startsWith("bunny-")) {
                const cachedProps = badgeProps[ret.props.id];
                if (cachedProps) {
                    Object.assign(ret.props, cachedProps);
                }
            }
        });

        after("default", useBadgesModule, ([user], result) => {
            const [badges, setBadges] = useState<BunnyBadge[]>([]);

            useEffect(() => {
                if (!user) return;

                if (!allBadges) {
                    fetch("https://codeberg.org/raincord/badges/raw/branch/main/badges.json")
                        .then(r => r.json())
                        .then(data => {
                            allBadges = data;
                            // @ts-expect-error
                            setBadges(allBadges[user.userId] || []);
                        });
                } else {
                    // user has no badges, but maybe they should get some by contributing
                    setBadges(allBadges[user.userId] || []);
                }
            }, [user?.userId]);

            if (user && badges.length > 0) {
                badges.forEach((badge, i) => {
                    const badgeId = `bunny-${user.userId}-${i}`;

                    badgeProps[badgeId] = {
                        id: badgeId,
                        source: { uri: badge.url },
                        label: badge.label,
                        userId: user.userId,
                    };

                    result.push({
                        id: badgeId,
                        description: badge.label,
                        icon: " _",
                    });
                });
            }
        });
    }
});
