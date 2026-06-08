'use client'
import React from 'react'
import { cn } from '@/utilities/ui'
import { Button } from '@/components/ui/button'
import { DirhamSymbol } from '@/components/DirhamSymbol'

export interface PricingFeature {
  name: string
  included: boolean | 'partial' | string
  description?: string
}

export interface PricingPlan {
  id: string
  name: string
  description: string
  price: {
    amount: number | string
    originalAmount?: number
    periodText?: string
    yearlyAmount?: number | string
    yearlyOriginalAmount?: number
  }
  features: PricingFeature[]
  button: {
    text: string
    href?: string
    onClick?: () => void
    variant?: 'primary' | 'secondary' | 'outline'
  }
  badge?: string
  popular?: boolean
  highlight?: boolean
  disabled?: boolean
  showDirhamSymbol?: boolean
}

export interface PricingComparisonProps {
  plans: PricingPlan[]
  title?: string
  subtitle?: string
  currency?: string
  billingToggle?: {
    monthly: string
    yearly: string
    discount?: string
  }
  className?: string
  cardClassName?: string
  variant?: 'cards' | 'table' | 'minimal' | 'featured-split'
  showFeatureComparison?: boolean
  showCurrencyToggle?: boolean
  dirhamCurrency?: string
}

export const PricingComparison: React.FC<
  PricingComparisonProps
> = ({
  plans,
  title,
  subtitle,
  currency = '$',
  billingToggle,
  className,
  cardClassName,
  variant = 'cards',
  showFeatureComparison = true,
  showCurrencyToggle = false,
  dirhamCurrency = 'AED',
}) => {
  const [isYearly, setIsYearly] = React.useState(false)
  const [showDirham, setShowDirham] = React.useState(false)

  const renderFeatureValue = (feature: PricingFeature) => {
    if (typeof feature.included === 'boolean') {
      return feature.included ? (
        <svg
          className="h-6 w-6 flex-shrink-0 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ) : (
        <svg
          className="h-6 w-6 flex-shrink-0 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      )
    }

    if (feature.included === 'partial') {
      return (
        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-yellow-400">
          <div className="h-2.5 w-2.5 rounded-full bg-white" />
        </div>
      )
    }

    return (
      <span className="text-center text-sm font-medium text-gray-600">
        {feature.included}
      </span>
    )
  }

  const renderPrice = (
    plan: PricingPlan,
    isHighlighted = false,
    isDisabled = false,
    isMobileCard = false,
  ) => {
    // Determine which amount to display based on billing toggle
    let amount: number | string
    if (
      isYearly &&
      billingToggle &&
      plan.price.yearlyAmount !== undefined
    ) {
      // Use the actual yearly amount if it exists
      amount = plan.price.yearlyAmount
    } else if (
      isYearly &&
      billingToggle &&
      typeof plan.price.amount === 'number'
    ) {
      // Fallback to calculated yearly price (10 months) if no yearly amount is set
      amount = plan.price.amount * 10
    } else {
      // Use monthly amount
      amount = plan.price.amount
    }

    const currentCurrency = showDirham
      ? dirhamCurrency
      : currency

    return (
      <div className="mb-4">
        <div className="flex items-baseline justify-center gap-1 text-center">
          <span
            className={cn(
              'text-3xl font-bold md:text-4xl',
              isDisabled
                ? 'text-xl text-gray-700 md:text-xl'
                : isHighlighted
                  ? 'text-white'
                  : 'text-gray-900',
            )}
          >
            {currentCurrency}
            {amount}
          </span>
          {(showDirham || plan.showDirhamSymbol) && (
            <DirhamSymbol
              className={
                isDisabled
                  ? 'text-gray-500'
                  : isHighlighted
                    ? 'text-white/80'
                    : 'text-gray-600'
              }
              size="md"
            />
          )}
        </div>

        {/* Period text */}
        {plan.price.periodText && (
          <div className="text-center">
            <span
              className={cn(
                'text-sm',
                isDisabled
                  ? 'text-gray-500'
                  : isHighlighted
                    ? 'text-white/80'
                    : 'text-gray-500',
              )}
            >
              {plan.price.periodText}
            </span>
          </div>
        )}

        {plan.price.originalAmount &&
          (!billingToggle || isYearly) && (
            <div className="mt-2 text-center">
              <span
                className={cn(
                  'text-sm line-through',
                  isDisabled
                    ? 'text-gray-400'
                    : isHighlighted
                      ? isMobileCard
                        ? 'text-gray-500'
                        : 'text-white/60'
                      : 'text-gray-400',
                )}
              >
                {currency}
                {billingToggle && isYearly
                  ? `${plan.price.originalAmount * 12}/year`
                  : `${plan.price.originalAmount}/month`}
              </span>
              <span
                className={cn(
                  'ml-2 text-sm font-semibold',
                  isDisabled
                    ? 'text-gray-500'
                    : isHighlighted
                      ? isMobileCard
                        ? 'text-green-600'
                        : 'text-green-300'
                      : 'text-green-600',
                )}
              >
                Save{' '}
                {billingToggle && isYearly
                  ? Math.round(
                      (1 -
                        Number(
                          plan.price.yearlyAmount !==
                            undefined
                            ? plan.price.yearlyAmount
                            : Number(plan.price.amount),
                        ) /
                          Number(
                            plan.price.originalAmount,
                          )) *
                        100,
                    )
                  : Math.round(
                      (1 -
                        Number(plan.price.amount) /
                          Number(
                            plan.price.originalAmount,
                          )) *
                        100,
                    )}
                %
              </span>
            </div>
          )}
      </div>
    )
  }

  // Featured Split Variant: 2/3 featured card on left, 1/3 stacked cards on right
  if (variant === 'featured-split') {
    const featuredPlan = plans.find((p) => p.highlight)
    const otherPlans = plans.filter((p) => !p.highlight)

    return (
      <div className={cn('py-12', className)}>
        {/* Header */}
        {(title || subtitle) && (
          <div className="mb-12 text-left md:text-center">
            {title && (
              <h2 className="mb-4 text-3xl font-semibold text-gray-900 md:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mx-auto max-w-3xl text-lg text-gray-600 md:text-xl">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Billing Toggle */}
        {billingToggle && (
          <div className="mb-8 flex justify-center">
            <div className="rounded-lg bg-gray-100 p-1">
              <button
                onClick={() => setIsYearly(false)}
                className={cn(
                  'rounded-md px-4 py-2 text-sm font-medium transition-colors',
                  !isYearly
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600',
                )}
              >
                {billingToggle.monthly}
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={cn(
                  'rounded-md px-4 py-2 text-sm font-medium transition-colors',
                  isYearly
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600',
                )}
              >
                {billingToggle.yearly}
                {billingToggle.discount && (
                  <span className="ml-2 rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                    {billingToggle.discount}
                  </span>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Currency Toggle */}
        {showCurrencyToggle && (
          <div className="mb-8 flex justify-center">
            <div className="rounded-lg bg-gray-100 p-1">
              <button
                onClick={() => setShowDirham(false)}
                className={cn(
                  'flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors',
                  !showDirham
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600',
                )}
              >
                {currency}
              </button>
              <button
                onClick={() => setShowDirham(true)}
                className={cn(
                  'flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors',
                  showDirham
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600',
                )}
              >
                {dirhamCurrency}
                <DirhamSymbol size="sm" />
              </button>
            </div>
          </div>
        )}

        {/* Split Layout: Featured left (2/3), Others right (1/3) */}
        <div className="">
          <div className="flex flex-col gap-6 lg:flex-row">
            {/* Left: Featured Card (2/3 width) */}
            {featuredPlan && (
              <div className="lg:w-2/3">
                <div
                  className={cn(
                    'relative h-full rounded-2xl border-2 border-brand-primary bg-brand-primary p-6 shadow-lg sm:p-8',
                    cardClassName,
                  )}
                >
                  {/* Badge */}
                  {featuredPlan.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
                      <span className="rounded-full bg-brand-secondary px-4 py-2 text-sm font-semibold text-white">
                        {featuredPlan.badge}
                      </span>
                    </div>
                  )}

                  {/* Header */}
                  <div className="mb-8 text-center">
                    <h3 className="mb-2 text-3xl font-semibold text-white">
                      {featuredPlan.name}
                    </h3>
                    <p className="mb-6 text-white/90">
                      {featuredPlan.description}
                    </p>
                    {renderPrice(
                      featuredPlan,
                      true,
                      featuredPlan.disabled,
                    )}

                    <Button
                      variant={
                        featuredPlan.disabled
                          ? 'outline'
                          : featuredPlan.button.variant ===
                              'primary'
                            ? 'default'
                            : featuredPlan.button.variant ||
                              'default'
                      }
                      size="lg"
                      className="w-full"
                      disabled={featuredPlan.disabled}
                      onClick={
                        featuredPlan.disabled
                          ? undefined
                          : featuredPlan.button.onClick
                      }
                      asChild={
                        !!featuredPlan.button.href &&
                        !featuredPlan.disabled
                      }
                    >
                      {featuredPlan.disabled ? (
                        'Coming Soon'
                      ) : featuredPlan.button.href ? (
                        <a href={featuredPlan.button.href}>
                          {featuredPlan.button.text}
                        </a>
                      ) : (
                        featuredPlan.button.text
                      )}
                    </Button>
                  </div>

                  {/* Features in 2 columns */}
                  {showFeatureComparison &&
                    featuredPlan.features &&
                    featuredPlan.features.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="border-b border-white/20 pb-2 font-semibold text-white">
                          Features included:
                        </h4>
                        <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                          {featuredPlan.features.map(
                            (feature, index) => (
                              <div
                                key={index}
                                className="flex items-start gap-3"
                              >
                                <div className="mt-0.5 flex-shrink-0">
                                  {renderFeatureValue(
                                    feature,
                                  )}
                                </div>
                                <div className="flex-1">
                                  <span className="text-white">
                                    {feature.name}
                                  </span>
                                  {feature.description && (
                                    <p className="mt-1 text-sm text-white/70">
                                      {feature.description}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    )}
                </div>
              </div>
            )}

            {/* Right: Other Cards Stacked (1/3 width) */}
            <div className="flex flex-col gap-6 lg:w-1/3">
              {otherPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={cn(
                    'relative rounded-2xl border p-6 transition-all duration-300',
                    plan.disabled
                      ? 'border-gray-200 bg-gray-50 opacity-60'
                      : 'border-gray-200 bg-white shadow-sm hover:shadow-lg',
                    cardClassName,
                  )}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <div className="mb-4">
                      <span className="inline-block rounded-full bg-brand-primary px-3 py-1 text-xs font-semibold text-white">
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  {/* Header */}
                  <div className="mb-6">
                    <h3 className="mb-2 text-xl font-semibold text-gray-900">
                      {plan.name}
                    </h3>
                    <p className="mb-4 text-sm text-gray-600">
                      {plan.description}
                    </p>
                    {renderPrice(
                      plan,
                      false,
                      plan.disabled,
                    )}
                  </div>

                  <Button
                    variant={
                      plan.disabled
                        ? 'outline'
                        : plan.button.variant === 'primary'
                          ? 'default'
                          : plan.button.variant || 'outline'
                    }
                    size="default"
                    className="w-full"
                    disabled={plan.disabled}
                    onClick={
                      plan.disabled
                        ? undefined
                        : plan.button.onClick
                    }
                    asChild={
                      !!plan.button.href && !plan.disabled
                    }
                  >
                    {plan.disabled ? (
                      'Coming Soon'
                    ) : plan.button.href ? (
                      <a href={plan.button.href}>
                        {plan.button.text}
                      </a>
                    ) : (
                      plan.button.text
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'table') {
    // Get all unique features
    const allFeatures = Array.from(
      new Set(
        plans.flatMap(
          (plan) => plan.features?.map((f) => f.name) || [],
        ),
      ),
    )

    // If no features exist across all plans, don't render the table
    if (allFeatures.length === 0) {
      return (
        <div className={cn('py-12', className)}>
          {/* Header */}
          {(title || subtitle) && (
            <div className="mb-12 text-left md:text-center">
              {title && (
                <h2 className="mb-4 text-3xl font-semibold text-gray-900 md:text-4xl">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="mx-auto max-w-3xl text-lg text-gray-600 md:text-xl">
                  {subtitle}
                </p>
              )}
            </div>
          )}

          {/* Billing Toggle */}
          {billingToggle && (
            <div className="mb-8 flex justify-center">
              <div className="rounded-lg bg-gray-100 p-1">
                <button
                  onClick={() => setIsYearly(false)}
                  className={cn(
                    'rounded-md px-4 py-2 text-sm font-medium transition-colors',
                    !isYearly
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600',
                  )}
                >
                  {billingToggle.monthly}
                </button>
                <button
                  onClick={() => setIsYearly(true)}
                  className={cn(
                    'rounded-md px-4 py-2 text-sm font-medium transition-colors',
                    isYearly
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600',
                  )}
                >
                  {billingToggle.yearly}
                  {billingToggle.discount && (
                    <span className="ml-2 rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                      {billingToggle.discount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Currency Toggle */}
          {showCurrencyToggle && (
            <div className="mb-8 flex justify-center">
              <div className="rounded-lg bg-gray-100 p-1">
                <button
                  onClick={() => setShowDirham(false)}
                  className={cn(
                    'flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors',
                    !showDirham
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600',
                  )}
                >
                  {currency}
                </button>
                <button
                  onClick={() => setShowDirham(true)}
                  className={cn(
                    'flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors',
                    showDirham
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600',
                  )}
                >
                  {dirhamCurrency}
                  <DirhamSymbol size="sm" />
                </button>
              </div>
            </div>
          )}

          {/* Pricing Cards without features */}
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={cn(
                  'relative rounded-2xl p-6 transition-all duration-300 sm:p-8',
                  plan.disabled
                    ? 'border border-gray-200 bg-gray-50 opacity-60'
                    : plan.highlight
                      ? 'border-2 border-brand-primary bg-brand-primary shadow-lg hover:scale-105'
                      : 'border border-gray-200 bg-white hover:scale-105 hover:shadow-lg',
                  plan.popular &&
                    !plan.disabled &&
                    'ring-2 ring-blue-500/20',
                  cardClassName,
                )}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
                    <span
                      className={cn(
                        'rounded-full px-4 py-2 text-sm font-semibold',
                        plan.highlight
                          ? 'bg-white text-brand-primary'
                          : 'bg-brand-primary text-white',
                      )}
                    >
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Header */}
                <div className="mb-8 text-left md:text-center">
                  <h3
                    className={cn(
                      'mb-2 text-2xl font-semibold',
                      plan.highlight
                        ? 'text-white'
                        : 'text-gray-900',
                    )}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={cn(
                      'mb-6',
                      plan.highlight
                        ? 'text-white/90'
                        : 'text-gray-600',
                    )}
                  >
                    {plan.description}
                  </p>
                  {renderPrice(
                    plan,
                    plan.highlight,
                    plan.disabled,
                  )}

                  <Button
                    variant={
                      plan.disabled
                        ? 'outline'
                        : plan.button.variant === 'primary'
                          ? 'default'
                          : plan.button.variant ||
                            (plan.highlight
                              ? 'default'
                              : 'outline')
                    }
                    size="lg"
                    className="w-full"
                    disabled={plan.disabled}
                    onClick={
                      plan.disabled
                        ? undefined
                        : plan.button.onClick
                    }
                    asChild={
                      !!plan.button.href && !plan.disabled
                    }
                  >
                    {plan.disabled ? (
                      'Coming Soon'
                    ) : plan.button.href ? (
                      <a href={plan.button.href}>
                        {plan.button.text}
                      </a>
                    ) : (
                      plan.button.text
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }

    return (
      <div className={cn('py-12', className)}>
        {/* Header */}
        {(title || subtitle) && (
          <div className="mb-12 text-left md:text-center">
            {title && (
              <h2 className="mb-4 text-3xl font-semibold text-gray-900 md:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mx-auto max-w-3xl text-lg text-gray-600 md:text-xl">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Billing Toggle */}
        {billingToggle && (
          <div className="mb-8 flex justify-center">
            <div className="rounded-lg bg-gray-100 p-1">
              <button
                onClick={() => setIsYearly(false)}
                className={cn(
                  'rounded-md px-4 py-2 text-sm font-medium transition-colors',
                  !isYearly
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600',
                )}
              >
                {billingToggle.monthly}
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={cn(
                  'rounded-md px-4 py-2 text-sm font-medium transition-colors',
                  isYearly
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600',
                )}
              >
                {billingToggle.yearly}
                {billingToggle.discount && (
                  <span className="ml-2 rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                    {billingToggle.discount}
                  </span>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Currency Toggle */}
        {showCurrencyToggle && (
          <div className="mb-8 flex justify-center">
            <div className="rounded-lg bg-gray-100 p-1">
              <button
                onClick={() => setShowDirham(false)}
                className={cn(
                  'flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors',
                  !showDirham
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600',
                )}
              >
                {currency}
              </button>
              <button
                onClick={() => setShowDirham(true)}
                className={cn(
                  'flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors',
                  showDirham
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600',
                )}
              >
                {dirhamCurrency}
                <DirhamSymbol size="sm" />
              </button>
            </div>
          </div>
        )}

        {/* Mobile: Card View */}
        <div className="mx-auto block max-w-7xl lg:hidden">
          <div className="space-y-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={cn(
                  'rounded-2xl border p-6',
                  plan.disabled
                    ? 'border-gray-200 bg-gray-50 opacity-60'
                    : plan.highlight
                      ? 'border-2 border-brand-primary bg-brand-primary shadow-lg'
                      : 'border-gray-200 bg-white shadow-sm',
                  plan.popular &&
                    !plan.disabled &&
                    'ring-2 ring-blue-500/20',
                )}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="mb-4">
                    <span
                      className={cn(
                        'inline-block rounded-full px-3 py-1 text-xs font-semibold',
                        plan.highlight
                          ? 'bg-white text-brand-primary'
                          : 'bg-brand-primary text-white',
                      )}
                    >
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Plan Header */}
                <h3
                  className={cn(
                    'mb-2 text-2xl font-bold',
                    plan.highlight
                      ? 'text-white'
                      : 'text-gray-900',
                  )}
                >
                  {plan.name}
                </h3>
                <p
                  className={cn(
                    'mb-4 text-sm',
                    plan.highlight
                      ? 'text-white/90'
                      : 'text-gray-600',
                  )}
                >
                  {plan.description}
                </p>

                {/* Price */}
                {renderPrice(
                  plan,
                  plan.highlight,
                  plan.disabled,
                  true, // isMobileCard
                )}

                {/* CTA Button */}
                <Button
                  variant={
                    plan.disabled
                      ? 'outline'
                      : plan.button.variant === 'primary'
                        ? 'default'
                        : plan.button.variant ||
                          (plan.highlight
                            ? 'default'
                            : 'outline')
                  }
                  size="lg"
                  className="mb-6 w-full"
                  disabled={plan.disabled}
                  onClick={
                    plan.disabled
                      ? undefined
                      : plan.button.onClick
                  }
                  asChild={
                    !!plan.button.href && !plan.disabled
                  }
                >
                  {plan.disabled ? (
                    'Coming Soon'
                  ) : plan.button.href ? (
                    <a href={plan.button.href}>
                      {plan.button.text}
                    </a>
                  ) : (
                    plan.button.text
                  )}
                </Button>

                {/* Features - Hide on disabled cards */}
                {!plan.disabled && (
                  <div
                    className={cn(
                      'space-y-3 border-t pt-6',
                      plan.highlight
                        ? 'border-white/20'
                        : 'border-gray-200',
                    )}
                  >
                    {allFeatures.map((featureName) => {
                      const feature = plan.features.find(
                        (f) => f.name === featureName,
                      )
                      const featureExistsInAnyPlan =
                        plans.some((p) =>
                          p.features.some(
                            (f) => f.name === featureName,
                          ),
                        )

                      return (
                        <div
                          key={featureName}
                          className="flex items-center justify-between gap-3"
                        >
                          <span
                            className={cn(
                              'text-sm',
                              plan.highlight
                                ? 'text-white'
                                : 'text-gray-700',
                            )}
                          >
                            {featureName}
                          </span>
                          <div className="flex-shrink-0">
                            {feature ? (
                              renderFeatureValue(feature)
                            ) : featureExistsInAnyPlan ? (
                              <svg
                                className="h-5 w-5 text-green-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2.5}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            ) : (
                              <svg
                                className="h-5 w-5 text-gray-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Table View */}
        <div className="mx-auto hidden max-w-7xl overflow-x-auto lg:block">
          <table className="w-full table-fixed border-collapse">
            {/* Header */}
            <thead>
              <tr>
                <th className="w-1/4 p-4 text-left font-medium text-gray-900"></th>
                {plans.map((plan) => (
                  <th
                    key={plan.id}
                    className={cn(
                      'p-4 text-center align-top',
                      // Give the highlighted (Core) plan extra space
                      plan.highlight && 'min-w-[340px]',
                    )}
                    style={{
                      width: `${75 / plans.length}%`,
                    }}
                  >
                    <div
                      className={cn(
                        'mx-1 rounded-xl p-6 text-center',
                        plan.disabled
                          ? 'backdrop-blur-2 border border-gray-100 bg-white bg-opacity-50 text-gray-900'
                          : plan.highlight
                            ? 'border-4 border-blue-200 bg-brand-primary text-white'
                            : 'bg-gray-50',
                        // Prevent inner card from shrinking and allow wider content
                        plan.highlight && 'max-w-none',
                      )}
                    >
                      {plan.badge && (
                        <span
                          className={cn(
                            'mb-3 inline-block rounded-full px-3 py-1 text-xs font-semibold',
                            plan.highlight
                              ? 'bg-white text-brand-primary'
                              : 'bg-brand-primary text-white',
                          )}
                        >
                          {plan.badge}
                        </span>
                      )}
                      <h3
                        className={cn(
                          'mb-3 text-2xl font-bold',
                          plan.disabled
                            ? 'text-gray-700'
                            : plan.highlight
                              ? 'text-white'
                              : 'text-gray-900',
                        )}
                      >
                        {plan.name}
                      </h3>
                      <p
                        className={cn(
                          'mb-6 text-sm',
                          plan.disabled
                            ? 'text-gray-600'
                            : plan.highlight
                              ? 'text-white/80'
                              : 'text-gray-600',
                        )}
                      >
                        {plan.description}
                      </p>
                      <div className="mb-6">
                        {renderPrice(
                          plan,
                          plan.highlight,
                          plan.disabled,
                        )}
                      </div>
                      <Button
                        variant={
                          plan.disabled
                            ? 'outline'
                            : plan.button.variant ===
                                'primary'
                              ? 'default'
                              : plan.button.variant ||
                                (plan.highlight
                                  ? 'secondary'
                                  : 'outline')
                        }
                        className={cn(
                          'w-full font-semibold',
                          plan.disabled
                            ? 'border-gray-300 bg-gray-200 text-gray-700'
                            : plan.highlight &&
                                'bg-white text-brand-primary hover:bg-gray-50',
                        )}
                        disabled={plan.disabled}
                        onClick={
                          plan.disabled
                            ? undefined
                            : plan.button.onClick
                        }
                        asChild={
                          !!plan.button.href &&
                          !plan.disabled
                        }
                      >
                        {plan.disabled ? (
                          'Coming Soon'
                        ) : plan.button.href ? (
                          <a href={plan.button.href}>
                            {plan.button.text}
                          </a>
                        ) : (
                          plan.button.text
                        )}
                      </Button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Features */}
            <tbody>
              {allFeatures.map((featureName, index) => (
                <tr
                  key={featureName}
                  className={cn(
                    'h-16 border-t border-gray-200',
                    index % 2 === 0
                      ? 'bg-gray-50/30'
                      : 'bg-white-50/30',
                  )}
                >
                  <td className="p-6 align-middle font-semibold text-gray-900">
                    {featureName}
                  </td>
                  {plans.map((plan) => {
                    const feature = plan.features.find(
                      (f) => f.name === featureName,
                    )

                    // Check if this feature exists in any plan
                    const featureExistsInAnyPlan =
                      plans.some((p) =>
                        p.features.some(
                          (f) => f.name === featureName,
                        ),
                      )

                    return (
                      <td
                        key={plan.id}
                        className="p-6 text-center align-middle"
                      >
                        <div className="flex items-center justify-center">
                          {feature ? (
                            renderFeatureValue(feature)
                          ) : featureExistsInAnyPlan ? (
                            // Show checkmark for features that exist in other plans
                            <svg
                              className="h-6 w-6 flex-shrink-0 text-green-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="h-6 w-6 text-gray-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          )}
                        </div>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  // Cards variant
  return (
    <div className={cn('py-12', className)}>
      {/* Header */}
      {(title || subtitle) && (
        <div className="mb-12 text-center">
          {title && (
            <h2 className="mb-4 text-3xl font-semibold text-gray-900 md:text-4xl">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mx-auto max-w-3xl text-lg text-gray-600 md:text-xl">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Billing Toggle */}
      {billingToggle && (
        <div className="mb-8 flex justify-center">
          <div className="rounded-lg bg-gray-100 p-1">
            <button
              onClick={() => setIsYearly(false)}
              className={cn(
                'rounded-md px-4 py-2 text-sm font-medium transition-colors',
                !isYearly
                  ? 'text-white-900 bg-white shadow-sm'
                  : 'text-gray-600',
              )}
            >
              {billingToggle.monthly}
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={cn(
                'rounded-md px-4 py-2 text-sm font-medium transition-colors',
                isYearly
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600',
              )}
            >
              {billingToggle.yearly}
              {billingToggle.discount && (
                <span className="ml-2 rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                  {billingToggle.discount}
                </span>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Currency Toggle */}
      {showCurrencyToggle && (
        <div className="mb-8 flex justify-center">
          <div className="rounded-lg bg-brand-secondary p-1">
            <button
              onClick={() => setShowDirham(false)}
              className={cn(
                'flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors',
                !showDirham
                  ? 'text-white-900 bg-brand-secondary shadow-sm'
                  : 'text-gray-600',
              )}
            >
              {currency}
            </button>
            <button
              onClick={() => setShowDirham(true)}
              className={cn(
                'flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors',
                showDirham
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600',
              )}
            >
              {dirhamCurrency}
              <DirhamSymbol size="sm" />
            </button>
          </div>
        </div>
      )}

      {/* Pricing Cards */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={cn(
              'relative rounded-2xl p-6 transition-all duration-300 sm:p-8',
              plan.disabled
                ? 'border border-gray-200 bg-gray-50 opacity-60'
                : plan.highlight
                  ? 'border-2 border-brand-primary bg-brand-primary shadow-lg hover:scale-105'
                  : 'border border-gray-200 bg-white hover:scale-105 hover:shadow-lg',
              plan.popular &&
                !plan.disabled &&
                'ring-2 ring-blue-500/20',
              cardClassName,
            )}
          >
            {/* Badge */}
            {plan.badge && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
                <span
                  className={cn(
                    'rounded-full px-4 py-2 text-sm font-semibold',
                    plan.highlight
                      ? 'bg-brand-primary text-brand-primary'
                      : 'bg-brand-primary text-white',
                  )}
                >
                  {plan.badge}
                </span>
              </div>
            )}

            {/* Header */}
            <div className="mb-8 text-left md:text-center">
              <h3
                className={cn(
                  'mb-2 text-2xl font-semibold',
                  plan.highlight
                    ? 'text-white'
                    : 'text-gray-900',
                )}
              >
                {plan.name}
              </h3>
              <p
                className={cn(
                  'mb-6',
                  plan.highlight
                    ? 'text-white/90'
                    : 'text-gray-600',
                )}
              >
                {plan.description}
              </p>
              {renderPrice(
                plan,
                plan.highlight,
                plan.disabled,
              )}

              <Button
                variant={
                  plan.disabled
                    ? 'outline'
                    : plan.button.variant === 'primary'
                      ? 'default'
                      : plan.button.variant ||
                        (plan.highlight
                          ? 'default'
                          : 'outline')
                }
                size="lg"
                className="w-full"
                disabled={plan.disabled}
                onClick={
                  plan.disabled
                    ? undefined
                    : plan.button.onClick
                }
                asChild={
                  !!plan.button.href && !plan.disabled
                }
              >
                {plan.disabled ? (
                  'Coming Soon'
                ) : plan.button.href ? (
                  <a href={plan.button.href}>
                    {plan.button.text}
                  </a>
                ) : (
                  plan.button.text
                )}
              </Button>
            </div>

            {/* Features */}
            {showFeatureComparison &&
              plan.features &&
              plan.features.length > 0 && (
                <div className="space-y-4">
                  <h4
                    className={cn(
                      'border-b pb-2 font-semibold',
                      plan.highlight
                        ? 'border-white/20 text-white'
                        : 'border-gray-200 text-gray-900',
                    )}
                  >
                    Features included:
                  </h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3"
                      >
                        <div className="mt-0.5 flex-shrink-0">
                          {renderFeatureValue(feature)}
                        </div>
                        <div className="flex-1">
                          <span
                            className={cn(
                              plan.highlight
                                ? 'text-white'
                                : 'text-gray-900',
                            )}
                          >
                            {feature.name}
                          </span>
                          {feature.description && (
                            <p
                              className={cn(
                                'mt-1 text-sm',
                                plan.highlight
                                  ? 'text-white/70'
                                  : 'text-gray-500',
                              )}
                            >
                              {feature.description}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  )
}
