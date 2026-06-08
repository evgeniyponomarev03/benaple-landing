'use client'

import React, { useEffect, useState } from 'react'

interface LoadingBarProps {
  isLoading: boolean
  height?: number
}

export const LoadingBar: React.FC<LoadingBarProps> = ({
  isLoading,
  height = 3,
}) => {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout
    let completionTimer: NodeJS.Timeout

    if (isLoading) {
      setIsVisible(true)
      setProgress(10) // Start with some initial progress

      // Realistic loading progression that simulates actual loading phases
      interval = setInterval(() => {
        setProgress((prev) => {
          // Different phases of loading with different speeds
          if (prev < 30) {
            // Fast initial phase (navigation starting)
            return prev + Math.random() * 8 + 5
          } else if (prev < 60) {
            // Medium phase (page loading)
            return prev + Math.random() * 6 + 3
          } else if (prev < 85) {
            // Slow phase (content/images loading)
            return prev + Math.random() * 4 + 1
          } else {
            // Stay at 85% until page is fully loaded
            clearInterval(interval)
            return 85
          }
        })
      }, 150)

    } else {
      // Page is fully loaded - complete the bar quickly
      setProgress(100)
      completionTimer = setTimeout(() => {
        setIsVisible(false)
        setProgress(0)
      }, 400)
    }

    return () => {
      clearInterval(interval)
      clearTimeout(completionTimer)
    }
  }, [isLoading])

  if (!isVisible) return null

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[10000] h-[var(--height)] bg-transparent"
      style={{ '--height': `${height}px` } as React.CSSProperties}
    >
      <div
        className="h-full bg-brand-primary transition-all ease-out"
        style={{
          width: `${progress}%`,
          transitionDuration: progress === 100 ? '300ms' : '200ms',
          boxShadow: '0 0 10px rgba(30, 85, 142, 0.4)',
          borderRadius: '0 2px 2px 0',
        }}
      />
    </div>
  )
}