'use client'

import React from 'react'
import RichText from '@/components/RichText'
import HubSpotForm from '@/components/HubSpotForm'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export type HubSpotFormBlockType = {
  blockName?: string
  blockType?: 'hubspotFormBlock'
  portalId: string
  formId: string
  region?: string
  customStyling?: {
    formClassName?: string
    customCSS?: string
    loadingText?: string
  }
  enableIntro?: boolean
  introContent?: SerializedEditorState
}

export const HubSpotFormBlock: React.FC<
  {
    id?: string
  } & HubSpotFormBlockType
> = (props) => {
  const {
    portalId,
    formId,
    region = 'na1',
    customStyling,
    enableIntro,
    introContent,
  } = props

  return (
    <div className="container lg:max-w-[56rem]">
      {enableIntro && introContent && (
        <RichText
          className="mb-8 lg:mb-12"
          data={introContent}
          enableGutter={false}
        />
      )}
      <div className="relative overflow-hidden rounded-2xl border border-gray-100 p-6 sm:p-8 lg:p-10">
        {/* Subtle gradient background */}
        <div className="backdrop-blur-2 absolute inset-0 bg-white/30" />

        <div className="relative">
          {customStyling?.customCSS && (
            <style jsx>{`
              ${customStyling.customCSS}
            `}</style>
          )}
          <HubSpotForm
            portalId={portalId}
            formId={formId}
            region={region}
            className="hubspot-form-wrapper"
            formClassName={customStyling?.formClassName}
            loading={customStyling?.loadingText}
            css={customStyling?.customCSS}
          />
        </div>
      </div>
    </div>
  )
}
