'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { InsuranceMegaMenu } from '@/components/InsuranceMegaMenu'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({
  data,
}) => {
  const pathname = usePathname()
  const navItems = data?.navItems || []

  // Check if we're on an insurance page
  const isInsuranceActive =
    pathname?.startsWith('/insurance') || pathname === '/'

  return (
    <nav className="flex items-center gap-3">
      {/* Insurance Mega Menu */}
      <InsuranceMegaMenu
        isActive={isInsuranceActive}
        megaMenuData={data.insuranceMegaMenu}
      />

      {/* Other Navigation Items */}
      {navItems.map(({ link }, i) => {
        // Skip rendering insurance link if it exists in CMS since we're replacing it with mega menu
        if (
          link?.label?.toLowerCase().includes('insurance')
        ) {
          return null
        }
        // Skip rendering contact link since it's handled separately in the header
        if (
          link?.label?.toLowerCase().includes('contact')
        ) {
          return null
        }
        return <CMSLink key={i} {...link} />
      })}
    </nav>
  )
}
