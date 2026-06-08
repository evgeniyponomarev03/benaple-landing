'use client'

import { useEffect, useRef, useState } from 'react'

interface UseFadeInAnimationOptions {
  threshold?: number
  rootMargin?: string
  delay?: number
  duration?: number
  distance?: string
}

export const useFadeInAnimation = (
  options: UseFadeInAnimationOptions = {},
) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    delay = 0,
    duration = 600,
    distance = '20px',
  } = options

  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element || hasAnimated) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setTimeout(() => {
            setIsVisible(true)
            setHasAnimated(true)
          }, delay)
        }
      },
      {
        threshold,
        rootMargin,
      },
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, delay, hasAnimated])

  const animationStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible
      ? 'translateY(0)'
      : `translateY(${distance})`,
    transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
  }

  return {
    elementRef,
    isVisible,
    animationStyle,
  }
}
