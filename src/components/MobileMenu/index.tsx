'use client'

import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { TransitionLink } from '@/components/TransitionLink'
import { CMSLink } from '@/components/Link'
import { usePathname, useRouter } from 'next/navigation'
import { Logo } from '@/components/Logo/Logo'

import type { Header } from '@/payload-types'

interface MobileMenuProps {
  data: Header
}

// Static categories and items matching the homepage & footer navigation
const staticCategories = [
  {
    title: 'Employee & Workplace Benefits',
    items: [
      {
        title: 'Gratuity Management',
        description: 'fund end-of-service benefits and avoid surprises.',
        link: { url: '/insurance' },
      },
      {
        title: "Workmen's Compensation",
        description: 'cover workplace injuries and stay UAE labour law compliant.',
        link: { url: '/insurance' },
      },
      {
        title: 'Group Life',
        description: "secure your employees' families in unexpected events.",
        link: { url: '/insurance' },
      },
      {
        title: 'Medical Insurance',
        description: "comprehensive health coverage to protect your team's physical wellbeing.",
        link: { url: '/insurance' },
      },
    ],
  },
  {
    title: 'Corporate Liability & Risk Management',
    items: [
      {
        title: 'Professional Indemnity',
        description: 'Protect your business against professional negligence claims.',
        link: { url: '/insurance' },
      },
      {
        title: 'Directors & Officers',
        description: 'Liability coverage for corporate directors and officers.',
        link: { url: '/insurance' },
      },
      {
        title: 'Third Party Liability',
        description: 'Coverage for third-party injury and property damage.',
        link: { url: '/insurance' },
      },
      {
        title: 'Cyber Security',
        description: 'Protect against cyber threats and data breaches.',
        link: { url: '/insurance' },
      },
    ],
  },
  {
    title: 'Specialized/High-Risk Insurance',
    items: [
      {
        title: 'Kidnap & Ransom',
        description: 'Specialized coverage for kidnap, extortion, and ransom demands.',
        link: { url: '/insurance' },
      },
      {
        title: 'Defense Base Act Insurance',
        description: 'Workers compensation for government contractors working abroad.',
        link: { url: '/insurance' },
      },
      {
        title: 'Event Insurance',
        description: 'Coverage for event cancellations, liabilities, and disruption.',
        link: { url: '/insurance' },
      },
    ],
  },
  {
    title: 'Property & Asset Protection',
    items: [
      {
        title: 'Commercial Property',
        description: 'Protect your physical business assets and locations.',
        link: { url: '/insurance' },
      },
      {
        title: 'Motor Fleet',
        description: 'Comprehensive coverage for company vehicle fleets.',
        link: { url: '/insurance' },
      },
      {
        title: 'Luxury Insurance Coverage',
        description: 'High-value asset protection for high-net-worth clients.',
        link: { url: '/insurance' },
      },
    ],
  },
]

// Custom SVG Icons with light-blue strokes for categories
const categoryIcons = [
  // 1. Employee & Workplace Benefits (Umbrella with people)
  <svg key="1" width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#45CBEF] h-6 w-6">
    <path d="M27.1873 25.9263C28.3468 25.9263 29.2866 24.9863 29.2866 23.8269C29.2866 22.6674 28.3468 21.7275 27.1873 21.7275C26.0278 21.7275 25.0879 22.6674 25.0879 23.8269C25.0879 24.9863 26.0278 25.9263 27.1873 25.9263Z" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M15.625 18.125C15.625 15.7106 17.5856 13.75 20 13.75C22.4144 13.75 24.375 15.7106 24.375 18.125C24.375 15.7106 26.3356 13.75 28.75 13.75C31.1644 13.75 33.125 15.7106 33.125 18.125C33.125 10.8812 27.2438 5 20 5C12.7562 5 6.875 10.8812 6.875 18.125C6.875 15.7106 8.83563 13.75 11.25 13.75C13.6644 13.75 15.625 15.7106 15.625 18.125Z" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 13.75V20" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19.9995 26.71C21.3347 26.71 22.417 25.6276 22.417 24.2925C22.417 22.9574 21.3347 21.875 19.9995 21.875C18.6644 21.875 17.582 22.9574 17.582 24.2925C17.582 25.6276 18.6644 26.71 19.9995 26.71Z" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12.8123 25.9263C13.9718 25.9263 14.9116 24.9863 14.9116 23.8269C14.9116 22.6674 13.9718 21.7275 12.8123 21.7275C11.6528 21.7275 10.7129 22.6674 10.7129 23.8269C10.7129 24.9863 11.6528 25.9263 12.8123 25.9263Z" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M20 28.4375C23.6219 28.4375 26.5625 31.3781 26.5625 35H13.4375C13.4375 31.3781 16.3781 28.4375 20 28.4375Z" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M25.2188 27.7758C25.8325 27.5489 26.4963 27.4258 27.1881 27.4258C30.3338 27.4258 32.8869 29.9789 32.8869 33.1245H29.2731" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.727 33.1245H7.11328C7.11328 29.9789 9.66641 27.4258 12.812 27.4258C13.5039 27.4258 14.1676 27.5489 14.7814 27.7758" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,

  // 2. Corporate Liability & Risk Management (Briefcase with shield)
  <svg key="2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#45CBEF] h-6 w-6">
    <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    <path d="M12 14v3M10 16h4" />
  </svg>,

  // 3. Specialized/High-Risk Insurance (Shield with person/users)
  <svg key="3" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#45CBEF] h-6 w-6">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <circle cx="12" cy="11" r="3" />
  </svg>,

  // 4. Property & Asset Protection (Buildings)
  <svg key="4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#45CBEF] h-6 w-6">
    <rect x="2" y="3" width="8" height="18" rx="1" />
    <rect x="14" y="8" width="8" height="13" rx="1" />
    <path d="M6 8h2M6 12h2M6 16h2M18 12h2M18 16h2" />
  </svg>,
]

const ArrowIcon = ({ isExpanded }: { isExpanded: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`text-[#172B5F] transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
  >
    <path
      d="M12 5V19M12 19L5 12M12 19L19 12"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const LearnMoreArrow = () => (
  <span className="inline-flex items-center justify-center w-11 h-6 rounded-full border border-[#45CBEF] text-[#45CBEF] flex-shrink-0">
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 1L13 5M13 5L9 9M13 5H1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
)

export const MobileMenu: React.FC<MobileMenuProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedCategoryIndex, setExpandedCategoryIndex] = useState<number | null>(null)
  const pathname = usePathname()
  const router = useRouter()

  const isHrActive = pathname?.startsWith('/home') || pathname?.startsWith('/hr-platform')
  const [activeTab, setActiveTab] = useState<'insurance' | 'hr'>(
    isHrActive ? 'hr' : 'insurance'
  )

  // Sync active tab state with pathname changes
  useEffect(() => {
    setActiveTab(isHrActive ? 'hr' : 'insurance')
  }, [pathname, isHrActive])

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleTabChange = (tab: 'insurance' | 'hr') => {
    if (tab === activeTab) return
    setActiveTab(tab)
    setIsOpen(false)
    const target = tab === 'hr' ? '/hr-platform-new' : '/'
    router.push(target)
  }

  const toggleCategory = (index: number) => {
    setExpandedCategoryIndex(expandedCategoryIndex === index ? null : index)
  }

  return (
    <>
      {/* Mobile Hamburger Menu Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-xl p-2.5 transition-colors hover:bg-slate-100 md:hidden flex items-center justify-center text-[#172B5F] bg-[#172B5F0D]"
        aria-label="Toggle mobile menu"
        aria-expanded={isOpen}
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile Menu Panel */}
      <div
        className={`fixed inset-0 z-50 transform bg-white transition-transform duration-300 ease-in-out md:hidden overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex min-h-screen flex-col px-6 py-4">
          {/* Header Bar */}
          <div className="flex items-center justify-between py-2 mb-4">
            <TransitionLink href="/" onClick={() => setIsOpen(false)} className="block">
              <Logo loading="eager" priority="high" />
            </TransitionLink>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full bg-[#172B5F0D] p-3 text-[#172B5F] transition-colors hover:bg-[#172B5F15]"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Product Switcher Toggle */}
          <div className="flex bg-[#172B5F0D] rounded-[40px] p-1 w-full my-4">
            <button
              type="button"
              onClick={() => handleTabChange('insurance')}
              className={`flex-1 py-3 px-6 rounded-[120px] text-sm font-semibold tracking-[-0.01em] transition-all duration-200 text-center ${
                activeTab === 'insurance'
                  ? 'bg-[#172B5F] text-white shadow-sm'
                  : 'bg-transparent text-[#172B5FB2] hover:text-[#172B5F]'
              }`}
            >
              Insurance
            </button>
            <button
              type="button"
              onClick={() => handleTabChange('hr')}
              className={`flex-1 py-3 px-6 rounded-[120px] text-sm font-semibold tracking-[-0.01em] transition-all duration-200 text-center ${
                activeTab === 'hr'
                  ? 'bg-[#172B5F] text-white shadow-sm'
                  : 'bg-transparent text-[#172B5FB2] hover:text-[#172B5F]'
              }`}
            >
              HR Platform
            </button>
          </div>

          {/* Subheading */}
          <div className="my-3">
            <span className="text-sm font-medium text-slate-400 font-inter">
              Our insurance solutions
            </span>
          </div>

          {/* Accordion Categories */}
          <div className="space-y-4 my-2">
            {staticCategories.map((category, index) => {
              const isExpanded = expandedCategoryIndex === index
              const icon = categoryIcons[index] || categoryIcons[0]

              return (
                <div
                  key={index}
                  className="border border-[#172B5F1A] rounded-2xl p-4 bg-white transition-all"
                >
                  {/* Category Header Clickable */}
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleCategory(index)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 rounded-xl bg-[#45CBEF1A] p-2.5 text-[#45CBEF] flex items-center justify-center">
                        {icon}
                      </div>
                      <span className="text-base font-bold text-[#172B5F] font-manrope">
                        {category.title}
                      </span>
                    </div>
                    <ArrowIcon isExpanded={isExpanded} />
                  </div>

                  {/* Collapsible Expanded List */}
                  {isExpanded && (
                    <div className="mt-6 pt-2 border-t border-[#172B5F1A]">
                      <h5 className="text-lg font-semibold text-slate-400 font-manrope mt-4 mb-6">
                        Solutions for {category.title}
                      </h5>
                      <div className="space-y-6">
                        {category.items?.map((item, itemIndex) => (
                          <div
                            key={itemIndex}
                            className="border-b border-[#172B5F1A] pb-6 last:border-0 last:pb-0"
                          >
                            <div className="space-y-2">
                              <h6 className="text-lg font-bold text-[#172B5F] font-manrope leading-tight flex items-center">
                                <span className="text-[#172B5F33] mr-2 font-medium">
                                  {String(itemIndex + 1).padStart(2, '0')}
                                </span>
                                {item.title}
                              </h6>
                              {item.description && (
                                <p className="text-sm text-[#172B5FB2] font-inter leading-relaxed pl-8">
                                  – {item.description}
                                </p>
                              )}
                              <div className="pl-8 pt-1">
                                <TransitionLink
                                  href={item.link.url}
                                  onClick={() => setIsOpen(false)}
                                  className="inline-flex items-center gap-3 hover:opacity-80 transition-opacity"
                                >
                                  <LearnMoreArrow />
                                  <span className="text-base font-bold text-[#172B5F] font-manrope">
                                    Learn more
                                  </span>
                                </TransitionLink>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Help Section & Call to Action Cards */}
          <div className="mt-8 space-y-4">
            <div className="space-y-1">
              <h4 className="text-lg font-bold text-[#172B5F] font-manrope">
                Need help choosing the right coverage?
              </h4>
              <p className="text-sm text-[#172B5FB2] font-inter">
                Our specialists are here to help
              </p>
            </div>

            <TransitionLink
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between w-full bg-[#172B5F] hover:bg-[#172B5F]/95 text-white rounded-full p-2 pl-6 pr-2 transition-all duration-200 shadow-sm"
            >
              <span className="text-base font-bold font-manrope">Request a quote today</span>
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-[#172B5F] flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </TransitionLink>
          </div>

          {/* Bottom Actions */}
          <div className="mt-8 flex flex-col items-center gap-6 pb-12">
            <TransitionLink
              href="/login"
              onClick={() => setIsOpen(false)}
              className="text-base font-bold text-[#172B5F] hover:opacity-85 transition-opacity font-manrope"
            >
              Login
            </TransitionLink>

            <TransitionLink
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center w-full py-4 px-6 rounded-[40px] border border-[#172B5F4D] text-[#172B5F] bg-transparent font-manrope font-bold text-base leading-[1.2] tracking-[-0.01em] align-middle transition-all duration-200 hover:bg-[#172B5F]/5 text-center shadow-sm hover:shadow-md"
            >
              Contact us
            </TransitionLink>
          </div>
        </div>
      </div>
    </>
  )
}
