import * as react_jsx_runtime from 'react/jsx-runtime';

interface BlobConfig {
    /** Blob color in any valid CSS color format */
    color: string;
    /** Time offset for animation phase (affects movement pattern) */
    t: number;
}
interface LiquidBackgroundConfig {
    /** Base background color */
    backgroundColor: string;
    /** Array of blob configurations */
    blobs: BlobConfig[];
    /** CSS blur filter amount in pixels */
    blur: number;
    /** Canvas opacity (0 to 1) */
    opacity: number;
    /** Animation speed multiplier */
    speed: number;
    /** CSS blend mode for the canvas */
    blendMode: string;
    /** Enable mouse interaction with blobs */
    interactive: boolean;
    /** Blob radius as a fraction of canvas width (0.1 to 1.5) */
    blobRadius: number;
}
interface LiquidBackgroundProps {
    /** Configuration object — paste the JSON exported from the configurator */
    config: LiquidBackgroundConfig;
    /** Optional CSS class name for the container */
    className?: string;
    /** Optional inline styles for the container */
    style?: React.CSSProperties;
    /** Optional children rendered on top of the background */
    children?: React.ReactNode;
}
declare const DEFAULT_CONFIG: LiquidBackgroundConfig;

declare function LiquidBackground({ config, className, style, children, }: LiquidBackgroundProps): react_jsx_runtime.JSX.Element;

declare function useLiquidAnimation(canvasRef: React.RefObject<HTMLCanvasElement | null>, config: LiquidBackgroundConfig): void;

export { type BlobConfig, DEFAULT_CONFIG, LiquidBackground, type LiquidBackgroundConfig, type LiquidBackgroundProps, useLiquidAnimation };
