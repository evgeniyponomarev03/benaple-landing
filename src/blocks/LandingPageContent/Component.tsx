import React from 'react'
import type { LandingPageContentBlock as LandingPageContentBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/utilities/ui'

// Checkmark Icon
const CheckmarkIcon = () => (
  <svg
    className="h-6 w-6"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" fill="#1E558E" />
    <path
      d="M9 12l2 2 4-4"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const LandingPageContentBlockComponent: React.FC<
  LandingPageContentBlockProps & {
    disableInnerContainer?: boolean
  }
> = ({
  title,
  subtitle,
  description,
  image,
  features = [],
  bottomText,
  showCTA = false,
  ctaText = 'Learn More',
  ctaUrl = '#',
  backgroundColor = 'white',
  imagePosition = 'right',
  disableInnerContainer,
}) => {
  // Get background color classes
  const getBackgroundClasses = () => {
    switch (backgroundColor) {
      case 'gray':
        return 'bg-gray-50'
      case 'brand-light':
        return 'bg-blue-50'
      case 'white':
      default:
        return ''
    }
  }

  // Get image URL
  const getImageUrl = () => {
    if (!image) return null
    if (typeof image === 'string') return image
    if (typeof image === 'object' && image && image.url)
      return image.url
    return null
  }

  const imageUrl = getImageUrl()
  const imageAlt =
    typeof image === 'object' && image && image.alt
      ? image.alt
      : title || 'Content image'

  // Content section
  const ContentSection = () => (
    <div className="flex flex-col justify-center space-y-6">
      {/* Title */}
      {title && (
        <h2 className="text-2xl font-bold leading-tight text-gray-900 md:text-3xl lg:text-4xl">
          {title}
        </h2>
      )}

      {/* Subtitle */}
      {subtitle && (
        <p className="text-lg text-gray-600 md:text-xl">
          {subtitle}
        </p>
      )}

      {/* Additional Description */}
      {description && (
        <div className="text-gray-600 [&>*]:m-0">
          <RichText
            data={description}
            enableGutter={false}
            enableProse={false}
            className="[&>*:not(a)]:!text-inherit [&_a:hover]:!text-[#37b0f0] [&_a]:!text-[#1e558e] [&_a]:!underline"
          />
        </div>
      )}

      {/* Features with Checkmarks */}
      {features && features.length > 0 && (
        <div className="space-y-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-4"
            >
              <div className="mt-0.5 flex-shrink-0">
                <CheckmarkIcon />
              </div>
              <span className="text-lg leading-relaxed text-gray-700">
                {feature.text}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Text */}
      {bottomText && (
        <div className="text-gray-600 [&>*]:m-0">
          <RichText
            data={bottomText}
            enableGutter={false}
            enableProse={false}
            className="[&>*:not(a)]:!text-inherit [&_a:hover]:!text-[#37b0f0] [&_a]:!text-[#1e558e] [&_a]:!underline"
          />
        </div>
      )}

      {/* CTA Button */}
      {showCTA && ctaText && (
        <div className="pt-4">
          <Button size="lg" className="gap-2" asChild>
            <a href={ctaUrl || '#'}>{ctaText}</a>
          </Button>
        </div>
      )}
    </div>
  )

  // Image section
  const ImageSection = () => {
    if (!imageUrl) return null

    return (
      <div className="flex items-start justify-center">
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="h-auto w-full max-w-lg object-cover"
          />
        </div>
      </div>
    )
  }

  return (
    <section
      className={cn(
        'py-16 md:py-24',
        getBackgroundClasses(),
      )}
    >
      <div
        className={cn(
          'mx-auto max-w-7xl px-6 sm:px-6 lg:px-8',
          !disableInnerContainer && 'container',
        )}
      >
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Mobile: Always show image first, Desktop: Respect imagePosition setting */}
          <div
            className={cn(
              'lg:contents', // On desktop, ignore this wrapper and use CSS Grid order
              imagePosition === 'left'
                ? 'lg:order-1'
                : 'lg:order-2',
            )}
          >
            <ImageSection />
          </div>
          <div
            className={cn(
              'lg:contents', // On desktop, ignore this wrapper and use CSS Grid order
              imagePosition === 'left'
                ? 'lg:order-2'
                : 'lg:order-1',
            )}
          >
            <ContentSection />
          </div>
        </div>
      </div>
    </section>
  )
}
