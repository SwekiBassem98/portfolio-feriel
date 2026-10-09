import { forwardRef, type AnchorHTMLAttributes } from "react";
import { Link, useNavigate } from "react-router-dom";
import { navigateWithTransition } from "@/lib/transition";

interface TransitionLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  /** Project id whose cover morphs into the destination cover. */
  coverId?: string;
}

/** A router <Link> that plays a page transition on plain left-clicks. */
const TransitionLink = forwardRef<HTMLAnchorElement, TransitionLinkProps>(({ to, coverId, onClick, ...rest }, ref) => {
  const navigate = useNavigate();
  return (
    <Link
      ref={ref}
      to={to}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        if (rest.target && rest.target !== "_self") return;
        e.preventDefault();
        navigateWithTransition(navigate, to, { coverId, point: { x: e.clientX, y: e.clientY } });
      }}
      {...rest}
    />
  );
});
TransitionLink.displayName = "TransitionLink";

export default TransitionLink;
