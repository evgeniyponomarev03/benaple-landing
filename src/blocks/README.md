# Enhanced HR Blocks for Payload CMS

This directory contains enhanced content blocks specifically designed for HR applications, now fully integrated with Payload CMS.

## 📋 Available Blocks

### 🎯 **HR Feature Showcase**

**Block ID:** `hrFeatureShowcase`

- **Purpose:** Showcase HR app features with icons and descriptions
- **Features:**
  - Grid or list layout options
  - Built-in HR icons (Users, Clock, Chart, Shield, Document, Calendar)
  - Highlight specific features with custom gradients
  - Responsive column layouts (2, 3, or 4 columns)

### 📊 **Statistics Display**

**Block ID:** `statsDisplay`

- **Purpose:** Display HR metrics with animated counters
- **Features:**
  - Animated count-up numbers
  - Trend indicators (positive/negative with percentages)
  - Multiple layout options (grid, horizontal, cards)
  - Style variants (default, minimal, modern)
  - Built-in stat icons

### 💬 **Enhanced Testimonials**

**Block ID:** `testimonialsEnhanced`

- **Purpose:** Advanced testimonial showcase with ratings
- **Features:**
  - Star ratings (1-5 stars)
  - Author avatars with media upload
  - Featured testimonial highlighting
  - Multiple style variants
  - Optional quotation marks

### 🚀 **Enhanced Call-to-Action**

**Block ID:** `ctaEnhanced`

- **Purpose:** Advanced CTA sections with multiple layouts
- **Features:**
  - Split layout with images
  - Multiple background styles (gradient, solid, transparent, pattern)
  - Custom gradient colors
  - Text alignment options
  - Multiple button styles
  - Size variants (sm, md, lg, xl)

### 🔥 **Enhanced Feature Grid**

**Block ID:** `featureGridEnhanced`

- **Purpose:** Flexible feature grid with mixed layouts
- **Features:**
  - Masonry, uniform, and mixed size layouts
  - Feature images with media upload
  - Custom links and badges
  - Different card sizes (small, medium, large, wide, tall)
  - Multiple style variants

### 💰 **Enhanced Pricing**

**Block ID:** `pricingEnhanced`

- **Purpose:** Comprehensive pricing comparison tables and cards
- **Features:**
  - Monthly/yearly billing toggle with discounts
  - Feature comparison with checkmarks/partial/custom text
  - Card and table layout options
  - Popular/highlighted plans
  - Custom pricing (for "Contact Us" plans)
  - Multiple button styles

### 🏢 **Logo Cloud**

**Block ID:** `logoCloud`

- **Purpose:** Display partner/client logos in an animated scrolling banner
- **Features:**
  - Infinite scroll animation with smooth transitions
  - Configurable scroll direction (left-to-right or right-to-left)
  - Hover effects with grayscale to color transition
  - Responsive design with proper spacing
  - Pause animation on hover for better user experience
  - Triple logo repetition for seamless infinite scroll

## 🎨 Using the Blocks

### In Payload Admin

1. Navigate to any Page in the admin panel
2. Go to the "Content" tab
3. Click "Add Block"
4. Select any of the enhanced HR blocks:
   - HR Feature Showcase
   - Statistics Display
   - Enhanced Testimonials
   - Enhanced Call to Action
   - Enhanced Feature Grid
   - Enhanced Pricing
   - Logo Cloud

### Configuration Options

Each block provides extensive configuration options through the Payload admin interface:

- **Visual Customization:** Colors, layouts, sizes, variants
- **Content Management:** Rich text, media uploads, structured data
- **Layout Control:** Responsive grid systems, alignment options
- **Interactive Elements:** Animations, hover effects, transitions

## 🔧 Technical Implementation

### Block Structure

Each block follows the standard Payload pattern:

```
BlockName/
├── config.ts     # Payload block configuration with fields
├── Component.tsx # React component that renders the block
```

### Integration Points

- **Frontend Rendering:** `/src/blocks/RenderBlocks.tsx`
- **CMS Configuration:** `/src/collections/Pages/index.ts`
- **Component Library:** `/src/components/` (base components)

### Type Safety

All blocks are fully typed with TypeScript, providing:

- Auto-generated Payload types
- Component prop validation
- IDE autocompletion and error checking

## 🚀 Getting Started

1. **Create a New Page:** In Payload admin, create a new page
2. **Add HR Blocks:** Use the Content tab to add any of the enhanced blocks
3. **Configure Content:** Fill in the fields through the intuitive admin interface
4. **Preview & Publish:** Use Payload's live preview to see your changes

## 📖 Examples

### HR Feature Showcase Example

```typescript
// This configuration is done through the Payload admin interface
{
  title: "Everything You Need for Modern HR",
  subtitle: "Powerful features designed to simplify your HR processes",
  layout: "grid",
  columns: 3,
  features: [
    {
      title: "Employee Management",
      description: "Centralize all employee information...",
      icon: "users",
      highlight: true
    }
    // ... more features
  ]
}
```

### Statistics Display Example

```typescript
{
  title: "Trusted by Companies Worldwide",
  variant: "modern",
  animated: true,
  stats: [
    {
      label: "Employees Managed",
      value: 50000,
      suffix: "+",
      icon: "employees",
      highlight: true,
      trendValue: 12,
      trendPeriod: "this quarter"
    }
    // ... more stats
  ]
}
```

## 🎯 Best Practices

1. **Content Strategy:** Plan your block sequence for optimal user flow
2. **Visual Hierarchy:** Use highlights and sizes strategically
3. **Performance:** Enable animations judiciously for better UX
4. **Responsive Design:** Test layouts across different screen sizes
5. **Accessibility:** Ensure proper alt text for images and icons

## 🔄 Updates & Maintenance

- **Adding New Icons:** Update the icon maps in the component files
- **Style Variants:** Add new variants to the config options
- **Custom Fields:** Extend block configurations as needed
- **Type Generation:** Run `pnpm generate:types` after configuration changes

All blocks are designed to be easily extensible and maintainable while providing a rich editing experience for content creators.













