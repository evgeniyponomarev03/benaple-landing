'use client'

import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import SplitType from 'split-type'

interface AnimatedTextProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  stagger?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  trigger?: 'onMount' | 'onScroll' | 'onHover'
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 1,
  stagger = 0.1,
  direction = 'up',
  trigger = 'onMount',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  const getTransformValues = () => {
    switch (direction) {
      case 'up':
        return { y: 100, x: 0 }
      case 'down':
        return { y: -100, x: 0 }
      case 'left':
        return { y: 0, x: 100 }
      case 'right':
        return { y: 0, x: -100 }
      default:
        return { y: 100, x: 0 }
    }
  }

  useGSAP(
    () => {
      if (!textRef.current) return

      const splitText = new SplitType(textRef.current, {
        types: 'chars',
      })

      if (!splitText.chars) return

      const { x, y } = getTransformValues()

      // Set initial state
      gsap.set(splitText.chars, {
        opacity: 0,
        y: y,
        x: x,
      })

      // Create animation for onMount trigger
      if (trigger === 'onMount') {
        gsap.to(splitText.chars, {
          opacity: 1,
          y: 0,
          x: 0,
          duration: duration,
          stagger: stagger,
          delay: delay,
          ease: 'power4.out',
        })
      }

      // Handle different triggers
      if (trigger === 'onScroll') {
        gsap.fromTo(
          splitText.chars,
          {
            opacity: 0,
            y: y,
            x: x,
          },
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: duration,
            stagger: stagger,
            delay: delay,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          },
        )
      } else if (trigger === 'onHover') {
        gsap.set(splitText.chars, {
          opacity: 1,
          y: 0,
          x: 0,
        })

        const hoverAnimation = gsap.to(splitText.chars, {
          y: -5,
          duration: 0.3,
          stagger: 0.02,
          ease: 'power2.out',
        })

        const hoverOutAnimation = gsap.to(splitText.chars, {
          y: 0,
          duration: 0.3,
          stagger: 0.02,
          ease: 'power2.out',
        })

        const element = containerRef.current
        if (element) {
          element.addEventListener('mouseenter', () =>
            hoverAnimation.play(),
          )
          element.addEventListener('mouseleave', () =>
            hoverOutAnimation.play(),
          )
        }
      }
    },
    { scope: containerRef },
  )

  return (
    <div ref={containerRef} className={className}>
      <div ref={textRef}>{children}</div>
    </div>
  )
}
