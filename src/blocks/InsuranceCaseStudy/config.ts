import type { Block } from 'payload'

export const InsuranceCaseStudy: Block = {
  slug: 'insuranceCaseStudy',
  interfaceName: 'InsuranceCaseStudyBlock',
  labels: {
    singular: 'Insurance Case Study',
    plural: 'Insurance Case Studies',
  },
  fields: [
    {
      name: 'pillText',
      type: 'text',
      label: 'Pill Text',
      defaultValue: 'Case study',
    },
    {
      name: 'headline',
      type: 'text',
      label: 'Headline',
      defaultValue: 'Trusted by growing companies',
    },
    {
      name: 'highlightedWords',
      type: 'text',
      label: 'Highlighted Words',
      defaultValue: 'growing companies',
    },
    {
      name: 'slides',
      type: 'array',
      label: 'Case Study Slides',
      minRows: 1,
      fields: [
        {
          name: 'industry',
          type: 'text',
        },
        {
          name: 'companyLogo',
          type: 'upload',
          relationTo: 'media',
          label: 'Company Logo',
        },
        {
          name: 'quote',
          type: 'textarea',
          label: 'Quote (highlight text with *asterisks*)',
        },
        {
          name: 'reviewText',
          type: 'textarea',
        },
        {
          name: 'authorName',
          type: 'text',
        },
        {
          name: 'authorRole',
          type: 'text',
        },
        {
          name: 'metricText',
          type: 'text',
          label: 'Metric Text (use *asterisks* for accent)',
        },
        {
          name: 'metricIconSvg',
          type: 'textarea',
          label: 'Metric Icon SVG',
        },
        {
          name: 'chartSvg',
          type: 'textarea',
          label: 'Chart SVG markup',
        },
        {
          name: 'navLogoSrc',
          type: 'text',
          label: 'Navigation Logo Path',
          admin: {
            description: 'Path to logo shown in carousel dots',
          },
        },
      ],
    },
  ],
}
