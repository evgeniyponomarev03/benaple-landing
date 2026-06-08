import React from 'react'
import { cn } from '@/utilities/ui'

interface AuroraBackgroundProps {
  className?: string
  children?: React.ReactNode
  variant?: 'default' | 'blue' | 'purple' | 'green' | 'pink'
  intensity?: 'low' | 'medium' | 'high'
}

export const AuroraBackground: React.FC<
  AuroraBackgroundProps
> = ({
  className,
  children,
  variant = 'default',
  intensity = 'medium',
}) => {
  const intensityClasses = {
    low: 'opacity-10',
    medium: 'opacity-20',
    high: 'opacity-30',
  }

  const variantGradients = {
    default: {
      primary: 'from-blue-500 via-purple-500 to-pink-500',
      secondary: 'from-cyan-400 via-blue-500 to-purple-500',
      accent: 'from-pink-400 via-purple-500 to-violet-500',
    },
    blue: {
      primary: 'from-blue-400 via-blue-600 to-blue-800',
      secondary: 'from-cyan-400 via-blue-500 to-indigo-500',
      accent: 'from-sky-400 via-blue-500 to-blue-600',
    },
    purple: {
      primary:
        'from-purple-400 via-purple-600 to-purple-800',
      secondary:
        'from-violet-400 via-purple-500 to-fuchsia-500',
      accent: 'from-pink-400 via-purple-500 to-violet-500',
    },
    green: {
      primary: 'from-green-400 via-green-600 to-green-800',
      secondary:
        'from-emerald-400 via-green-500 to-teal-500',
      accent: 'from-lime-400 via-green-500 to-emerald-500',
    },
    pink: {
      primary: 'from-pink-400 via-pink-600 to-pink-800',
      secondary:
        'from-rose-400 via-pink-500 to-fuchsia-500',
      accent: 'from-red-400 via-pink-500 to-rose-500',
    },
  }

  const gradients = variantGradients[variant]

  return (
    <div
      className={cn('relative overflow-hidden', className)}
    >
      {/* Aurora Background */}
      <div className="absolute inset-0 -z-10">
        {/* Base gradient overlay */}
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-r',
            gradients.primary,
            intensityClasses[intensity],
          )}
        />

        {/* Large animated orbs */}
        <div
          className={cn(
            'absolute -right-40 -top-40 h-80 w-80 rounded-full bg-gradient-to-r',
            gradients.accent,
            'animate-pulse blur-3xl',
            intensityClasses[intensity],
          )}
          style={{ animationDuration: '4s' }}
        />

        <div
          className={cn(
            'absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-r',
            gradients.secondary,
            'animate-pulse blur-3xl',
            intensityClasses[intensity],
          )}
          style={{ animationDuration: '6s' }}
        />

        <div
          className={cn(
            'absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-r',
            gradients.primary,
            'animate-pulse blur-3xl',
            intensityClasses[intensity],
          )}
          style={{ animationDuration: '8s' }}
        />

        {/* Medium animated elements */}
        <div
          className={cn(
            'absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-gradient-to-r',
            gradients.secondary,
            'animate-bounce blur-2xl',
            intensityClasses[intensity],
          )}
          style={{ animationDuration: '3s' }}
        />

        <div
          className={cn(
            'absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-gradient-to-r',
            gradients.accent,
            'animate-bounce blur-2xl',
            intensityClasses[intensity],
          )}
          style={{ animationDuration: '4s' }}
        />

        {/* Small floating orbs */}
        <div className="absolute left-0 top-0 h-full w-full">
          <div
            className={cn(
              'absolute left-1/3 top-1/3 h-32 w-32 rounded-full bg-gradient-to-r',
              'from-yellow-400 to-orange-500',
              'animate-ping blur-xl',
              intensityClasses[intensity],
            )}
            style={{ animationDuration: '2s' }}
          />

          <div
            className={cn(
              'absolute bottom-1/3 right-1/3 h-32 w-32 rounded-full bg-gradient-to-r',
              'from-green-400 to-teal-500',
              'animate-ping blur-xl',
              intensityClasses[intensity],
            )}
            style={{ animationDuration: '3s' }}
          />

          <div
            className={cn(
              'absolute right-1/4 top-1/2 h-24 w-24 rounded-full bg-gradient-to-r',
              'from-indigo-400 to-purple-500',
              'animate-ping blur-lg',
              intensityClasses[intensity],
            )}
            style={{ animationDuration: '2.5s' }}
          />
        </div>

        {/* Subtle moving particles */}
        <div className="absolute inset-0">
          <div
            className={cn(
              'top-1/6 left-1/6 absolute h-16 w-16 rounded-full bg-gradient-to-r',
              'from-white to-gray-200',
              'animate-pulse blur-sm',
              intensityClasses[intensity],
            )}
            style={{ animationDuration: '1.5s' }}
          />

          <div
            className={cn(
              'bottom-1/6 right-1/6 absolute h-16 w-16 rounded-full bg-gradient-to-r',
              'from-white to-gray-200',
              'animate-pulse blur-sm',
              intensityClasses[intensity],
            )}
            style={{ animationDuration: '2s' }}
          />
        </div>
      </div>

      {/* Content */}
      {children}
    </div>
  )
}

export default AuroraBackground
