'use client'

import React from 'react'
import ScrollStack, {
  ScrollStackItem,
} from '@/components/ScrollStack'

// Define the types locally based on the config
type InteractiveFeaturesBlockProps = {
  blockType?: 'interactiveFeatures'
  heading?: string
  subheading?: string
  features: Array<{
    title: string
    description: string
    image: any // Media type
    badge?: string
  }>
  showCTA?: boolean
  ctaText?: string
  ctaUrl?: string
}

import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

// ScrollStack Layout Component
const ScrollStackLayout: React.FC<{
  heading?: string
  subheading?: string
  features: any[]
  showCTA?: boolean
  ctaText?: string
  ctaUrl?: string
  className?: string
  disableInnerContainer?: boolean
}> = ({
  heading,
  subheading,
  features,
  showCTA,
  ctaText,
  ctaUrl,
  className,
  disableInnerContainer,
}) => {
  const hasFeatures =
    Array.isArray(features) && features.length > 0

  if (!hasFeatures) {
    return null
  }

  const containerClasses = disableInnerContainer
    ? ''
    : 'container'

  return (
    <section
      className={cn(
        containerClasses,
        className,
        'relative py-16 md:py-24',
      )}
    >
      {/* Header Section */}
      {(heading || subheading) && (
        <div className="mx-auto mb-12 max-w-[48rem] text-center">
          {heading && (
            <h2 className="mb-4 text-3xl font-semibold text-gray-900 md:text-4xl">
              {heading}
            </h2>
          )}
          {subheading && (
            <p className="text-lg leading-relaxed text-gray-600">
              {subheading}
            </p>
          )}
          {/* CTA Button */}
          {showCTA && ctaText && (
            <div className="mt-6">
              <a
                href={ctaUrl || '#'}
                className="inline-flex items-center rounded-full bg-brand-primary px-6 py-3 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-brand-primary/90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
              >
                {ctaText}
                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          )}
        </div>
      )}

      {/* ScrollStack Container */}
      <div className="mx-auto max-w-4xl">
        <ScrollStack
          itemDistance={120}
          itemScale={0.05}
          itemStackDistance={15}
          stackPosition="15%"
          scaleEndPosition="10%"
          baseScale={0.8}
          rotationAmount={0}
          blurAmount={0.5}
          useWindowScroll={true}
          useSmoothScroll={true}
          onStackComplete={() => {
            console.log('ScrollStack completed!')
          }}
        >
          {features.map((feature, index) => {
            if (typeof feature !== 'object') return null

            const { title, description, image, badge } =
              feature

            return (
              <ScrollStackItem
                key={index}
                itemClassName="bg-white/50 backdrop-blur-md border border-gray-200  shadow-lg"
              >
                <div className="flex h-full flex-col">
                  {/* Image Section */}
                  {image && (
                    <div
                      className="relative mb-6 w-full overflow-hidden rounded-xl"
                      style={{ aspectRatio: '16 / 9' }}
                    >
                      <Media
                        resource={image}
                        fill
                        imgClassName="object-contain "
                      />
                    </div>
                  )}

                  {/* Content Section */}
                  <div className="flex-1">
                    {/* Title with Badge */}
                    <div className="mb-4 flex items-center gap-3">
                      <h3 className="text-2xl font-semibold text-gray-900">
                        {title}
                      </h3>
                      {badge && (
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                          {badge}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="leading-relaxed text-gray-600">
                      {description}
                    </p>
                  </div>
                </div>
              </ScrollStackItem>
            )
          })}
        </ScrollStack>
      </div>
    </section>
  )
}

type Props = InteractiveFeaturesBlockProps & {
  className?: string
  disableInnerContainer?: boolean
}

export const InteractiveFeaturesBlockComponent: React.FC<
  Props
> = (props) => {
  const {
    heading,
    subheading,
    features,
    className,
    disableInnerContainer,
  } = props

  // Always render ScrollStack layout
  return (
    <ScrollStackLayout
      heading={heading}
      subheading={subheading}
      features={features}
      showCTA={props.showCTA}
      ctaText={props.ctaText}
      ctaUrl={props.ctaUrl}
      className={className}
      disableInnerContainer={disableInnerContainer}
    />
  )
}
