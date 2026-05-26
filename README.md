<div align="center">
  <h1>Notique</h1>
  <p><strong>Lightweight, framework-agnostic toast notifications. Under 2kb</strong></p>
  
  <p>
    <a href="https://www.npmjs.com/package/notique"><img alt="NPM Version" src="https://img.shields.io/npm/v/notique?color=blue&style=flat-square"></a>
    <img alt="Gzip Size" src="https://img.shields.io/badge/gzip-1.89kb-brightgreen?style=flat-square">
    <img alt="License" src="https://img.shields.io/badge/license-MIT-blue?style=flat-square">
  </p>
</div>

<br>

## Features

- **~1.89kb gzipped** — microscopic footprint, lighter than your CSS reset.
- **Zero dependencies** — pure TypeScript, no frameworks required.
- **4 built-in types** — success, error, info, warning.
- **6 positions** — top/bottom × left/right/center.
- **Global config** — set defaults once, override per toast.
- **Smart overloads** — pass a string, two strings, or a full object.
- **Progress bar** — animated countdown (optional).
- **Accessible** — `role="alert"` and `aria-live` out of the box.
- **XSS Secure** — text injection is sanitized by default.
- **Custom colors & icons** — full control when you need it.

## Installation

```bash
npm install notique
# or
pnpm add notique
# or
yarn add notique
```

## Quick Start

```typescript
import { notique } from 'notique';

notique.success('Payment processed successfully');
notique.error('Something went wrong');
notique.info('New update available');
notique.warning('Low battery');
```

---

## Usage

Notique supports multiple call signatures. Use whichever fits your context.

### 1. String only
```typescript
notique.success('Profile saved');
```

### 2. String + options
```typescript
notique.warning('Low battery', { position: 'bottom-center', duration: 2000 });
```

### 3. String + description
```typescript
notique.info('New update available', 'Version 2.4.0 is ready to install');
```

### 4. String + description + options
```typescript
notique.success('Upload complete', '15 files uploaded successfully', {
  position: 'top-left',
  dismiss: false
});
```

### 5. Options object
```typescript
notique.error({
  message: 'Network error',
  description: 'Could not connect to the server.',
  position: 'bottom-right',
  duration: 6000
});
```

---

## Global Config

Set defaults once at your app's entry point. Per-toast options will always override the global config.

```typescript
import { notique } from 'notique';

notique.config({
  position: 'top-center',
  duration: 4000,
  showProgress: false
});
```

---

## API Reference

### Methods

| Method | Description |
|--------|-------------|
| `notique.success(...)` | Green toast with check icon |
| `notique.error(...)` | Red toast with error icon |
| `notique.info(...)` | Blue toast with info icon |
| `notique.warning(...)` | Yellow toast with alert icon |
| `notique.custom(...)` | Custom toast (uses info style as base) |
| `notique.config(options)` | Set global defaults |

### Options

| Property | Type | Default | Description |
|--------|------|---------|-------------|
| `message` | `string` | — | **Required.** Toast title |
| `description` | `string` | — | Optional subtitle |
| `type` | `'success' \| 'error' \| 'info' \| 'warning'` | inferred | Toast type |
| `position` | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left' \| 'top-center' \| 'bottom-center'` | `'bottom-right'` | Screen position |
| `duration` | `number` | `3000` | Duration in ms |
| `dismiss` | `boolean` | `true` | Click to dismiss |
| `showProgress` | `boolean` | `true` | Show progress bar animation |
| `icon` | `string \| false` | built-in SVG | Custom icon HTML or `false` to hide |
| `color` | `string` | type default | Background color (hex, rgb, gradients) |
| `textColor` | `string` | `#fff` | Text color |
| `className` | `string` | — | Additional CSS utility classes (e.g., Tailwind) |

---

## Framework Examples

Notique works natively with any framework.

### Vanilla JS / TS
```typescript
import { notique } from 'notique';
notique.success('Done!');
```

### React / Next.js
```tsx
import { notique } from 'notique';

export function SaveButton() {
  const handleSave = async () => {
    await save();
    notique.success('Saved!');
  };
  return <button onClick={handleSave}>Save</button>;
}
```

### Angular
```typescript
import { notique } from 'notique';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  success(msg: string) { notique.success(msg); }
  error(msg: string)   { notique.error(msg); }
}
```

### Vue / Nuxt
```vue
<script setup>
import { notique } from 'notique';

const handleSubmit = async () => {
  await submit();
  notique.success('Form submitted');
}
</script>
```

---

## License

MIT © [Andrés Rengifo](https://andresrengifo.com)
