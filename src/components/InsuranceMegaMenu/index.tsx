'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { ChevronDown } from 'lucide-react'
import { TransitionLink } from '@/components/TransitionLink'
import { CMSLink } from '@/components/Link'
import type { Header } from '@/payload-types'
import styles from '@/styles/insurance-page.module.css'

interface InsuranceMegaMenuProps {
  isActive?: boolean
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  megaMenuData?: Header['insuranceMegaMenu']
}

// Default categories matching the Figma design
const defaultCategories = [
  {
    key: 'employee',
    title: 'Employee &\nWorkplace Benefits',
    icon: '/insurance/icons/mega-icon-employee.svg',
    label: 'Solutions for Employee & Workplace Benefits',
    solutions: [
      { num: '01', title: 'Gratuity Management', desc: '\u2013 fund end-of-service benefits and avoid surprises.' },
      { num: '02', title: "Workmen's Compensation", desc: '\u2013 cover workplace injuries and stay UAE labour law compliant.' },
      { num: '03', title: 'Group Life', desc: '\u2013 secure your employees\u2019 families in unexpected events.' },
      { num: '04', title: 'Medical Insurance', desc: '\u2013 comprehensive health coverage to protect your team\u2019s physical wellbeing.' },
    ],
  },
  {
    key: 'corporate',
    title: 'Corporate Liability &\nRisk Management',
    icon: '/insurance/icons/mega-icon-corporate.svg',
    label: 'Solutions for Corporate Liability & Risk Management',
    solutions: [
      { num: '01', title: 'Professional Indemnity', desc: '\u2013 protect against claims of negligence or inadequate work.' },
      { num: '02', title: 'Directors & Officers', desc: '\u2013 shield leadership from personal liability claims.' },
      { num: '03', title: 'Third Party Liability', desc: '\u2013 cover claims from third parties for injury or damage.' },
      { num: '04', title: 'Cyber Security', desc: '\u2013 protect your business from cyber threats and data breaches.' },
    ],
  },
  {
    key: 'specialized',
    title: 'Specialized/High-Risk\nInsurance',
    icon: '/insurance/icons/mega-icon-specialized.svg',
    label: 'Solutions for Specialized/High-Risk Insurance',
    solutions: [
      { num: '01', title: 'Kidnap & Ransom', desc: '\u2013 protect executives and employees in high-risk environments.' },
      { num: '02', title: 'Defense Base Act Insurance', desc: '\u2013 mandatory coverage for overseas government contractors.' },
      { num: '03', title: 'Event Insurance', desc: '\u2013 cover cancellations, liability, and property damage for events.' },
    ],
  },
  {
    key: 'property',
    title: 'Property &\nAsset Protection',
    icon: '/insurance/icons/mega-icon-property.svg',
    label: 'Solutions for Property & Asset Protection',
    solutions: [
      { num: '01', title: 'Commercial Property', desc: '\u2013 protect buildings, equipment, and inventory from damage.' },
      { num: '02', title: 'Motor Fleet', desc: '\u2013 comprehensive coverage for your business vehicle fleet.' },
      { num: '03', title: 'Luxury Insurance Coverage', desc: '\u2013 bespoke protection for high-value assets and collections.' },
    ],
  },
]

export const InsuranceMegaMenu: React.FC<InsuranceMegaMenuProps> = ({
  isActive = false,
  onMouseEnter,
  onMouseLeave,
  megaMenuData,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const handleToggle = () => {
    setIsOpen((prev) => !prev)
  }

  const handleClose = useCallback(() => {
    setIsOpen(false)
    onMouseLeave?.()
  }, [onMouseLeave])

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleClose])

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        handleClose()
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, handleClose])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  // Use CMS data if available, otherwise use defaults
  const hasCmsData = megaMenuData?.enabled && megaMenuData?.categories?.length
  const categories = hasCmsData
    ? megaMenuData.categories!.map((cat, i) => ({
        key: `cat-${i}`,
        title: cat.title || '',
        icon: '',
        label: `Solutions for ${cat.title}`,
        solutions: (cat.items || []).map((item, j) => ({
          num: String(j + 1).padStart(2, '0'),
          title: item.title || '',
          desc: item.description || '',
          link: item.link,
        })),
      }))
    : defaultCategories

  const activeCat = categories[activeCategory] || categories[0]

  return (
    <div ref={menuRef} style={{ position: 'relative' }}>
      {/* Trigger Button */}
      <button
        className={`inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
          isActive || isOpen
            ? 'bg-primary/5 text-primary'
            : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
        }`}
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Insurance solutions
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Mega Menu Overlay */}
      <div className={`${styles.megaMenu} ${isOpen ? styles.megaMenuOpen : ''}`}>
        <div className={styles.megaMenuInner}>
          {/* Left: Category sidebar */}
          <div className={styles.megaMenuSidebar}>
            <span className={styles.megaMenuSidebarLabel}>Our insurance solutions</span>
            <div className={styles.megaMenuCategories}>
              {categories.map((cat, i) => (
                <button
                  key={cat.key}
                  className={`${styles.megaMenuCategory} ${i === activeCategory ? styles.megaMenuCategoryActive : ''}`}
                  onMouseEnter={() => setActiveCategory(i)}
                  onClick={() => setActiveCategory(i)}
                >
                  {cat.icon && (
                    <span className={styles.megaMenuCategoryIcon}>
                      <img src={cat.icon} alt="" width="24" height="24" />
                    </span>
                  )}
                  <span
                    className={styles.megaMenuCategoryText}
                    style={{ whiteSpace: 'pre-line' }}
                  >
                    {cat.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Solutions content */}
          <div className={styles.megaMenuContent}>
            <span className={styles.megaMenuContentLabel}>{activeCat.label}</span>

            <div className={styles.megaMenuSolutionsGrid}>
              {activeCat.solutions.map((sol, j) => (
                <div key={j} className={styles.megaMenuSolution}>
                  <h4>
                    <span className={styles.megaMenuSolutionNum}>{sol.num}</span>
                    {sol.title}
                  </h4>
                  <p>{sol.desc}</p>
                  {'link' in sol && sol.link ? (
                    <CMSLink
                      {...(sol.link as any)}
                      appearance="link"
                      className={styles.megaMenuSolutionLink}
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid #45cbef',
                          borderRadius: '9999px',
                          width: '29px',
                          height: '20px',
                          flexShrink: 0,
                        }}>
                          <svg viewBox="0 0 13 9" fill="none" width="13" height="9">
                            <path d="M8.19 1.69L11 4.5M11 4.5L8.19 7.33M11 4.5H1.87" stroke="#45cbef" strokeWidth="0.81" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        Learn more
                      </span>
                    </CMSLink>
                  ) : (
                    <a href="#" className={styles.megaMenuSolutionLink}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid #45cbef',
                        borderRadius: '9999px',
                        width: '29px',
                        height: '20px',
                        flexShrink: 0,
                      }}>
                        <svg viewBox="0 0 13 9" fill="none" width="13" height="9">
                          <path d="M8.19 1.69L11 4.5M11 4.5L8.19 7.33M11 4.5H1.87" stroke="#45cbef" strokeWidth="0.81" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      Learn more
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA bar */}
        <div className={styles.megaMenuDivider} />
        <div className={styles.megaMenuBottom}>
          <div className={styles.megaMenuBottomText}>
            <strong>Need help choosing the right coverage?</strong>
            <span>Our specialists are here to help</span>
          </div>
          {megaMenuData?.ctaButtons?.primaryCta?.link ? (
            <CMSLink
              {...megaMenuData.ctaButtons.primaryCta.link}
              appearance="default"
              className={styles.megaMenuBottomCta}
            >
              {megaMenuData.ctaButtons.primaryCta.label || 'Request a quote today'}
            </CMSLink>
          ) : (
            <a href="#contact" className={styles.megaMenuBottomCta} onClick={handleClose}>
              Request a quote today
              <img src="/insurance/icons/arrow-right-white.svg" alt="" width="24" height="24" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
