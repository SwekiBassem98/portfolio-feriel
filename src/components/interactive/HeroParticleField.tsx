import React, { useEffect, useRef } from "react";

interface NodeParticle {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  vx: number;
  vy: number;
  size: number;
  shape: "circle" | "diamond" | "cross";
  color: string;
  alpha: number;
  angle: number;
  distance: number;
  speed: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export const HeroParticleField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    isHovering: false,
    prevX: 0,
    prevY: 0,
    speed: 0,
  });
  const scrollRef = useRef({ y: 0, lastY: 0, velocity: 0, progress: 0 });
  const ripplesRef = useRef<Ripple[]>([]);
  const animationFrameId = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 650);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;

      const dx = x - mouseRef.current.prevX;
      const dy = y - mouseRef.current.prevY;
      mouseRef.current.speed = Math.sqrt(dx * dx + dy * dy);
      mouseRef.current.prevX = x;
      mouseRef.current.prevY = y;

      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
      mouseRef.current.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
      mouseRef.current.isHovering = false;
      mouseRef.current.speed = 0;
    };

    // Playful interactive click ripple
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (ripplesRef.current.length < 5) {
        ripplesRef.current.push({
          x,
          y,
          radius: 10,
          maxRadius: Math.min(width, height) * 0.45,
          alpha: 0.8,
        });
      }
    };

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const delta = currentScroll - scrollRef.current.lastY;
      scrollRef.current.velocity = delta;
      scrollRef.current.lastY = currentScroll;
      scrollRef.current.y = currentScroll;

      const heroHeight = height;
      scrollRef.current.progress = Math.min(Math.max(currentScroll / heroHeight, 0), 1.6);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Build creative multi-shape particle nodes in Violet Dusk palette
    const PARTICLE_COUNT = 480;
    const particles: NodeParticle[] = [];
    const colors = [
      "rgba(80, 45, 85, ",     // Deep violet #502D55
      "rgba(147, 80, 115, ",   // Rose mauve plum #935073
      "rgba(246, 219, 192, ",  // Soft champagne bisque #F6DBC0
      "rgba(248, 244, 233, ",  // Vanilla pearl silk #F8F4E9
      "rgba(182, 106, 146, ",  // Luminous twilight orchid
    ];

    const shapes: ("circle" | "diamond" | "cross")[] = ["circle", "circle", "diamond", "cross"];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.pow(Math.random(), 1.4) * (Math.max(width, height) * 0.75) + 30;
      const z = Math.random() * 1100 - 150;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      particles.push({
        x,
        y,
        z,
        baseX: x,
        baseY: y,
        baseZ: z,
        vx: 0,
        vy: 0,
        size: Math.random() * 2.8 + 1.2,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.65 + 0.25,
        angle,
        distance,
        speed: (Math.random() * 0.002 + 0.0008) * (Math.random() > 0.5 ? 1 : -1),
      });
    }

    let time = 0;
    const fov = 380;

    const render = () => {
      if (!isVisibleRef.current) {
        animationFrameId.current = requestAnimationFrame(render);
        return;
      }

      time += 0.01;

      // Smooth spring mouse tracking
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;
      scrollRef.current.velocity *= 0.93;

      ctx.clearRect(0, 0, width, height);

      const globalOpacity = Math.max(0, 1 - scrollRef.current.progress * 1.05);
      if (globalOpacity <= 0) {
        animationFrameId.current = requestAnimationFrame(render);
        return;
      }

      // 3D forward acceleration & tunnel push on scroll
      const scrollSpeed = scrollRef.current.velocity * 4.2;
      const scrollProgressZ = scrollRef.current.progress * 850;
      const totalFlyThroughZ = scrollProgressZ + scrollSpeed;

      const centerX = width / 2;
      const centerY = height / 2;

      // Draw and update active ripples
      for (let r = ripplesRef.current.length - 1; r >= 0; r--) {
        const ripple = ripplesRef.current[r];
        ripple.radius += 6;
        ripple.alpha *= 0.94;

        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(246, 219, 192, ${ripple.alpha * globalOpacity * 0.45})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        if (ripple.radius >= ripple.maxRadius || ripple.alpha < 0.02) {
          ripplesRef.current.splice(r, 1);
        }
      }

      // Projected positions cache for constellation lines
      const projected: { x: number; y: number; z: number; color: string; alpha: number }[] = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Orbit continuous revolution
        p.angle += p.speed;
        const targetX = Math.cos(p.angle) * p.distance;
        const targetY = Math.sin(p.angle) * p.distance;

        // Interactive spring displacement from cursor
        const mouseWorldX = mouseRef.current.x;
        const mouseWorldY = mouseRef.current.y;
        const distToMouse = Math.hypot(targetX - mouseWorldX, targetY - mouseWorldY);

        if (distToMouse < 180 && mouseRef.current.isHovering) {
          const force = (1 - distToMouse / 180) * 22;
          const angleToMouse = Math.atan2(targetY - mouseWorldY, targetX - mouseWorldX);
          p.vx += Math.cos(angleToMouse) * force * 0.15;
          p.vy += Math.sin(angleToMouse) * force * 0.15;
        }

        // Elastic return to natural orbit
        p.vx *= 0.88;
        p.vy *= 0.88;
        p.x = targetX + p.vx;
        p.y = targetY + p.vy;

        // Interactive mouse 3D parallax tilt
        const mouseTiltX = (mouseRef.current.x * 0.22 * (p.z + 300)) / 1000;
        const mouseTiltY = (mouseRef.current.y * 0.22 * (p.z + 300)) / 1000;

        // Z-axis positioning with continuous wrap & scroll warp
        let effectiveZ = p.z - totalFlyThroughZ - (time * 50) % 1100;
        while (effectiveZ < -150) effectiveZ += 1100;
        while (effectiveZ > 950) effectiveZ -= 1100;

        const scale = fov / (fov + effectiveZ);
        if (scale <= 0) continue;

        const projX = centerX + (p.x + mouseTiltX) * scale;
        const projY = centerY + (p.y + mouseTiltY) * scale;
        const isWarping = Math.abs(scrollRef.current.velocity) > 4;
        const projSize = Math.max(0.6, p.size * scale * (1 + scrollRef.current.progress * 0.4));

        const depthAlpha = Math.sin((effectiveZ / 1100) * Math.PI);
        const finalAlpha = Math.max(0, Math.min(1, p.alpha * depthAlpha * globalOpacity));

        if (projX >= -30 && projX <= width + 30 && projY >= -30 && projY <= height + 30) {
          if (effectiveZ < 450 && finalAlpha > 0.35) {
            projected.push({ x: projX, y: projY, z: effectiveZ, color: p.color, alpha: finalAlpha });
          }

          ctx.fillStyle = `${p.color}${finalAlpha})`;
          ctx.strokeStyle = `${p.color}${finalAlpha})`;

          // Render shape
          if (isWarping) {
            // Speed streak during active scroll warp
            const streakLen = Math.min(25, Math.abs(scrollRef.current.velocity) * 1.2 * scale);
            ctx.beginPath();
            ctx.moveTo(projX, projY);
            ctx.lineTo(
              projX - (projX - centerX) * 0.04 * streakLen,
              projY - (projY - centerY) * 0.04 * streakLen
            );
            ctx.lineWidth = projSize;
            ctx.stroke();
          } else if (p.shape === "diamond") {
            ctx.beginPath();
            ctx.moveTo(projX, projY - projSize * 1.3);
            ctx.lineTo(projX + projSize * 1.3, projY);
            ctx.lineTo(projX, projY + projSize * 1.3);
            ctx.lineTo(projX - projSize * 1.3, projY);
            ctx.closePath();
            ctx.fill();
          } else if (p.shape === "cross") {
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(projX - projSize, projY);
            ctx.lineTo(projX + projSize, projY);
            ctx.moveTo(projX, projY - projSize);
            ctx.lineTo(projX, projY + projSize);
            ctx.stroke();
          } else {
            ctx.beginPath();
            ctx.arc(projX, projY, projSize, 0, Math.PI * 2);
            ctx.fill();

            // Glow aura on bright foreground elements
            if (projSize > 2.0 && finalAlpha > 0.4) {
              ctx.beginPath();
              ctx.arc(projX, projY, projSize * 2.4, 0, Math.PI * 2);
              ctx.fillStyle = `${p.color}${finalAlpha * 0.2})`;
              ctx.fill();
            }
          }
        }
      }

      // Draw delicate constellation threads between nearby core nodes
      const maxConnectDist = 65;
      const limit = Math.min(projected.length, 60);
      for (let i = 0; i < limit; i++) {
        for (let j = i + 1; j < limit; j++) {
          const dx = projected[i].x - projected[j].x;
          const dy = projected[i].y - projected[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxConnectDist) {
            const lineAlpha = (1 - dist / maxConnectDist) * 0.18 * globalOpacity;
            ctx.beginPath();
            ctx.moveTo(projected[i].x, projected[i].y);
            ctx.lineTo(projected[j].x, projected[j].y);
            ctx.strokeStyle = `rgba(182, 106, 146, ${lineAlpha * 1.1})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    animationFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
      style={{ willChange: "transform, opacity" }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-85 dark:opacity-95 transition-opacity duration-700"
      />
      {/* Soft gradient edge vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/15 to-background pointer-events-none" />
    </div>
  );
};
