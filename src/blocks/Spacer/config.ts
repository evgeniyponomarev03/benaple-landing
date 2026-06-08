import type { Block } from 'payload'
import { withBlockThumbnail } from '@/utilities/blockThumbnail'

const spacerConfig: Block = {
  slug: 'spacer',
  interfaceName: 'SpacerBlock',
  labels: {
    singular: 'Spacer',
    plural: 'Spacers',
  },
  fields: [
    {
      name: 'mobileHeight',
      type: 'select',
      label: 'Mobile Height',
      defaultValue: '16',
      required: true,
      options: [
        { label: '8px', value: '2' },
        { label: '12px', value: '3' },
        { label: '16px', value: '4' },
        { label: '20px', value: '5' },
        { label: '24px', value: '6' },
        { label: '32px', value: '8' },
        { label: '40px', value: '10' },
        { label: '48px', value: '12' },
        { label: '64px', value: '16' },
        { label: '80px', value: '20' },
        { label: '96px', value: '24' },
        { label: '128px', value: '32' },
        { label: '160px', value: '40' },
        { label: '192px', value: '48' },
        { label: '256px', value: '64' },
        { label: '320px', value: '80' },
      ],
      admin: {
        description:
          'Spacing height for mobile devices (up to 768px)',
      },
    },
    {
      name: 'desktopHeight',
      type: 'select',
      label: 'Desktop Height',
      defaultValue: '24',
      required: true,
      options: [
        { label: '8px', value: '2' },
        { label: '12px', value: '3' },
        { label: '16px', value: '4' },
        { label: '20px', value: '5' },
        { label: '24px', value: '6' },
        { label: '32px', value: '8' },
        { label: '40px', value: '10' },
        { label: '48px', value: '12' },
        { label: '64px', value: '16' },
        { label: '80px', value: '20' },
        { label: '96px', value: '24' },
        { label: '128px', value: '32' },
        { label: '160px', value: '40' },
        { label: '192px', value: '48' },
        { label: '256px', value: '64' },
        { label: '320px', value: '80' },
        { label: '384px', value: '96' },
        { label: '448px', value: '112' },
        { label: '512px', value: '128' },
      ],
      admin: {
        description:
          'Spacing height for desktop devices (768px and above)',
      },
    },
    {
      name: 'backgroundColor',
      type: 'select',
      label: 'Background Color',
      defaultValue: 'transparent',
      required: false,
      options: [
        { label: 'Transparent', value: 'transparent' },
        { label: 'White', value: 'white' },
        { label: 'Gray 50', value: 'gray-50' },
        { label: 'Gray 100', value: 'gray-100' },
        { label: 'Gray 200', value: 'gray-200' },
        { label: 'Brand Primary', value: 'brand-primary' },
        {
          label: 'Brand Secondary',
          value: 'brand-secondary',
        },
      ],
      admin: {
        description:
          'Optional background color for the spacer area',
      },
    },
    {
      name: 'showInAdmin',
      type: 'checkbox',
      label: 'Show Visual Indicator in Preview',
      defaultValue: false,
      admin: {
        description:
          'Show a visual border in admin preview to make spacer visible (not shown on frontend)',
      },
    },
  ],
}

export const Spacer = withBlockThumbnail(spacerConfig, 'Spacer')
