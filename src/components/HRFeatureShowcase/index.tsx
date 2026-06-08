'use client'
import React from 'react'
import { cn } from '@/utilities/ui'

export interface HRFeature {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  highlight?: boolean
}

export interface HRFeatureShowcaseProps {
  title?: string
  subtitle?: string
  features: HRFeature[]
  layout?: 'grid' | 'list'
  columns?: 2 | 3 | 4
  className?: string
  cardClassName?: string
  highlightColor?: string
}

export const HRFeatureShowcase: React.FC<
  HRFeatureShowcaseProps
> = ({
  title,
  subtitle,
  features,
  layout = 'grid',
  columns = 3,
  className,
  cardClassName,
  highlightColor = 'bg-gradient-to-br from-brand-secondary to-brand-primary',
}) => {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <div className={cn('py-12', className)}>
      {/* Header */}
      {(title || subtitle) && (
        <div className="mb-12 text-left md:text-center">
          {title && (
            <h2 className="mb-4 text-3xl font-semibold text-gray-900 md:text-4xl">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mx-auto max-w-3xl text-lg text-gray-600 md:text-xl">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Features */}
      <div
        className={cn(
          layout === 'grid'
            ? `grid gap-6 ${gridCols[columns]}`
            : 'space-y-6',
          'mx-auto max-w-7xl',
        )}
      >
        {features.map((feature) => (
          <div
            key={feature.id}
            className={cn(
              'group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl sm:p-8',
              feature.highlight
                ? `${highlightColor} text-white`
                : 'border border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg',
              cardClassName,
            )}
          >
            {/* Background Pattern for highlighted cards */}
            {feature.highlight && (
              <div className="absolute inset-0 opacity-10">
                <div className="absolute right-0 top-0 h-32 w-32 -translate-y-16 translate-x-16 transform rounded-full bg-white" />
                <div className="absolute bottom-0 left-0 h-24 w-24 -translate-x-12 translate-y-12 transform rounded-full bg-white" />
              </div>
            )}

            <div className="relative z-10">
              {/* Icon */}
              <div
                className={cn(
                  'mb-6 flex h-12 w-12 items-center justify-center rounded-xl transition-colors',
                  feature.highlight
                    ? 'bg-white/20 text-white'
                    : 'bg-blue-50 text-brand-primary group-hover:bg-blue-100',
                )}
              >
                {feature.icon}
              </div>

              {/* Content */}
              <div>
                <h3
                  className={cn(
                    'mb-3 text-xl font-semibold',
                    feature.highlight
                      ? 'text-white'
                      : 'text-gray-900',
                  )}
                >
                  {feature.title}
                </h3>
                <p
                  className={cn(
                    'leading-relaxed',
                    feature.highlight
                      ? 'text-white/90'
                      : 'text-gray-600',
                  )}
                >
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Common HR feature icons (you can replace these with your preferred icon library)
export const HRIcons = {
  Users: () => (
    <svg
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
      />
    </svg>
  ),
  Clock: () => (
    <svg
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  Chart: () => (
    <svg
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
  ),
  Shield: () => (
    <svg
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  ),
  Document: () => (
    <svg
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  ),
  Calendar: () => (
    <svg
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  ),
}
