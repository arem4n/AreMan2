import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { SCENES } from "./scenes";
import { ScrollScene } from "./ScrollScene";

export const WalkthroughRoot: React.FC = () => {
  let offset = 0;

  return (
    <AbsoluteFill>
      {SCENES.map((scene) => {
        const from = offset;
        offset += scene.durationInFrames;

        return (
          <Sequence
            key={scene.slug}
            from={from}
            durationInFrames={scene.durationInFrames}
            name={scene.label}
          >
            <ScrollScene
              imageSrc={scene.imageSrc}
              label={scene.label}
              durationInFrames={scene.durationInFrames}
              scrollAmount={scene.scrollAmount}
              tapPoints={scene.tapPoints}
            />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
