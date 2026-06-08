import type { Block } from 'payload'
import { blockHeaderFields } from '@/fields/blockHeader'
import { withBlockThumbnail } from '@/utilities/blockThumbnail'

const logoCloudConfig: Block = {
  slug: 'logoCloud',
  interfaceName: 'LogoCloudBlock',
  labels: {
    singular: 'Logo Cloud',
    plural: 'Logo Clouds',
  },
  fields: [
    ...blockHeaderFields,
    {
      name: 'direction',
      type: 'select',
      defaultValue: 'left',
      options: [
        {
          label: 'Left to Right',
          value: 'left',
        },
        {
          label: 'Right to Left',
          value: 'right',
        },
      ],
    },
    {
      name: 'logos',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}

export const LogoCloud = withBlockThumbnail(logoCloudConfig, 'LogoCloud')
