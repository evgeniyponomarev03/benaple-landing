import type { Block } from 'payload'
import { link } from '@/fields/link'
import { withBlockThumbnail } from '@/utilities/blockThumbnail'

const mediaBlockConfig: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  labels: {
    singular: 'Media Block',
    plural: 'Media Blocks',
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
      label: 'Headline',
      admin: {
        description:
          'Optional headline displayed above the media',
      },
    },
    {
      name: 'subline',
      type: 'textarea',
      label: 'Subline',
      admin: {
        description:
          'Optional description displayed below the headline',
      },
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'removeBorder',
      type: 'checkbox',
      label: 'Remove Border',
      defaultValue: false,
    },
    {
      name: 'enableShadow',
      type: 'checkbox',
      label: 'Enable Shadow',
      defaultValue: false,
      admin: {
        description:
          'Apply a sophisticated multi-layered shadow to the media element',
      },
    },
    {
      name: 'ctas',
      type: 'array',
      label: 'Call to Action Buttons',
      admin: {
        description:
          'Add one or more CTA buttons displayed below the media',
      },
      fields: [
        link({
          appearances: ['default', 'outline'],
          overrides: {
            name: 'cta',
            label: 'Call to Action',
            admin: {
              description:
                'Configure the CTA button link and appearance',
            },
          },
        }),
      ],
    },
  ],
}

export const MediaBlock = withBlockThumbnail(mediaBlockConfig, 'MediaBlock')
