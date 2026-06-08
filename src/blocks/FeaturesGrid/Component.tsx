import React from 'react'

import type { FeaturesGridBlock as FeaturesGridBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

type Props = FeaturesGridBlockProps & {
  className?: string
}

export const FeaturesGrid: React.FC<Props> = (props) => {
  const { heading, subheading, features } = props

  const hasFeatures = Array.isArray(features) && features.length > 0

  return (
    <section className="container">
      {(heading || subheading) && (
        <div className="mb-10 text-left md:text-center max-w-[48rem] md:mx-auto">
          {heading && <h2 className="text-2xl md:text-3xl font-semibold">{heading}</h2>}
          {subheading && <p className="text-muted-foreground mt-2 leading-relaxed">{subheading}</p>}
        </div>
      )}

      {hasFeatures && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features?.map((feature, index) => {
            if (typeof feature !== 'object') return null
            const { title, description, icon } = feature
            return (
              <div
                key={index}
                className={cn(
                  'border border-border rounded-lg bg-card p-6 h-full flex flex-col gap-3',
                )}
              >
                {icon && typeof icon === 'object' && (
                  <div className="w-10 h-10">
                    <Media resource={icon} htmlElement="div" className="w-10 h-10" />
                  </div>
                )}
                {title && <h3 className="text-lg font-medium">{title}</h3>}
                {description && (
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                )}
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
