import type { Block } from 'payload'

import { linkGroup } from '../../fields/linkGroup'
import { withBlockThumbnail } from '@/utilities/blockThumbnail'

const callToActionEnhancedConfig: Block = {
  slug: 'ctaEnhanced',
  interfaceName: 'CallToActionEnhancedBlock',
  labels: {
    singular: 'Enhanced Call to Action',
    plural: 'Enhanced Calls to Action',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'variant',
      type: 'select',
      label: 'Layout Variant',
      defaultValue: 'default',
      options: [
        {
          label: 'Default',
          value: 'default',
        },
        {
          label: 'Centered',
          value: 'centered',
        },
        {
          label: 'Split',
          value: 'split',
        },
        {
          label: 'Minimal',
          value: 'minimal',
        },
      ],
    },
    {
      name: 'background',
      type: 'select',
      label: 'Background Style',
      defaultValue: 'gradient',
      options: [
        {
          label: 'Gradient',
          value: 'gradient',
        },
        {
          label: 'Solid',
          value: 'solid',
        },
        {
          label: 'Transparent',
          value: 'transparent',
        },
        {
          label: 'Pattern',
          value: 'pattern',
        },
      ],
    },
    {
      name: 'gradientFrom',
      type: 'text',
      label: 'Gradient From Color',
      defaultValue: 'from-blue-600',
      admin: {
        condition: (_, siblingData) =>
          siblingData.background === 'gradient' || siblingData.background === 'pattern',
        description: 'Tailwind CSS gradient class (e.g., from-blue-600)',
      },
    },
    {
      name: 'gradientTo',
      type: 'text',
      label: 'Gradient To Color',
      defaultValue: 'to-purple-600',
      admin: {
        condition: (_, siblingData) =>
          siblingData.background === 'gradient' || siblingData.background === 'pattern',
        description: 'Tailwind CSS gradient class (e.g., to-purple-600)',
      },
    },
    {
      name: 'textAlign',
      type: 'select',
      label: 'Text Alignment',
      defaultValue: 'center',
      options: [
        {
          label: 'Left',
          value: 'left',
        },
        {
          label: 'Center',
          value: 'center',
        },
        {
          label: 'Right',
          value: 'right',
        },
      ],
    },
    {
      name: 'size',
      type: 'select',
      label: 'Section Size',
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
        {
          label: 'Extra Large',
          value: 'xl',
        },
      ],
    },
    {
      name: 'image',
      type: 'group',
      label: 'Background/Split Image',
      admin: {
        condition: (_, siblingData) =>
          siblingData.variant === 'split' || siblingData.background === 'transparent',
      },
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
        },
        {
          name: 'position',
          type: 'select',
          label: 'Image Position',
          defaultValue: 'right',
          options: [
            {
              label: 'Left',
              value: 'left',
            },
            {
              label: 'Right',
              value: 'right',
            },
            {
              label: 'Background',
              value: 'background',
            },
          ],
        },
      ],
    },
    linkGroup({
      appearances: ['default', 'outline', 'secondary', 'ghost'],
      overrides: {
        maxRows: 3,
      },
    }),
  ],
}

export const CallToActionEnhanced = withBlockThumbnail(callToActionEnhancedConfig, 'CallToActionEnhanced')




































