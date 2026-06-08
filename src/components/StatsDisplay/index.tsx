'use client'
import React, { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/utilities/ui'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export interface StatItem {
  id: string
  label: string
  value: string | number
  prefix?: string
  suffix?: string
  description?: string
  icon?: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
    period?: string
  }
  highlight?: boolean
}

export interface StatsDisplayProps {
  stats: StatItem[]
  title?: string
  subtitle?: string
  layout?: 'horizontal' | 'grid' | 'cards'
  columns?: 2 | 3 | 4 | 5
  animated?: boolean
  className?: string
  cardClassName?: string
}

const CountUpNumber: React.FC<{
  target: number
  duration?: number
  animated?: boolean
  shouldStart?: boolean
}> = ({
  target,
  duration = 2000,
  animated = true,
  shouldStart = false,
}) => {
  const [current, setCurrent] = useState(0)
  const animationRef = useRef<gsap.core.Tween | null>(null)
  const elementRef = useRef<HTMLSpanElement>(null)
  const hasStartedRef = useRef(false)

  useEffect(() => {
    if (!animated || typeof window === 'undefined') {
      setCurrent(target)
      return
    }

    if (!shouldStart) {
      setCurrent(0)
      return
    }

    if (hasStartedRef.current) return
    hasStartedRef.current = true

    // Kill any existing animation
    if (animationRef.current) {
      animationRef.current.kill()
    }

    const obj = { value: 0 }
    animationRef.current = gsap.to(obj, {
      value: target,
      duration: duration / 1000, // GSAP uses seconds
      ease: 'power2.out',
      onUpdate: () => {
        setCurrent(Math.floor(obj.value))
      },
      onComplete: () => {
        setCurrent(target)
      },
    })

    return () => {
      if (animationRef.current) {
        animationRef.current.kill()
      }
    }
  }, [target, duration, animated, shouldStart])

  return (
    <span ref={elementRef}>{current.toLocaleString()}</span>
  )
}

export const StatsDisplay: React.FC<StatsDisplayProps> = ({
  stats,
  title,
  subtitle,
  layout = 'grid',
  columns = 4,
  animated = true,
  className,
  cardClassName,
}) => {
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!animated || typeof window === 'undefined') {
      setShouldAnimate(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldAnimate) {
            setShouldAnimate(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.3 }, // Trigger when 30% of section is visible
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [animated, shouldAnimate])
  const gridCols = {
    2: 'grid-cols-1 justify-center sm:grid-cols-2',
    3: 'grid-cols-1 justify-center sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 justify-center sm:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 justify-center sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5',
  }

  const getVariantStyles = (
    stat: StatItem,
    index: number,
  ) => {
    const isFirst = index === 0
    const isLast = index === stats.length - 1

    return cn(
      'relative overflow-hidden p-6 transition-all duration-300 hover:scale-105',
      // Default rounded corners
      'rounded-2xl',
      // Special rounded corners for first and last
      isFirst && 'rounded-tl-[3rem]',
      isLast && 'rounded-br-[3rem]',
      stat.highlight
        ? 'bg-brand-primary to-brand-primary text-white'
        : 'backdrop-blur-2 border border-gray-100 bg-white bg-opacity-50 hover:shadow-lg',
    )
  }

  const renderStat = (stat: StatItem, index: number) => {
    const isNumber = typeof stat.value === 'number'

    return (
      <div
        key={stat.id}
        className={cn(
          getVariantStyles(stat, index),
          cardClassName,
        )}
      >
        {/* Modern variant background decoration */}

        <div className="relative">
          {/* Icon */}
          {stat.icon && (
            <div
              className={cn(
                'mb-4 flex h-10 w-10 items-center justify-center rounded-lg',
                stat.highlight
                  ? 'bg-white/20 text-white'
                  : 'bg-blue-50 text-brand-primary',
              )}
            >
              {stat.icon}
            </div>
          )}

          {/* Value */}
          <div
            className={cn(
              'mb-2 text-3xl font-semibold md:text-4xl',
              stat.highlight
                ? 'text-white'
                : 'text-gray-900',
            )}
          >
            {stat.prefix}
            {isNumber ? (
              <CountUpNumber
                target={stat.value as number}
                animated={animated}
                shouldStart={shouldAnimate}
              />
            ) : (
              stat.value
            )}
            {stat.suffix}
          </div>

          {/* Label */}
          <div
            className={cn(
              'mb-1 font-medium',
              stat.highlight
                ? 'text-white/90'
                : 'text-gray-700',
            )}
          >
            {stat.label}
          </div>

          {/* Description */}
          {stat.description && (
            <div
              className={cn(
                'text-sm',
                stat.highlight
                  ? 'text-white/70'
                  : 'text-gray-500',
              )}
            >
              {stat.description}
            </div>
          )}

          {/* Trend */}
          {stat.trend && (
            <div className="mt-3 flex items-center gap-1">
              <svg
                className={cn(
                  'h-4 w-4',
                  stat.trend.isPositive
                    ? 'rotate-0 text-green-500'
                    : 'rotate-180 text-red-500',
                )}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 17l9.2-9.2M17 17V7H7"
                />
              </svg>
              <span
                className={cn(
                  'text-sm font-medium',
                  stat.trend.isPositive
                    ? 'text-green-500'
                    : 'text-red-500',
                )}
              >
                {stat.trend.value}%
              </span>
              {stat.trend.period && (
                <span
                  className={cn(
                    'text-sm',
                    stat.highlight
                      ? 'text-white/70'
                      : 'text-gray-500',
                  )}
                >
                  {stat.trend.period}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      ref={sectionRef}
      className={cn('container py-12', className)}
    >
      {/* Header */}
      {(title || subtitle) && (
        <div className="mb-12 text-left md:text-center">
          {title && (
            <h2 className="mb-4 text-3xl font-semibold text-gray-900 md:text-4xl">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mx-auto max-w-3xl text-lg text-gray-600 md:text-xl">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Stats */}
      <div>
        {layout === 'horizontal' ? (
          <div className="flex flex-wrap justify-center gap-8">
            {stats.map((stat, index) =>
              renderStat(stat, index),
            )}
          </div>
        ) : layout === 'cards' ? (
          <div className="space-y-6">
            {stats.map((stat, index) =>
              renderStat(stat, index),
            )}
          </div>
        ) : (
          <div
            className={cn('grid gap-6', gridCols[columns])}
          >
            {stats.map((stat, index) =>
              renderStat(stat, index),
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// Predefined HR stat icons
export const StatIcons = {
  Employees: () => (
    <svg
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  ),
  Retention: () => (
    <svg
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  ),
  Productivity: () => (
    <svg
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  ),
  Satisfaction: () => (
    <svg
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  Growth: () => (
    <svg
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 17l9.2-9.2M17 17V7H7"
      />
    </svg>
  ),
}
