import type { Block } from 'payload'

export const InsurancePartnersTicker: Block = {
  slug: 'insurancePartnersTicker',
  interfaceName: 'InsurancePartnersTickerBlock',
  labels: {
    singular: 'Insurance Partners Ticker',
    plural: 'Insurance Partners Tickers',
  },
  fields: [
    {
      name: 'pillText',
      type: 'text',
      label: 'Pill Text',
      defaultValue: 'Our trusted partners',
    },
    {
      name: 'headline',
      type: 'text',
      label: 'Headline',
      defaultValue: 'Working with 30+ leading insurance providers',
    },
    {
      name: 'highlightedWords',
      type: 'text',
      label: 'Highlighted Words (comma-separated)',
      defaultValue: '30+,leading insurance',
      admin: {
        description: 'Words to highlight in accent color, separated by commas',
      },
    },
    {
      name: 'row1Logos',
      type: 'array',
      label: 'Row 1 Logos',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
          defaultValue: 'Insurance partner',
        },
      ],
    },
    {
      name: 'row2Logos',
      type: 'array',
      label: 'Row 2 Logos',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
          defaultValue: 'Insurance partner',
        },
      ],
    },
  ],
}
