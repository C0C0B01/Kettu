import { registerCommand } from "@lib/api/commands";
import { findByProps } from "@metro";
import { messageUtil } from "@metro/common";

import { defineCorePlugin } from "..";

let unregister;

const Messages = findByProps("getRawMessages");

export default defineCorePlugin({
    manifest: {
        id: "bunny.messageextractor",
        version: "1.0.0",
        type: "plugin",
        spec: 3,
        main: "",
        display: {
            name: "Message Extractor",
            description: "Extract all messages from the current channel.",
            authors: [{ name: "Jules" }]
        }
    },
    start() {
        unregister = registerCommand({
            name: "extractmsgs",
            description: "Extract all messages from the current channel.",
            execute(args, ctx) {
                const messages = Messages.getRawMessages(ctx.channel.id);
                const content = messages.map(m => `${m.author.username}: ${m.content}`).join("\n");

                // Truncate if too long
                if (content.length > 2000) {
                    messageUtil.sendBotMessage(ctx.channel.id, content.substring(0, 1997) + "...");
                } else {
                    messageUtil.sendBotMessage(ctx.channel.id, content);
                }
            }
        });
    },
    stop() {
        unregister?.();
    }
});
