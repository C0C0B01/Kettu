import { after } from "@lib/api/patcher";
import { onJsxCreate } from "@lib/api/react/jsx";
import { findByName, findByNameLazy } from "@metro";
import { useEffect, useState } from "react";
import { defineCorePlugin } from "..";
import { FluxDispatcher } from "@metro/common";

interface Badge {
    label: string;
    url: string;
}

interface CustomBadge {
    label: string;
    url: string;
}

interface UserBadgeData {
    roles?: string[];
    custom?: CustomBadge[];
}

interface BadgeData {
    [userId: string]: UserBadgeData;
}

interface RoleData {
    label: string;
    url: string;
}

interface RolesData {
    [roleName: string]: RoleData;
}

const useBadgesModule = findByNameLazy("useBadges", false);

const badgesCache = new Map<string, Badge[]>();
const badgeProps = new Map<string, Record<string, any>>();
const pendingRequests = new Set<string>();

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
            authors: [{ name: "cocobo1"}, { name: "pylixonly" }]
        }
    },
    
    start() {
        onJsxCreate("ProfileBadge", (component, ret) => {
            if (ret.props.id?.startsWith("rain-")) {
                const cachedProps = badgeProps.get(ret.props.id);
                if (cachedProps) {
                    ret.props.source = cachedProps.source;
                    ret.props.label = cachedProps.label;
                    ret.props.id = cachedProps.id;
                }
            }
        });

        onJsxCreate("RenderedBadge", (component, ret) => {
            if (ret.props.id?.startsWith("rain-")) {
                const cachedProps = badgeProps.get(ret.props.id);
                if (cachedProps) {
                    Object.assign(ret.props, cachedProps);
                }
            }
        });

        const fetchAndProcessBadges = async (userId: string) => {
            if (pendingRequests.has(userId)) return;
            pendingRequests.add(userId);

            try {
                const [badgesRes, rolesRes] = await Promise.all([
                    fetch("https://codeberg.org/raincord/badges/raw/branch/main/badges.json"),
                    fetch("https://codeberg.org/raincord/badges/raw/branch/main/assets/roles/roles.json"),
                ]);

                const badgesData: BadgeData = await badgesRes.json();
                const rolesData: RolesData = await rolesRes.json();

                const userBadgeData = badgesData[userId] || { roles: [], custom: [] };

                const allBadges: Badge[] = [];

                // process role badges
                if (userBadgeData.roles) {
                    userBadgeData.roles.forEach(roleName => {
                        const roleData = rolesData[roleName];
                        if (roleData) {
                            allBadges.push({
                                label: roleData.label,
                                url: roleData.url,
                            });
                        }
                    });
                }

                // process custom badges
                if (userBadgeData.custom) {
                    allBadges.push(...userBadgeData.custom);
                }

                badgesCache.set(userId, allBadges);

                allBadges.forEach((badge, i) => {
                    const badgeId = `rain-${userId}-${i}`;
                    badgeProps.set(badgeId, {
                        id: badgeId,
                        source: { uri: badge.url },
                        label: badge.label,
                        userId,
                    });
                });

                FluxDispatcher.dispatch({ type: "USER_UPDATE", user: { id: userId } });
            } finally {
                pendingRequests.delete(userId);
            }
        };

        after("default", useBadgesModule, ([user], result) => {
            if (!user) return;

            const userId = user.userId;
            const cached = badgesCache.get(userId);

            if (!cached) {
                if (!pendingRequests.has(userId)) {
                    fetchAndProcessBadges(userId);
                }
                return;
            }

            cached.forEach((badge, i) => {
                const badgeId = `rain-${userId}-${i}`;

                result.unshift({
                    id: badgeId,
                    description: badge.label,
                    icon: " _",
                });
            });
        });
    }
});