import type { Field } from 'payload'

export const blockHeaderFields: Field[] = [
  {
    name: 'headline',
    type: 'text',
    label: 'Headline',
    admin: {
      description: 'Main heading for this section',
    },
  },
  {
    name: 'subline',
    type: 'textarea',
    label: 'Subline',
    admin: {
      description:
        'Optional description or subtitle displayed below the headline',
    },
  },
]

// Alternative version with different field names for backward compatibility
export const blockHeaderFieldsLegacy = (
  headlineFieldName: string = 'heading',
  sublineFieldName: string = 'subheading',
): Field[] => [
  {
    name: headlineFieldName,
    type: 'text',
    label: 'Headline',
    admin: {
      description: 'Main heading for this section',
    },
  },
  {
    name: sublineFieldName,
    type: 'textarea',
    label: 'Subline',
    admin: {
      description:
        'Optional description or subtitle displayed below the headline',
    },
  },
]
































