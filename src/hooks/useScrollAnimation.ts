import { useEffect, useRef } from "react";

/**
 * Custom hook for scroll-triggered animations using Intersection Observer
 * Adds 'visible' class to elements when they enter the viewport
 */
export const useScrollAnimation = (threshold: number = 0.15) => {
  const observerRef = useRef<IntersectionObserver>();

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold]);

  return observerRef.current;
};

/**
 * Smooth scroll to section
 */
export const smoothScrollTo = (targetId: string) => {
  const element = document.getElementById(targetId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

/**
 * Parallax effect handler
 */
export const useParallax = (speed: number = 0.5) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      if (elementRef.current) {
        const yPos = -(scrolled * speed);
        elementRef.current.style.transform = `translate3d(0, ${yPos}px, 0)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return elementRef;
};
