'use client'

import React from 'react'
import { useFadeInAnimation } from '@/hooks/useFadeInAnimation'

interface AnimatedBlockProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export const AnimatedBlock: React.FC<
  AnimatedBlockProps
> = ({ children, delay = 0, className = '' }) => {
  const { elementRef, animationStyle } = useFadeInAnimation(
    {
      delay,
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      duration: 600,
      distance: '20px',
    },
  )

  return (
    <div
      ref={elementRef}
      style={animationStyle}
      className={className}
    >
      {children}
    </div>
  )
}
