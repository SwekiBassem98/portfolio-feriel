import type { ReactNode } from "react";
import Reveal from "./Reveal";

interface SectionHeadProps {
  number: string;
  label: string;
  id: string;
  title: ReactNode;
  intro?: ReactNode;
}

/** Shared section opener: folio number + slug label, a ruled line, a large title. */
const SectionHead = ({ number, label, id, title, intro }: SectionHeadProps) => (
  <Reveal as="header" className="grid gap-6 lg:grid-cols-12">
    <div className="flex items-baseline gap-3 border-t border-foreground pt-3 lg:col-span-12">
      <span className="font-mono text-xs spot-ink">{number}</span>
      <span className="slug">{label}</span>
    </div>
    <h2 id={id} className="text-[clamp(2.4rem,6vw,4.75rem)] font-semibold leading-[0.95] tracking-[-0.04em] lg:col-span-8">
      {title}
    </h2>
    {intro && <p className="max-w-md self-end text-lg leading-relaxed text-muted-foreground lg:col-span-4">{intro}</p>}
  </Reveal>
);

export default SectionHead;
