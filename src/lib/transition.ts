import { flushSync } from "react-dom";
import type { NavigateFunction } from "react-router-dom";
import { prefersReducedMotion } from "./motion";

type DocWithVT = Document & {
  startViewTransition?: (cb: () => void) => { finished: Promise<void> };
};

/**
 * Navigates inside a View Transition when the browser supports it.
 *
 * `coverId`: the project whose cover should morph into the case-study cover.
 * The visible element carrying `data-vt-cover="<id>"` closest to the click is
 * given the shared name for the duration of the transition. Without a match,
 * shared names are suppressed so only the page itself cross-fades.
 *
 * History, direct URLs and back/forward are untouched: this only wraps a
 * normal router navigation; popstate navigations are not animated.
 */
export const navigateWithTransition = (
  navigate: NavigateFunction,
  to: string,
  opts: { coverId?: string; point?: { x: number; y: number } } = {},
) => {
  const doc = document as DocWithVT;
  if (!doc.startViewTransition || prefersReducedMotion()) {
    navigate(to);
    return;
  }

  let source: HTMLElement | null = null;
  if (opts.coverId) {
    const vh = window.innerHeight;
    const candidates = Array.from(document.querySelectorAll<HTMLElement>(`[data-vt-cover="${opts.coverId}"]`)).filter((el) => {
      const r = el.getBoundingClientRect();
      return r.bottom > 0 && r.top < vh && r.width > 0;
    });
    const p = opts.point;
    source =
      candidates.sort((a, b) => {
        if (!p) return 0;
        const ra = a.getBoundingClientRect();
        const rb = b.getBoundingClientRect();
        const da = Math.hypot(ra.left + ra.width / 2 - p.x, ra.top + ra.height / 2 - p.y);
        const db = Math.hypot(rb.left + rb.width / 2 - p.x, rb.top + rb.height / 2 - p.y);
        return da - db;
      })[0] ?? null;
  }

  const root = document.documentElement;
  if (source) source.style.viewTransitionName = "project-cover";
  else root.classList.add("vt-plain");

  const vt = doc.startViewTransition(() => {
    if (source) source.style.viewTransitionName = "";
    flushSync(() => navigate(to));
    const hash = to.includes("#") ? to.slice(to.indexOf("#") + 1) : "";
    const anchor = hash ? document.getElementById(hash) : null;
    if (anchor) anchor.scrollIntoView({ block: "start" });
    else window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  });
  vt.finished.finally(() => root.classList.remove("vt-plain"));
};
