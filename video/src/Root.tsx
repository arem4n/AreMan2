import React from "react";
import { Composition } from "remotion";
import { loadFont } from "@remotion/google-fonts/BarlowCondensed";
import { WalkthroughRoot } from "./WalkthroughRoot";
import { FPS, TOTAL_FRAMES, VIDEO_HEIGHT, VIDEO_WIDTH } from "./scenes";

loadFont("normal", { weights: ["700"] });

export const Root: React.FC = () => (
  <Composition
    id="WalkthroughComposition"
    component={WalkthroughRoot}
    durationInFrames={TOTAL_FRAMES}
    fps={FPS}
    width={VIDEO_WIDTH}
    height={VIDEO_HEIGHT}
  />
);
