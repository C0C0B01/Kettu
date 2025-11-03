import { defineCorePlugin } from "..";
import { findByProps } from "@metro";
import { logger } from "@lib/utils/logger";

// Find the MessageActions module
const MessageActions = findByProps("sendMessage");
let originalSendMessage: Function;

export default defineCorePlugin({
  manifest: {
    id: "bunny.messagefix",
    version: "1.0.0",
    type: "plugin",
    spec: 3,
    main: "",
    display: {
      name: "MessageFix",
      description: "Ensures messages include the required nonce parameter",
      authors: [ { name: "Win8.1VMUser"}, { name: "kmmiio99o.dev" }],
    },
  },

  start() {
    // Save original function
    originalSendMessage = MessageActions.sendMessage;

    // Replace with our implementation
    MessageActions.sendMessage = function (
      channelId,
      message,
      replyRef,
      options,
    ) {
      // Ensure options exists and has a nonce
      options = options || {};
      options.nonce = options.nonce || Date.now().toString();

      // Call original with fixed parameters
      return originalSendMessage.call(
        this,
        channelId,
        message,
        replyRef,
        options,
      );
    };

    logger.log("MessageFix: Enabled - adding nonce to all messages");
  },

  stop() {
    // Restore original function
    if (originalSendMessage) MessageActions.sendMessage = originalSendMessage;
    logger.log("MessageFix: Disabled");
  },
});
