'use client'
import React from 'react'
import { cn } from '@/utilities/ui'

export interface BlockHeaderProps {
  headline?: string | null
  subline?: string | null
  headlineTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  alignment?: 'left' | 'center' | 'right'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  headlineClassName?: string
  sublineClassName?: string
  containerClassName?: string
  spacing?: 'tight' | 'normal' | 'loose'
}

const sizeClasses = {
  sm: {
    headline: 'text-2xl md:text-3xl',
    subline: 'text-base md:text-lg',
  },
  md: {
    headline: 'text-3xl md:text-4xl',
    subline: 'text-lg md:text-xl',
  },
  lg: {
    headline: 'text-4xl md:text-5xl',
    subline: 'text-xl md:text-2xl',
  },
  xl: {
    headline: 'text-5xl md:text-6xl',
    subline: 'text-2xl md:text-3xl',
  },
}

const alignmentClasses = {
  left: 'text-left',
  center: 'text-left md:text-center',
  right: 'text-left md:text-right',
}

const spacingClasses = {
  tight: 'mb-6',
  normal: 'mb-10',
  loose: 'mb-12',
}

export const BlockHeader: React.FC<BlockHeaderProps> = ({
  headline,
  subline,
  headlineTag: HeadlineTag = 'h2',
  alignment = 'center',
  size = 'md',
  className,
  headlineClassName,
  sublineClassName,
  containerClassName,
  spacing = 'normal',
}) => {
  // Don't render anything if neither headline nor subline is provided
  if (!headline && !subline) return null

  return (
    <div
      className={cn(
        'max-w-4xl',
        alignment === 'center' && 'md:mx-auto',
        spacingClasses[spacing],
        containerClassName,
      )}
    >
      <div
        className={cn(
          alignmentClasses[alignment],
          className,
        )}
      >
        {headline && (
          <HeadlineTag
            className={cn(
              'font-semibold leading-tight text-gray-900',
              sizeClasses[size].headline,
              subline && 'mb-4',
              headlineClassName,
            )}
          >
            {headline}
          </HeadlineTag>
        )}
        {subline && (
          <p
            className={cn(
              'leading-relaxed text-gray-600',
              sizeClasses[size].subline,
              sublineClassName,
            )}
          >
            {subline}
          </p>
        )}
      </div>
    </div>
  )
}

// Utility function to normalize different field names to consistent props
export const normalizeBlockHeaderProps = (
  blockData: Record<string, any>,
): Pick<BlockHeaderProps, 'headline' | 'subline'> => {
  // Try different field name patterns commonly used across blocks
  const headline =
    blockData.headline ||
    blockData.title ||
    blockData.heading ||
    blockData.name ||
    null

  const subline =
    blockData.subline ||
    blockData.subtitle ||
    blockData.subheading ||
    blockData.description ||
    null

  return { headline, subline }
}
