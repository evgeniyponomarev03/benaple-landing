'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useTransitionRouter } from 'next-view-transitions'

import { SegmentedToggle } from '@/components/SegmentedToggle'

export const BottomMobileNav: React.FC = () => {
  const pathname = usePathname()
  const transitionRouter = useTransitionRouter()
  const [productTab, setProductTab] = useState<
    'hr' | 'insurance' | undefined
  >('insurance')
  const [isTransitioning, setIsTransitioning] =
    useState(false)

  // Sync the segmented toggle with the current path
  useEffect(() => {
    if (
      pathname?.startsWith('/insurance') ||
      pathname === '/'
    ) {
      setProductTab('insurance')
    } else if (
      pathname?.startsWith('/home') ||
      pathname?.startsWith('/hr-platform')
    ) {
      setProductTab('hr')
    } else {
      setProductTab(undefined)
    }
  }, [pathname])

  // Custom transition function for smooth page transitions
  const slideInOut = () => {
    document.documentElement.animate(
      [
        {
          opacity: 1,
          transform: 'translateY(0)',
        },
        {
          opacity: 0.2,
          transform: 'translateY(-35%)',
        },
      ],
      {
        duration: 1500,
        easing: 'cubic-bezier(0.87, 0, 0.13, 1)',
        fill: 'forwards',
        pseudoElement: '::view-transition-old(root)',
      },
    )

    document.documentElement.animate(
      [
        {
          clipPath:
            'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
        },
        {
          clipPath:
            'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
        },
      ],
      {
        duration: 1500,
        easing: 'cubic-bezier(0.87, 0, 0.13, 1)',
        fill: 'forwards',
        pseudoElement: '::view-transition-new(root)',
      },
    )

    // Reset transitioning state after animation completes + 500ms delay
    setTimeout(() => {
      setIsTransitioning(false)
    }, 2000)
  }

  const handleProductTabChange = (key: string) => {
    const typedKey = key as 'hr' | 'insurance'

    // Don't navigate if clicking the same tab
    if (typedKey === productTab) return

    setProductTab(typedKey)
    const target =
      typedKey === 'hr' ? '/hr-platform-new' : '/insurance'

    // Set transitioning state immediately to prevent flash
    setIsTransitioning(true)

    transitionRouter.push(target, {
      onTransitionReady: slideInOut,
    })
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-30 md:hidden"
      style={{
        viewTransitionName: 'mobile-nav',
      }}
    >
      <div
        className="flex justify-center"
        style={{ padding: '12px' }}
      >
        <SegmentedToggle
          items={[
            { key: 'insurance', label: 'Insurance' },
            {
              key: 'hr',
              label: (
                <span className="inline-flex items-center gap-2">
                  <span>HR Platform</span>
                  <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground shadow-sm">
                    New
                  </span>
                </span>
              ),
            },
          ]}
          value={productTab}
          onValueChange={handleProductTabChange}
          className="shadow-md"
        />
      </div>
    </div>
  )
}
