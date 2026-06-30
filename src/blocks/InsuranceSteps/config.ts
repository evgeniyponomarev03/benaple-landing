import type { Block } from 'payload'

export const InsuranceSteps: Block = {
  slug: 'insuranceSteps',
  interfaceName: 'InsuranceStepsBlock',
  labels: {
    singular: 'Insurance Steps',
    plural: 'Insurance Steps',
  },
  fields: [
    {
      name: 'pillText',
      type: 'text',
      label: 'Pill Text',
      defaultValue: 'How it works',
    },
    {
      name: 'headline',
      type: 'text',
      label: 'Headline',
      defaultValue: '4 steps to start',
    },
    {
      name: 'highlightedWords',
      type: 'text',
      label: 'Highlighted Words',
      defaultValue: 'to start',
    },
    {
      name: 'steps',
      type: 'array',
      label: 'Steps',
      minRows: 1,
      fields: [
        {
          name: 'stepNumber',
          type: 'text',
          label: 'Step Number',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Step Image',
        },
      ],
    },
  ],
}
