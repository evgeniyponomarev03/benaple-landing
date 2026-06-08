import type { Block } from 'payload'
import { blockHeaderFields } from '@/fields/blockHeader'
import { withBlockThumbnail } from '@/utilities/blockThumbnail'

const testimonialsConfig: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  labels: {
    singular: 'Testimonial Section',
    plural: 'Testimonial Sections',
  },
  fields: [
    ...blockHeaderFields,
    {
      name: 'testimonials',
      type: 'array',
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          required: true,
        },
        {
          name: 'authorName',
          type: 'text',
          required: true,
        },
        {
          name: 'authorRole',
          type: 'text',
        },
        {
          name: 'authorAvatar',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}

export const Testimonials = withBlockThumbnail(testimonialsConfig, 'Testimonials')
