import { useRef, useCallback, useEffect, useMemo } from 'react';
import { jsxs, jsx } from 'react/jsx-runtime';

// src/types.ts
var DEFAULT_CONFIG = {
  backgroundColor: "#000000",
  blobs: [
    { color: "#3843D0", t: 0 },
    { color: "#ff72e3", t: 2 },
    { color: "#000000", t: 4 },
    { color: "#2f39ba", t: 6 }
  ],
  blur: 100,
  opacity: 1,
  speed: 5,
  blendMode: "screen",
  interactive: true,
  blobRadius: 0.5
};
function useLiquidAnimation(canvasRef, config) {
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });
  const hasMouseRef = useRef(false);
  const timeRef = useRef(0);
  const rafRef = useRef(0);
  const configRef = useRef(config);
  configRef.current = config;
  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = 128;
    canvas.height = 128;
  }, [canvasRef]);
  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [resize]);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const onMouseMove = (e) => {
      hasMouseRef.current = true;
      const rect = canvas.getBoundingClientRect();
      targetMouseRef.current.x = (e.clientX - rect.left) / rect.width * canvas.width;
      targetMouseRef.current.y = (e.clientY - rect.top) / rect.height * canvas.height;
    };
    const onTouchMove = (e) => {
      if (e.touches.length === 0) return;
      hasMouseRef.current = true;
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      targetMouseRef.current.x = (touch.clientX - rect.left) / rect.width * canvas.width;
      targetMouseRef.current.y = (touch.clientY - rect.top) / rect.height * canvas.height;
    };
    const onPointerLeave = () => {
      hasMouseRef.current = false;
    };
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("touchmove", onTouchMove, { passive: true });
    canvas.addEventListener("mouseleave", onPointerLeave);
    canvas.addEventListener("touchend", onPointerLeave);
    function animate() {
      const c = configRef.current;
      const speed = c.speed * 2e-3;
      timeRef.current += speed;
      const t = timeRef.current;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = c.blendMode;
      if (c.interactive) {
        mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.05;
        mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.05;
      }
      for (let i = 0; i < c.blobs.length; i++) {
        const b = c.blobs[i];
        const movementX = Math.sin(t + b.t) * 0.5 + Math.sin(t * 0.5 + b.t * 2) * 0.5;
        const movementY = Math.cos(t + b.t) * 0.5 + Math.cos(t * 0.6 + b.t * 2) * 0.5;
        let x = w / 2 + movementX * (w * 0.3);
        let y = h / 2 + movementY * (h * 0.3);
        if (c.interactive && hasMouseRef.current) {
          const dx = mouseRef.current.x - x;
          const dy = mouseRef.current.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = w * 0.6;
          if (dist < maxDist) {
            const force = (maxDist - dist) / maxDist;
            x += dx * force * 0.2;
            y += dy * force * 0.2;
          }
        }
        const radius = w * c.blobRadius;
        const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
        g.addColorStop(0, b.color);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(animate);
    }
    animate();
    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("mouseleave", onPointerLeave);
      canvas.removeEventListener("touchend", onPointerLeave);
    };
  }, [canvasRef]);
}
function LiquidBackground({
  config = DEFAULT_CONFIG,
  className,
  style,
  children
}) {
  const canvasRef = useRef(null);
  useLiquidAnimation(canvasRef, config);
  const gradients = useMemo(
    () => config.blobs.map((b, i) => {
      const positions = ["0% 0%", "100% 0%", "100% 100%", "0% 100%"];
      const pos = positions[i % positions.length];
      return `radial-gradient(circle at ${pos}, ${b.color}, transparent 80%)`;
    }).join(", "),
    [config.blobs]
  );
  const containerStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    backgroundColor: config.backgroundColor,
    backgroundImage: gradients,
    ...style
  };
  const canvasStyle = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    display: "block",
    filter: `blur(${config.blur}px)`,
    opacity: config.opacity,
    mixBlendMode: config.blendMode
  };
  const contentStyle = {
    position: "relative",
    zIndex: 1,
    width: "100%",
    height: "100%"
  };
  return /* @__PURE__ */ jsxs("div", { className, style: containerStyle, children: [
    /* @__PURE__ */ jsx("canvas", { ref: canvasRef, style: canvasStyle }),
    children && /* @__PURE__ */ jsx("div", { style: contentStyle, children })
  ] });
}

export { DEFAULT_CONFIG, LiquidBackground, useLiquidAnimation };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map