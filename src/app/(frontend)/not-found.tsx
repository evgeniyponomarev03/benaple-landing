import React from 'react'

import { Button } from '@/components/ui/button'
import { TransitionLink } from '@/components/TransitionLink'

export default function NotFound() {
  return (
    <div className="container py-28">
      <div className="prose max-w-none">
        <h1 style={{ marginBottom: 0 }}>404</h1>
        <p className="mb-4">
          This page could not be found.
        </p>
      </div>
      <Button asChild variant="default">
        <TransitionLink href="/">Go home</TransitionLink>
      </Button>
    </div>
  )
}
