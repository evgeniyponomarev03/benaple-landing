# ShapeFeatures Component

A flexible and reusable shape features component with gradient backgrounds, perfect for feature sections, call-to-action blocks, and content highlights.

## Features

- **Multiple variants**: Primary (dark blue), Secondary (light blue), and Custom gradients
- **Flexible content**: Support for titles, subtitles, and custom content

- **Responsive design**: Works great on all screen sizes
- **TypeScript support**: Fully typed for better development experience

## Basic Usage

```tsx
import { ShapeFeatures } from '@/components/ShapeFeatures'

// Simple shape features block
<ShapeFeatures
  title="Get more efficient"
  subtitle="Streamline your workflow and boost productivity"
  variant="primary"
/>

// With different variant
<ShapeFeatures
  title="Manage your HR with ease"
  subtitle="Simplify employee management and team collaboration"
  variant="secondary"
/>
```

## Props

| Prop       | Type     | Default | Description                |
| ---------- | -------- | ------- | -------------------------- |
| `title`    | `string` | -       | Main title text (required) |
| `subtitle` | `string` | -       | Optional subtitle text     |

| `variant` | `'primary' \| 'secondary' \| 'custom'` | `'primary'` | Predefined gradient variant |
| `customGradient` | `string` | - | Custom CSS gradient (used with variant="custom") |
| `className` | `string` | - | Additional CSS classes |
| `children` | `React.ReactNode` | - | Additional content |
| `contentClassName` | `string` | - | CSS classes for content container |

## Variants

### Primary (Dark Blue)

```tsx
<ShapeFeatures title="Get more efficient" variant="primary" />
```

### Secondary (Light Blue)

```tsx
<ShapeFeatures title="Manage your HR with ease" variant="secondary" />
```

### Custom Gradient

```tsx
<ShapeFeatures
  title="Custom Design"
  variant="custom"
  customGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
/>
```

## Grid Layouts

ShapeFeatures work great in grid layouts:

```tsx
<div className="grid grid-cols-12 gap-8">
  <div className="col-span-12 lg:col-span-6">
    <ShapeFeatures title="Get more efficient" variant="primary" />
  </div>
  <div className="col-span-12 lg:col-span-6">
    <ShapeFeatures title="Manage your HR with ease" variant="secondary" />
  </div>
</div>
```
