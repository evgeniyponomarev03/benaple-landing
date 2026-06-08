'use client'

import React, { useState } from 'react'
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

interface MobileInsuranceMenuProps {
  isActive?: boolean
  megaMenuData?: Header['insuranceMegaMenu']
}

export const MobileInsuranceMenu: React.FC<
  MobileInsuranceMenuProps
> = ({ isActive = false, megaMenuData }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="space-y-4">
      {/* Main Insurance Link */}
      <div className="flex items-center justify-between">
        {isActive ? (
          <span className="flex cursor-default items-center text-2xl font-semibold text-primary">
            Insurance
          </span>
        ) : (
          <TransitionLink
            href="/insurance"
            className="flex items-center text-2xl font-semibold text-gray-900 transition-colors hover:text-primary"
          >
            Insurance
          </TransitionLink>
        )}

        {/* Only show expand button if mega menu is enabled and has categories */}
        {megaMenuData?.enabled &&
          megaMenuData?.categories?.length && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="rounded-lg p-2 transition-colors hover:bg-gray-100"
              aria-expanded={isExpanded}
            >
              <ChevronDown
                className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>
          )}
      </div>

      {/* Expandable Categories */}
      {megaMenuData?.enabled &&
        megaMenuData?.categories?.length && (
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isExpanded
                ? 'max-h-screen opacity-100'
                : 'max-h-0 opacity-0'
            }`}
          >
            <div className="space-y-4 pl-4">
              {megaMenuData.categories.map(
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
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900">
                            {category.title}
                          </h4>
                          {category.description && (
                            <p className="text-xs text-gray-600">
                              {category.description}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Category Items */}
                      <div className="ml-8 space-y-1">
                        {category.items?.map(
                          (item, itemIndex) => (
                            <div
                              key={itemIndex}
                              className="block rounded-lg p-2 transition-colors hover:bg-gray-50"
                            >
                              <CMSLink
                                {...item.link}
                                appearance="link"
                                className="text-sm font-medium text-gray-900 transition-colors hover:text-primary"
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

              {/* Quick Actions */}
              <div className="space-y-3 border-t border-gray-200 pt-4">
                {megaMenuData.ctaButtons?.secondaryCta
                  ?.link && (
                  <CMSLink
                    {...megaMenuData.ctaButtons.secondaryCta
                      .link}
                    appearance="outline"
                    className="block rounded-full border border-gray-300 bg-white px-4 py-3 text-center text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
                  >
                    {megaMenuData.ctaButtons.secondaryCta
                      .label ||
                      'Contact Insurance Specialist'}
                  </CMSLink>
                )}
                {megaMenuData.ctaButtons?.primaryCta
                  ?.link && (
                  <CMSLink
                    {...megaMenuData.ctaButtons.primaryCta
                      .link}
                    appearance="default"
                    className="block rounded-full bg-primary px-4 py-3 text-center text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary/90"
                  >
                    {megaMenuData.ctaButtons.primaryCta
                      .label || 'Get Insurance Quote'}
                  </CMSLink>
                )}
              </div>
            </div>
          </div>
        )}
    </div>
  )
}
