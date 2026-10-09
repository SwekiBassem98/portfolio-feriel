import React, { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

interface MagneticPillProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  repelMode?: boolean;
  magneticStrength?: number;
}

export const MagneticPill: React.FC<MagneticPillProps> = ({
  children,
  className = "",
  onClick,
  href,
  repelMode = false,
  magneticStrength = 0.35,
}) => {
  const pillRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Responsive spring physics
  const springConfig = { damping: 16, stiffness: 260, mass: 0.25 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!pillRef.current) return;
    const rect = pillRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    if (repelMode) {
      // Repel / bounce away from cursor
      x.set(-deltaX * magneticStrength * 1.5);
      y.set(-deltaY * magneticStrength * 1.5);
    } else {
      // Magnetic attraction towards cursor
      x.set(deltaX * magneticStrength);
      y.set(deltaY * magneticStrength);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const content = (
    <motion.div
      ref={pillRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      data-lens="reveal"
      data-lens-size="80"
      className={`inline-flex items-center cursor-pointer select-none transition-colors duration-200 will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} className="inline-block">
        {content}
      </a>
    );
  }

  return (
    <div onClick={onClick} className="inline-block">
      {content}
    </div>
  );
};
