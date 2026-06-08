import type { Block } from 'payload'
import { withBlockThumbnail } from '@/utilities/blockThumbnail'

const featuresGridConfig: Block = {
  slug: 'featuresGrid',
  interfaceName: 'FeaturesGridBlock',
  labels: {
    singular: 'Features Grid',
    plural: 'Features Grids',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: false,
    },
    {
      name: 'subheading',
      type: 'text',
      required: false,
    },
    {
      name: 'features',
      type: 'array',
      labels: {
        plural: 'Features',
        singular: 'Feature',
      },
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: false,
        },
      ],
    },
  ],
}

export const FeaturesGrid = withBlockThumbnail(featuresGridConfig, 'FeaturesGrid')
