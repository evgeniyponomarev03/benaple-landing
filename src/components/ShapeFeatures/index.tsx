'use client'
import React from 'react'
import { cn } from '@/utilities/ui'
import type { Media as MediaType } from '@/payload-types'

// Types
export type TextColor =
  | 'white'
  | 'lightblue'
  | 'darkblue'
  | 'custom'

export type Variant = 'primary' | 'secondary' | 'custom'
export type CornerStyle = 'auto' | 'standard' | 'asymmetric'

export interface ShapeFeaturesProps {
  title: string
  subtitle?: string
  variant?: Variant
  customGradient?: string
  cornerStyle?: CornerStyle
  backgroundImage?: string | MediaType
  className?: string
  children?: React.ReactNode
  contentClassName?: string
  textColor?: TextColor
  customTextColor?: string
}

// Constants
const GRADIENT_CLASSES: Record<Variant, string> = {
  primary: 'bg-brand-primary',
  secondary: 'bg-brand-secondary',
  custom: 'bg-gradient-to-br from-gray-800 to-gray-900',
}

const TEXT_COLOR_MAP: Record<
  Exclude<TextColor, 'custom'>,
  string
> = {
  white: 'text-white',
  lightblue: 'text-brand-secondary',
  darkblue: 'text-brand-text',
}

const DEFAULT_TEXT_COLORS: Record<Variant, string> = {
  primary: 'text-white',
  secondary: 'text-white',
  custom: 'text-white',
}

// Utility Functions
const getBackgroundImageUrl = (
  backgroundImage?: string | MediaType,
): string | null => {
  if (!backgroundImage) return null

  if (typeof backgroundImage === 'string') {
    return backgroundImage
  }

  if (
    typeof backgroundImage === 'object' &&
    backgroundImage.url
  ) {
    return backgroundImage.url
  }

  return null
}

const getTextColorClasses = (
  textColor?: TextColor,
  customTextColor?: string,
  variant: Variant = 'primary',
): string => {
  if (textColor === 'custom' && customTextColor) {
    return '' // Will use inline style for custom color
  }

  if (textColor && textColor !== 'custom') {
    return TEXT_COLOR_MAP[textColor]
  }

  return DEFAULT_TEXT_COLORS[variant]
}

const getCornerClasses = (
  cornerStyle: CornerStyle,
  variant: Variant,
): string => {
  if (cornerStyle === 'standard') {
    return 'rounded-2xl'
  }
  if (cornerStyle === 'asymmetric') {
    return 'rounded-tl-[4rem] rounded-tr-2xl rounded-bl-2xl rounded-br-2xl'
  }
  // Auto mode - based on variant
  return variant === 'primary'
    ? 'rounded-2xl'
    : 'rounded-bl-[4em]'
}

const getGradientClasses = (
  variant: Variant,
  customGradient?: string,
): string => {
  if (variant === 'custom' && customGradient) {
    return '' // Will use inline style
  }
  return GRADIENT_CLASSES[variant]
}

export const ShapeFeatures: React.FC<
  ShapeFeaturesProps
> = ({
  title,
  subtitle,
  variant = 'primary',
  customGradient,
  cornerStyle = 'auto',
  backgroundImage,
  className,
  children,
  contentClassName,
  textColor,
  customTextColor,
}) => {
  const backgroundImageUrl =
    getBackgroundImageUrl(backgroundImage)
  const textColorClasses = getTextColorClasses(
    textColor,
    customTextColor,
    variant,
  )
  const cornerClasses = getCornerClasses(
    cornerStyle,
    variant,
  )
  const gradientClasses = getGradientClasses(
    variant,
    customGradient,
  )

  // Create combined style object
  const combinedStyle = {
    ...(variant === 'custom' && customGradient
      ? { background: customGradient }
      : {}),
    ...(backgroundImageUrl
      ? {
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundPosition: 'bottom right',
          backgroundRepeat: 'no-repeat',
        }
      : {}),
    ...(textColor === 'custom' && customTextColor
      ? { color: customTextColor }
      : {}),
  }

  const backgroundSizeClasses = backgroundImageUrl
    ? 'bg-contain'
    : ''

  return (
    <div
      className={cn(
        'relative flex min-h-[160px] flex-col justify-between overflow-hidden p-8 md:min-h-[300px]',
        cornerClasses,
        gradientClasses,
        textColorClasses,
        backgroundSizeClasses,
        className,
      )}
      style={combinedStyle}
    >
      <div
        className={cn(
          'relative z-10 flex flex-col',
          contentClassName,
        )}
      >
        <div className="flex-1">
          <h3 className="mb-4 w-[12ch] text-3xl font-semibold leading-tight md:text-4xl">
            {title}
          </h3>
          {subtitle && (
            <p className="text-lg leading-relaxed opacity-90 md:text-xl">
              {subtitle}
            </p>
          )}
        </div>
        {children && <div className="mt-4">{children}</div>}
      </div>
    </div>
  )
}
