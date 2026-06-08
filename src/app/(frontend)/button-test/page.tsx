import React from 'react'
import { Button } from '@/components/ui/button'

export default function ButtonTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        <h1 className="mb-8 text-center text-4xl font-semibold text-gray-900">
          Button Test Page
        </h1>

        <div className="flex justify-center">
          <Button variant="default">Test Button</Button>
        </div>
      </div>
    </div>
  )
}
