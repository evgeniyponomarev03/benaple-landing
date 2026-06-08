import React from 'react'
import { CallToAction } from '@/components/CallToAction/index'

// Test just the CallToAction component first
export default function DemoTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        <h1 className="mb-8 text-center text-4xl font-semibold text-gray-900">
          Component Test Page
        </h1>

        {/* Test CallToAction Component */}
        <section className="py-8">
          <CallToAction
            title="Test CallToAction"
            description="This is a test of the CallToAction component"
            buttons={[]}
            variant="minimal"
            background="solid"
          />
        </section>
      </div>
    </div>
  )
}
