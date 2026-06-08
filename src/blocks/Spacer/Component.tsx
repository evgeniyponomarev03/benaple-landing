'use client'

import React from 'react'
import { cn } from '@/utilities/ui'
import type { SpacerBlock as SpacerBlockProps } from '@/payload-types'

type Props = SpacerBlockProps & {
  className?: string
  disableInnerContainer?: boolean
}

export const SpacerBlockComponent: React.FC<Props> = (
  props,
) => {
  const {
    mobileHeight = '16',
    desktopHeight = '24',
    backgroundColor = 'transparent',
    showInAdmin = false,
    className,
  } = props

  // Convert height values to Tailwind classes
  const mobileSpacingClass = `h-${mobileHeight}`
  const desktopSpacingClass = `md:h-${desktopHeight}`

  // Background color classes
  const getBackgroundClass = (bgColor: string) => {
    switch (bgColor) {
      case 'white':
        return 'bg-white'
      case 'gray-50':
        return 'bg-gray-50'
      case 'gray-100':
        return 'bg-gray-100'
      case 'gray-200':
        return 'bg-gray-200'
      case 'brand-primary':
        return 'bg-brand-primary'
      case 'brand-secondary':
        return 'bg-brand-secondary'
      case 'transparent':
      default:
        return 'bg-transparent'
    }
  }

  const backgroundClass =
    getBackgroundClass(backgroundColor || '')

  // Admin preview indicator (only shown in admin, not on frontend)
  const adminIndicatorClass = showInAdmin
    ? 'relative after:content-["Spacer"] after:absolute after:inset-0 after:flex after:items-center after:justify-center after:text-xs after:text-gray-400 after:border after:border-dashed after:border-gray-300 after:bg-gray-50/50'
    : ''

  return (
    <div
      className={cn(
        'w-full',
        mobileSpacingClass,
        desktopSpacingClass,
        backgroundClass,
        adminIndicatorClass,
        className,
      )}
      role="presentation"
      aria-hidden="true"
    />
  )
}
