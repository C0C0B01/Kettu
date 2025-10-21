import { BunnyPlugin } from "@lib/addons/plugins/types";
import { findByProps } from "@metro/filters";
import { registerCommand } from "@lib/api/commands";
import { channels } from "@metro/common";
import { writeFile } from "@lib/api/native/fs";
import { showToast } from "@ui/toasts";
import { findAssetId } from "@lib/api/assets";

const MessagesStore = findByProps("getRawMessages");

const plugin: BunnyPlugin = {
    manifest: {
        id: "dev.jules.messageextractor",
        version: "1.0.0",
        type: "plugin",
        spec: 3,
        main: "index.ts",
        display: {
            name: "Message Extractor",
            description: "Extracts all messages from the current channel into a detailed JSON file.",
            authors: [{ name: "Jules" }],
        },
    },
    start() {
        this.stop = registerCommand({
            name: "extractmsgs",
            description: "Extracts all messages from the current channel into a detailed JSON file.",
            execute: async (args, ctx) => {
                if (!MessagesStore) {
                    return {
                        content: "Error: Could not find MessagesStore. This plugin may be out of date.",
                        ephemeral: true,
                    };
                }

                const channelId = channels.getChannelId();
                const messages = MessagesStore.getRawMessages(channelId);

                const jsonData = JSON.stringify(messages, null, 2);
                const filePath = `message_exports/${channelId}.json`;

                try {
                    await writeFile(filePath, jsonData);
                    showToast("Messages exported successfully.", findAssetId("CheckIcon"));
                } catch (error) {
                    showToast("Error exporting messages.", findAssetId("CircleXIcon-primary"));
                    console.error("Error writing file:", error);
                }
            },
        });
    },
    stop() {
        // This will be populated by the return value of registerCommand
    },
};

export default plugin;
