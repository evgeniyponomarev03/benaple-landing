# ShapeFeatures Component

A flexible and reusable shape features component with gradient backgrounds, perfect for feature sections, call-to-action blocks, and content highlights.

## Features

- **Multiple variants**: Primary (dark blue), Secondary (light blue), and Custom gradients
- **Flexible content**: Support for titles, subtitles, icons, and custom content
- **Built-in icons**: Chart and Wave icons for common use cases
- **Responsive design**: Works great on all screen sizes
- **TypeScript support**: Fully typed for better development experience

## Basic Usage

```tsx
import { ShapeFeatures, ChartIcon } from '@/components/ContentBlock'

// Simple shape features block
<ShapeFeatures
  title="Get more efficient"
  subtitle="Streamline your workflow and boost productivity"
  variant="primary"
/>

// With icon
<ShapeFeatures
  title="Manage your HR with ease"
  subtitle="Simplify employee management and team collaboration"
  variant="secondary"
  icon={<ChartIcon />}
/>
```

## Props

| Prop               | Type                                   | Default     | Description                                      |
| ------------------ | -------------------------------------- | ----------- | ------------------------------------------------ |
| `title`            | `string`                               | -           | Main title text (required)                       |
| `subtitle`         | `string`                               | -           | Optional subtitle text                           |
| `icon`             | `React.ReactNode`                      | -           | Optional icon or graphic element                 |
| `variant`          | `'primary' \| 'secondary' \| 'custom'` | `'primary'` | Predefined gradient variant                      |
| `customGradient`   | `string`                               | -           | Custom CSS gradient (used with variant="custom") |
| `className`        | `string`                               | -           | Additional CSS classes                           |
| `children`         | `React.ReactNode`                      | -           | Additional content                               |
| `contentClassName` | `string`                               | -           | CSS classes for content container                |

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

## Built-in Icons

### ChartIcon

Perfect for efficiency, analytics, or performance-related content:

```tsx
import { ChartIcon } from '@/components/ContentBlock'
;<ShapeFeatures title="Boost Performance" icon={<ChartIcon className="w-32 h-24" />} />
```

### WaveIcon

Great for flow, management, or process-related content:

```tsx
import { WaveIcon } from '@/components/ContentBlock'
;<ShapeFeatures title="Streamline Processes" icon={<WaveIcon className="w-40 h-16" />} />
```

## Examples

Check out the examples file for complete implementations:

- `src/components/ContentBlock/examples.tsx`

## Grid Layouts

ShapeFeatures work great in grid layouts:

```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  <ShapeFeatures title="Get more efficient" variant="primary" icon={<ChartIcon />} />
  <ShapeFeatures title="Manage your HR with ease" variant="secondary" icon={<WaveIcon />} />
</div>
```
