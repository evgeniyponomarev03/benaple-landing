import type { Block } from 'payload'
import { withBlockThumbnail } from '@/utilities/blockThumbnail'

const interactiveFeaturesConfig: Block = {
  slug: 'interactiveFeatures',
  interfaceName: 'InteractiveFeaturesBlock',
  labels: {
    singular: 'Interactive Features',
    plural: 'Interactive Features',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: false,
      admin: {
        description:
          'Main heading for the features section',
      },
    },
    {
      name: 'subheading',
      type: 'textarea',
      required: false,
      admin: {
        description:
          'Subtitle or description for the features section',
      },
    },
    {
      name: 'features',
      type: 'array',
      labels: {
        plural: 'Features',
        singular: 'Feature',
      },
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description:
              'Feature title that will be clickable',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          admin: {
            description: 'Brief description of the feature',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description:
              'Image that will be displayed when this feature is selected',
          },
        },
        {
          name: 'badge',
          type: 'text',
          required: false,
          admin: {
            description:
              'Optional badge text (e.g., "New", "Popular")',
          },
        },
      ],
    },
    {
      name: 'showCTA',
      type: 'checkbox',
      required: false,
      defaultValue: true,
      admin: {
        description:
          'Show call-to-action button below the subheading',
      },
    },
    {
      name: 'ctaText',
      type: 'text',
      required: false,
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
      required: false,
      defaultValue: '#',
      admin: {
        description: 'URL for the call-to-action button',
        condition: (_, siblingData) =>
          siblingData.showCTA !== false,
      },
    },
  ],
}

export const InteractiveFeatures = withBlockThumbnail(
  interactiveFeaturesConfig,
  'InteractiveFeatures',
)
