import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { HubSpotFormBlock } from '../../blocks/HubSpotForm/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { hero } from '@/heros/config'
import { FeaturesGrid as FeaturesGridBlock } from '@/blocks/FeaturesGrid/config'
import { Testimonials as TestimonialsBlock } from '@/blocks/Testimonials/config'
import { LogoCloud as LogoCloudBlock } from '@/blocks/LogoCloud/config'
import { InteractiveBallsBlock } from '@/blocks/InteractiveBalls/config'
import { ShapeFeaturesBlock } from '@/blocks/ShapeFeatures/config'

// Enhanced HR Blocks
import { HRFeatureShowcase } from '@/blocks/HRFeatureShowcase/config'
import { StatsDisplay } from '@/blocks/StatsDisplay/config'
import { TestimonialsEnhanced } from '@/blocks/TestimonialsEnhanced/config'
import { CallToActionEnhanced } from '@/blocks/CallToActionEnhanced/config'
import { FeatureGridEnhanced } from '@/blocks/FeatureGridEnhanced/config'
import { PricingEnhanced } from '@/blocks/PricingEnhanced/config'
import { InteractiveFeatures } from '@/blocks/InteractiveFeatures/config'
import { Spacer } from '@/blocks/Spacer/config'
import { InsuranceFeatures } from '@/blocks/InsuranceFeatures/config'
import { LandingPageContent } from '@/blocks/LandingPageContent/config'

// Insurance Page Blocks
import { InsurancePartnersTicker } from '@/blocks/InsurancePartnersTicker/config'
import { InsuranceBenefits } from '@/blocks/InsuranceBenefits/config'
import { InsuranceSolutionsTabs } from '@/blocks/InsuranceSolutionsTabs/config'
import { InsuranceSteps } from '@/blocks/InsuranceSteps/config'
import { InsuranceCaseStudy } from '@/blocks/InsuranceCaseStudy/config'
import { InsuranceGoogleReviews } from '@/blocks/InsuranceGoogleReviews/config'
import { InsuranceContactForm } from '@/blocks/InsuranceContactForm/config'
import { InsuranceFooter } from '@/blocks/InsuranceFooter/config'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import {
  revalidateDelete,
  revalidatePage,
} from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug:
            typeof data?.slug === 'string' ? data.slug : '',
          collection: 'pages',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug:
          typeof data?.slug === 'string' ? data.slug : '',
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                CallToAction,
                Content,
                MediaBlock,
                Archive,
                FormBlock,
                HubSpotFormBlock,
                FeaturesGridBlock,
                TestimonialsBlock,
                LogoCloudBlock,
                InteractiveBallsBlock,
                ShapeFeaturesBlock,
                // Enhanced HR Blocks
                HRFeatureShowcase,
                StatsDisplay,
                TestimonialsEnhanced,
                CallToActionEnhanced,
                FeatureGridEnhanced,
                PricingEnhanced,
                InteractiveFeatures,
                Spacer,
                InsuranceFeatures,
                LandingPageContent,
                // Insurance Page Blocks
                InsurancePartnersTicker,
                InsuranceBenefits,
                InsuranceSolutionsTabs,
                InsuranceSteps,
                InsuranceCaseStudy,
                InsuranceGoogleReviews,
                InsuranceContactForm,
                InsuranceFooter,
              ],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
