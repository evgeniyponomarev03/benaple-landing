'use client'

import React, { useState, useRef, useEffect } from 'react'
import {
  ChevronDown,
  Users,
  Shield,
  FileText,
  BarChart3,
  Building,
  Heart,
} from 'lucide-react'
import { TransitionLink } from '@/components/TransitionLink'
import { CMSLink } from '@/components/Link'
import type { Header } from '@/payload-types'

// Icon mapping for dynamic icon rendering
const iconMap = {
  users: Users,
  shield: Shield,
  fileText: FileText,
  barChart: BarChart3,
  building: Building,
  heart: Heart,
}

interface InsuranceMegaMenuProps {
  isActive?: boolean
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  megaMenuData?: Header['insuranceMegaMenu']
}

export const InsuranceMegaMenu: React.FC<
  InsuranceMegaMenuProps
> = ({
  isActive = false,
  onMouseEnter,
  onMouseLeave,
  megaMenuData,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsOpen(true)
    onMouseEnter?.()
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
      onMouseLeave?.()
    }, 150)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Don't render if mega menu is disabled or no data
  if (
    !megaMenuData?.enabled ||
    !megaMenuData?.categories?.length
  ) {
    console.log('InsuranceMegaMenu fallback:', {
      enabled: megaMenuData?.enabled,
      categoriesLength: megaMenuData?.categories?.length,
      megaMenuData,
    })
    return (
      <TransitionLink
        href="/insurance"
        className={`inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
          isActive
            ? 'bg-primary/5 text-primary'
            : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
        }`}
      >
        Solutions
      </TransitionLink>
    )
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger Button */}
      <button
        className={`inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
          isActive || isOpen
            ? 'bg-primary/5 text-primary'
            : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Solutions
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Mega Menu Dropdown */}
      <div
        className={`absolute right-0 top-full z-50 mt-2 w-[90vw] max-w-4xl transform transition-all duration-300 ${
          isOpen
            ? 'visible translate-y-0 opacity-100'
            : 'invisible -translate-y-2 opacity-0'
        }`}
      >
        <div className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5">
          <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8 text-center">
              <h3 className="text-xl font-semibold text-gray-900">
                {megaMenuData.title ||
                  'Insurance Solutions'}
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                {megaMenuData.subtitle ||
                  'Comprehensive coverage tailored for UAE businesses'}
              </p>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
              {megaMenuData.categories?.map(
                (category, categoryIndex) => {
                  const IconComponent =
                    iconMap[
                      category.icon as keyof typeof iconMap
                    ] || Shield

                  return (
                    <div
                      key={categoryIndex}
                      className="space-y-3"
                    >
                      {/* Category Header */}
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 rounded-lg bg-primary/10 p-2 text-primary">
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {category.title}
                          </h4>
                          {category.description && (
                            <p className="text-sm text-gray-600">
                              {category.description}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Category Items */}
                      <div className="ml-11 space-y-1">
                        {category.items?.map(
                          (item, itemIndex) => (
                            <div
                              key={itemIndex}
                              className="block w-full rounded-lg px-3 py-2 transition-colors hover:bg-gray-50"
                            >
                              <CMSLink
                                {...item.link}
                                appearance="link"
                                className="font-medium text-gray-900 transition-colors hover:text-primary"
                              >
                                {item.title}
                              </CMSLink>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )
                },
              )}
            </div>

            {/* Footer */}
            <div className="mt-8 border-t border-gray-100 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Need help choosing the right coverage?
                  </p>
                  <p className="text-sm text-gray-600">
                    Our specialists are here to help
                  </p>
                </div>
                <div className="flex gap-3">
                  {megaMenuData.ctaButtons?.secondaryCta
                    ?.link && (
                    <CMSLink
                      {...megaMenuData.ctaButtons
                        .secondaryCta.link}
                      appearance="outline"
                      className="inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
                    >
                      {megaMenuData.ctaButtons.secondaryCta
                        .label || 'Contact Us'}
                    </CMSLink>
                  )}
                  {megaMenuData.ctaButtons?.primaryCta
                    ?.link && (
                    <CMSLink
                      {...megaMenuData.ctaButtons.primaryCta
                        .link}
                      appearance="default"
                      className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary/90"
                    >
                      {megaMenuData.ctaButtons.primaryCta
                        .label || 'Get Quote'}
                    </CMSLink>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
