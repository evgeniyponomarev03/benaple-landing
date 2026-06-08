import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { withBlockThumbnail } from '@/utilities/blockThumbnail'

const hubSpotFormBlockConfig: Block = {
  slug: 'hubspotFormBlock',
  interfaceName: 'HubSpotFormBlock',
  fields: [
    {
      name: 'portalId',
      type: 'text',
      required: true,
      defaultValue: '6136505',
      label: 'HubSpot Portal ID',
    },
    {
      name: 'formId',
      type: 'text',
      required: true,
      defaultValue: '730dbe39-bef6-45e1-8788-e4dee7d7f916',
      label: 'HubSpot Form ID',
    },
    {
      name: 'region',
      type: 'text',
      defaultValue: 'na1',
      label: 'HubSpot Region',
    },
    {
      name: 'customStyling',
      type: 'group',
      label: 'Custom Styling',
      admin: {
        condition: () => true,
      },
      fields: [
        {
          name: 'formClassName',
          type: 'text',
          label: 'Additional CSS Classes',
          admin: {
            description: 'Add custom CSS classes to the form container',
          },
        },
        {
          name: 'customCSS',
          type: 'textarea',
          label: 'Custom CSS',
          admin: {
            description: 'Add custom CSS styles for the form',
            rows: 5,
          },
        },
        {
          name: 'loadingText',
          type: 'text',
          label: 'Loading Text',
          admin: {
            description: 'Text shown while form is loading',
          },
        },
      ],
    },
    {
      name: 'enableIntro',
      type: 'checkbox',
      label: 'Enable Intro Content',
    },
    {
      name: 'introContent',
      type: 'richText',
      admin: {
        condition: (_, { enableIntro }) => Boolean(enableIntro),
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Intro Content',
    },
  ],
  graphQL: {
    singularName: 'HubSpotFormBlock',
  },
  labels: {
    plural: 'HubSpot Form Blocks',
    singular: 'HubSpot Form Block',
  },
}

export const HubSpotFormBlock = withBlockThumbnail(hubSpotFormBlockConfig, 'HubSpotForm')