import type { Block } from 'payload'

export const InsuranceBenefits: Block = {
  slug: 'insuranceBenefits',
  interfaceName: 'InsuranceBenefitsBlock',
  labels: {
    singular: 'Insurance Benefits',
    plural: 'Insurance Benefits',
  },
  fields: [
    {
      name: 'pillText',
      type: 'text',
      label: 'Pill Text',
      defaultValue: 'Our benefits',
    },
    {
      name: 'headline',
      type: 'text',
      label: 'Headline',
      defaultValue: 'Local Expertise. International Standards. Real Wellbeing.',
    },
    {
      name: 'highlightedWords',
      type: 'text',
      label: 'Highlighted Words (comma-separated)',
      defaultValue: 'International Standards.',
    },
    {
      name: 'largeNumber',
      type: 'text',
      label: 'Large Decorative Number',
      defaultValue: '9',
    },
    {
      name: 'benefits',
      type: 'array',
      label: 'Benefit Cards',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'iconSvg',
          type: 'textarea',
          label: 'Icon SVG (inline)',
          admin: {
            description: 'Paste SVG markup for the icon',
          },
        },
      ],
    },
  ],
}
