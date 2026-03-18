# Liquid Animated Background

[![npm version](https://img.shields.io/npm/v/liquid-animated-background.svg)](https://www.npmjs.com/package/liquid-animated-background)
[![npm downloads](https://img.shields.io/npm/dm/liquid-animated-background.svg)](https://www.npmjs.com/package/liquid-animated-background)

Configurable animated liquid/blob background component for **React** and **Next.js**.

**[Live Configurator Demo](https://caglaroptimum7.github.io/liquid-animated-background-configurator/)** — design your background visually, then copy the config and paste it into your project.

## Install

```bash
npm install liquid-animated-background
```

## Usage

### React

```tsx
import { LiquidBackground } from 'liquid-animated-background';

const config = {
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

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <LiquidBackground config={config}>
        <h1 style={{ color: 'white', textAlign: 'center', paddingTop: '40vh' }}>
          Hello World
        </h1>
      </LiquidBackground>
    </div>
  );
}
```

### Next.js (App Router)

The component includes `"use client"` directive automatically.

```tsx
// app/page.tsx
import { LiquidBackground } from 'liquid-animated-background';

const config = { /* paste your config JSON here */ };

export default function Page() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <LiquidBackground config={config}>
        <h1>My Page</h1>
      </LiquidBackground>
    </div>
  );
}
```

### Full-screen Background

```tsx
<LiquidBackground
  config={config}
  style={{ position: 'fixed', inset: 0 }}
>
  <YourContent />
</LiquidBackground>
```

### Custom Hook

For advanced use cases, use the `useLiquidAnimation` hook directly:

```tsx
import { useRef } from 'react';
import { useLiquidAnimation } from 'liquid-animated-background';

function CustomBackground({ config }) {
  const canvasRef = useRef(null);
  useLiquidAnimation(canvasRef, config);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
}
```

## Props

| Prop        | Type                      | Description                                      |
| ----------- | ------------------------- | ------------------------------------------------ |
| `config`    | `LiquidBackgroundConfig`  | Configuration object (paste from configurator)   |
| `className` | `string`                  | CSS class for the container                      |
| `style`     | `CSSProperties`           | Inline styles for the container                  |
| `children`  | `ReactNode`               | Content rendered on top of the background        |

## Config

| Key               | Type         | Default   | Description                    |
| ----------------- | ------------ | --------- | ------------------------------ |
| `backgroundColor` | `string`     | `#000000` | Base background color          |
| `blobs`           | `BlobConfig[]` | 4 blobs | Blob color + animation offset  |
| `blur`            | `number`     | `100`     | Blur amount in px              |
| `opacity`         | `number`     | `1`       | Canvas opacity                 |
| `speed`           | `number`     | `5`       | Animation speed                |
| `blendMode`       | `string`     | `screen`  | CSS blend mode                 |
| `interactive`     | `boolean`    | `true`    | Mouse/touch interaction        |
| `blobRadius`      | `number`     | `0.5`     | Blob size (fraction of canvas) |

## Related

- [Configurator Source Code](https://github.com/caglaroptimum7/liquid-animated-background-configurator)

## License

MIT

---

Developed by [Caglar Ergul](https://github.com/caglaroptimum7) at [Optimum7](https://optimum7.com)
