import React from "react";
import { AbsoluteFill, Composition } from "remotion";

// Placeholder — replaced in Task 6 with WalkthroughRoot
const PlaceholderComp: React.FC = () => (
  <AbsoluteFill style={{ background: "#0f172a" }} />
);

export const Root: React.FC = () => (
  <Composition
    id="WalkthroughComposition"
    component={PlaceholderComp}
    durationInFrames={2250}
    fps={30}
    width={1080}
    height={1920}
  />
);
