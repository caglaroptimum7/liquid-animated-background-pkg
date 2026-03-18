import { useRef, useMemo } from 'react';
import type { LiquidBackgroundProps } from './types';
import { DEFAULT_CONFIG } from './types';
import { useLiquidAnimation } from './use-liquid-animation';

export function LiquidBackground({
  config = DEFAULT_CONFIG,
  className,
  style,
  children,
}: LiquidBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLiquidAnimation(canvasRef, config);

  const gradients = useMemo(
    () =>
      config.blobs
        .map((b, i) => {
          const positions = ['0% 0%', '100% 0%', '100% 100%', '0% 100%'];
          const pos = positions[i % positions.length];
          return `radial-gradient(circle at ${pos}, ${b.color}, transparent 80%)`;
        })
        .join(', '),
    [config.blobs]
  );

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    backgroundColor: config.backgroundColor,
    backgroundImage: gradients,
    ...style,
  };

  const canvasStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    display: 'block',
    filter: `blur(${config.blur}px)`,
    opacity: config.opacity,
    mixBlendMode: config.blendMode as React.CSSProperties['mixBlendMode'],
  };

  const contentStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    height: '100%',
  };

  return (
    <div className={className} style={containerStyle}>
      <canvas ref={canvasRef} style={canvasStyle} />
      {children && <div style={contentStyle}>{children}</div>}
    </div>
  );
}
