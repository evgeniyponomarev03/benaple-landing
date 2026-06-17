'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { TransitionLink } from '@/components/TransitionLink'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useTransitionRouter } from 'next-view-transitions'
import { ChevronDown } from 'lucide-react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { SegmentedToggle } from '@/components/SegmentedToggle'
import { CMSLink } from '@/components/Link'
import { usePageTransition } from '@/providers/PageTransition'
import { MobileMenu } from '@/components/MobileMenu'

interface HeaderClientProps {
  data: Header
}

const InsuranceSelect: React.FC<{ data: Header }> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false)
  
  // Extract all options from categories
  const options = data?.insuranceMegaMenu?.categories?.flatMap(cat => 
    cat.items?.map(item => ({
      label: item.title,
      url: item.link?.url || '/insurance'
    })) || []
  ) || []
  
  const displayOptions = options.length > 0 ? options : [
    { label: 'Employee Benefits', url: '/insurance' },
    { label: 'Corporate Risk', url: '/insurance' },
    { label: 'Specialised Coverage', url: '/insurance' },
    { label: 'Operational Support', url: '/insurance' }
  ]

  return (
    <div className="relative">
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-700 bg-transparent hover:bg-slate-50 rounded-xl transition-all duration-200"
      >
        <span>Insurance solutions</span>
        <ChevronDown className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-md border border-slate-100 shadow-xl rounded-2xl p-2 z-50 flex flex-col gap-1 max-h-[300px] overflow-y-auto">
            {displayOptions.map((opt, i) => (
              <TransitionLink
                key={i}
                href={opt.url}
                onClick={() => setIsOpen(false)}
                className="w-full text-left px-4 py-2.5 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all duration-200 font-medium block"
              >
                {opt.label}
              </TransitionLink>
            ))}
          </div>
        </>
      )}
    </div>
  )
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
      setIsScrolled(currentScrollY > 0)
    }

    window.addEventListener('scroll', controlHeader)
    return () =>
      window.removeEventListener('scroll', controlHeader)
  }, [])

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

  const contactLink = data?.navItems?.find(
    ({ link }) => link?.label?.toLowerCase().includes('contact')
  )?.link

  return (
    <header
      className="fixed left-0 right-0 top-0 z-40"
      style={{
        viewTransitionName: 'header',
        background: 'transparent',
        borderBottom: '1px solid transparent',
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
                { key: 'hr', label: 'HR Platform' },
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
              className=""
            />
          </div>
          <div className="flex items-center gap-4 justify-self-end">
            <div className="hidden md:flex items-center gap-4">
              <InsuranceSelect data={data} />
              
              <TransitionLink
                href="/login"
                className="text-sm font-medium text-slate-600 hover:text-slate-950 transition-colors duration-200"
              >
                Login
              </TransitionLink>
              
              {contactLink ? (
                <TransitionLink 
                  href={contactLink.url || '/contact'}
                  className="inline-flex items-center justify-center py-4 px-6 gap-[10px] rounded-[40px] border border-[#172B5F4D] text-[#172B5F] bg-transparent font-inter font-medium text-sm leading-[1.2] tracking-[-0.01em] align-middle transition-all duration-200 hover:bg-[#172B5F]/5 text-center shadow-sm hover:shadow"
                >
                  {contactLink.label || 'Contact us'}
                </TransitionLink>
              ) : (
                <TransitionLink
                  href="/contact"
                  className="inline-flex items-center justify-center py-4 px-6 gap-[10px] rounded-[40px] border border-[#172B5F4D] text-[#172B5F] bg-transparent font-inter font-medium text-sm leading-[1.2] tracking-[-0.01em] align-middle transition-all duration-200 hover:bg-[#172B5F]/5 text-center shadow-sm hover:shadow"
                >
                  Contact us
                </TransitionLink>
              )}
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <MobileMenu data={data} />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
