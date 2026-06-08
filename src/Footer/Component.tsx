import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'
import {
  Instagram,
  Linkedin,
  Facebook,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { TransitionLink } from '@/components/TransitionLink'
import { Logo } from '@/components/Logo/Logo'

const iconMap = {
  phone: Phone,
  email: Mail,
  address: MapPin,
}

export async function Footer() {
  const footerData: Footer = await getCachedGlobal(
    'footer',
    1,
  )()

  const navItems = footerData?.navItems || []
  const socialMedia = footerData?.socialMedia
  const columns = footerData?.columns || []

  return (
    <footer className="bg-brand-dark mt-auto hidden text-brand-primary">
      <div className="container py-12">
        {/* Footer Columns */}
        {columns.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            {columns.map((column, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 md:gap-2"
              >
                {column.title && (
                  <h3 className="mb-2 font-semibold text-brand-primary">
                    {column.title}
                  </h3>
                )}
                {column.items?.map((item, j) => {
                  const Icon =
                    item.type && item.type !== 'text'
                      ? iconMap[
                          item.type as keyof typeof iconMap
                        ]
                      : null

                  const content = (
                    <span className="flex items-start gap-2">
                      {Icon && (
                        <Icon className="mt-0.5 h-4 w-4 flex-shrink-0" />
                      )}
                      <span className="text-base leading-relaxed text-brand-primary transition-colors hover:text-brand-primary/50 md:text-sm">
                        {item.text}
                      </span>
                    </span>
                  )

                  if (item.link) {
                    return (
                      <a
                        key={j}
                        href={item.link}
                        className="text-brand-primary transition-colors hover:text-brand-primary/50"
                      >
                        {content}
                      </a>
                    )
                  }

                  return <div key={j}>{content}</div>
                })}
              </div>
            ))}
          </div>
        )}

        {/* Bottom Section */}
        <div className="mt-12 flex flex-col gap-6 border-t border-white/20 pt-4 md:flex-row md:items-center md:justify-between md:pt-8">
          {/* Logo */}
          <TransitionLink
            className="flex items-center"
            href="/"
          >
            <Logo />
          </TransitionLink>

          {/* Navigation Links Row */}
          <nav className="m-[-8px] flex flex-row gap-6 md:flex-1 md:justify-center md:gap-4">
            {navItems.map(({ link }, i) => {
              return (
                <CMSLink
                  className="p-2 text-[13px] text-brand-primary hover:text-brand-primary/50 md:text-base"
                  key={i}
                  {...link}
                />
              )
            })}
          </nav>

          {/* Social Media Icons */}
          {socialMedia && (
            <div className="flex items-center gap-4">
              {socialMedia.instagram && (
                <a
                  href={socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-primary transition-colors hover:text-brand-primary/50"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {socialMedia.linkedin && (
                <a
                  href={socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-primary transition-colors hover:text-brand-primary/50"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {socialMedia.facebook && (
                <a
                  href={socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-primary transition-colors hover:text-brand-primary/50"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}
