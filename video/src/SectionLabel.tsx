import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

type Props = { label: string };

export const SectionLabel: React.FC<Props> = ({ label }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 10, 25, 35], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          bottom: 140,
          left: 48,
          display: "flex",
          alignItems: "center",
          gap: 16,
          opacity,
        }}
      >
        <div
          style={{
            width: 5,
            height: 40,
            background: "#db2777",
            borderRadius: 3,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 52,
            fontWeight: 700,
            color: "#ffffff",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            textShadow: "0 2px 20px rgba(0,0,0,0.7)",
            lineHeight: 1,
          }}
        >
          {label}
        </span>
      </div>
    </AbsoluteFill>
  );
};
