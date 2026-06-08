import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { PageTransitionProvider } from './PageTransition'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <HeaderThemeProvider>
      <PageTransitionProvider>{children}</PageTransitionProvider>
    </HeaderThemeProvider>
  )
}
