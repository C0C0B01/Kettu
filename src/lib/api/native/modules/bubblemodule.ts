import { processColor } from "react-native";
import { getModule } from "./loader";
import type { LoaderModule } from "./loader";

interface BubbleModule extends LoaderModule {
    hookBubbles(): Promise<void>;
    unhookBubbles(): Promise<void>;
    configure(avatarRadius?: number, bubbleRadius?: number, bubbleColor?: string): Promise<void>;
}

export default getModule<BubbleModule>({
    name: "BubbleModule",
    argumentProcessors: {
        configure: args => [args[0], args[1], Number(processColor(args[2]))],
    },
});