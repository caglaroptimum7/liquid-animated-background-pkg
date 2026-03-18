export interface BlobConfig {
  /** Blob color in any valid CSS color format */
  color: string;
  /** Time offset for animation phase (affects movement pattern) */
  t: number;
}

export interface LiquidBackgroundConfig {
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

export interface LiquidBackgroundProps {
  /** Configuration object — paste the JSON exported from the configurator */
  config: LiquidBackgroundConfig;
  /** Optional CSS class name for the container */
  className?: string;
  /** Optional inline styles for the container */
  style?: React.CSSProperties;
  /** Optional children rendered on top of the background */
  children?: React.ReactNode;
}

export const DEFAULT_CONFIG: LiquidBackgroundConfig = {
  backgroundColor: '#000000',
  blobs: [
    { color: '#3843D0', t: 0 },
    { color: '#ff72e3', t: 2 },
    { color: '#000000', t: 4 },
    { color: '#2f39ba', t: 6 },
  ],
  blur: 100,
  opacity: 1,
  speed: 5,
  blendMode: 'screen',
  interactive: true,
  blobRadius: 0.5,
};
