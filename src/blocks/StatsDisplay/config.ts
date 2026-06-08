import type { Block } from 'payload'
import { withBlockThumbnail } from '@/utilities/blockThumbnail'

const statsDisplayConfig: Block = {
  slug: 'statsDisplay',
  interfaceName: 'StatsDisplayBlock',
  labels: {
    singular: 'Statistics Display',
    plural: 'Statistics Displays',
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
          label: 'Horizontal',
          value: 'horizontal',
        },
        {
          label: 'Cards',
          value: 'cards',
        },
      ],
    },
    {
      name: 'columns',
      type: 'select',
      label: 'Columns (Grid Layout)',
      defaultValue: '4',
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
        {
          label: '5 Columns',
          value: '5',
        },
      ],
    },

    {
      name: 'animated',
      type: 'checkbox',
      label: 'Enable Count-up Animation',
      defaultValue: true,
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Statistics',
      minRows: 1,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'isTextValue',
          type: 'checkbox',
          label: 'Use text value instead of number',
          defaultValue: false,
        },
        {
          name: 'value',
          type: 'number',
          admin: {
            description: 'Numeric value for the statistic',
            condition: (_, siblingData) =>
              !siblingData.isTextValue,
          },
        },
        {
          name: 'textValue',
          type: 'text',
          label: 'Text Value',
          admin: {
            description:
              'Text value for the statistic (used when "Use text value" is enabled)',
            condition: (_, siblingData) =>
              siblingData.isTextValue,
          },
        },
        {
          name: 'prefix',
          type: 'text',
          label: 'Prefix (e.g., $, #)',
        },
        {
          name: 'suffix',
          type: 'text',
          label: 'Suffix (e.g., %, +, K)',
        },
        {
          name: 'description',
          type: 'text',
          label: 'Description',
        },
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          options: [
            { label: 'None', value: '' },
            { label: 'Employees', value: 'employees' },
            { label: 'Retention', value: 'retention' },
            {
              label: 'Productivity',
              value: 'productivity',
            },
            {
              label: 'Satisfaction',
              value: 'satisfaction',
            },
            { label: 'Growth', value: 'growth' },
          ],
        },
        {
          name: 'highlight',
          type: 'checkbox',
          label: 'Highlight this statistic',
          defaultValue: false,
        },
        {
          name: 'trendValue',
          type: 'number',
          label: 'Trend Value (%)',
          admin: {
            description:
              'Percentage change (positive or negative)',
          },
        },
        {
          name: 'trendPeriod',
          type: 'text',
          label: 'Trend Period',
          admin: {
            placeholder:
              'e.g., "vs last year", "this quarter"',
          },
        },
      ],
    },
  ],
}

export const StatsDisplay = withBlockThumbnail(statsDisplayConfig, 'StatsDisplay')
