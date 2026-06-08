'use client'
import { cn } from '@/utilities/ui'
import React from 'react'

import { Card } from '@/components/Card'

export type SearchResultData = {
  slug: string
  categories?: any[]
  meta: {
    title?: string
    description?: string
    image?: any
  }
  title: string
  relationTo: 'posts' | 'pages'
}

export type Props = {
  results: SearchResultData[]
}

export const SearchResults: React.FC<Props> = (props) => {
  const { results } = props

  return (
    <div className={cn('container')}>
      <div>
        <div className="grid grid-cols-4 gap-x-4 gap-y-4 sm:grid-cols-8 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-8 xl:gap-x-8">
          {results?.map((result, index) => {
            if (
              typeof result === 'object' &&
              result !== null
            ) {
              // Only show categories for posts, not pages
              const showCategories =
                result.relationTo === 'posts'

              return (
                <div className="col-span-4" key={index}>
                  <Card
                    className="h-full"
                    doc={result}
                    relationTo={
                      result.relationTo === 'posts'
                        ? 'posts'
                        : undefined
                    }
                    showCategories={showCategories}
                  />
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}
