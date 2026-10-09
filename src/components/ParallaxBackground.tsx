import { useEffect, useRef } from "react";

const ParallaxBackground = () => {
  const shapesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const shapes = shapesRef.current?.querySelectorAll('.parallax-shape');
      
      shapes?.forEach((shape, index) => {
        const speed = 0.3 + (index * 0.1);
        const yPos = -(scrolled * speed);
        (shape as HTMLElement).style.transform = `translate3d(0, ${yPos}px, 0)`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="parallax-bg" ref={shapesRef}>
      <div className="parallax-shape" style={{
        width: '460px',
        height: '460px',
        background: 'hsl(var(--primary))',
        top: '8%',
        left: '4%'
      }} />
      <div className="parallax-shape" style={{
        width: '380px',
        height: '380px',
        background: 'hsl(var(--accent))',
        top: '55%',
        right: '8%'
      }} />
      <div className="parallax-shape" style={{
        width: '260px',
        height: '260px',
        background: 'hsl(var(--secondary))',
        top: '25%',
        right: '22%'
      }} />
    </div>
  );
};

export default ParallaxBackground;
