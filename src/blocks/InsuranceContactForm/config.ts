import type { Block } from 'payload'

export const InsuranceContactForm: Block = {
  slug: 'insuranceContactForm',
  interfaceName: 'InsuranceContactFormBlock',
  labels: {
    singular: 'Insurance Contact Form',
    plural: 'Insurance Contact Forms',
  },
  fields: [
    {
      name: 'pillText',
      type: 'text',
      label: 'Pill Text',
      defaultValue: 'Contact us',
    },
    {
      name: 'headline',
      type: 'text',
      label: 'Headline',
      defaultValue: 'Get a tailored insurance quote',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
      defaultValue: 'Fill in the form and our specialists will get back to you within 24 hours.',
    },
    {
      name: 'hubspotPortalId',
      type: 'text',
      label: 'HubSpot Portal ID',
      defaultValue: '6136505',
    },
    {
      name: 'hubspotFormId',
      type: 'text',
      label: 'HubSpot Form ID',
    },
    {
      name: 'insuranceTypes',
      type: 'array',
      label: 'Insurance Type Checkboxes',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
