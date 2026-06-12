import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SectionLabel } from "./SectionLabel";
import { TapIndicator } from "./TapIndicator";
import { TapPoint } from "./scenes";

type Props = {
  imageSrc: string;
  label: string;
  durationInFrames: number;
  scrollAmount: number;
  tapPoints: TapPoint[];
};

export const ScrollScene: React.FC<Props> = ({
  imageSrc,
  label,
  durationInFrames,
  scrollAmount,
  tapPoints,
}) => {
  const frame = useCurrentFrame();

  // Inicia el scroll después del label fade-in (frame 15)
  // Usa easeInOut implícito de interpolate
  const translateY = interpolate(
    frame,
    [15, durationInFrames - 10],
    [0, -scrollAmount],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill style={{ background: "#0f172a", overflow: "hidden" }}>
      {/* Imagen scrollable */}
      <div
        style={{
          width: "100%",
          transform: `translateY(${translateY}px)`,
          willChange: "transform",
        }}
      >
        <Img
          src={staticFile(imageSrc)}
          style={{ width: "100%", display: "block" }}
        />
      </div>

      {/* Overlays */}
      <TapIndicator points={tapPoints} />
      <SectionLabel label={label} />
    </AbsoluteFill>
  );
};
