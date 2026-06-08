import type { Block } from 'payload'
import { defaultLexical } from '@/fields/defaultLexical'
import { withBlockThumbnail } from '@/utilities/blockThumbnail'

const landingPageContentConfig: Block = {
  slug: 'landingPageContent',
  interfaceName: 'LandingPageContentBlock',
  labels: {
    singular: 'Landing Page Content',
    plural: 'Landing Page Content Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Main Title',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle/Description',
    },
    {
      name: 'description',
      type: 'richText',
      editor: defaultLexical,
      label: 'Additional Description',
      admin: {
        description:
          'Optional additional content below the subtitle',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Right Side Image',
      required: true,
    },
    {
      name: 'features',
      type: 'array',
      label: 'Features with Checkmarks',
      minRows: 1,
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Feature Text',
          required: true,
        },
      ],
    },
    {
      name: 'bottomText',
      type: 'richText',
      editor: defaultLexical,
      label: 'Text Below Features',
      admin: {
        description:
          'Optional text that appears below the features list',
      },
    },
    {
      name: 'showCTA',
      type: 'checkbox',
      label: 'Show Call-to-Action Button',
      defaultValue: false,
    },
    {
      name: 'ctaText',
      type: 'text',
      label: 'CTA Button Text',
      defaultValue: 'Learn More',
      admin: {
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
        condition: (_, siblingData) =>
          siblingData.showCTA !== false,
      },
    },
    {
      name: 'backgroundColor',
      type: 'select',
      label: 'Background Color',
      defaultValue: 'white',
      options: [
        {
          label: 'White',
          value: 'white',
        },
        {
          label: 'Light Gray',
          value: 'gray',
        },
        {
          label: 'Brand Light',
          value: 'brand-light',
        },
      ],
    },
    {
      name: 'imagePosition',
      type: 'select',
      label: 'Image Position',
      defaultValue: 'right',
      options: [
        {
          label: 'Right Side',
          value: 'right',
        },
        {
          label: 'Left Side',
          value: 'left',
        },
      ],
    },
  ],
}

export const LandingPageContent = withBlockThumbnail(landingPageContentConfig, 'LandingPageContent')
