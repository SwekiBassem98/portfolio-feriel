import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const KEY = "scroll-positions";
const positions: Record<string, number> = (() => {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
})();
const persist = () => {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(positions));
  } catch {
    /* storage unavailable */
  }
};

/**
 * New navigations start at the top; back/forward returns to where the
 * visitor was (e.g. the project spread they opened) instead of the top.
 */
export default function ScrollToTop() {
  const location = useLocation();
  const navType = useNavigationType();
  const keyRef = useRef(location.key);
  keyRef.current = location.key;

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        positions[keyRef.current] = window.scrollY;
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pagehide", persist);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", persist);
    };
  }, []);

  useLayoutEffect(() => {
    persist();
    if (navType === "POP" && typeof positions[location.key] === "number") {
      const y = positions[location.key];
      // wait a frame so the restored page has its full height
      requestAnimationFrame(() => window.scrollTo({ top: y, left: 0, behavior: "instant" as ScrollBehavior }));
      return;
    }
    if (!location.hash) window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [location.key, location.hash, navType]);

  return null;
}
