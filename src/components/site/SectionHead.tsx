import type { ReactNode } from "react";
import Reveal from "./Reveal";
import MaskText from "./MaskText";

interface SectionHeadProps {
  number: string;
  label: string;
  id: string;
  title: ReactNode;
  intro?: ReactNode;
  /** For dark (ink) panels. */
  inverted?: boolean;
}

/**
 * Shared section opener. Choreography: the rule is drawn, the folio number
 * and label appear, then the title rises word by word out of its mask.
 */
const SectionHead = ({ number, label, id, title, intro, inverted }: SectionHeadProps) => (
  <Reveal as="header" variant="stage" className="grid gap-6 lg:grid-cols-12">
    <div className="relative flex items-baseline gap-3 pt-3 lg:col-span-12">
      <span className={`rule-draw absolute inset-x-0 top-0 h-px ${inverted ? "bg-background" : "bg-foreground"}`} aria-hidden="true" />
      <span className="stagger flex items-baseline gap-3" style={{ ["--stagger-base" as string]: "250ms" }}>
        <span className={`font-mono text-xs ${inverted ? "text-spot" : "spot-ink"}`} style={{ ["--i" as string]: 0 }}>
          {number}
        </span>
        <span className={`slug ${inverted ? "!text-background/60" : ""}`} style={{ ["--i" as string]: 1 }}>
          {label}
        </span>
      </span>
    </div>
    <h2 id={id} className="text-[clamp(2.4rem,6vw,4.75rem)] font-semibold leading-[0.95] tracking-[-0.04em] lg:col-span-8">
      <MaskText base={320}>{title}</MaskText>
    </h2>
    {intro && (
      <p className="stagger max-w-md self-end text-lg leading-relaxed text-muted-foreground lg:col-span-4" style={{ ["--stagger-base" as string]: "600ms" }}>
        <span className="block">{intro}</span>
      </p>
    )}
  </Reveal>
);

export default SectionHead;
