import type { Block } from 'payload'
import { withBlockThumbnail } from '@/utilities/blockThumbnail'

const pricingEnhancedConfig: Block = {
  slug: 'pricingEnhanced',
  interfaceName: 'PricingEnhancedBlock',
  labels: {
    singular: 'Enhanced Pricing',
    plural: 'Enhanced Pricing',
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
      name: 'currency',
      type: 'text',
      label: 'Currency Symbol',
      defaultValue: '$',
    },
    {
      name: 'variant',
      type: 'select',
      label: 'Display Style',
      defaultValue: 'cards',
      options: [
        {
          label: 'Cards',
          value: 'cards',
        },
        {
          label: 'Table',
          value: 'table',
        },
        {
          label: 'Minimal',
          value: 'minimal',
        },
        {
          label: 'Featured Split (2/3 featured + 1/3 stacked)',
          value: 'featured-split',
        },
      ],
    },
    {
      name: 'showFeatureComparison',
      type: 'checkbox',
      label: 'Show Feature Comparison',
      defaultValue: true,
    },
    {
      name: 'showCurrencyToggle',
      type: 'checkbox',
      label: 'Enable Currency Toggle',
      defaultValue: false,
    },
    {
      name: 'dirhamCurrency',
      type: 'text',
      label: 'Dirham Currency Text',
      defaultValue: 'AED',
      admin: {
        condition: (_, siblingData) =>
          siblingData.showCurrencyToggle,
        description:
          'Text to display for Dirham currency (e.g., AED)',
      },
    },
    {
      name: 'billingToggle',
      type: 'group',
      label: 'Billing Toggle',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Enable Monthly/Yearly Toggle',
          defaultValue: false,
        },
        {
          name: 'monthlyLabel',
          type: 'text',
          label: 'Monthly Label',
          defaultValue: 'Monthly',
          admin: {
            condition: (_, siblingData) =>
              siblingData.enabled,
          },
        },
        {
          name: 'yearlyLabel',
          type: 'text',
          label: 'Yearly Label',
          defaultValue: 'Yearly',
          admin: {
            condition: (_, siblingData) =>
              siblingData.enabled,
          },
        },
        {
          name: 'discount',
          type: 'text',
          label: 'Discount Text',
          defaultValue: 'Save 20%',
          admin: {
            condition: (_, siblingData) =>
              siblingData.enabled,
          },
        },
      ],
    },
    {
      name: 'plans',
      type: 'array',
      label: 'Pricing Plans',
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: false,
        },
        {
          name: 'price',
          type: 'group',
          label: 'Pricing',
          fields: [
            {
              name: 'amount',
              type: 'number',
              label: 'Monthly Price Amount',
              admin: {
                description:
                  'Leave empty for custom pricing like "Contact Us"',
              },
            },
            {
              name: 'customAmount',
              type: 'text',
              label: 'Custom Monthly Price Text',
              admin: {
                description:
                  'Use for "Contact Us", "Custom", etc.',
              },
            },
            {
              name: 'yearlyAmount',
              type: 'number',
              label: 'Yearly Price Amount',
              admin: {
                description:
                  'Optional: Set yearly pricing. Only shown when billing toggle is enabled.',
              },
            },
            {
              name: 'yearlyCustomAmount',
              type: 'text',
              label: 'Custom Yearly Price Text',
              admin: {
                description:
                  'Optional: Custom text for yearly pricing (e.g., "Contact Us")',
              },
            },
            {
              name: 'originalAmount',
              type: 'number',
              label: 'Original Price (for discounts)',
              admin: {
                description:
                  'Show crossed-out original price and calculate discount percentage',
                step: 0.01,
              },
            },
            {
              name: 'periodText',
              type: 'text',
              label: 'Period Text',
              defaultValue: '',
              admin: {
                description:
                  'Text to display after the price (e.g., "per user / month", "per seat / year", "one-time"). Leave empty to hide this text.',
                placeholder:
                  'e.g., per user / month, per seat / year, one-time',
              },
            },
          ],
        },
        {
          name: 'badge',
          type: 'text',
          label: 'Badge Text (e.g., "Most Popular")',
        },
        {
          name: 'highlight',
          type: 'checkbox',
          label: 'Highlight this plan',
          defaultValue: false,
        },
        {
          name: 'popular',
          type: 'checkbox',
          label: 'Mark as popular',
          defaultValue: false,
        },
        {
          name: 'disabled',
          type: 'checkbox',
          label: 'Disable this plan (Coming Soon)',
          defaultValue: false,
        },
        {
          name: 'showDirhamSymbol',
          type: 'checkbox',
          label: 'Show Dirham Symbol',
          defaultValue: false,
          admin: {
            description:
              'Show the Dirham symbol next to the price for this plan',
          },
        },
        {
          name: 'buttonText',
          type: 'text',
          label: 'Button Text',
          required: true,
          defaultValue: 'Get Started',
        },
        {
          name: 'buttonUrl',
          type: 'text',
          label: 'Button URL',
        },
        {
          name: 'buttonVariant',
          type: 'select',
          label: 'Button Style',
          defaultValue: 'primary',
          options: [
            {
              label: 'Primary',
              value: 'primary',
            },
            {
              label: 'Secondary',
              value: 'secondary',
            },
            {
              label: 'Outline',
              value: 'outline',
            },
          ],
        },
        {
          name: 'features',
          type: 'array',
          label: 'Features',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'included',
              type: 'select',
              label: 'Availability',
              required: true,
              defaultValue: 'true',
              options: [
                {
                  label: 'Included',
                  value: 'true',
                },
                {
                  label: 'Not Included',
                  value: 'false',
                },
                {
                  label: 'Partial',
                  value: 'partial',
                },
                {
                  label: 'Custom Text',
                  value: 'custom',
                },
              ],
            },
            {
              name: 'customText',
              type: 'text',
              label: 'Custom Text',
              admin: {
                condition: (_, siblingData) =>
                  siblingData.included === 'custom',
              },
            },
            {
              name: 'description',
              type: 'text',
              label: 'Feature Description',
            },
          ],
        },
      ],
    },
  ],
}

export const PricingEnhanced = withBlockThumbnail(pricingEnhancedConfig, 'PricingEnhanced')
