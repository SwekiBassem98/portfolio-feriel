import React, { useRef, useState } from "react";

interface LensRevealCopyProps {
  primaryText: React.ReactNode;
  revealText: React.ReactNode;
  className?: string;
  lensRadius?: number;
}

export const LensRevealCopy: React.FC<LensRevealCopyProps> = ({
  primaryText,
  revealText,
  className = "",
  lensRadius = 140,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, active: false }));
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative select-none overflow-hidden ${className}`}
      data-lens="reveal"
      data-lens-size="140"
    >
      {/* Base Layer */}
      <div className="transition-opacity duration-300">
        {primaryText}
      </div>

      {/* Interactive Circular Reveal Layer (Clip-path mask) */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-200 text-primary"
        style={{
          opacity: mousePos.active ? 1 : 0,
          clipPath: mousePos.active
            ? `circle(${lensRadius}px at ${mousePos.x}px ${mousePos.y}px)`
            : "circle(0px at 0px 0px)",
          WebkitClipPath: mousePos.active
            ? `circle(${lensRadius}px at ${mousePos.x}px ${mousePos.y}px)`
            : "circle(0px at 0px 0px)",
        }}
      >
        {revealText}
      </div>
    </div>
  );
};
