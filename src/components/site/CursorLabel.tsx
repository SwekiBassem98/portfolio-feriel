import { useEffect, useRef, useState } from "react";
import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";

/**
 * A small caption that trails the native pointer over elements marked with
 * `data-cursor="Label"`. The real cursor stays visible and unchanged;
 * touch devices and reduced-motion users never see it.
 */
const CursorLabel = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let x = -100;
    let y = -100;
    let tx = -100;
    let ty = -100;
    const loop = () => {
      x += (tx - x) * 0.25;
      y += (ty - y) * 0.25;
      el.style.transform = `translate3d(${x + 16}px, ${y + 18}px, 0)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.3 ? requestAnimationFrame(loop) : 0;
    };
    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(loop);
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      setLabel(target ? target.dataset.cursor ?? null : null);
    };
    const onLeave = () => setLabel(null);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className={`cursor-label ${label ? "is-on" : ""}`} aria-hidden="true">
      <span className="rounded-full bg-foreground px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-background shadow-lg">
        {label}
      </span>
    </div>
  );
};

export default CursorLabel;
