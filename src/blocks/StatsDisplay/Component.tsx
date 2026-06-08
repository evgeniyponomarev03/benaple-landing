import React from 'react'

import type { StatsDisplayBlock as StatsDisplayBlockProps } from '@/payload-types'

import {
  StatsDisplay,
  type StatItem,
} from '@/components/StatsDisplay'

// Define icons directly to avoid undefined import issues
const EmployeesIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
)

const RetentionIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
)

const ProductivityIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
)

const SatisfactionIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const GrowthIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 11l5-5m0 0l5 5m-5-5v12"
    />
  </svg>
)

const iconMap = {
  employees: <EmployeesIcon />,
  retention: <RetentionIcon />,
  productivity: <ProductivityIcon />,
  satisfaction: <SatisfactionIcon />,
  growth: <GrowthIcon />,
}

export const StatsDisplayBlockComponent: React.FC<
  StatsDisplayBlockProps & {
    disableInnerContainer?: boolean
  }
> = ({
  title,
  subtitle,
  layout,
  columns,
  animated,
  stats,
  disableInnerContainer,
}) => {
  const mappedStats: StatItem[] = (stats || []).map(
    (stat, index) => ({
      id: `stat-${index}`,
      label: stat.label || '',
      value: (() => {
        // If explicitly set to text value, use textValue
        if (stat.isTextValue) {
          return stat.textValue || ''
        }
        // If textValue exists and isTextValue is not explicitly false, prefer textValue
        if (
          stat.textValue &&
          stat.textValue.trim() !== ''
        ) {
          return stat.textValue
        }
        // Otherwise, use numeric value
        return typeof stat.value === 'string'
          ? parseFloat(stat.value) || 0
          : stat.value || 0
      })(),
      prefix: stat.prefix || undefined,
      suffix: stat.suffix || undefined,
      description: stat.description || undefined,
      icon: stat.icon
        ? iconMap[stat.icon as keyof typeof iconMap]
        : undefined,
      highlight: stat.highlight || false,
      trend: stat.trendValue
        ? {
            value: Math.abs(stat.trendValue),
            isPositive: stat.trendValue > 0,
            period: stat.trendPeriod || undefined,
          }
        : undefined,
    }),
  )

  return (
    <div
      className={disableInnerContainer ? '' : 'container'}
    >
      <StatsDisplay
        title={title || undefined}
        subtitle={subtitle || undefined}
        stats={mappedStats}
        layout={layout as 'grid' | 'horizontal' | 'cards'}
        columns={Number(columns) as 2 | 3 | 4 | 5}
        animated={animated ?? true}
      />
    </div>
  )
}
