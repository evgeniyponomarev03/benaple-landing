'use client'
import React from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/utilities/ui'

export interface GridFeature {
  id: string
  title: string
  description: string | React.ReactNode
  icon?: React.ReactNode
  image?: string
  link?: {
    href: string
    text: string
  }
  badge?: string
  size?: 'small' | 'medium' | 'large' | 'wide' | 'tall'
}

export interface FeatureGridProps {
  features: GridFeature[]
  title?: string
  subtitle?: string
  layout?: 'masonry' | 'uniform' | 'mixed'
  columns?: 2 | 3 | 4
  gap?: 'sm' | 'md' | 'lg'
  className?: string
  cardClassName?: string
  variant?:
    | 'default'
    | 'minimal'
    | 'modern'
    | 'bordered'
    | 'compact'
  showImages?: boolean
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({
  features,
  title,
  subtitle,
  layout = 'uniform',
  columns = 3,
  gap = 'md',
  className,
  cardClassName,
  variant = 'default',
  showImages = true,
}) => {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }

  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  }

  const getCardSizeClasses = (size?: string) => {
    if (layout === 'uniform') return ''

    switch (size) {
      case 'large':
        return 'md:col-span-2 md:row-span-2'
      case 'wide':
        return 'md:col-span-2'
      case 'tall':
        return 'md:row-span-2'
      case 'small':
        return ''
      case 'medium':
      default:
        return ''
    }
  }

  const getVariantClasses = () => {
    switch (variant) {
      case 'minimal':
        return 'bg-transparent hover:bg-gray-50'
      case 'modern':
        return 'bg-white rounded-2xl shadow-lg hover:shadow-xl border-0'
      case 'bordered':
        return 'bg-white border-2 border-gray-200 hover:border-brand-secondary'
      case 'compact':
        return 'bg-transparent hover:bg-gray-50 border-0'
      case 'default':
      default:
        return 'bg-white border border-gray-200 hover:shadow-lg'
    }
  }

  const renderFeature = (feature: GridFeature) => {
    // Compact variant: horizontal layout with icon on left, text on right
    if (variant === 'compact') {
      return (
        <div
          key={feature.id}
          className={cn(
            'group relative overflow-hidden rounded-lg p-4 transition-all duration-300 hover:scale-[1.01]',
            getVariantClasses(),
            cardClassName,
          )}
        >
          <div className="flex items-start gap-4">
            {/* Icon */}
            {feature.icon && (
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-brand-primary transition-colors group-hover:bg-blue-100">
                {feature.icon}
              </div>
            )}

            {/* Content */}
            <div className="min-w-0 flex-1">
              <h3 className="mb-1 text-base font-semibold leading-tight text-gray-900 md:text-lg">
                {feature.title}
              </h3>
              <div className="text-sm leading-relaxed text-gray-600 md:text-base [&>*]:m-0">
                {feature.description}
              </div>

              {/* Link */}
              {feature.link && (
                <div className="mt-2">
                  <a
                    href={feature.link.href}
                    className="inline-flex items-center gap-1 text-sm font-medium text-brand-primary transition-colors hover:text-brand-secondary"
                  >
                    {feature.link.text}
                  </a>
                </div>
              )}
            </div>

            {/* Badge */}
            {feature.badge && (
              <div className="flex-shrink-0 rounded-full bg-brand-primary px-2 py-1 text-xs font-semibold text-white">
                {feature.badge}
              </div>
            )}
          </div>
        </div>
      )
    }

    // Standard variants: vertical layout
    return (
      <div
        key={feature.id}
        className={cn(
          'group relative overflow-hidden rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]',
          getVariantClasses(),
          getCardSizeClasses(feature.size),
          cardClassName,
        )}
      >
        {/* Badge */}
        {feature.badge && (
          <div className="absolute right-4 top-4 rounded-full bg-brand-primary px-2 py-1 text-xs font-semibold text-white">
            {feature.badge}
          </div>
        )}

        {/* Image */}
        {feature.image && showImages && (
          <div className="mb-6 overflow-hidden rounded-lg">
            <img
              src={feature.image}
              alt={feature.title}
              className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        )}

        {/* Icon */}
        {feature.icon && (
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-brand-primary transition-colors group-hover:bg-blue-100">
            {feature.icon}
          </div>
        )}

        {/* Content */}
        <div
          className={cn(
            'space-y-4',
            feature.size === 'large' && 'space-y-6',
          )}
        >
          <h3
            className={cn(
              'font-semibold leading-tight text-gray-900',
              feature.size === 'large'
                ? 'text-2xl md:text-3xl'
                : 'text-lg md:text-xl',
            )}
          >
            {feature.title}
          </h3>

          <div
            className={cn(
              'leading-relaxed text-gray-600 [&>*]:m-0',
              feature.size === 'large'
                ? 'text-lg'
                : 'text-base',
            )}
          >
            {feature.description}
          </div>

          {/* Link */}
          {feature.link && (
            <div className="pt-2">
              <a
                href={feature.link.href}
                className="inline-flex items-center gap-2 font-medium text-brand-primary transition-colors hover:text-brand-secondary"
              >
                {feature.link.text}
              </a>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={cn('py-12', className)}>
      <div className="container">
        {/* Header */}
        {(title || subtitle) && (
          <div className="mb-12 text-left md:text-center">
            {title && (
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
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

        {/* Grid */}
        <div className="mx-auto max-w-7xl">
          {layout === 'masonry' ? (
            // CSS Grid Masonry (requires modern browser support)
            <div
              className={cn(
                'grid auto-rows-max',
                gridCols[columns],
                gapClasses[gap],
              )}
              style={
                {
                  gridTemplateRows: 'masonry',
                } as React.CSSProperties
              }
            >
              {features.map(renderFeature)}
            </div>
          ) : layout === 'mixed' ? (
            // Mixed layout with different sizes
            <div
              className={cn(
                'grid auto-rows-max grid-rows-[masonry]',
                gridCols[columns],
                gapClasses[gap],
              )}
            >
              {features.map(renderFeature)}
            </div>
          ) : (
            // Uniform grid
            <div
              className={cn(
                'grid',
                gridCols[columns],
                gapClasses[gap],
              )}
            >
              {features.map(renderFeature)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Predefined feature sets for HR applications
export const HRFeatureSets = {
  Core: [
    {
      id: 'employee-management',
      title: 'Employee Management',
      description:
        'Comprehensive employee database with profiles, contact information, and organizational hierarchy.',
      icon: (
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
      size: 'large' as const,
      badge: 'Core',
    },
    {
      id: 'time-tracking',
      title: 'Time & Attendance',
      description:
        'Track work hours, breaks, and attendance with automated reporting.',
      icon: (
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
    },
    {
      id: 'payroll',
      title: 'Payroll Management',
      description:
        'Automated payroll processing with tax calculations and compliance.',
      icon: (
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
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
          />
        </svg>
      ),
    },
    {
      id: 'leave-management',
      title: 'Leave Management',
      description:
        'Streamlined vacation and leave request system with approval workflows.',
      icon: (
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
    },
  ],

  Advanced: [
    {
      id: 'performance',
      title: 'Performance Management',
      description:
        'Goal setting, performance reviews, and 360-degree feedback systems.',
      icon: (
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
      size: 'wide' as const,
    },
    {
      id: 'recruitment',
      title: 'Recruitment & Onboarding',
      description:
        'End-to-end hiring process from job posting to employee onboarding.',
      icon: (
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
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 002 2h2a2 2 0 002-2V6m0 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2a2 2 0 012-2h4a2 2 0 012 2h2a2 2 0 012 2z"
          />
        </svg>
      ),
    },
    {
      id: 'analytics',
      title: 'HR Analytics',
      description:
        'Data-driven insights and reporting for better decision making.',
      icon: (
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
            d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ],
}
