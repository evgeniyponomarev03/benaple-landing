import React from 'react'

import type { PricingEnhancedBlock as PricingEnhancedBlockProps } from '@/payload-types'

import {
  PricingComparison,
  type PricingPlan,
  type PricingFeature,
} from '@/components/PricingComparison'

export const PricingEnhancedBlockComponent: React.FC<
  PricingEnhancedBlockProps & {
    disableInnerContainer?: boolean
  }
> = ({
  title,
  subtitle,
  currency,
  variant,
  showFeatureComparison,
  showCurrencyToggle,
  dirhamCurrency,
  billingToggle,
  plans,
  disableInnerContainer,
}) => {
  const mappedPlans: PricingPlan[] = (plans || []).map(
    (plan, index) => {
      const mappedFeatures: PricingFeature[] = (
        plan.features || []
      ).map((feature) => {
        let included: boolean | 'partial' | string

        switch (feature.included) {
          case 'true':
            included = true
            break
          case 'false':
            included = false
            break
          case 'partial':
            included = 'partial'
            break
          case 'custom':
            included = feature.customText || ''
            break
          default:
            included = false
        }

        return {
          name: feature.name || '',
          included,
          description: feature.description || undefined,
        }
      })

      return {
        id: `plan-${index}`,
        name: plan.name || '',
        description: plan.description || '',
        price: {
          amount:
            plan.price?.customAmount ||
            plan.price?.amount ||
            0,
          originalAmount:
            plan.price?.originalAmount || undefined,
          periodText: plan.price?.periodText || '',
          yearlyAmount:
            plan.price?.yearlyCustomAmount ||
            plan.price?.yearlyAmount ||
            undefined,
          yearlyOriginalAmount: undefined, // Can be added later if needed
        },
        features: mappedFeatures,
        button: {
          text: plan.buttonText || 'Get Started',
          href: plan.buttonUrl || undefined,
          variant:
            (plan.buttonVariant as
              | 'primary'
              | 'secondary'
              | 'outline') || 'primary',
        },
        badge: plan.badge || undefined,
        popular: plan.popular || false,
        highlight: plan.highlight || false,
        disabled: plan.disabled || false,
        showDirhamSymbol: plan.showDirhamSymbol || false,
      }
    },
  )

  const billingToggleConfig = billingToggle?.enabled
    ? {
        monthly: billingToggle.monthlyLabel || 'Monthly',
        yearly: billingToggle.yearlyLabel || 'Yearly',
        discount: billingToggle.discount || undefined,
      }
    : undefined

  return (
    <div
      className={
        disableInnerContainer ? 'container' : 'container'
      }
    >
      <PricingComparison
        title={title || undefined}
        subtitle={subtitle || undefined}
        plans={mappedPlans}
        currency={currency || '$'}
        billingToggle={billingToggleConfig}
        variant={variant as 'cards' | 'table' | 'minimal'}
        showFeatureComparison={
          showFeatureComparison ?? false
        }
        showCurrencyToggle={showCurrencyToggle ?? false}
        dirhamCurrency={dirhamCurrency || 'AED'}
      />
    </div>
  )
}
