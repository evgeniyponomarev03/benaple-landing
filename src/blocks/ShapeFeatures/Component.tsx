'use client'
import React from 'react'
import { cn } from '@/utilities/ui'
import {
  ShapeFeatures,
  type Variant,
  type CornerStyle,
  type TextColor,
} from '@/components/ShapeFeatures'

type Feature = {
  title: string
  subtitle?: string
  variant: Variant
  customGradient?: string
  cornerStyle?: CornerStyle
  backgroundImage?: string | any
  textColor?: TextColor
  customTextColor?: string
  size?:
    | 'full'
    | 'half'
    | 'oneThird'
    | 'twoThirds'
    | 'oneQuarter'
    | 'threeQuarters'
}

export type ShapeFeaturesBlockProps = {
  heading?: string
  features: Feature[]
  layout: 'grid' | 'row' | 'column'
}

export const ShapeFeaturesBlockComponent: React.FC<
  ShapeFeaturesBlockProps
> = ({ heading, features, layout = 'grid' }) => {
  const getSizeClasses = (
    size: Feature['size'] = 'half',
  ) => {
    // Using CSS Grid column spans for precise sizing
    switch (size) {
      case 'full':
        return 'col-span-12'
      case 'half':
        return 'col-span-12 lg:col-span-6'
      case 'oneThird':
        return 'col-span-12 lg:col-span-4'
      case 'twoThirds':
        return 'col-span-12 lg:col-span-8'
      case 'oneQuarter':
        return 'col-span-12 lg:col-span-3'
      case 'threeQuarters':
        return 'col-span-12 lg:col-span-9'
      default:
        return 'col-span-12 lg:col-span-6'
    }
  }

  const getLayoutClasses = () => {
    switch (layout) {
      case 'row':
        return 'flex flex-wrap gap-6'
      case 'column':
        return 'flex flex-col gap-6 items-center'
      default: // grid - use CSS Grid for precise sizing
        return 'grid grid-cols-12 gap-8'
    }
  }

  return (
    <section className="py-16">
      <div className="container">
        {heading && (
          <div className="mb-16">
            <h2 className="text-4xl font-semibold text-gray-900 md:text-5xl lg:text-6xl">
              {heading}
            </h2>
          </div>
        )}

        <div className={cn(getLayoutClasses())}>
          {features.map((feature, index) => (
            <div
              key={index}
              className={cn(
                getSizeClasses(feature.size),
                'min-h-[400px] md:min-h-[520px]',
              )}
            >
              <ShapeFeatures
                title={feature.title}
                subtitle={feature.subtitle}
                variant={feature.variant}
                customGradient={feature.customGradient}
                cornerStyle={feature.cornerStyle}
                backgroundImage={feature.backgroundImage}
                textColor={feature.textColor}
                customTextColor={feature.customTextColor}
                className="h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
