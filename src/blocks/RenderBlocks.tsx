import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'
import { AnimatedBlock } from '@/components/AnimatedBlock'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { HubSpotFormBlock } from '@/blocks/HubSpotForm/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { FeaturesGrid } from '@/blocks/FeaturesGrid/Component'
import { Testimonials } from '@/blocks/Testimonials/Component'
import { LogoCloud } from '@/blocks/LogoCloud/Component'
import { InteractiveBallsBlock } from '@/blocks/InteractiveBalls/Component'
import { ShapeFeaturesBlockComponent } from '@/blocks/ShapeFeatures/Component'

// Enhanced HR Components
import { HRFeatureShowcaseBlockComponent } from '@/blocks/HRFeatureShowcase/Component'
import { StatsDisplayBlockComponent } from '@/blocks/StatsDisplay/Component'
import { TestimonialsEnhancedBlockComponent } from '@/blocks/TestimonialsEnhanced/Component'
import { CallToActionEnhancedBlockComponent } from '@/blocks/CallToActionEnhanced/Component'
import { FeatureGridEnhancedBlockComponent } from '@/blocks/FeatureGridEnhanced/Component'
import { PricingEnhancedBlockComponent } from '@/blocks/PricingEnhanced/Component'
import { InteractiveFeaturesBlockComponent } from '@/blocks/InteractiveFeatures/Component'
import { SpacerBlockComponent } from '@/blocks/Spacer/Component'
import { InsuranceFeaturesBlockComponent } from '@/blocks/InsuranceFeatures/Component'
import { LandingPageContentBlockComponent } from '@/blocks/LandingPageContent/Component'

// Insurance Page Blocks
import { InsurancePartnersTickerBlockComponent } from '@/blocks/InsurancePartnersTicker/Component'
import { InsuranceBenefitsBlockComponent } from '@/blocks/InsuranceBenefits/Component'
import { InsuranceSolutionsTabsBlockComponent } from '@/blocks/InsuranceSolutionsTabs/Component'
import { InsuranceStepsBlockComponent } from '@/blocks/InsuranceSteps/Component'
import { InsuranceCaseStudyBlockComponent } from '@/blocks/InsuranceCaseStudy/Component'
import { InsuranceGoogleReviewsBlockComponent } from '@/blocks/InsuranceGoogleReviews/Component'
import { InsuranceContactFormBlockComponent } from '@/blocks/InsuranceContactForm/Component'
import { InsuranceFooterBlockComponent } from '@/blocks/InsuranceFooter/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  hubspotFormBlock: HubSpotFormBlock,
  mediaBlock: MediaBlock,
  featuresGrid: FeaturesGrid,
  testimonials: Testimonials,
  logoCloud: LogoCloud,
  interactiveBalls: InteractiveBallsBlock,
  shapeFeatures: ShapeFeaturesBlockComponent,
  // Enhanced HR Components
  hrFeatureShowcase: HRFeatureShowcaseBlockComponent,
  statsDisplay: StatsDisplayBlockComponent,
  testimonialsEnhanced: TestimonialsEnhancedBlockComponent,
  ctaEnhanced: CallToActionEnhancedBlockComponent,
  featureGridEnhanced: FeatureGridEnhancedBlockComponent,
  pricingEnhanced: PricingEnhancedBlockComponent,
  interactiveFeatures: InteractiveFeaturesBlockComponent,
  spacer: SpacerBlockComponent,
  insuranceFeaturesBlock: InsuranceFeaturesBlockComponent,
  landingPageContent: LandingPageContentBlockComponent,
  // Insurance Page Blocks
  insurancePartnersTicker: InsurancePartnersTickerBlockComponent,
  insuranceBenefits: InsuranceBenefitsBlockComponent,
  insuranceSolutionsTabs: InsuranceSolutionsTabsBlockComponent,
  insuranceSteps: InsuranceStepsBlockComponent,
  insuranceCaseStudy: InsuranceCaseStudyBlockComponent,
  insuranceGoogleReviews: InsuranceGoogleReviewsBlockComponent,
  insuranceContactForm: InsuranceContactFormBlockComponent,
  insuranceFooter: InsuranceFooterBlockComponent,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks =
    blocks && Array.isArray(blocks) && blocks.length > 0

  // Check if this page has insurance blocks (for gradient overlays)
  const hasInsuranceBlocks = hasBlocks && blocks.some(
    (block) => block.blockType?.startsWith('insurance') && block.blockType !== 'insuranceFeaturesBlock'
  )

  if (hasBlocks) {
    return (
      <Fragment>
        {/* Insurance page gradient overlays */}
        {hasInsuranceBlocks && (
          <>
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                background: 'linear-gradient(180deg, rgba(69,203,239,0.07) 0%, transparent 100%)',
                pointerEvents: 'none',
                zIndex: 9998,
              }}
            />
            <div
              style={{
                position: 'relative',
                marginTop: '-50vh',
                width: '100%',
                height: '50vh',
                background: 'linear-gradient(0deg, rgba(69,203,239,0.07) 0%, transparent 100%)',
                pointerEvents: 'none',
                zIndex: 9998,
              }}
            />
          </>
        )}
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              // Special handling for LogoCloud to remove default padding
              const isLogoCloud = blockType === 'logoCloud'
              // Insurance blocks have their own padding/spacing
              const isInsuranceBlock = blockType.startsWith('insurance') && blockType !== 'insuranceFeaturesBlock'
              const containerClassName = isLogoCloud || isInsuranceBlock
                ? ''
                : 'my-16'

              // Skip animation for InteractiveFeatures and insurance blocks
              const isInteractiveFeatures =
                blockType === 'interactiveFeatures'

              if (isInteractiveFeatures || isInsuranceBlock) {
                return (
                  <div
                    className={containerClassName}
                    key={index}
                  >
                    <Block
                      {...block}
                      disableInnerContainer
                    />
                  </div>
                )
              }

              return (
                <AnimatedBlock
                  key={index}
                  delay={index * 100}
                  className={containerClassName}
                >
                  <Block {...block} disableInnerContainer />
                </AnimatedBlock>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
