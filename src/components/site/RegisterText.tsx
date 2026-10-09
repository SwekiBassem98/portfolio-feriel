import type { CSSProperties, ReactNode } from "react";

interface RegisterTextProps {
  children: ReactNode;
  /** Plays the C/M/Y plates drifting into register. */
  play?: boolean;
  /** Play when an ancestor <Reveal> becomes visible instead. */
  auto?: boolean;
  delay?: number;
  className?: string;
}

/**
 * Print "registration": cyan, magenta and yellow copies of the text start
 * slightly off and settle exactly onto the black plate, then disappear.
 * The copies are decorative (aria-hidden); the real text is untouched.
 */
const RegisterText = ({ children, play = false, auto = false, delay = 120, className = "" }: RegisterTextProps) => (
  <span className={`register ${play ? "is-in" : ""} ${auto ? "reg-auto" : ""} ${className}`} style={{ ["--reg-delay" as string]: `${delay}ms` } as CSSProperties}>
    {children}
    <span className="reg-ghost reg-c" aria-hidden="true">
      {children}
    </span>
    <span className="reg-ghost reg-m" aria-hidden="true">
      {children}
    </span>
    <span className="reg-ghost reg-y" aria-hidden="true">
      {children}
    </span>
  </span>
);

export default RegisterText;
