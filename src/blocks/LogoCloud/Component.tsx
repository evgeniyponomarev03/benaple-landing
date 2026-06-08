'use client'
import React from 'react'

import type { LogoCloudBlock as LogoCloudBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import {
  BlockHeader,
  normalizeBlockHeaderProps,
} from '@/components/BlockHeader'

export const LogoCloud: React.FC<LogoCloudBlockProps> = ({
  headline,
  subline,
  logos,
  direction = 'left',
  ...blockData
}) => {
  const hasLogos = Array.isArray(logos) && logos.length > 0

  // Create multiple copies of logos for seamless infinite scroll
  const createLogoElement = (
    logo: { image?: any },
    originalIndex: number,
    copyIndex: number,
  ) => {
    if (typeof logo !== 'object') return null
    const { image } = logo
    const uniqueKey = `${originalIndex}-${copyIndex}`

    return (
      <div
        key={uniqueKey}
        className="flex h-20 flex-shrink-0 items-center justify-center rounded-lg p-4"
        style={{
          minHeight: '40px',
          minWidth: '36px',
        }}
      >
        {image && typeof image === 'object' ? (
          <div className="relative flex h-full w-full items-center justify-center">
            <Media
              resource={image}
              htmlElement="div"
              className="h-32 w-32 object-contain transition-opacity duration-300"
              imgClassName="transition-all duration-300 object-contain w-[8em] h-full object-center rounded-lg"
              priority={
                originalIndex < 6 && copyIndex === 0
              } // Only prioritize first copy of first 6 logos
              loading={
                originalIndex < 6 && copyIndex === 0
                  ? 'eager'
                  : 'lazy'
              }
            />
          </div>
        ) : (
          <div className="flex h-32 w-32 animate-pulse items-center justify-center rounded bg-gray-100" />
        )}
      </div>
    )
  }

  const headerProps = normalizeBlockHeaderProps({
    headline,
    subline,
    ...blockData,
  })

  // Determine animation and transform based on direction
  const animationName =
    direction === 'right'
      ? 'scroll-right-triple'
      : 'scroll-left-triple'
  const transform =
    direction === 'right'
      ? 'translateX(-100%)'
      : 'translateX(0)'

  return (
    <section className="-my-8 py-12">
      <BlockHeader
        {...headerProps}
        size="sm"
        headlineClassName="text-sm uppercase tracking-wide text-muted-foreground"
      />
      {hasLogos && (
        <div className="relative w-full overflow-hidden">
          <div
            className="flex space-x-12 sm:space-x-16 md:space-x-24"
            style={{
              width: 'max-content',
              animation: `${animationName} 120s linear infinite`,
              animationPlayState: 'running',
              transform, // Start position based on direction
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.animationPlayState =
                'paused'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.animationPlayState =
                'running'
            }}
          >
            {/* Triple the logos for better coverage and seamless infinite scroll */}
            {/* First complete set */}
            {logos?.map((logo, i) =>
              createLogoElement(logo, i, 0),
            )}
            {/* Second complete set */}
            {logos?.map((logo, i) =>
              createLogoElement(logo, i, 1),
            )}
            {/* Third complete set for extra coverage */}
            {logos?.map((logo, i) =>
              createLogoElement(logo, i, 2),
            )}
          </div>
        </div>
      )}
    </section>
  )
}
