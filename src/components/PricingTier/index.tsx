import React from 'react'
import { CMSLink } from '@/components/Link'

export interface PricingTierProps {
  name: string
  price: string
  yearlyPrice?: string
  period?: string
  description?: string
  features: string[]
  buttonText?: string
  buttonUrl?: string
  isPopular?: boolean
  isCustom?: boolean
  isYearly?: boolean
}

export const PricingTier: React.FC<PricingTierProps> = ({
  name,
  price,
  yearlyPrice,
  period = 'month',
  description,
  features,
  buttonText = 'Get Started',
  buttonUrl = '#',
  isPopular = false,
  isCustom = false,
  isYearly = false,
}) => {
  const displayPrice =
    isYearly && yearlyPrice ? yearlyPrice : price
  const displayPeriod = isYearly ? 'year' : period
  return (
    <div
      className={`relative rounded-2xl border p-8 ${
        isPopular
          ? 'border-brand-primary bg-white shadow-lg ring-2 ring-brand-primary/20'
          : 'border-gray-200 bg-white'
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="rounded-full bg-brand-primary px-4 py-1 text-sm font-medium text-white">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900">
          {name}
        </h3>
        {description && (
          <p className="mt-2 text-sm text-gray-600">
            {description}
          </p>
        )}

        <div className="mt-6">
          {isCustom ? (
            <div className="text-4xl font-semibold text-gray-900">
              Custom
            </div>
          ) : (
            <div className="flex items-baseline justify-center">
              <span className="text-4xl font-semibold text-gray-900">
                {displayPrice}
              </span>
              {displayPeriod && (
                <span className="ml-1 text-lg text-gray-600">
                  /{displayPeriod}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <ul className="mt-8 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg
              className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-brand-primary"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm text-gray-700">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <CMSLink
          type="custom"
          url={buttonUrl}
          label={buttonText}
          appearance={isPopular ? 'default' : 'outline'}
          className={`w-full justify-center ${
            isPopular
              ? 'bg-brand-primary text-white hover:bg-brand-primary/90'
              : 'border-brand-primary text-brand-primary hover:bg-brand-primary/10'
          }`}
          size="default"
        />
      </div>
    </div>
  )
}
