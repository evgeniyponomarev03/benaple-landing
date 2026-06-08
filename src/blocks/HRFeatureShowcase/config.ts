import type { Block } from 'payload'
import { withBlockThumbnail } from '@/utilities/blockThumbnail'

const hrFeatureShowcaseConfig: Block = {
  slug: 'hrFeatureShowcase',
  interfaceName: 'HRFeatureShowcaseBlock',
  labels: {
    singular: 'HR Feature Showcase',
    plural: 'HR Feature Showcases',
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
      name: 'layout',
      type: 'select',
      label: 'Layout',
      defaultValue: 'grid',
      options: [
        {
          label: 'Grid',
          value: 'grid',
        },
        {
          label: 'List',
          value: 'list',
        },
      ],
    },
    {
      name: 'columns',
      type: 'select',
      label: 'Columns (Grid Layout)',
      defaultValue: 3,
      admin: {
        condition: (_, siblingData) =>
          siblingData.layout === 'grid',
      },
      options: [
        {
          label: '2 Columns',
          value: '2',
        },
        {
          label: '3 Columns',
          value: '3',
        },
        {
          label: '4 Columns',
          value: '4',
        },
      ],
    },
    {
      name: 'highlightColor',
      type: 'text',
      label: 'Highlight Gradient (CSS)',
      defaultValue:
        'bg-gradient-to-br from-blue-500 to-purple-600',
      admin: {
        description:
          'CSS gradient class for highlighted features',
      },
    },
    {
      name: 'features',
      type: 'array',
      label: 'Features',
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
          name: 'icon',
          type: 'select',
          label: 'Icon',
          defaultValue: 'users',
          options: [
            { label: 'Users', value: 'users' },
            { label: 'Clock', value: 'clock' },
            { label: 'Chart', value: 'chart' },
            { label: 'Shield', value: 'shield' },
            { label: 'Document', value: 'document' },
            { label: 'Calendar', value: 'calendar' },
          ],
        },
        {
          name: 'highlight',
          type: 'checkbox',
          label: 'Highlight this feature',
          defaultValue: false,
        },
      ],
    },
  ],
}

export const HRFeatureShowcase = withBlockThumbnail(hrFeatureShowcaseConfig, 'HRFeatureShowcase')




































