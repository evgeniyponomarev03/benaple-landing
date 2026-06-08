'use client'

import React from 'react'
import { cn } from '@/utilities/ui'
import { WebGLAurora } from '@/components/WebGLAurora'

interface WebGLGlobalAuroraProps {
  className?: string
  children?: React.ReactNode
  intensity?: 'low' | 'medium' | 'high'
}

export const WebGLGlobalAurora: React.FC<
  WebGLGlobalAuroraProps
> = ({ className, children, intensity = 'low' }) => {
  const intensityMultipliers = {
    low: 0.6,
    medium: 1.0,
    high: 1.5,
  }

  const intensityMultiplier =
    intensityMultipliers[intensity]

  return (
    <div className={cn('fixed inset-0 -z-50', className)}>
      <WebGLAurora
        colorStops={['#a1c9f5', '#91d5ff', '#91ccff']}
        amplitude={2 * intensityMultiplier}
        blend={1}
        speed={0.3}
        className="h-full w-full"
      />
      {children}
    </div>
  )
}

export default WebGLGlobalAurora
