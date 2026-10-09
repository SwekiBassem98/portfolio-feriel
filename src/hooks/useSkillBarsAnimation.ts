import { useEffect } from "react";

/**
 * Animate skill progress bars when they enter the viewport
 */
export const useSkillBarsAnimation = () => {
  useEffect(() => {
    const bars = document.querySelectorAll('.skill-bar .h-full');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target as HTMLElement;
          const width = bar.getAttribute('data-width');
          if (width) {
            bar.style.width = width.endsWith('%') ? width : `${width}%`;
          }
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.5 });

    bars.forEach((bar) => observer.observe(bar));

    return () => observer.disconnect();
  }, []);
};
