import type { Block } from 'payload'
import { defaultLexical } from '@/fields/defaultLexical'
import { withBlockThumbnail } from '@/utilities/blockThumbnail'

const featureGridEnhancedConfig: Block = {
  slug: 'featureGridEnhanced',
  interfaceName: 'FeatureGridEnhancedBlock',
  labels: {
    singular: 'Enhanced Feature Grid',
    plural: 'Enhanced Feature Grids',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Section Subtitle',
    },
    {
      name: 'layout',
      type: 'select',
      label: 'Layout Style',
      defaultValue: 'uniform',
      options: [
        {
          label: 'Uniform Grid',
          value: 'uniform',
        },
        {
          label: 'Masonry',
          value: 'masonry',
        },
        {
          label: 'Mixed Sizes',
          value: 'mixed',
        },
      ],
    },
    {
      name: 'columns',
      type: 'select',
      label: 'Columns',
      defaultValue: 3,
      options: [
        {
          label: '2 Columns',
          value: '2',
        },
        {
          label: '3 Columns',
          value: '3',
        },
        {
          label: '4 Columns',
          value: '4',
        },
      ],
    },
    {
      name: 'gap',
      type: 'select',
      label: 'Gap Size',
      defaultValue: 'md',
      options: [
        {
          label: 'Small',
          value: 'sm',
        },
        {
          label: 'Medium',
          value: 'md',
        },
        {
          label: 'Large',
          value: 'lg',
        },
      ],
    },
    {
      name: 'variant',
      type: 'select',
      label: 'Card Style',
      defaultValue: 'default',
      options: [
        {
          label: 'Default',
          value: 'default',
        },
        {
          label: 'Minimal',
          value: 'minimal',
        },
        {
          label: 'Modern',
          value: 'modern',
        },
        {
          label: 'Bordered',
          value: 'bordered',
        },
        {
          label: 'Compact',
          value: 'compact',
        },
      ],
    },
    {
      name: 'showImages',
      type: 'checkbox',
      label: 'Show Feature Images',
      defaultValue: true,
    },
    {
      name: 'showCTA',
      type: 'checkbox',
      label: 'Show Call-to-Action Button',
      defaultValue: true,
      admin: {
        description:
          'Show call-to-action button below the subtitle',
      },
    },
    {
      name: 'ctaText',
      type: 'text',
      label: 'CTA Button Text',
      defaultValue: 'Get Started Today',
      admin: {
        description: 'Text for the call-to-action button',
        condition: (_, siblingData) =>
          siblingData.showCTA !== false,
      },
    },
    {
      name: 'ctaUrl',
      type: 'text',
      label: 'CTA Button URL',
      defaultValue: '#',
      admin: {
        description: 'URL for the call-to-action button',
        condition: (_, siblingData) =>
          siblingData.showCTA !== false,
      },
    },
    {
      name: 'ctaPosition',
      type: 'select',
      label: 'CTA Button Position',
      defaultValue: 'header',
      admin: {
        description:
          'Choose where to display the call-to-action button',
        condition: (_, siblingData) =>
          siblingData.showCTA !== false,
      },
      options: [
        {
          label: 'Below Subtitle (Header)',
          value: 'header',
        },
        {
          label: 'Below Cards (Footer)',
          value: 'footer',
        },
      ],
    },
    {
      name: 'featuredCard',
      type: 'group',
      label: 'Featured Card',
      admin: {
        description:
          'Optional featured card that spans full width above other cards',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Featured Card Title',
        },
        {
          name: 'description',
          type: 'richText',
          editor: defaultLexical,
          label: 'Featured Card Description',
        },
        {
          name: 'icon',
          type: 'select',
          label: 'Featured Card Icon',
          options: [
            { label: 'None', value: '' },
            {
              label: 'Insurance Building',
              value: 'insurance-building',
            },
            {
              label: 'Insurance Corporate',
              value: 'insurance-corporate',
            },
            {
              label: 'Insurance Group',
              value: 'insurance-group',
            },
            {
              label: 'Insurance Medical',
              value: 'insurance-medical',
            },
            {
              label: 'Insurance Special',
              value: 'insurance-special',
            },
            { label: 'Users', value: 'users' },
            { label: 'Clock', value: 'clock' },
            { label: 'Chart', value: 'chart' },
            { label: 'Shield', value: 'shield' },
            { label: 'Document', value: 'document' },
            { label: 'Calendar', value: 'calendar' },
            { label: 'Heart (Medical)', value: 'heart' },
            {
              label: 'Building (Property)',
              value: 'building',
            },
            { label: 'Cog (Management)', value: 'cog' },
            { label: 'Truck (Fleet)', value: 'truck' },
            { label: 'Gem (Luxury)', value: 'gem' },
            // Insurance icons
            {
              label: 'Insurance - Corporate',
              value: 'insurance-corporate',
            },
            {
              label: 'Insurance - Group',
              value: 'insurance-group',
            },
            {
              label: 'Insurance - Medical',
              value: 'insurance-medical',
            },
            {
              label: 'Insurance - Special',
              value: 'insurance-special',
            },
            {
              label: 'Insurance - Building',
              value: 'insurance-building',
            },
            // Business category icons
            {
              label: 'Licensed & Compliant',
              value: 'licensed-compliant',
            },
            {
              label: 'Market-wide Access',
              value: 'market-access',
            },
            {
              label: 'Specialist Advisors',
              value: 'specialist-advisors',
            },
            {
              label: 'Wellbeing/Wellness',
              value: 'wellbeing',
            },
          ],
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Featured Card Image',
        },
        {
          name: 'linkText',
          type: 'text',
          label: 'Featured Card Link Text',
        },
        {
          name: 'linkUrl',
          type: 'text',
          label: 'Featured Card Link URL',
        },
        {
          name: 'badge',
          type: 'text',
          label: 'Featured Card Badge',
        },
        {
          name: 'colorVariant',
          type: 'select',
          label: 'Background Color',
          defaultValue: 'brand',
          options: [
            {
              label: 'Brand Primary Color',
              value: 'brand',
            },
            {
              label: 'Match Other Cards',
              value: 'default',
            },
          ],
        },
      ],
    },
    {
      name: 'features',
      type: 'array',
      label: 'Features',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
          editor: defaultLexical,
        },
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          options: [
            { label: 'None', value: '' },
            {
              label: 'Insurance Building',
              value: 'insurance-building',
            },
            {
              label: 'Insurance Corporate',
              value: 'insurance-corporate',
            },
            {
              label: 'Insurance Group',
              value: 'insurance-group',
            },
            {
              label: 'Insurance Medical',
              value: 'insurance-medical',
            },
            {
              label: 'Insurance Special',
              value: 'insurance-special',
            },
            { label: 'Users', value: 'users' },
            { label: 'Clock', value: 'clock' },
            { label: 'Chart', value: 'chart' },
            { label: 'Shield', value: 'shield' },
            { label: 'Document', value: 'document' },
            { label: 'Calendar', value: 'calendar' },
            { label: 'Heart (Medical)', value: 'heart' },
            {
              label: 'Building (Property)',
              value: 'building',
            },
            { label: 'Cog (Management)', value: 'cog' },
            { label: 'Truck (Fleet)', value: 'truck' },
            { label: 'Gem (Luxury)', value: 'gem' },
            // Insurance icons
            {
              label: 'Insurance - Corporate',
              value: 'insurance-corporate',
            },
            {
              label: 'Insurance - Group',
              value: 'insurance-group',
            },
            {
              label: 'Insurance - Medical',
              value: 'insurance-medical',
            },
            {
              label: 'Insurance - Special',
              value: 'insurance-special',
            },
            {
              label: 'Insurance - Building',
              value: 'insurance-building',
            },
            // Business category icons
            {
              label: 'Licensed & Compliant',
              value: 'licensed-compliant',
            },
            {
              label: 'Market-wide Access',
              value: 'market-access',
            },
            {
              label: 'Specialist Advisors',
              value: 'specialist-advisors',
            },
            {
              label: 'Wellbeing/Wellness',
              value: 'wellbeing',
            },
          ],
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Feature Image',
        },
        {
          name: 'linkText',
          type: 'text',
          label: 'Link Text',
        },
        {
          name: 'linkUrl',
          type: 'text',
          label: 'Link URL',
        },
        {
          name: 'badge',
          type: 'text',
          label: 'Badge Text',
        },
        {
          name: 'size',
          type: 'select',
          label: 'Card Size',
          defaultValue: 'medium',
          admin: {
            condition: (_, siblingData) => {
              // Get the parent document's layout field
              const parentData =
                siblingData._parentDocument || {}
              return parentData.layout === 'mixed'
            },
          },
          options: [
            {
              label: 'Small',
              value: 'small',
            },
            {
              label: 'Medium',
              value: 'medium',
            },
            {
              label: 'Large',
              value: 'large',
            },
            {
              label: 'Wide',
              value: 'wide',
            },
            {
              label: 'Tall',
              value: 'tall',
            },
          ],
        },
      ],
    },
  ],
}

export const FeatureGridEnhanced = withBlockThumbnail(featureGridEnhancedConfig, 'FeatureGridEnhanced')
