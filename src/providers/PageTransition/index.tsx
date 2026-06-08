'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { LoadingBar } from '@/components/LoadingBar'
import { performPageTransition } from '@/utilities/pageTransitions'

interface PageTransitionContextType {
  isTransitioning: boolean
  setIsTransitioning: (loading: boolean) => void
  navigateWithTransition: (navigationCallback: () => Promise<void> | void) => Promise<void>
}

const PageTransitionContext = createContext<PageTransitionContextType>({
  isTransitioning: false,
  setIsTransitioning: () => {},
  navigateWithTransition: async () => {},
})

export const usePageTransition = () => useContext(PageTransitionContext)

interface PageTransitionProviderProps {
  children: React.ReactNode
}

export const PageTransitionProvider: React.FC<PageTransitionProviderProps> = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false)

  const navigateWithTransition = async (navigationCallback: () => Promise<void> | void) => {
    setIsTransitioning(true)
    try {
      await performPageTransition(navigationCallback)
    } finally {
      setIsTransitioning(false)
    }
  }

  // Listen for page navigation completion to stop loading bar
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const stopLoadingAfterDelay = () => {
      // Clear any existing timeout
      if (timeoutId) clearTimeout(timeoutId)
      
      // Stop loading after a reasonable delay to ensure transition is complete
      timeoutId = setTimeout(() => {
        setIsTransitioning(false)
      }, 800) // 600ms transition + 200ms buffer
    }

    // Listen for route change events
    const handleRouteChange = stopLoadingAfterDelay

    // Listen for when DOM content changes (indicating page navigation)
    const observer = new MutationObserver((mutations) => {
      const hasSignificantChange = mutations.some(mutation => 
        mutation.type === 'childList' && 
        mutation.addedNodes.length > 0 &&
        Array.from(mutation.addedNodes).some(node => 
          node.nodeType === Node.ELEMENT_NODE && 
          (node as Element).tagName !== 'SCRIPT'
        )
      )
      
      if (hasSignificantChange && isTransitioning) {
        stopLoadingAfterDelay()
      }
    })

    // Start observing
    observer.observe(document.body, {
      childList: true,
      subtree: true
    })
    
    // Fallback: listen for popstate events
    window.addEventListener('popstate', handleRouteChange)
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      observer.disconnect()
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [isTransitioning])

  return (
    <PageTransitionContext.Provider
      value={{
        isTransitioning,
        setIsTransitioning,
        navigateWithTransition,
      }}
    >
      <LoadingBar isLoading={isTransitioning} />
      {children}
    </PageTransitionContext.Provider>
  )
}
