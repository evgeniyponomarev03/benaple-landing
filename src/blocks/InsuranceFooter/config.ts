import type { Block } from 'payload'

export const InsuranceFooter: Block = {
  slug: 'insuranceFooter',
  interfaceName: 'InsuranceFooterBlock',
  labels: {
    singular: 'Insurance Footer',
    plural: 'Insurance Footers',
  },
  fields: [
    {
      name: 'phone',
      type: 'text',
      defaultValue: '+971 (0) 4567 4500',
    },
    {
      name: 'email',
      type: 'text',
      defaultValue: 'info@beneple.com',
    },
    {
      name: 'address',
      type: 'text',
      defaultValue: '16th Floor, Ubora Tower, Business Bay, Dubai, UAE',
    },
    {
      name: 'categories',
      type: 'array',
      label: 'Solution Categories',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'links',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              defaultValue: '#',
            },
          ],
        },
      ],
    },
  ],
}
