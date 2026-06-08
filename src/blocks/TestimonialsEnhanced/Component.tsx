import React from 'react'

import type { TestimonialsEnhancedBlock as TestimonialsEnhancedBlockProps } from '@/payload-types'

import {
  TestimonialGrid,
  type TestimonialProps,
} from '@/components/TestimonialCard'
import { Media } from '@/components/Media'

export const TestimonialsEnhancedBlockComponent: React.FC<
  TestimonialsEnhancedBlockProps & {
    disableInnerContainer?: boolean
  }
> = ({
  title,
  subtitle,
  columns,
  variant,
  showQuotes,
  testimonials,
  disableInnerContainer,
}) => {
  const mappedTestimonials: TestimonialProps[] = (
    testimonials || []
  ).map((testimonial, index) => {
    let avatarUrl: string | undefined

    // Extract avatar URL from Media component
    if (
      testimonial.authorAvatar &&
      typeof testimonial.authorAvatar === 'object'
    ) {
      avatarUrl = testimonial.authorAvatar.url || undefined
    }

    return {
      id: `testimonial-${index}`,
      content: testimonial.content || '',
      author: {
        name: testimonial.authorName || '',
        role: testimonial.authorRole || '',
        company: testimonial.authorCompany || '',
        avatar: avatarUrl,
      },
      rating:
        testimonial.rating && Number(testimonial.rating) > 0
          ? (Number(testimonial.rating) as
              | 1
              | 2
              | 3
              | 4
              | 5)
          : undefined,
      featured: testimonial.featured || false,
    }
  })

  return (
    <div className={'container'}>
      <TestimonialGrid
        title={title || undefined}
        subtitle={subtitle || undefined}
        testimonials={mappedTestimonials}
        columns={
          columns
            ? (parseInt(columns as string) as 1 | 2 | 3)
            : 2
        }
        variant={
          variant as 'default' | 'minimal' | 'featured'
        }
        showQuotes={showQuotes ?? true}
      />
    </div>
  )
}
