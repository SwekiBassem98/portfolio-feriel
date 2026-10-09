import { Children, Fragment, cloneElement, isValidElement, type ReactElement, type ReactNode, type CSSProperties } from "react";

interface MaskTextProps {
  children: ReactNode;
  /** Delay before the first word, in ms. */
  base?: number;
  /** Index offset, to continue a stagger across several MaskText blocks. */
  offset?: number;
}

/**
 * Splits text into words, each rising out of its own mask. Fragments are
 * unwrapped; an element with plain-text children (e.g. <em>) is split too,
 * each word keeping the element's styling. The parent must gain
 * `.is-visible` / `.is-in` / `.mw-play` (or `.mw-intro`) to play it.
 * Screen readers read the text normally: no aria-hidden duplicates.
 */
const MaskText = ({ children, base = 0, offset = 0 }: MaskTextProps) => {
  let i = offset;
  let k = 0;
  const style = (n: number): CSSProperties => ({ ["--i" as string]: n, ["--mw-base" as string]: `${base}ms` });
  const word = (content: ReactNode) => (
    <span className="mw" key={`w${k++}`}>
      <span style={style(i++)}>{content}</span>
    </span>
  );
  const space = () => <Fragment key={`s${k++}`}> </Fragment>;

  const walk = (node: ReactNode, wrap?: (w: string) => ReactNode): ReactNode[] => {
    const out: ReactNode[] = [];
    Children.toArray(node).forEach((child) => {
      if (typeof child === "string" || typeof child === "number") {
        String(child)
          .split(/(\s+)/)
          .forEach((p) => {
            if (!p) return;
            if (/^\s+$/.test(p)) out.push(space());
            else out.push(word(wrap ? wrap(p) : p));
          });
      } else if (isValidElement(child)) {
        const el = child as ReactElement<{ children?: ReactNode }>;
        if (el.type === Fragment) {
          out.push(...walk(el.props.children, wrap));
        } else if (typeof el.props.children === "string") {
          out.push(...walk(el.props.children, (w) => cloneElement(el, { key: `e${k++}` }, w)));
        } else {
          out.push(word(el));
        }
      }
    });
    return out;
  };

  return <>{walk(children)}</>;
};

export default MaskText;
