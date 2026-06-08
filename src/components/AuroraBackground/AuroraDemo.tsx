import React from 'react'
import { AuroraBackground } from './AuroraBackground'

export const AuroraDemo: React.FC = () => {
  const variants = [
    'default',
    'blue',
    'purple',
    'green',
    'pink',
  ] as const
  const intensities = ['low', 'medium', 'high'] as const

  return (
    <div className="space-y-8 p-8">
      <h2 className="mb-8 text-center text-3xl font-bold">
        Aurora Background Variants
      </h2>

      {/* Variants Demo */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Variants</h3>
        {variants.map((variant) => (
          <AuroraBackground
            key={variant}
            variant={variant}
            intensity="medium"
            className="h-32 rounded-lg"
          >
            <div className="flex h-full items-center justify-center">
              <span className="text-lg font-semibold capitalize text-white">
                {variant} Variant
              </span>
            </div>
          </AuroraBackground>
        ))}
      </div>

      {/* Intensities Demo */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">
          Intensities
        </h3>
        {intensities.map((intensity) => (
          <AuroraBackground
            key={intensity}
            variant="default"
            intensity={intensity}
            className="h-32 rounded-lg"
          >
            <div className="flex h-full items-center justify-center">
              <span className="text-lg font-semibold capitalize text-white">
                {intensity} Intensity
              </span>
            </div>
          </AuroraBackground>
        ))}
      </div>

      {/* Combined Demo */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">
          Combined Examples
        </h3>
        <AuroraBackground
          variant="purple"
          intensity="high"
          className="h-48 rounded-lg"
        >
          <div className="flex h-full items-center justify-center">
            <div className="text-center text-white">
              <h4 className="mb-2 text-2xl font-bold">
                High Intensity Purple
              </h4>
              <p className="text-lg opacity-90">
                Perfect for hero sections
              </p>
            </div>
          </div>
        </AuroraBackground>

        <AuroraBackground
          variant="green"
          intensity="low"
          className="h-32 rounded-lg"
        >
          <div className="flex h-full items-center justify-center">
            <div className="text-center text-white">
              <h4 className="mb-1 text-xl font-bold">
                Low Intensity Green
              </h4>
              <p className="text-sm opacity-90">
                Subtle background effect
              </p>
            </div>
          </div>
        </AuroraBackground>
      </div>
    </div>
  )
}

export default AuroraDemo
