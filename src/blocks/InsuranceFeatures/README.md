# Insurance Features Block

A customizable Payload CMS block for displaying insurance features and benefits with multiple layout options.

## 🎯 Features

- **5 Layout Options**: Default grid, pillars grid, sticky steps, audience tabs, and KPI band
- **Customizable Content**: Title, subtitle, features, proof strip, and CTA
- **Icon Selection**: Choose from 12 predefined icons
- **Responsive Design**: Mobile-optimized with swipeable cards
- **Conditional Fields**: Layout-specific configuration options

## 🎨 Layout Options

### 1. Default Grid

- 2-column desktop grid with subtle connectors
- Mobile swipeable cards
- Proof strip and CTA button

### 2. Pillars Grid

- Compact 4-column grid
- Hover effects
- Microproof band below

### 3. Sticky with Steps

- Left sticky content area
- Right vertical numbered steps
- Great for storytelling

### 4. Audience Tabs

- Tabbed interface for different audiences
- Employers vs. Individuals
- Separate feature sets for each audience

### 5. KPI Band

- Minimalist KPI display
- Bullet point list
- Compact above-the-fold design

## 📝 Configuration Fields

### Basic Settings

- **Title**: Section heading (default: "Why Choose Beneple?")
- **Subtitle**: Section description
- **Layout**: Choose from 5 layout styles
- **Show Proof Strip**: Toggle proof strip visibility
- **Show CTA**: Toggle call-to-action button

### Features

- **Icon**: Select from 12 icon options
- **Title**: Feature heading
- **Text**: Feature description

### Proof Strip

- **Label**: Bold text (e.g., "92", "25+ providers")
- **Description**: Supporting text

### Audience Tabs (when layout = 'tabs')

- **Employer Label**: Custom tab label
- **Individual Label**: Custom tab label
- **Common Features**: Features for both audiences
- **Employer Features**: Employer-specific features
- **Individual Features**: Individual-specific features

### KPI Band (when layout = 'kpi')

- **KPIs**: Key performance indicators
- **Bullets**: Bullet point list

## 🚀 Usage

### In Payload Admin

1. Navigate to any Page in the admin panel
2. Go to the "Content" tab
3. Click "Add Block"
4. Select "Insurance Features"
5. Configure the fields as needed

### In Code

```tsx
import { InsuranceFeaturesBlockComponent } from '@/blocks/InsuranceFeatures/Component'

// Use the component
;<InsuranceFeaturesBlockComponent
  title="Why Choose Us?"
  subtitle="Your trusted partner"
  layout="default"
  features={[
    {
      icon: 'shield',
      title: 'Licensed & Compliant',
      text: 'Full regulatory compliance',
    },
  ]}
  showProofStrip={true}
  showCTA={true}
  ctaText="Get Started"
  ctaUrl="/contact"
/>
```

## 🎨 Icon Options

- `shield` - Shield Check
- `link` - Link
- `file` - File Check
- `chart` - Bar Chart
- `arrow` - Arrow Right
- `users` - Users
- `clock` - Clock
- `heart` - Heart
- `building` - Building
- `cog` - Cog
- `truck` - Truck
- `gem` - Gem

## 📱 Responsive Behavior

- **Desktop**: Full grid layouts with hover effects
- **Mobile**: Swipeable cards for better touch experience
- **Tablet**: Adaptive layouts that work across screen sizes

## 🔧 Customization

The block is built with Tailwind CSS and can be easily customized by:

- Modifying the component styles
- Adding new icon options
- Creating additional layout variants
- Customizing animations and transitions









