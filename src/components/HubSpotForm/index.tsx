'use client'

import React, { useEffect, useRef } from 'react'

declare global {
  interface Window {
    hbspt: {
      forms: {
        create: (options: {
          portalId: string
          formId: string
          region: string
          target?: string
        }) => void
      }
    }
  }
}

interface HubSpotFormProps {
  portalId: string
  formId: string
  region?: string
  className?: string
  formClassName?: string
  loading?: string
  target?: string
  css?: string
  inlineMessage?: string
  redirect?: string
}

export const HubSpotForm: React.FC<HubSpotFormProps> = ({
  portalId,
  formId,
  region = 'na1',
  className = '',
  formClassName = '',
  loading,
  target,
  css,
  inlineMessage,
  redirect,
}) => {
  const formRef = useRef<HTMLDivElement>(null)
  const formCreated = useRef(false)

  useEffect(() => {
    // Load HubSpot script if not already loaded
    if (!document.querySelector('script[src*="js.hsforms.net"]')) {
      const script = document.createElement('script')
      script.src = '//js.hsforms.net/forms/embed/v2.js'
      script.charset = 'utf-8'
      script.type = 'text/javascript'
      script.async = true
      document.head.appendChild(script)
    }

    // Create form when script is loaded
    const createForm = () => {
      if (window.hbspt && formRef.current && !formCreated.current) {
        const formConfig: any = {
          portalId,
          formId,
          region,
          target: target || `#hubspot-form-${formId}`,
        }

        // Add optional configuration
        if (css) formConfig.css = css
        if (loading) formConfig.loading = loading
        if (inlineMessage) formConfig.inlineMessage = inlineMessage
        if (redirect) formConfig.redirectUrl = redirect

        window.hbspt.forms.create(formConfig)
        formCreated.current = true
      }
    }

    // Check if HubSpot is already loaded
    if (window.hbspt) {
      createForm()
    } else {
      // Wait for script to load
      const checkForHubSpot = setInterval(() => {
        if (window.hbspt) {
          createForm()
          clearInterval(checkForHubSpot)
        }
      }, 100)

      return () => clearInterval(checkForHubSpot)
    }
  }, [portalId, formId, region])

  return (
    <div className={className}>
      <div 
        id={`hubspot-form-${formId}`} 
        ref={formRef}
        className={`hubspot-form-container ${formClassName}`}
      />
    </div>
  )
}

export default HubSpotForm