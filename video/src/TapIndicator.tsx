import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TapPoint } from "./scenes";

type Props = { points: TapPoint[] };

export const TapIndicator: React.FC<Props> = ({ points }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <>
      {points.map((point, i) => {
        const localFrame = frame - point.frame;

        // Fuera de ventana de animación (45 frames = 1.5s)
        if (localFrame < 0 || localFrame > 45) return null;

        const dotScale = spring({
          frame: localFrame,
          fps,
          config: { damping: 14, stiffness: 220, mass: 0.8 },
          from: 0,
          to: 1,
        });

        const ringScale = spring({
          frame: localFrame,
          fps,
          config: { damping: 8, stiffness: 70, mass: 1 },
          from: 0.3,
          to: 2.2,
        });

        const opacity = interpolate(localFrame, [0, 6, 32, 45], [0, 1, 1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <div
            key={`${point.x}-${point.y}-${point.frame}`}
            style={{
              position: "absolute",
              left: point.x,
              top: point.y,
              transform: "translate(-50%, -50%)",
              opacity,
              pointerEvents: "none",
            }}
          >
            {/* Ring exterior */}
            <div
              style={{
                position: "absolute",
                width: 56,
                height: 56,
                left: -28,
                top: -28,
                borderRadius: "50%",
                border: "2.5px solid rgba(219,39,119,0.55)",
                transform: `scale(${ringScale})`,
              }}
            />
            {/* Dot central */}
            <div
              style={{
                position: "absolute",
                width: 26,
                height: 26,
                left: -13,
                top: -13,
                borderRadius: "50%",
                background: "#db2777",
                transform: `scale(${dotScale})`,
                boxShadow: "0 0 24px rgba(219,39,119,0.75)",
              }}
            />
          </div>
        );
      })}
    </>
  );
};
