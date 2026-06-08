import type { Block } from 'payload'
import { withBlockThumbnail } from '@/utilities/blockThumbnail'

const testimonialsEnhancedConfig: Block = {
  slug: 'testimonialsEnhanced',
  interfaceName: 'TestimonialsEnhancedBlock',
  labels: {
    singular: 'Enhanced Testimonials',
    plural: 'Enhanced Testimonials',
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
      name: 'columns',
      type: 'select',
      label: 'Columns',
      defaultValue: 3,
      options: [
        {
          label: '1 Column',
          value: '1',
        },
        {
          label: '2 Columns',
          value: '2',
        },
        {
          label: '3 Columns',
          value: '3',
        },
      ],
    },
    {
      name: 'variant',
      type: 'select',
      label: 'Style Variant',
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
          label: 'Featured',
          value: 'featured',
        },
      ],
    },
    {
      name: 'showQuotes',
      type: 'checkbox',
      label: 'Show Quotation Marks',
      defaultValue: true,
    },
    {
      name: 'testimonials',
      type: 'array',
      label: 'Testimonials',
      minRows: 1,
      fields: [
        {
          name: 'content',
          type: 'textarea',
          required: true,
          label: 'Testimonial Content',
        },
        {
          name: 'authorName',
          type: 'text',
          required: true,
          label: 'Author Name',
        },
        {
          name: 'authorRole',
          type: 'text',
          required: true,
          label: 'Author Role',
        },
        {
          name: 'authorCompany',
          type: 'text',
          required: true,
          label: 'Author Company',
        },
        {
          name: 'authorAvatar',
          type: 'upload',
          relationTo: 'media',
          label: 'Author Avatar',
        },
        {
          name: 'rating',
          type: 'select',
          label: 'Rating (Stars)',
          options: [
            { label: 'No Rating', value: '0' },
            { label: '1 Star', value: '1' },
            { label: '2 Stars', value: '2' },
            { label: '3 Stars', value: '3' },
            { label: '4 Stars', value: '4' },
            { label: '5 Stars', value: '5' },
          ],
        },
        {
          name: 'featured',
          type: 'checkbox',
          label: 'Featured Testimonial',
          defaultValue: false,
        },
      ],
    },
  ],
}

export const TestimonialsEnhanced = withBlockThumbnail(testimonialsEnhancedConfig, 'TestimonialsEnhanced')




































