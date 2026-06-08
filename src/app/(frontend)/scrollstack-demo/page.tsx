import React from 'react'
import { InteractiveFeaturesBlockComponent } from '@/blocks/InteractiveFeatures/Component'

// Mock data for testing the ScrollStack layout
const mockFeatures = [
  {
    title: 'Advanced Analytics',
    description:
      'Get deep insights into your HR data with our comprehensive analytics dashboard. Track employee performance, engagement metrics, and workforce trends in real-time.',
    image: null, // No image for demo
    badge: 'Popular',
  },
  {
    title: 'Smart Recruitment',
    description:
      'Streamline your hiring process with AI-powered candidate screening, automated interview scheduling, and intelligent matching algorithms.',
    image: null, // No image for demo
    badge: 'New',
  },
  {
    title: 'Employee Onboarding',
    description:
      'Create seamless onboarding experiences with customizable workflows, digital document management, and automated task assignments.',
    image: null, // No image for demo
  },
  {
    title: 'Performance Management',
    description:
      'Set goals, track progress, and conduct reviews with our comprehensive performance management system. Includes 360-degree feedback and continuous check-ins.',
    image: null, // No image for demo
    badge: 'Featured',
  },
  {
    title: 'Learning & Development',
    description:
      'Empower your workforce with personalized learning paths, skill assessments, and certification tracking. Access to thousands of courses and training materials.',
    image: null, // No image for demo
  },
  {
    title: 'Workforce Planning',
    description:
      'Plan for the future with predictive analytics, succession planning tools, and workforce optimization recommendations based on data insights.',
    image: null, // No image for demo
  },
]

export default function ScrollStackDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container py-8">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Interactive Features Demo
          </h1>
          <p className="max-w-3xl text-lg text-gray-600">
            This page demonstrates the Interactive Features
            block with its advanced ScrollStack layout.
            Scroll down to see the stacked card animation
            effect with smooth transitions and scaling.
          </p>
        </div>
      </div>

      {/* ScrollStack Layout Demo */}
      <InteractiveFeaturesBlockComponent
        heading="Revolutionary HR Features"
        subheading="Discover how our advanced HR platform transforms workforce management with cutting-edge technology and intuitive design."
        features={mockFeatures}
        showCTA={true}
        ctaText="Start Your Free Trial"
        ctaUrl="#"
        disableInnerContainer={false}
      />

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
            ScrollStack Features
          </h2>
          <div className="mx-auto max-w-4xl">
            <div className="rounded-lg border border-gray-200 bg-blue-50 p-8">
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                Interactive ScrollStack Layout
              </h3>
              <p className="mb-6 text-gray-600">
                Our Interactive Features block now uses an
                advanced ScrollStack layout that creates an
                engaging, scroll-driven experience with
                smooth animations and visual effects.
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  • Stacked card animation with smooth
                  transitions
                </li>
                <li>
                  • Scaling and rotation effects for visual
                  depth
                </li>
                <li>• Blur effects for background cards</li>
                <li>
                  • Responsive design for all screen sizes
                </li>
                <li>• Powered by Lenis smooth scrolling</li>
                <li>
                  • Optimized performance with hardware
                  acceleration
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-brand-primary py-12 text-white">
        <div className="container text-center">
          <p className="text-gray-400">
            ScrollStack layout powered by Lenis smooth
            scrolling and custom GSAP animations.
          </p>
        </div>
      </div>
    </div>
  )
}
