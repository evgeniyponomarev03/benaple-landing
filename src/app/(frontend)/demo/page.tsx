import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HR Components Demo | Beneple',
  description:
    'Explore our comprehensive HR management components with live examples and interactive elements.',
}
import { HRFeatureShowcase } from '@/components/HRFeatureShowcase/index'
import { StatsDisplay } from '@/components/StatsDisplay/index'
import { TestimonialGrid } from '@/components/TestimonialCard/index'
import { CallToAction } from '@/components/CallToAction/index'
import { FeatureGrid } from '@/components/FeatureGrid/index'
import { PricingComparison } from '@/components/PricingComparison/index'

// Create icon components directly
const UsersIcon = () => (
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
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
    />
  </svg>
)

const ClockIcon = () => (
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
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const ChartIcon = () => (
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
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
)

const ShieldIcon = () => (
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
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
)

const DocumentIcon = () => (
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
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
)

const CalendarIcon = () => (
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
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
)

// Demo data for HR Feature Showcase
const hrFeatures = [
  {
    id: 'employee-management',
    title: 'Employee Management',
    description:
      'Comprehensive employee database with detailed profiles, contact information, and organizational hierarchy visualization.',
    icon: <UsersIcon />,
    highlight: true,
  },
  {
    id: 'time-tracking',
    title: 'Smart Time Tracking',
    description:
      'Advanced time tracking with GPS integration, break monitoring, overtime calculations, and automated reporting.',
    icon: <ClockIcon />,
  },
  {
    id: 'performance',
    title: 'Performance Analytics',
    description:
      'Real-time insights into team performance with customizable dashboards, KPI tracking, and detailed reporting.',
    icon: <ChartIcon />,
  },
  {
    id: 'compliance',
    title: 'Compliance Management',
    description:
      'Stay compliant with labor laws and regulations through automated alerts, documentation, and audit trails.',
    icon: <ShieldIcon />,
  },
  {
    id: 'payroll',
    title: 'Payroll Processing',
    description:
      'Streamlined payroll processing with tax calculations, benefit deductions, and direct deposit management.',
    icon: <DocumentIcon />,
  },
  {
    id: 'scheduling',
    title: 'Shift Scheduling',
    description:
      'Intelligent shift scheduling with availability tracking, conflict resolution, and mobile notifications.',
    icon: <CalendarIcon />,
  },
]

// Create stat icon components directly
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
      d="M7 17l9.2-9.2M17 17V7H7"
    />
  </svg>
)

// Demo data for Statistics
const hrStats = [
  {
    id: 'employees-managed',
    label: 'Employees Managed',
    value: 12450,
    suffix: '+',
    icon: <EmployeesIcon />,
    trend: {
      value: 15,
      isPositive: true,
      period: 'this quarter',
    },
    highlight: true,
  },
  {
    id: 'time-saved',
    label: 'Hours Saved Weekly',
    value: 1850,
    icon: <ProductivityIcon />,
    description: 'Through automation',
  },
  {
    id: 'satisfaction',
    label: 'Employee Satisfaction',
    value: 96,
    suffix: '%',
    icon: <SatisfactionIcon />,
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
    icon: <RetentionIcon />,
    trend: {
      value: 5,
      isPositive: true,
      period: 'improvement',
    },
  },
  {
    id: 'growth',
    label: 'Company Growth',
    value: 23,
    suffix: '%',
    icon: <GrowthIcon />,
    trend: {
      value: 12,
      isPositive: true,
      period: 'annually',
    },
  },
]

// Demo data for Testimonials
const testimonials = [
  {
    id: 'testimonial-1',
    content:
      'Beneple has revolutionized our HR operations. The employee management system is intuitive and the time tracking feature has saved us countless hours every week. Our productivity has increased by 40%.',
    author: {
      name: 'Sarah Johnson',
      role: 'HR Director',
      company: 'TechCorp Industries',
    },
    rating: 5 as const,
    featured: true,
  },
  {
    id: 'testimonial-2',
    content:
      'The onboarding process is now completely seamless. New employees love the self-service portal and the automated workflows have reduced our paperwork by 80%. Highly recommended!',
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
      "Our employee satisfaction scores have increased by 25% since implementing Beneple's performance management tools. The analytics dashboard provides incredible insights.",
    author: {
      name: 'Emily Rodriguez',
      role: 'Chief Human Resources Officer',
      company: 'Global Solutions Ltd.',
    },
    rating: 4 as const,
  },
  {
    id: 'testimonial-4',
    content:
      'The compliance management features have been a game-changer. We no longer worry about labor law violations and the automated alerts keep us ahead of all regulations.',
    author: {
      name: 'David Thompson',
      role: 'Operations Director',
      company: 'Manufacturing Plus',
    },
    rating: 5 as const,
  },
  {
    id: 'testimonial-5',
    content:
      "Payroll processing used to take us days. Now it's done in hours with perfect accuracy. The integration with our accounting software is flawless.",
    author: {
      name: 'Lisa Wang',
      role: 'Finance Manager',
      company: 'Retail Dynamics',
    },
    rating: 5 as const,
  },
  {
    id: 'testimonial-6',
    content:
      'The shift scheduling feature has eliminated all our scheduling conflicts. Employees can easily request time off and the system automatically finds coverage.',
    author: {
      name: 'Robert Martinez',
      role: 'Store Manager',
      company: 'Service Excellence Co.',
    },
    rating: 4 as const,
  },
]

// Demo data for Feature Grid
const gridFeatures = [
  {
    id: 'recruitment',
    title: 'Smart Recruitment',
    description:
      'AI-powered candidate screening and automated interview scheduling with integrated background checks.',
    icon: <UsersIcon />,
    badge: 'New',
    size: 'large' as const,
  },
  {
    id: 'training',
    title: 'Learning Management',
    description:
      'Comprehensive training programs with progress tracking and certification management.',
    icon: <DocumentIcon />,
  },
  {
    id: 'benefits',
    title: 'Benefits Administration',
    description:
      'Streamlined benefits enrollment and management with real-time cost tracking.',
    icon: <ShieldIcon />,
    size: 'wide' as const,
  },
  {
    id: 'mobile',
    title: 'Mobile App',
    description:
      'Full-featured mobile application for employees and managers on the go.',
    icon: <CalendarIcon />,
  },
  {
    id: 'integrations',
    title: 'API Integrations',
    description:
      'Connect with 500+ popular business tools including Slack, Teams, and Salesforce.',
    icon: <ChartIcon />,
    size: 'tall' as const,
  },
  {
    id: 'security',
    title: 'Enterprise Security',
    description:
      'Bank-level security with SSO, 2FA, and comprehensive audit logs.',
    icon: <ShieldIcon />,
    badge: 'Enterprise',
  },
]

// Demo data for Pricing
const pricingPlans = [
  {
    id: 'starter',
    name: 'Starter',
    description:
      'Perfect for small teams getting started with HR automation',
    price: {
      amount: 8,
      currency: '$',
      period: 'employee/month',
    },
    features: [
      { name: 'Employee Database', included: true },
      { name: 'Basic Time Tracking', included: true },
      { name: 'Leave Management', included: true },
      { name: 'Email Support', included: true },
      { name: 'Mobile App Access', included: true },
      { name: 'Performance Reviews', included: false },
      { name: 'Advanced Analytics', included: false },
      { name: 'API Access', included: false },
      { name: 'Custom Integrations', included: false },
      { name: 'Priority Support', included: false },
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
      amount: 15,
      currency: '$',
      period: 'employee/month',
      originalAmount: 20,
    },
    features: [
      { name: 'Employee Database', included: true },
      { name: 'Advanced Time Tracking', included: true },
      { name: 'Leave Management', included: true },
      { name: 'Priority Support', included: true },
      { name: 'Mobile App Access', included: true },
      { name: 'Performance Reviews', included: true },
      { name: 'Basic Analytics', included: true },
      { name: 'API Access', included: 'partial' },
      { name: 'Payroll Integration', included: true },
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
      { name: 'Mobile App Access', included: true },
      { name: 'Performance Reviews', included: true },
      { name: 'Advanced Analytics', included: true },
      { name: 'Full API Access', included: true },
      { name: 'Custom Integrations', included: true },
      { name: 'Single Sign-On (SSO)', included: true },
      { name: 'Advanced Security', included: true },
      { name: 'Dedicated Account Manager', included: true },
    ],
    button: {
      text: 'Contact Sales',
      variant: 'outline' as const,
    },
    badge: 'Enterprise',
  },
]

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container py-8">
          <h1 className="mb-4 text-4xl font-semibold text-gray-900">
            HR Components Demo
          </h1>
          <p className="max-w-3xl text-xl text-gray-600">
            Explore our comprehensive HR management
            components with live examples and interactive
            elements.
          </p>
        </div>
      </div>

      {/* Hero Call-to-Action */}
      <section className="container py-16">
        <CallToAction
          title="Transform Your HR Operations Today"
          subtitle="Modern HR Platform"
          description="Streamline employee management, automate workflows, and boost productivity with our comprehensive HR platform trusted by 10,000+ companies worldwide."
          buttons={[
            {
              text: 'Start Free Trial',
              variant: 'primary',
            },
            { text: 'Schedule Demo', variant: 'outline' },
          ]}
          variant="centered"
          background="gradient"
          size="lg"
        />
      </section>

      {/* Statistics Section */}
      <section className="container py-16">
        <StatsDisplay
          title="Trusted by Companies Worldwide"
          subtitle="See the real impact of modern HR management on businesses of all sizes"
          stats={hrStats}
          animated={true}
          columns={5}
        />
      </section>

      {/* HR Features Showcase */}
      <section className="container py-16">
        <HRFeatureShowcase
          title="Everything You Need for Modern HR"
          subtitle="Powerful features designed to simplify your HR processes and empower your team to focus on what matters most"
          features={hrFeatures}
          columns={3}
          layout="grid"
        />
      </section>

      {/* Feature Grid */}
      <section className="container py-16">
        <FeatureGrid
          title="Advanced HR Solutions"
          subtitle="Discover additional tools and integrations that make your HR department more efficient and effective"
          features={gridFeatures}
          layout="mixed"
          variant="modern"
          columns={3}
        />
      </section>

      {/* Testimonials */}
      <section className="container py-16">
        <TestimonialGrid
          title="What Our Customers Say"
          subtitle="Join thousands of satisfied customers who have transformed their HR operations and improved employee satisfaction"
          testimonials={testimonials}
          columns={3}
          variant="default"
        />
      </section>

      {/* Pricing */}
      <section className="container py-16">
        <PricingComparison
          title="Choose Your Plan"
          subtitle="Flexible pricing options designed to grow with your business, from startups to enterprise organizations"
          plans={pricingPlans}
          billingToggle={{
            monthly: 'Monthly',
            yearly: 'Yearly',
            discount: 'Save 25%',
          }}
          variant="cards"
          currency="$"
        />
      </section>

      {/* Alternative Pricing Table View */}
      <section className="container mx-auto rounded-3xl bg-white px-6 py-16">
        <PricingComparison
          title="Compare All Features"
          subtitle="Detailed feature comparison to help you choose the perfect plan for your organization"
          plans={pricingPlans}
          variant="table"
          showFeatureComparison={true}
        />
      </section>

      {/* Final Call-to-Action */}
      <section className="container py-16">
        <CallToAction
          title="Ready to Get Started?"
          description="Join thousands of companies already using our platform to streamline their HR operations and improve employee satisfaction."
          buttons={[
            {
              text: 'Start Free Trial',
              variant: 'primary',
            },
            { text: 'Talk to Sales', variant: 'outline' },
          ]}
          variant="minimal"
          background="solid"
        />
      </section>

      {/* Component Variants Demo */}
      <section className="container py-16">
        <div className="space-y-16">
          {/* Stats Display Variants */}
          <div>
            <h2 className="mb-8 text-3xl font-semibold text-gray-900">
              Statistics Display Variants
            </h2>
            <div className="space-y-12">
              <div>
                <h3 className="mb-4 text-xl font-semibold text-gray-900">
                  Minimal Variant
                </h3>
                <StatsDisplay
                  stats={hrStats.slice(0, 4)}
                  layout="horizontal"
                />
              </div>
              <div>
                <h3 className="mb-4 text-xl font-semibold text-gray-900">
                  Default Variant
                </h3>
                <StatsDisplay
                  stats={hrStats.slice(0, 4)}
                  columns={4}
                />
              </div>
            </div>
          </div>

          {/* Testimonial Variants */}
          <div>
            <h2 className="mb-8 text-3xl font-semibold text-gray-900">
              Testimonial Variants
            </h2>
            <div className="space-y-12">
              <div>
                <h3 className="mb-4 text-xl font-semibold text-gray-900">
                  Minimal Variant
                </h3>
                <TestimonialGrid
                  testimonials={testimonials.slice(0, 3)}
                  variant="minimal"
                  showQuotes={false}
                  columns={3}
                />
              </div>
              <div>
                <h3 className="mb-4 text-xl font-semibold text-gray-900">
                  Featured Variant
                </h3>
                <TestimonialGrid
                  testimonials={testimonials.slice(0, 2)}
                  variant="featured"
                  columns={2}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
