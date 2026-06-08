'use client'
import React from 'react'
import {
  HRFeatureShowcase,
  HRIcons,
} from '../HRFeatureShowcase'
import { TestimonialGrid } from '../TestimonialCard'
import { StatsDisplay, StatIcons } from '../StatsDisplay'
import { CallToAction, CTAVariants } from '../CallToAction'
import { FeatureGrid, HRFeatureSets } from '../FeatureGrid'
import { PricingComparison } from '../PricingComparison'

// Example data for HR features
const hrFeatures = [
  {
    id: 'employee-management',
    title: 'Employee Management',
    description:
      'Centralize all employee information in one secure, easy-to-access platform with powerful search and filtering capabilities.',
    icon: <HRIcons.Users />,
    highlight: true,
  },
  {
    id: 'time-tracking',
    title: 'Smart Time Tracking',
    description:
      'Automated time tracking with GPS integration, break monitoring, and overtime calculations.',
    icon: <HRIcons.Clock />,
  },
  {
    id: 'performance',
    title: 'Performance Analytics',
    description:
      'Real-time insights into team performance with customizable dashboards and reporting.',
    icon: <HRIcons.Chart />,
  },
  {
    id: 'compliance',
    title: 'Compliance Management',
    description:
      'Stay compliant with labor laws and regulations with automated alerts and documentation.',
    icon: <HRIcons.Shield />,
  },
]

// Example testimonials
const testimonials = [
  {
    id: 'testimonial-1',
    content:
      'Beneple has completely transformed how we manage our HR processes. The time tracking feature alone has saved us 10 hours per week.',
    author: {
      name: 'Sarah Johnson',
      role: 'HR Director',
      company: 'TechCorp Inc.',
    },
    rating: 5 as const,
    featured: true,
  },
  {
    id: 'testimonial-2',
    content:
      'The employee onboarding process is now seamless. New hires love the self-service portal and automated workflows.',
    author: {
      name: 'Michael Chen',
      role: 'People Operations Manager',
      company: 'StartupXYZ',
    },
    rating: 5 as const,
  },
  {
    id: 'testimonial-3',
    content:
      "Our employee satisfaction scores have increased by 25% since implementing Beneple's performance management tools.",
    author: {
      name: 'Emily Rodriguez',
      role: 'Chief Human Resources Officer',
      company: 'Global Solutions Ltd.',
    },
    rating: 4 as const,
  },
]

// Example statistics
const hrStats = [
  {
    id: 'employees-managed',
    label: 'Employees Managed',
    value: 50000,
    suffix: '+',
    icon: <StatIcons.Employees />,
    trend: {
      value: 12,
      isPositive: true,
      period: 'this quarter',
    },
    highlight: true,
  },
  {
    id: 'time-saved',
    label: 'Hours Saved Weekly',
    value: 2500,
    icon: <StatIcons.Productivity />,
    description: 'Automated HR processes',
  },
  {
    id: 'satisfaction',
    label: 'Employee Satisfaction',
    value: 98,
    suffix: '%',
    icon: <StatIcons.Satisfaction />,
    trend: {
      value: 8,
      isPositive: true,
      period: 'vs last year',
    },
  },
  {
    id: 'retention',
    label: 'Employee Retention',
    value: 94,
    suffix: '%',
    icon: <StatIcons.Retention />,
    trend: {
      value: 5,
      isPositive: true,
      period: 'improvement',
    },
  },
]

// Example pricing plans
const pricingPlans = [
  {
    id: 'starter',
    name: 'Starter',
    description:
      'Perfect for small teams getting started with HR automation',
    price: {
      amount: 5,
      currency: '$',
      period: 'employee/month',
    },
    features: [
      { name: 'Employee Database', included: true },
      { name: 'Basic Time Tracking', included: true },
      { name: 'Leave Management', included: true },
      { name: 'Email Support', included: true },
      { name: 'Performance Reviews', included: false },
      { name: 'Advanced Analytics', included: false },
      { name: 'Custom Integrations', included: false },
    ],
    button: {
      text: 'Start Free Trial',
      variant: 'outline' as const,
    },
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Advanced features for growing companies',
    price: {
      amount: 12,
      currency: '$',
      period: 'employee/month',
      originalAmount: 15,
    },
    features: [
      { name: 'Employee Database', included: true },
      { name: 'Advanced Time Tracking', included: true },
      { name: 'Leave Management', included: true },
      { name: 'Priority Support', included: true },
      { name: 'Performance Reviews', included: true },
      { name: 'Basic Analytics', included: true },
      { name: 'API Access', included: 'partial' },
      { name: 'Custom Integrations', included: false },
    ],
    button: {
      text: 'Get Started',
      variant: 'primary' as const,
    },
    badge: 'Most Popular',
    highlight: true,
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description:
      'Full-featured solution for large organizations',
    price: {
      amount: 'Custom',
      period: '',
    },
    features: [
      { name: 'Employee Database', included: true },
      { name: 'Advanced Time Tracking', included: true },
      { name: 'Leave Management', included: true },
      { name: '24/7 Dedicated Support', included: true },
      { name: 'Performance Reviews', included: true },
      { name: 'Advanced Analytics', included: true },
      { name: 'Full API Access', included: true },
      { name: 'Custom Integrations', included: true },
      { name: 'Single Sign-On (SSO)', included: true },
      { name: 'Advanced Security', included: true },
    ],
    button: {
      text: 'Contact Sales',
      variant: 'outline' as const,
    },
  },
]

export const HRLandingExample: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-brand-primary">
      {/* Hero Section with Call-to-Action */}
      <section className="container py-20">
        <CallToAction
          {...CTAVariants.StartTrial({
            title: 'Transform Your HR Operations Today',
            subtitle: 'Modern HR Platform',
            description:
              'Streamline employee management, automate workflows, and boost productivity with our comprehensive HR platform trusted by 10,000+ companies worldwide.',
            size: 'xl',
            background: 'pattern',
          })}
        />
      </section>

      {/* Statistics Section */}
      <section className="container">
        <StatsDisplay
          title="Trusted by Companies Worldwide"
          subtitle="See the impact of modern HR management"
          stats={hrStats}
          animated={true}
        />
      </section>

      {/* Features Showcase */}
      <section className="container">
        <HRFeatureShowcase
          title="Everything You Need for Modern HR"
          subtitle="Powerful features designed to simplify your HR processes and empower your team"
          features={hrFeatures}
          columns={2}
        />
      </section>

      {/* Feature Grid */}
      <section className="container">
        <FeatureGrid
          title="Comprehensive HR Solutions"
          subtitle="Discover all the tools you need to manage your workforce effectively"
          features={[
            ...HRFeatureSets.Core,
            ...HRFeatureSets.Advanced,
          ]}
          layout="mixed"
          variant="modern"
        />
      </section>

      {/* Testimonials */}
      <section className="container">
        <TestimonialGrid
          title="What Our Customers Say"
          subtitle="Join thousands of satisfied customers who have transformed their HR operations"
          testimonials={testimonials}
          columns={3}
          variant="default"
        />
      </section>

      {/* Pricing */}
      <section className="container">
        <PricingComparison
          title="Choose Your Plan"
          subtitle="Flexible pricing for teams of all sizes"
          plans={pricingPlans}
          billingToggle={{
            monthly: 'Monthly',
            yearly: 'Yearly',
            discount: 'Save 20%',
          }}
          variant="cards"
        />
      </section>

      {/* Final Call-to-Action */}
      <section className="container py-20">
        <CallToAction
          {...CTAVariants.Contact({
            title: 'Ready to Get Started?',
            description:
              'Join thousands of companies already using our platform to streamline their HR operations.',
            buttons: [
              {
                text: 'Start Free Trial',
                variant: 'primary',
              },
              { text: 'Schedule Demo', variant: 'outline' },
            ],
            variant: 'centered',
            background: 'solid',
          })}
        />
      </section>
    </div>
  )
}
