import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'

import { Media } from '../../components/Media'
import { CMSLink } from '@/components/Link'

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
  // Additional fields from the MediaBlock config that may not be in generated types yet
  headline?: string | null
  subline?: string | null
  removeBorder?: boolean | null
  enableShadow?: boolean | null
  // Legacy single CTA support (flexible type to handle various structures)
  cta?: any
  // New multiple CTAs support (flexible type to handle various structures)
  ctas?: any[]
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    staticImage,
    disableInnerContainer,
    removeBorder,
    enableShadow,
    headline,
    subline,
    cta,
    ctas,
  } = props

  let caption
  if (media && typeof media === 'object')
    caption = media.caption

  // Debug: Log all props to see what we're receiving
  console.log('MediaBlock Debug:', {
    headline,
    subline,
    removeBorder,
    enableShadow,
    cta,
    ctas,
    hasCtaLink: !!cta?.link,
    ctaKeys: cta ? Object.keys(cta) : 'no cta',
    ctasArray: ctas
      ? ctas.map((ctaItem: any, index: number) => ({
          index,
          cta: ctaItem?.cta || ctaItem,
          hasValidLink:
            !!(ctaItem?.cta || ctaItem) &&
            (ctaItem?.cta?.label || ctaItem?.label) &&
            (ctaItem?.cta?.url ||
              ctaItem?.url ||
              ctaItem?.cta?.reference ||
              ctaItem?.reference),
        }))
      : 'no ctas array',
    legacyCtaStructure:
      cta?.link || (cta && cta.type)
        ? {
            type: (cta.link || cta).type,
            label: (cta.link || cta).label,
            url: (cta.link || cta).url,
            reference: (cta.link || cta).reference,
            newTab: (cta.link || cta).newTab,
            appearance: (cta.link || cta).appearance,
            hasRequiredFields: !!(
              (cta.link || cta).label &&
              ((cta.link || cta).url ||
                (cta.link || cta).reference)
            ),
          }
        : 'no valid legacy cta data',
  })

  return (
    <div
      className={cn(
        '',
        {
          container: enableGutter,
        },
        className,
      )}
    >
      {(headline || subline) && (
        <div
          className={cn('mb-12 text-left md:text-center', {
            container: !disableInnerContainer,
          })}
        >
          {headline && (
            <h2 className="mb-4 text-3xl font-semibold text-gray-900 md:text-4xl">
              {headline}
            </h2>
          )}
          {subline && (
            <p className="mx-auto max-w-3xl text-lg text-gray-600 md:text-xl">
              {subline}
            </p>
          )}
          {/* Render multiple CTAs from the new ctas array */}
          {ctas && ctas.length > 0 && (
            <div
              className={cn(
                'mt-6 flex flex-col flex-wrap justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-4',
                {
                  container: !disableInnerContainer,
                },
              )}
            >
              {ctas.map((ctaItem: any, index: number) => {
                const ctaData = ctaItem?.cta || ctaItem
                const linkData = ctaData?.link || ctaData

                if (!linkData || !linkData.label)
                  return null

                return (
                  <CMSLink
                    key={index}
                    {...linkData}
                    appearance={
                      linkData.appearance || 'default'
                    }
                    size="lg"
                  />
                )
              })}
            </div>
          )}

          {/* Legacy: Render single CTA if ctas array doesn't exist but old cta does */}
          {!ctas && (cta?.link || (cta && cta.type)) && (
            <div
              className={cn(
                'mt-6 flex justify-center sm:mt-8',
                {
                  container: !disableInnerContainer,
                },
              )}
            >
              <CMSLink
                {...(cta.link || cta)}
                appearance={
                  cta.link?.appearance ||
                  cta.appearance ||
                  'default'
                }
                size="lg"
              />
            </div>
          )}
        </div>
      )}
      {(media || staticImage) && (
        <Media
          imgClassName={cn(
            'rounded-lg', // 8px rounded corners (Tailwind's rounded-lg = 8px)
            {
              'border border-border': !removeBorder,
              'shadow-sophisticated': enableShadow,
            },
            imgClassName,
          )}
          resource={media}
          src={staticImage}
        />
      )}
      {caption && (
        <div
          className={cn(
            'mt-6',
            {
              container: !disableInnerContainer,
            },
            captionClassName,
          )}
        >
          <RichText data={caption} enableGutter={false} />
        </div>
      )}
    </div>
  )
}
