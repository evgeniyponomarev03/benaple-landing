'use client'
import React from 'react'

import type { TestimonialsBlock as TestimonialsBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import {
  BlockHeader,
  normalizeBlockHeaderProps,
} from '@/components/BlockHeader'

export const Testimonials: React.FC<
  TestimonialsBlockProps
> = ({ headline, subline, testimonials, ...blockData }) => {
  const hasItems =
    Array.isArray(testimonials) && testimonials.length > 0
  const headerProps = normalizeBlockHeaderProps({
    headline,
    subline,
    ...blockData,
  })

  return (
    <section className="container">
      <BlockHeader {...headerProps} />
      {hasItems && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials?.map((t, i) => {
            if (typeof t !== 'object') return null
            const {
              quote,
              authorName,
              authorRole,
              authorAvatar,
            } = t
            return (
              <figure
                key={i}
                className="rounded-lg border border-border bg-card p-6"
              >
                {quote && (
                  <blockquote className="text-sm leading-relaxed">
                    “{quote}”
                  </blockquote>
                )}
                <figcaption className="mt-4 flex items-center gap-3">
                  {authorAvatar &&
                    typeof authorAvatar === 'object' && (
                      <div className="h-10 w-10 overflow-hidden rounded-full">
                        <Media
                          resource={authorAvatar}
                          htmlElement="div"
                          className="h-10 w-10"
                        />
                      </div>
                    )}
                  <div className="text-sm">
                    {authorName && (
                      <div className="font-medium">
                        {authorName}
                      </div>
                    )}
                    {authorRole && (
                      <div className="text-muted-foreground">
                        {authorRole}
                      </div>
                    )}
                  </div>
                </figcaption>
              </figure>
            )
          })}
        </div>
      )}
    </section>
  )
}
