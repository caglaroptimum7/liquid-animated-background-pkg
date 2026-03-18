import { useRef, useEffect, useCallback } from 'react';
import type { LiquidBackgroundConfig } from './types';

export function useLiquidAnimation(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  config: LiquidBackgroundConfig
) {
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });
  const hasMouseRef = useRef(false);
  const timeRef = useRef(0);
  const rafRef = useRef<number>(0);
  const configRef = useRef(config);

  // Always keep the latest config in the ref so the animation loop reads it
  configRef.current = config;

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Low internal resolution — CSS handles display size, blur hides pixels
    canvas.width = 128;
    canvas.height = 128;
  }, [canvasRef]);

  useEffect(() => {
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [resize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const onMouseMove = (e: MouseEvent) => {
      hasMouseRef.current = true;
      const rect = canvas.getBoundingClientRect();
      targetMouseRef.current.x =
        ((e.clientX - rect.left) / rect.width) * canvas.width;
      targetMouseRef.current.y =
        ((e.clientY - rect.top) / rect.height) * canvas.height;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      hasMouseRef.current = true;
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      targetMouseRef.current.x =
        ((touch.clientX - rect.left) / rect.width) * canvas.width;
      targetMouseRef.current.y =
        ((touch.clientY - rect.top) / rect.height) * canvas.height;
    };

    const onPointerLeave = () => {
      hasMouseRef.current = false;
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });
    canvas.addEventListener('mouseleave', onPointerLeave);
    canvas.addEventListener('touchend', onPointerLeave);

    function animate() {
      const c = configRef.current;
      const speed = c.speed * 0.002;
      timeRef.current += speed;
      const t = timeRef.current;
      const w = canvas!.width;
      const h = canvas!.height;

      ctx!.clearRect(0, 0, w, h);
      ctx!.globalCompositeOperation =
        c.blendMode as GlobalCompositeOperation;

      if (c.interactive) {
        mouseRef.current.x +=
          (targetMouseRef.current.x - mouseRef.current.x) * 0.05;
        mouseRef.current.y +=
          (targetMouseRef.current.y - mouseRef.current.y) * 0.05;
      }

      for (let i = 0; i < c.blobs.length; i++) {
        const b = c.blobs[i];
        const movementX =
          Math.sin(t + b.t) * 0.5 + Math.sin(t * 0.5 + b.t * 2) * 0.5;
        const movementY =
          Math.cos(t + b.t) * 0.5 + Math.cos(t * 0.6 + b.t * 2) * 0.5;

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
        const g = ctx!.createRadialGradient(x, y, 0, x, y, radius);
        g.addColorStop(0, b.color);
        g.addColorStop(1, 'rgba(0,0,0,0)');

        ctx!.fillStyle = g;
        ctx!.beginPath();
        ctx!.arc(x, y, radius, 0, Math.PI * 2);
        ctx!.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('mouseleave', onPointerLeave);
      canvas.removeEventListener('touchend', onPointerLeave);
    };
  }, [canvasRef]);
}
