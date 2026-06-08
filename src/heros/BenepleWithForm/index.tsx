'use client'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import HubSpotForm from '@/components/HubSpotForm'
import RichText from '@/components/RichText'
import { useHeaderTheme } from '@/providers/HeaderTheme'

export const BenepleWithFormHero: React.FC<Page['hero']> = ({
  primaryText,
  secondaryText,
  links,
  richText,
  formSettings,
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  })

  return (
    <section className="bg-red relative -mt-[6.5rem] flex min-h-[50vh] flex-col items-center overflow-hidden pt-28 md:flex-col md:justify-center">
      <div
        className="pointer-events-none absolute inset-0 z-50 bg-cover bg-center bg-no-repeat opacity-90"
        style={{
          backgroundImage: 'url(/img/Shadow.png)',
          maskImage:
            'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0) 100%)',
        }}
      />
      <div className="align-center container flex w-full flex-col justify-center md:flex-row md:items-start">
        {/* Text Content Section */}
        <div className="order-2 flex flex-col items-start pt-8 md:order-1 md:w-3/5 md:pt-8">
          <div className="max-w-[62ch]">
            {(primaryText || secondaryText) && (
              <h1 className="mb-6 text-4xl leading-tight [text-wrap:balance] prose-h1:text-3xl md:text-6xl">
                {primaryText && (
                  <span className="font-regular text-gray-900">
                    {primaryText}
                  </span>
                )}{' '}
                <br />
                {primaryText && secondaryText && ' '}
                {secondaryText && (
                  <span className="font-semibold text-brand-primary">
                    {secondaryText}
                  </span>
                )}
              </h1>
            )}
            {richText && (
              <RichText
                className="prose-p:font-regular mb-6 [text-wrap:balance] prose-h1:mb-4 prose-h1:text-[2rem] prose-p:text-[1.25rem] prose-p:leading-snug prose-p:text-gray-900 prose-h1:md:text-[2rem] md:prose-p:text-[1.5rem] md:prose-p:leading-snug"
                data={richText}
                enableGutter={false}
              />
            )}

            {Array.isArray(links) && links.length > 0 && (
              <ul className="flex flex-wrap gap-4">
                {links.map(({ link }, i) => {
                  return (
                    <li key={i}>
                      <CMSLink {...link} />
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>

        {/* Form Section */}
        <div className="relative order-1 mb-8 pt-8 md:order-2 md:mb-0 md:w-2/5 md:pt-8">
          {formSettings && (
            <div className="relative z-10 flex w-full items-center justify-center md:ml-6">
              <div className="w-full max-w-md md:max-w-lg lg:max-w-xl">
                <HubSpotForm
                  portalId={formSettings.portalId || '6136505'}
                  formId={formSettings.formId || '730dbe39-bef6-45e1-8788-e4dee7d7f916'}
                  region={formSettings.region || 'na1'}
                  className="hubspot-hero-form"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}