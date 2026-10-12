"use client"
import { useAnimationFrame } from "motion/react";
import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";

export default function GradientBorderButton({
  buttonText = "Get Started",
  animationDuration = 3,
  borderWidth = 2,
  glowColor = "#FFFFFF",
  link = null,
  type = "redirect", // "redirect" | "action"
  onPress = () => {}
}) {
  const angle = useRef(0);
  const [deg, setDeg] = useState(0);

  useAnimationFrame((_, delta) => {
    angle.current =
      (angle.current + (delta / 1000) * (360 / animationDuration)) % 360;
    setDeg(angle.current);
  });

  const gradient = `conic-gradient(from ${deg}deg, #1E1E1E, #4A4A4A, #8A8A8A, #CFCFCF, #FFFFFF, #CFCFCF, #8A8A8A, #4A4A4A, #1E1E1E)`;

  const isRedirect = type === "redirect";
  const Tag = isRedirect ? NavLink : "button";
  const tagProps = isRedirect
    ? { to: `/${link}` }
    : { type: "button", onClick: onPress };

  return (
    <div className="flex items-center justify-center size-full">
      {/* Glow blur layer */}
      <div className="relative">
        <div
          className="absolute inset-0 rounded-[14px] blur-md opacity-70"
          style={{
            background: gradient,
            transform: "scale(1.05)",
          }}
        />

        {/* Gradient border wrapper */}
        <div
          className="relative rounded-xl p-0.5"
          style={{
            background: gradient,
            padding: `${borderWidth}px`,
          }}
        >
          {/* Inner button (clickeable en toda su área) */}
          <Tag
            {...tagProps}
            className="relative inline-block rounded-xl px-8 py-4 bg-[#0f0f0f] text-white cursor-pointer overflow-hidden group"
          >
            {/* Subtle inner glow on hover */}
            <span
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              style={{
                background: `radial-gradient(ellipse at center, ${glowColor} 0%, transparent 70%)`,
              }}
            />
            <span className="relative z-10 tracking-wide">{buttonText}</span>
          </Tag>
        </div>
      </div>
    </div>
  );
}