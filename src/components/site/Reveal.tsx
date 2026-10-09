import { useEffect, useRef, useState, type ElementType, type ReactNode, type CSSProperties } from "react";

export type RevealVariant = "up" | "fade" | "stage";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Delay in ms, for staggering siblings. */
  delay?: number;
  /**
   * up    – the block rises and fades in (default)
   * fade  – opacity only
   * stage – the block itself stays still; it only sets `.is-visible` so its
   *         children (masked words, plates, staggers) choreograph themselves
   */
  variant?: RevealVariant;
  style?: CSSProperties;
  id?: string;
}

/**
 * Adds `.is-visible` once the element enters the viewport. Content is in the
 * DOM from the start; reduced-motion users see it immediately (motion.css).
 */
const Reveal = ({ children, as: Tag = "div", className = "", delay = 0, variant = "up", style, id }: RevealProps) => {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      data-variant={variant}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ ...style, ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
