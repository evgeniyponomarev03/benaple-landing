import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  UnorderedListFeature,
  OrderedListFeature,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'primaryText',
      type: 'text',
      label: 'Primary Text (e.g., "Tailored")',
      admin: {
        condition: (_, { type } = {}) => ['tailoredHero', 'benepleHome', 'benepleWithForm'].includes(type),
      },
      required: false,
    },
    {
      name: 'secondaryText',
      type: 'text',
      label: 'Secondary Text (e.g., "For You")',
      admin: {
        condition: (_, { type } = {}) => ['tailoredHero', 'benepleHome', 'benepleWithForm'].includes(type),
      },
      required: false,
    },
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'Beneple-Home',
          value: 'benepleHome',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
        {
          label: 'Tailored Hero',
          value: 'tailoredHero',
        },
        {
          label: 'Beneple with Form',
          value: 'benepleWithForm',
        },
        {
          label: 'Insurance Hero',
          value: 'insuranceHero',
        },
      ],
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            UnorderedListFeature(),
            OrderedListFeature(),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),

    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) =>
          ['highImpact', 'mediumImpact', 'benepleHome', 'tailoredHero'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
    {
      name: 'logoCloudHeading',
      type: 'text',
      label: 'Logo Cloud Heading',
      admin: {
        condition: (_, { type } = {}) => type === 'benepleHome',
      },
      required: false,
    },
    {
      name: 'showLogoCloud',
      type: 'checkbox',
      label: 'Show Logo Cloud',
      admin: {
        condition: (_, { type } = {}) => type === 'benepleHome',
      },
      defaultValue: true,
    },
    {
      name: 'logoCloudLogos',
      type: 'array',
      label: 'Logo Cloud Logos',
      admin: {
        condition: (_, { type } = {}) => type === 'benepleHome',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'formSettings',
      type: 'group',
      label: 'Form Settings',
      admin: {
        condition: (_, { type } = {}) => type === 'benepleWithForm',
      },
      fields: [
        {
          name: 'portalId',
          type: 'text',
          defaultValue: '6136505',
          label: 'HubSpot Portal ID',
          required: true,
        },
        {
          name: 'formId',
          type: 'text',
          defaultValue: '730dbe39-bef6-45e1-8788-e4dee7d7f916',
          label: 'HubSpot Form ID',
          required: true,
        },
        {
          name: 'region',
          type: 'text',
          defaultValue: 'na1',
          label: 'HubSpot Region',
        },
      ],
    },
  ],
  label: false,
}
