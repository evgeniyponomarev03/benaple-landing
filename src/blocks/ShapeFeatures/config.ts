import type { Block } from 'payload'
import { withBlockThumbnail } from '@/utilities/blockThumbnail'

const shapeFeaturesBlockConfig: Block = {
  slug: 'shapeFeatures',
  interfaceName: 'ShapeFeaturesBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
      admin: {
        description:
          'Optional heading above the feature blocks',
      },
    },
    {
      name: 'features',
      type: 'array',
      label: 'Feature Blocks',
      required: true,
      minRows: 1,
      maxRows: 4,
      admin: {
        initCollapsed: true,
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
          type: 'textarea',
          label: 'Subtitle',
          admin: {
            description: 'Optional subtitle text',
          },
        },
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'primary',
          options: [
            {
              label: 'Primary (Dark Blue)',
              value: 'primary',
            },
            {
              label: 'Secondary (Light Blue)',
              value: 'secondary',
            },
            {
              label: 'Custom Gradient',
              value: 'custom',
            },
          ],
        },
        {
          name: 'customGradient',
          type: 'text',
          label: 'Custom Gradient CSS',
          admin: {
            condition: (_, siblingData) =>
              siblingData?.variant === 'custom',
            description:
              'CSS gradient value, e.g., "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"',
          },
        },

        {
          name: 'cornerStyle',
          type: 'select',
          label: 'Corner Style',
          options: [
            {
              label: 'Auto (based on variant)',
              value: 'auto',
            },
            {
              label: 'Standard Rounded',
              value: 'standard',
            },
            {
              label: 'One Large Corner',
              value: 'asymmetric',
            },
          ],
          defaultValue: 'auto',
          admin: {
            description:
              'Override the default corner style for this variant',
          },
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Background Image',
          admin: {
            description:
              'Optional background image for this feature block',
          },
        },
        {
          name: 'textColor',
          type: 'select',
          label: 'Text Color',
          options: [
            {
              label: 'Default (White)',
              value: 'white',
            },
            {
              label: 'Light Blue (Brand Secondary)',
              value: 'lightblue',
            },
            {
              label: 'Dark Blue (Brand Text)',
              value: 'darkblue',
            },
            {
              label: 'Custom Color',
              value: 'custom',
            },
          ],
          admin: {
            description:
              'Choose the text color for this feature block',
          },
        },
        {
          name: 'customTextColor',
          type: 'text',
          label: 'Custom Text Color',
          admin: {
            condition: (_, siblingData) =>
              siblingData?.textColor === 'custom',
            description:
              'Enter a custom color value (hex, rgb, hsl, etc.). Example: #FF6B35 or rgb(255, 107, 53)',
          },
        },
        {
          name: 'size',
          type: 'select',
          label: 'Block Size',
          options: [
            {
              label: 'Full Width',
              value: 'full',
            },
            {
              label: 'Half (1/2)',
              value: 'half',
            },
            {
              label: 'One Third (1/3)',
              value: 'oneThird',
            },
            {
              label: 'Two Thirds (2/3)',
              value: 'twoThirds',
            },
            {
              label: 'One Quarter (1/4)',
              value: 'oneQuarter',
            },
            {
              label: 'Three Quarters (3/4)',
              value: 'threeQuarters',
            },
          ],
          defaultValue: 'half',
          admin: {
            description:
              'Controls how much horizontal space this block takes up in the layout',
          },
        },
      ],
    },
    {
      name: 'layout',
      type: 'select',
      label: 'Layout',
      defaultValue: 'grid',
      options: [
        {
          label: 'Grid (2 columns on large screens)',
          value: 'grid',
        },
        {
          label: 'Single Row',
          value: 'row',
        },
        {
          label: 'Single Column',
          value: 'column',
        },
      ],
    },
  ],
  graphQL: {
    singularName: 'ShapeFeaturesBlock',
  },
  labels: {
    plural: 'Shape Features Blocks',
    singular: 'Shape Features Block',
  },
}

export const ShapeFeaturesBlock = withBlockThumbnail(shapeFeaturesBlockConfig, 'ShapeFeatures')
