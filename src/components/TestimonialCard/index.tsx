'use client'
import React from 'react'
import { cn } from '@/utilities/ui'

export interface TestimonialProps {
  id: string
  content: string
  author: {
    name: string
    role: string
    company: string
    avatar?: string
  }
  rating?: 1 | 2 | 3 | 4 | 5
  featured?: boolean
}

export interface TestimonialCardProps
  extends TestimonialProps {
  variant?: 'default' | 'minimal' | 'featured'
  className?: string
  showQuotes?: boolean
}

export const TestimonialCard: React.FC<
  TestimonialCardProps
> = ({
  content,
  author,
  rating,
  featured = false,
  variant = 'default',
  className,
  showQuotes = true,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'minimal':
        return 'border-none bg-transparent p-4 sm:p-6'
      case 'featured':
        return 'bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 p-6 sm:p-8'
      default:
        return ' border border-gray-200 p-4 sm:p-6'
    }
  }

  return (
    <div
      className={cn(
        'backdrop-blur-2 rounded-2xl border-gray-100 bg-white/30 transition-all duration-300 hover:shadow-lg',
        getVariantStyles(),
        featured && 'ring-2 ring-blue-500/20',
        className,
      )}
    >
      {/* Rating */}
      {rating && (
        <div className="mb-4 flex items-center gap-1">
          {Array.from({ length: 5 }, (_, i) => (
            <svg
              key={i}
              className={cn(
                'h-4 w-4',
                i < rating
                  ? 'fill-current text-yellow-400'
                  : 'text-gray-300 dark:text-gray-600',
              )}
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="mb-6">
        {showQuotes && (
          <div className="mb-2 text-3xl leading-none text-gray-300 sm:text-4xl">
            &ldquo;
          </div>
        )}
        <p className="text-base italic leading-relaxed text-gray-700 sm:text-lg">
          {content}
        </p>
        {showQuotes && (
          <div className="mt-2 text-right text-3xl leading-none text-gray-300 sm:text-4xl">
            &rdquo;
          </div>
        )}
      </div>

      {/* Author */}
      <div className="flex items-center gap-4">
        {author.avatar ? (
          <img
            src={author.avatar}
            alt={`${author.name} avatar`}
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-secondary to-brand-primary text-lg font-semibold text-white">
            {author.name.charAt(0)}
          </div>
        )}
        <div>
          <div className="font-semibold text-gray-900">
            {author.name}
          </div>
          <div className="text-sm text-gray-600">
            {author.role} at {author.company}
          </div>
        </div>
      </div>
    </div>
  )
}

export interface TestimonialGridProps {
  testimonials: TestimonialProps[]
  title?: string
  subtitle?: string
  columns?: 1 | 2 | 3
  variant?: 'default' | 'minimal' | 'featured'
  className?: string
  showQuotes?: boolean
}

export const TestimonialGrid: React.FC<
  TestimonialGridProps
> = ({
  testimonials,
  title,
  subtitle,
  columns = 3,
  variant = 'default',
  className,
  showQuotes = true,
}) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  }

  return (
    <div className={cn('py-12', className)}>
      {/* Header */}
      {(title || subtitle) && (
        <div className="mb-12 text-center">
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

      {/* Testimonials Grid */}
      <div
        className={cn(
          'mx-auto grid max-w-7xl gap-6',
          gridCols[columns],
        )}
      >
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            {...testimonial}
            variant={
              testimonial.featured ? 'featured' : variant
            }
            showQuotes={showQuotes}
          />
        ))}
      </div>
    </div>
  )
}
