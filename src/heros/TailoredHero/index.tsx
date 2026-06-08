'use client'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { useHeaderTheme } from '@/providers/HeaderTheme'

export const TailoredHero: React.FC<Page['hero']> = ({
  links,
  media,
  richText,
  primaryText,
  secondaryText,
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  })

  return (
    <section className="relative overflow-hidden h-full -mt-[6.5rem] pt-28 min-h-screen bg-[radial-gradient(ellipse_60%_40%_at_bottom,_var(--tw-gradient-stops))] from-blue-400/40 via-blue-200/20 to-white">
      {/* Background Text "For You" - spans full width behind everything */}

      <div className="absolute inset-0 mt-[-240px] flex flex-col items-center text-center justify-center pr-8 lg:pr-16 pointer-events-none z-0 gap-4">
        {primaryText && (
          <h1 className="absolute text-[6rem] md:text-[8rem] lg:text-[8rem] w-[50%] pr-[48px] pb-[48px] text-right left-0 font-black text-brand-primary leading-[0.8] mb-6">
            {primaryText}
          </h1>
        )}
        {secondaryText && (
          <h2 className="absolute text-[6rem] md:text-[8rem] lg:text-[8rem] w-[50%] text-left pl-[128px] right-0 mt-[170px] font-black text-brand-primary leading-[0.8] mb-6">
            {secondaryText}
          </h2>
        )}
      </div>

      <div className="container h-full relative z-10  ">
        <div className="relative min-h-[80vh] flex items-end">
          {/* Main Text Content - Left Side */}
          <div className="relative z-20 max-w-lg">
            {/* Primary Text (e.g., "Tailored") */}

            {richText && (
              <RichText
                className="mb-8 [text-wrap:balance] prose-p:text-lg prose-p:text-gray-600 prose-p:mb-8 prose-p:max-w-md prose-p:leading-relaxed"
                data={richText}
                enableGutter={false}
              />
            )}

            {Array.isArray(links) && links.length > 0 && (
              <ul className="flex gap-4 flex-wrap">
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

          {/* Center Image with Blue Circle - Positioned more to the right */}
          <div className="absolute left-[50%] lg:left-[50%] top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-15">
            {/* Transparent PNG Image */}
            {media && typeof media === 'object' && (
              <div className="relative z-20 flex items-center justify-center">
                <Media
                  className=" w-80 h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem]"
                  imgClassName="object-contain w-full h-full"
                  priority
                  resource={media}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Half Circle Gradient at Bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[200px] pointer-events-none z-5">
        <div className="w-full h-full bg-gradient-to-t from-blue-500/20 via-blue-400/10 to-transparent rounded-t-full"></div>
      </div>
    </section>
  )
}
