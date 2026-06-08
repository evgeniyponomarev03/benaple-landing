'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { TransitionLink } from '@/components/TransitionLink'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useTransitionRouter } from 'next-view-transitions'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { SegmentedToggle } from '@/components/SegmentedToggle'
import { HeaderNav } from './Nav'
import { CMSLink } from '@/components/Link'
import { usePageTransition } from '@/providers/PageTransition'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({
  data,
}) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const router = useRouter()
  const transitionRouter = useTransitionRouter()
  const { navigateWithTransition } = usePageTransition()

  // Sticky header scroll behavior
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isTransitioning, setIsTransitioning] =
    useState(false)
  const [productTab, setProductTab] = useState<
    'hr' | 'insurance' | undefined
  >('insurance')

  useEffect(() => {
    setHeaderTheme(null)
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme)
      setTheme(headerTheme)
  }, [headerTheme])

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

  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY

      // Update scrolled state
      setIsScrolled(currentScrollY > 0)

      if (
        currentScrollY > lastScrollY &&
        currentScrollY > 100
      ) {
        // Scrolling down and past 100px - hide header
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show header
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', controlHeader)
    return () =>
      window.removeEventListener('scroll', controlHeader)
  }, [lastScrollY])

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

  const handleProductTabChange = async (
    key: 'hr' | 'insurance',
  ) => {
    // Don't navigate if clicking the same tab
    if (key === productTab) return

    setProductTab(key)
    const target =
      key === 'hr' ? '/hr-platform-new' : '/insurance'

    // Set transitioning state immediately to prevent flash
    setIsTransitioning(true)

    // Use transitionRouter for smooth transitions
    transitionRouter.push(target, {
      onTransitionReady: slideInOut,
    })
  }

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-20 ${
        isTransitioning
          ? 'bg-transparent'
          : isScrolled
            ? 'border-b border-border bg-white shadow-sm'
            : 'bg-white/95 backdrop-blur-sm'
      } ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
      style={{
        viewTransitionName: 'header',
        transition:
          'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out',
      }}
    >
      <div className="w-full px-4 md:container">
        <div className="flex items-center justify-between py-4 md:grid md:grid-cols-3">
          <div className="flex-shrink-0">
            <TransitionLink href="/">
              <Logo loading="eager" priority="high" />
            </TransitionLink>
          </div>
          <div className="hidden justify-self-center md:block">
            <SegmentedToggle
              items={[
                { key: 'insurance', label: 'Insurance' },
                {
                  key: 'hr',
                  label: (
                    <span className="inline-flex items-center gap-2">
                      <span>HR Platform</span>
                    </span>
                  ),
                },
              ]}
              value={productTab}
              onValueChange={(k) => {
                const key = k as 'hr' | 'insurance'

                // Don't navigate if clicking the same tab
                if (key === productTab) return

                setProductTab(key)
                const target =
                  key === 'hr'
                    ? '/hr-platform-new'
                    : '/'

                // Set transitioning state immediately to prevent flash
                setIsTransitioning(true)

                transitionRouter.push(target, {
                  onTransitionReady: slideInOut,
                })
              }}
              className="shadow-md"
            />
          </div>
          <div className="flex items-center gap-4 justify-self-end">
            {/* Navigation - hidden mega menu on mobile, visible on desktop */}
            <div className="hidden md:block">
              <HeaderNav data={data} />
            </div>
            {/* Contact button - always visible, positioned right on mobile */}
            {data?.navItems?.map(({ link }, i) => {
              if (
                link?.label
                  ?.toLowerCase()
                  .includes('contact')
              ) {
                return <CMSLink key={i} {...link} />
              }
              return null
            })}
          </div>
        </div>
      </div>
    </header>
  )
}
