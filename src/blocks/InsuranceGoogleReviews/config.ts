import type { Block } from 'payload'

export const InsuranceGoogleReviews: Block = {
  slug: 'insuranceGoogleReviews',
  interfaceName: 'InsuranceGoogleReviewsBlock',
  labels: {
    singular: 'Insurance Google Reviews',
    plural: 'Insurance Google Reviews',
  },
  fields: [
    {
      name: 'pillText',
      type: 'text',
      label: 'Pill Text',
      defaultValue: 'Testimonials',
    },
    {
      name: 'headline',
      type: 'text',
      label: 'Headline',
      defaultValue: 'Verified Google reviews from our clients',
    },
    {
      name: 'highlightedWords',
      type: 'text',
      label: 'Highlighted Words',
      defaultValue: 'Google reviews',
    },
    {
      name: 'googleRating',
      type: 'text',
      label: 'Google Rating',
      defaultValue: '5.0',
    },
    {
      name: 'reviewCount',
      type: 'text',
      label: 'Review Count',
      defaultValue: '420 reviews',
    },
    {
      name: 'writeReviewUrl',
      type: 'text',
      label: 'Write Review URL',
      defaultValue: '#',
    },
    {
      name: 'reviews',
      type: 'array',
      label: 'Reviews',
      minRows: 1,
      fields: [
        {
          name: 'initials',
          type: 'text',
          required: true,
        },
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'stars',
          type: 'number',
          defaultValue: 5,
          min: 1,
          max: 5,
        },
        {
          name: 'date',
          type: 'text',
        },
        {
          name: 'text',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
