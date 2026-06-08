'use client'

import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { TransitionLink } from '@/components/TransitionLink'
import { MobileInsuranceMenu } from '@/components/MobileInsuranceMenu'
import { usePageTransition } from '@/providers/PageTransition'
import { useRouter, usePathname } from 'next/navigation'
import { cn } from '@/utilities/ui'

import type { Header } from '@/payload-types'

interface MobileMenuProps {
  data: Header
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  data,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Determine which page is currently active
  const isInsuranceActive =
    pathname?.startsWith('/insurance') || pathname === '/'
  const isHrActive =
    pathname?.startsWith('/home') ||
    pathname?.startsWith('/hr-platform')

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

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-lg p-2 transition-colors hover:bg-gray-100 md:hidden"
        aria-label="Toggle mobile menu"
        aria-expanded={isOpen}
      >
        <div className="relative h-6 w-6">
          <Menu
            className={`absolute inset-0 transition-all duration-300 ${
              isOpen
                ? 'rotate-90 opacity-0'
                : 'rotate-0 opacity-100'
            }`}
          />
          <X
            className={`absolute inset-0 transition-all duration-300 ${
              isOpen
                ? 'rotate-0 opacity-100'
                : '-rotate-90 opacity-0'
            }`}
          />
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 md:hidden ${
          isOpen
            ? 'opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`fixed inset-0 z-50 transform bg-white transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Menu
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-2 transition-colors hover:bg-gray-100"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Navigation Links */}
            <div className="flex flex-1 flex-col justify-center px-6">
              <nav className="space-y-8">
                {/* Insurance with Mega Menu */}
                <MobileInsuranceMenu
                  isActive={isInsuranceActive}
                  megaMenuData={data.insuranceMegaMenu}
                />

                {/* HR Platform */}
                <div className="block">
                  {isHrActive ? (
                    <span className="flex cursor-default items-center text-2xl font-semibold text-primary">
                      HR Platform
                    </span>
                  ) : (
                    <TransitionLink
                      href="/hr-platform-new"
                      className="flex items-center text-2xl font-semibold text-gray-900 transition-colors hover:text-primary"
                    >
                      HR Platform
                    </TransitionLink>
                  )}
                </div>
              </nav>

              {/* Contact Us Button */}
              <div className="mt-12">
                <TransitionLink
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
                >
                  Contact Us
                </TransitionLink>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 bg-gray-50 p-6">
            <div className="text-center">
              <TransitionLink href="/">
                <span className="text-sm text-gray-500 transition-colors hover:text-gray-700">
                  © 2025 Beneple
                </span>
              </TransitionLink>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
