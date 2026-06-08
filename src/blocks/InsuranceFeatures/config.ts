import type { Block } from 'payload'
import { defaultLexical } from '@/fields/defaultLexical'
import { withBlockThumbnail } from '@/utilities/blockThumbnail'

const insuranceFeaturesConfig: Block = {
  slug: 'insuranceFeaturesBlock',
  interfaceName: 'InsuranceFeaturesBlock',
  labels: {
    singular: 'Insurance Features',
    plural: 'Insurance Features',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      defaultValue: 'Why Choose Beneple?',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Section Subtitle',
      defaultValue:
        'Your trusted insurance partner in the UAE with comprehensive coverage and personalized service.',
    },
    {
      name: 'layout',
      type: 'select',
      label: 'Layout Style',
      defaultValue: 'default',
      options: [
        {
          label: 'Default Grid',
          value: 'default',
        },
        {
          label: 'Pillars Grid',
          value: 'pillars',
        },
        {
          label: 'Sticky with Steps',
          value: 'sticky',
        },
        {
          label: 'Audience Tabs',
          value: 'tabs',
        },
        {
          label: 'KPI Band',
          value: 'kpi',
        },
      ],
    },
    {
      name: 'stickyImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Sticky Layout Image',
      admin: {
        description:
          'Image to display in the left sidebar when using sticky layout',
        condition: (_, siblingData) =>
          siblingData.layout === 'sticky',
      },
    },
    {
      name: 'showProofStrip',
      type: 'checkbox',
      label: 'Show Proof Strip',
      defaultValue: true,
      admin: {
        description:
          'Show the proof strip with license and provider information',
      },
    },
    {
      name: 'showCTA',
      type: 'checkbox',
      label: 'Show Call-to-Action Button',
      defaultValue: true,
      admin: {
        description:
          'Show call-to-action button below the features',
      },
    },
    {
      name: 'ctaText',
      type: 'text',
      label: 'CTA Button Text',
      defaultValue: 'Get a tailored quote',
      admin: {
        description: 'Text for the call-to-action button',
        condition: (_, siblingData) =>
          siblingData.showCTA !== false,
      },
    },
    {
      name: 'ctaUrl',
      type: 'text',
      label: 'CTA Button URL',
      defaultValue: '#',
      admin: {
        description: 'URL for the call-to-action button',
        condition: (_, siblingData) =>
          siblingData.showCTA !== false,
      },
    },
    {
      name: 'removePaddingLeftBox',
      type: 'checkbox',
      label: 'Remove Padding Left Box',
      defaultValue: false,
      admin: {
        description:
          'Remove padding from the left box (sticky layout only)',
        condition: (_, siblingData) =>
          siblingData.layout === 'sticky',
      },
    },
    {
      name: 'features',
      type: 'array',
      label: 'Features',
      minRows: 1,
      maxRows: 6,
      defaultValue: [
        {
          icon: 'shield',
          title: 'Licensed & compliant',
          text: 'FAEU Insurance Brokers LLC, License #92 – fully authorized to operate in the UAE with regulatory compliance.',
        },
        {
          icon: 'link',
          title: 'Market-wide access',
          text: 'Access to leading insurance providers ensuring competitive rates and comprehensive coverage options.',
        },
        {
          icon: 'file',
          title: 'Specialist advisors',
          text: 'Qualified British insurance specialists with deep local knowledge and a personalized service approach.',
        },
        {
          icon: 'chart',
          title: 'Wellness included',
          text: 'Complimentary wellness package with select group health plans to improve employee health.',
        },
      ],
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          required: true,
          options: [
            {
              label: 'Insurance Building',
              value: 'insurance-building',
            },
            {
              label: 'Insurance Corporate',
              value: 'insurance-corporate',
            },
            {
              label: 'Insurance Group',
              value: 'insurance-group',
            },
            {
              label: 'Insurance Medical',
              value: 'insurance-medical',
            },
            {
              label: 'Insurance Special',
              value: 'insurance-special',
            },
            { label: 'Arrow Right', value: 'arrow' },
            // Business category icons
            {
              label: 'Licensed & Compliant',
              value: 'licensed-compliant',
            },
            {
              label: 'Market-wide Access',
              value: 'market-access',
            },
            {
              label: 'Specialist Advisors',
              value: 'specialist-advisors',
            },
            {
              label: 'Wellbeing/Wellness',
              value: 'wellbeing',
            },
          ],
        },
        {
          name: 'title',
          type: 'text',
          label: 'Feature Title',
          required: true,
        },
        {
          name: 'text',
          type: 'richText',
          editor: defaultLexical,
          label: 'Feature Description',
          required: true,
        },
      ],
    },
    {
      name: 'proofStrip',
      type: 'array',
      label: 'Proof Strip Items',
      minRows: 1,
      maxRows: 4,
      admin: {
        description:
          'Items to display in the proof strip below features',
        condition: (_, siblingData) =>
          siblingData.showProofStrip !== false,
      },
      defaultValue: [
        {
          label: '92',
          description:
            'DHA license number & full regulatory compliance',
        },
        {
          label: '25+ providers',
          description: 'compared to get you better rates',
        },
        {
          label: 'Wellness perks',
          description: 'included with select group plans',
        },
      ],
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          label: 'Description',
          required: true,
        },
      ],
    },
    {
      name: 'audienceTabs',
      type: 'group',
      label: 'Audience Tabs Configuration',
      admin: {
        condition: (_, siblingData) =>
          siblingData.layout === 'tabs',
      },
      fields: [
        {
          name: 'employerLabel',
          type: 'text',
          label: 'Employers Tab Label',
          defaultValue: 'Employers',
        },
        {
          name: 'individualLabel',
          type: 'text',
          label: 'Individuals Tab Label',
          defaultValue: 'Individuals',
        },
        {
          name: 'commonFeatures',
          type: 'array',
          label: 'Common Features (Both Audiences)',
          fields: [
            {
              name: 'icon',
              type: 'select',
              label: 'Icon',
              options: [
                {
                  label: 'Insurance Building',
                  value: 'insurance-building',
                },
                {
                  label: 'Insurance Corporate',
                  value: 'insurance-corporate',
                },
                {
                  label: 'Insurance Group',
                  value: 'insurance-group',
                },
                {
                  label: 'Insurance Medical',
                  value: 'insurance-medical',
                },
                {
                  label: 'Insurance Special',
                  value: 'insurance-special',
                },
              ],
            },
            {
              name: 'title',
              type: 'text',
              label: 'Title',
            },
            {
              name: 'subtitle',
              type: 'richText',
              editor: defaultLexical,
              label: 'Subtitle',
            },
          ],
        },
        {
          name: 'employerFeatures',
          type: 'array',
          label: 'Employer-Specific Features',
          fields: [
            {
              name: 'icon',
              type: 'select',
              label: 'Icon',
              options: [
                {
                  label: 'Insurance Building',
                  value: 'insurance-building',
                },
                {
                  label: 'Insurance Corporate',
                  value: 'insurance-corporate',
                },
                {
                  label: 'Insurance Group',
                  value: 'insurance-group',
                },
                {
                  label: 'Insurance Medical',
                  value: 'insurance-medical',
                },
                {
                  label: 'Insurance Special',
                  value: 'insurance-special',
                },
              ],
            },
            {
              name: 'title',
              type: 'text',
              label: 'Title',
            },
            {
              name: 'subtitle',
              type: 'richText',
              editor: defaultLexical,
              label: 'Subtitle',
            },
          ],
        },
        {
          name: 'individualFeatures',
          type: 'array',
          label: 'Individual-Specific Features',
          fields: [
            {
              name: 'icon',
              type: 'select',
              label: 'Icon',
              options: [
                {
                  label: 'Insurance Building',
                  value: 'insurance-building',
                },
                {
                  label: 'Insurance Corporate',
                  value: 'insurance-corporate',
                },
                {
                  label: 'Insurance Group',
                  value: 'insurance-group',
                },
                {
                  label: 'Insurance Medical',
                  value: 'insurance-medical',
                },
                {
                  label: 'Insurance Special',
                  value: 'insurance-special',
                },
              ],
            },
            {
              name: 'title',
              type: 'text',
              label: 'Title',
            },
            {
              name: 'subtitle',
              type: 'richText',
              editor: defaultLexical,
              label: 'Subtitle',
            },
          ],
        },
      ],
    },
    {
      name: 'kpiBand',
      type: 'group',
      label: 'KPI Band Configuration',
      admin: {
        condition: (_, siblingData) =>
          siblingData.layout === 'kpi',
      },
      fields: [
        {
          name: 'kpis',
          type: 'array',
          label: 'KPI Items',
          minRows: 1,
          maxRows: 4,
          fields: [
            {
              name: 'key',
              type: 'text',
              label: 'KPI Value',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              label: 'KPI Label',
              required: true,
            },
          ],
        },
        {
          name: 'bullets',
          type: 'array',
          label: 'Bullet Points',
          minRows: 1,
          maxRows: 6,
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'Bullet Text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}

export const InsuranceFeatures = withBlockThumbnail(
  insuranceFeaturesConfig,
  'InsuranceFeatures',
)
