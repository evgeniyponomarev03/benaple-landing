import type { Block } from 'payload'

export const InsuranceSolutionsTabs: Block = {
  slug: 'insuranceSolutionsTabs',
  interfaceName: 'InsuranceSolutionsTabsBlock',
  labels: {
    singular: 'Insurance Solutions Tabs',
    plural: 'Insurance Solutions Tabs',
  },
  fields: [
    {
      name: 'pillText',
      type: 'text',
      label: 'Pill Text',
      defaultValue: 'Services',
    },
    {
      name: 'headline',
      type: 'text',
      label: 'Headline',
      defaultValue: 'Our insurance solutions',
    },
    {
      name: 'highlightedWords',
      type: 'text',
      label: 'Highlighted Words',
      defaultValue: 'solutions',
    },
    {
      name: 'tabs',
      type: 'array',
      label: 'Solution Tabs',
      minRows: 1,
      fields: [
        {
          name: 'tabLabel',
          type: 'text',
          required: true,
          label: 'Tab Label',
        },
        {
          name: 'categoryTitle',
          type: 'text',
          label: 'Category Title',
        },
        {
          name: 'categoryDescription',
          type: 'textarea',
          label: 'Category Description',
        },
        {
          name: 'categoryIconSvg',
          type: 'textarea',
          label: 'Category Icon SVG',
        },
        {
          name: 'solutions',
          type: 'array',
          label: 'Solutions',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'text',
            },
            {
              name: 'linkUrl',
              type: 'text',
              defaultValue: '#',
            },
          ],
        },
      ],
    },
  ],
}
