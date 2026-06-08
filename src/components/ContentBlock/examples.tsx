'use client'
import React from 'react'
import { ShapeFeatures } from '../ShapeFeatures'

// Simple icon components for the example
const ChartIcon: React.FC<{ className?: string }> = ({
  className,
}) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
)

const WaveIcon: React.FC<{ className?: string }> = ({
  className,
}) => (
  <svg
    className={className}
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
)

// Example usage of the ShapeFeatures component
export const ShapeFeaturesExamples: React.FC = () => {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-3xl font-semibold">
          ShapeFeatures Examples
        </h2>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Efficiency/Performance Block */}
          <ShapeFeatures
            title="Get more efficient"
            subtitle="Streamline your workflow and boost productivity with our advanced analytics platform."
            variant="primary"
          />

          {/* HR Management Block */}
          <ShapeFeatures
            title="Manage your HR with ease"
            subtitle="Simplify employee management, payroll processing, and team collaboration in one unified platform."
            variant="secondary"
          />
        </div>

        {/* Additional examples with custom content */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Custom gradient example */}
          <ShapeFeatures
            title="Custom Design"
            subtitle="Create unique experiences with custom gradients."
            variant="custom"
            customGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          >
            <div className="mt-4 rounded-lg bg-white/10 p-4">
              <p className="text-sm opacity-80">
                Additional content can go here
              </p>
            </div>
          </ShapeFeatures>

          {/* Minimal example */}
          <ShapeFeatures
            title="Simple Block"
            variant="primary"
            className="min-h-[200px]"
          />

          {/* With custom icon */}
          <ShapeFeatures
            title="Custom Icon"
            subtitle="Use any React component as an icon"
            variant="secondary"
          />
        </div>
      </div>
    </section>
  )
}

// Individual component exports for direct use
export const EfficiencyBlock: React.FC<{
  className?: string
}> = ({ className }) => (
  <ShapeFeatures
    title="Get more efficient"
    subtitle="Streamline your workflow and boost productivity with our advanced analytics platform."
    variant="primary"
    className={className}
  />
)

export const HRManagementBlock: React.FC<{
  className?: string
}> = ({ className }) => (
  <ShapeFeatures
    title="Manage your HR with ease"
    subtitle="Simplify employee management, payroll processing, and team collaboration in one unified platform."
    variant="secondary"
    className={className}
  />
)
