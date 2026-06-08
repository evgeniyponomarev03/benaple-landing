import * as React from 'react'
import { cn } from '@/utilities/ui'

export const Width: React.FC<{
  children: React.ReactNode
  className?: string
  width?: number | string
}> = ({ children, className, width }) => {
  // Convert width percentage to CSS Grid classes
  const getGridClass = (width: number | string) => {
    const widthNum =
      typeof width === 'string' ? parseInt(width) : width
    if (widthNum <= 50) return 'col-span-1 md:col-span-1'
    return 'col-span-1 md:col-span-2'
  }

  const gridClass = width
    ? getGridClass(width)
    : 'col-span-1 md:col-span-2'

  return (
    <div className={cn(gridClass, className)}>
      {children}
    </div>
  )
}
