'use client'

import React from 'react'
import { Link } from 'next-view-transitions'
import { usePageTransition } from '@/providers/PageTransition'

interface TransitionLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export const TransitionLink: React.FC<TransitionLinkProps> = ({
  href,
  children,
  className,
  onClick,
}) => {
  const { setIsTransitioning } = usePageTransition()

  const handleClick = () => {
    if (onClick) {
      onClick()
    }
    
    // Start loading bar immediately
    setIsTransitioning(true)
    
    // The next-view-transitions library handles the navigation
    // Loading bar will be stopped by the transition completion handler
  }

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  )
}
