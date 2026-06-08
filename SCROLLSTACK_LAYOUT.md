# Interactive Features Block

This document explains the Interactive Features block which uses an advanced ScrollStack layout for creating engaging, scroll-driven experiences.

## Overview

The Interactive Features block provides a unique, scroll-driven experience where features are displayed as stacked cards that animate and scale as the user scrolls. This creates an engaging, modern interface that's perfect for showcasing multiple features in a visually appealing way.

## Features

- **Stacked Card Animation**: Features are displayed as cards that stack and scale based on scroll position
- **Smooth Scrolling**: Powered by Lenis for buttery-smooth scroll animations
- **Scaling Effects**: Cards scale down as they move away from the active position
- **Rotation Effects**: Subtle rotation for added visual interest
- **Blur Effects**: Background cards have blur effects to create depth
- **Responsive Design**: Works seamlessly across all device sizes

## Usage

### In Payload CMS

1. Navigate to any Page in the admin panel
2. Go to the "Content" tab
3. Click "Add Block"
4. Select "Interactive Features"
5. Configure your features with titles, descriptions, and images
6. Save and preview

### Configuration Options

The Interactive Features block uses the following configuration:

- **Heading**: Main title for the section
- **Subheading**: Description text
- **Features**: Array of feature objects with:
  - `title`: Feature name
  - `description`: Feature description
  - `image`: Media upload for feature image
  - `badge`: Optional badge text (e.g., "New", "Popular")

### ScrollStack Parameters

The ScrollStack component is configured with these optimized parameters:

```typescript
<ScrollStack
  className="h-[80vh]"
  itemDistance={120}           // Space between cards
  itemScale={0.05}            // Scale difference between cards
  itemStackDistance={40}      // Stacking offset
  stackPosition="30%"         // When cards start stacking
  scaleEndPosition="15%"      // When scaling completes
  baseScale={0.8}             // Minimum scale for background cards
  rotationAmount={2}          // Rotation degrees
  blurAmount={0.5}            // Blur intensity
  useWindowScroll={true}      // Use window scroll (not container)
/>
```

## Demo

Visit `/scrollstack-demo` to see the ScrollStack layout in action with sample data.

## Technical Implementation

### Dependencies

- **Lenis**: Smooth scrolling library
- **React**: Component framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling

### Files Modified

1. **Component**: `src/blocks/InteractiveFeatures/Component.tsx`
   - Added `ScrollStackLayout` component
   - Added layout prop support
   - Added conditional rendering

2. **Config**: `src/blocks/InteractiveFeatures/config.ts`
   - Added layout select field
   - Added layout options

3. **ScrollStack**: `src/components/ScrollStack.tsx`
   - Converted from JSX to TypeScript
   - Added proper type definitions
   - Added interface definitions

### Browser Support

- Modern browsers with CSS3 and ES6+ support
- Smooth scrolling requires hardware acceleration
- Touch devices supported with optimized touch handling

## Customization

### Styling

The ScrollStack cards can be customized by modifying the `itemClassName` prop:

```typescript
<ScrollStackItem
  itemClassName="bg-white border border-gray-200 shadow-lg"
>
  {/* Card content */}
</ScrollStackItem>
```

### Animation Parameters

You can adjust the animation behavior by modifying the ScrollStack props:

- **itemDistance**: Increase for more space between cards
- **itemScale**: Increase for more dramatic scaling
- **rotationAmount**: Increase for more rotation
- **blurAmount**: Increase for more blur effect

### Performance

The ScrollStack layout is optimized for performance with:

- Hardware-accelerated transforms
- Efficient scroll event handling
- RequestAnimationFrame for smooth animations
- Debounced updates to prevent excessive re-renders

## Troubleshooting

### Common Issues

1. **Cards not animating**: Ensure Lenis is properly initialized
2. **Jumpy animations**: Check for CSS conflicts or missing transforms
3. **Performance issues**: Reduce blur amount or disable on low-end devices

### Debug Mode

Enable console logging by checking the browser console for ScrollStack completion messages.

## Future Enhancements

- Custom easing functions
- More animation presets
- Accessibility improvements
- Mobile-specific optimizations
- Custom card layouts
