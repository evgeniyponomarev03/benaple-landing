import React from 'react'
// import type { InsuranceFeaturesBlock as InsuranceFeaturesBlockProps } from '@/payload-types'
import { ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import RichText from '@/components/RichText'
import { InsuranceBuildingIcon } from '@/components/icons/InsuranceBuildingIcon'
import { InsuranceCorporateIcon } from '@/components/icons/InsuranceCorporateIcon'
import { InsuranceGroupIcon } from '@/components/icons/InsuranceGroupIcon'
import { InsuranceMedicalIcon } from '@/components/icons/InsuranceMedicalIcon'
import { InsuranceSpecialIcon } from '@/components/icons/InsuranceSpecialIcon'

// Licensed & Compliant Icon
const LicensedCompliantIcon = () => (
  <svg
    className="h-6 w-6"
    viewBox="0 0 33 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_50_2)">
      <path
        d="M9.26316 17.2106H15.2632"
        stroke="#1E558E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.26316 13.2106H15.2632"
        stroke="#1E558E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24.7632 21.2106C27.8007 21.2106 30.2632 18.7481 30.2632 15.7106C30.2632 12.673 27.8007 10.2106 24.7632 10.2106C21.7256 10.2106 19.2632 12.673 19.2632 15.7106C19.2632 18.7481 21.7256 21.2106 24.7632 21.2106Z"
        stroke="#1E558E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.2632 24.2106H5.26316C4.99794 24.2106 4.74359 24.1052 4.55605 23.9177C4.36852 23.7301 4.26316 23.4758 4.26316 23.2106V7.21057C4.26316 6.94535 4.36852 6.691 4.55605 6.50346C4.74359 6.31593 4.99794 6.21057 5.26316 6.21057H27.2632C27.5284 6.21057 27.7827 6.31593 27.9703 6.50346C28.1578 6.691 28.2632 6.94535 28.2632 7.21057V11.4681"
        stroke="#1E558E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.2632 19.9531V28.2106L24.7632 26.2106L28.2632 28.2106V19.9531"
        stroke="#1E558E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_50_2">
        <rect
          width="32"
          height="32"
          fill="white"
          transform="translate(0.263161 0.210571)"
        />
      </clipPath>
    </defs>
  </svg>
)

// Market-wide Access Icon
const MarketAccessIcon = () => (
  <svg
    className="h-6 w-6"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_50_9)">
      <path
        d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
        stroke="#1E558E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 16C21 24 16 28 16 28C16 28 11 24 11 16C11 8 16 4 16 4C16 4 21 8 21 16Z"
        stroke="#1E558E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.6825 12H27.3175"
        stroke="#1E558E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.6825 20H27.3175"
        stroke="#1E558E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_50_9">
        <rect width="32" height="32" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

// Specialist Advisors Icon
const SpecialistAdvisorsIcon = () => (
  <svg
    className="h-6 w-6"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_50_15)">
      <path
        d="M24 15C25.1645 14.9991 26.3131 15.2698 27.3547 15.7906C28.3963 16.3114 29.302 17.0679 30 18"
        stroke="#1E558E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 18C2.698 17.0679 3.60375 16.3114 4.6453 15.7906C5.68686 15.2698 6.83551 14.9991 8 15"
        stroke="#1E558E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 23C18.7614 23 21 20.7614 21 18C21 15.2386 18.7614 13 16 13C13.2386 13 11 15.2386 11 18C11 20.7614 13.2386 23 16 23Z"
        stroke="#1E558E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 27C9.71786 25.7818 10.7412 24.772 11.9689 24.0705C13.1965 23.369 14.586 23 16 23C17.414 23 18.8035 23.369 20.0311 24.0705C21.2588 24.772 22.2821 25.7818 23 27"
        stroke="#1E558E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.125 10C20.312 9.27571 20.6984 8.61836 21.2402 8.10263C21.7821 7.58689 22.4577 7.23343 23.1903 7.08239C23.923 6.93135 24.6833 6.98877 25.3849 7.24815C26.0866 7.50752 26.7014 7.95845 27.1596 8.54971C27.6179 9.14098 27.9011 9.8489 27.9772 10.5931C28.0533 11.3372 27.9192 12.0878 27.5902 12.7596C27.2611 13.4314 26.7502 13.9974 26.1156 14.3935C25.481 14.7895 24.748 14.9996 24 15"
        stroke="#1E558E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 15C7.25195 14.9996 6.519 14.7895 5.88438 14.3935C5.24976 13.9974 4.73891 13.4314 4.40984 12.7596C4.08077 12.0878 3.94667 11.3372 4.02277 10.5931C4.09887 9.8489 4.38212 9.14098 4.84036 8.54971C5.29859 7.95845 5.91344 7.50752 6.61508 7.24815C7.31673 6.98877 8.07704 6.93135 8.80968 7.08239C9.54233 7.23343 10.2179 7.58689 10.7598 8.10263C11.3016 8.61836 11.688 9.27571 11.875 10"
        stroke="#1E558E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_50_15">
        <rect width="32" height="32" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

// Wellbeing/Wellness Icon
const WellbeingIcon = () => (
  <svg
    className="h-6 w-6"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_50_23)">
      <path
        d="M16 28C16 28 3 21 3 12.75C3 10.9598 3.71116 9.2429 4.97703 7.97703C6.2429 6.71116 7.95979 6 9.75 6C12.5738 6 14.9925 7.53875 16 10C17.0075 7.53875 19.4262 6 22.25 6C24.0402 6 25.7571 6.71116 27.023 7.97703C28.2888 9.2429 29 10.9598 29 12.75C29 21 16 28 16 28Z"
        stroke="#1E558E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_50_23">
        <rect width="32" height="32" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

// Icon mapping for the CMS
const iconMap = {
  'insurance-building': InsuranceBuildingIcon,
  'insurance-corporate': InsuranceCorporateIcon,
  'insurance-group': InsuranceGroupIcon,
  'insurance-medical': InsuranceMedicalIcon,
  'insurance-special': InsuranceSpecialIcon,
  arrow: ArrowRight,
  // Business category icons
  'licensed-compliant': LicensedCompliantIcon,
  'market-access': MarketAccessIcon,
  'specialist-advisors': SpecialistAdvisorsIcon,
  wellbeing: WellbeingIcon,
}

// Default Insurance Features Component
const DefaultLayout: React.FC<{
  title: string
  subtitle: string
  features: any[]
  showProofStrip: boolean
  proofStrip: any[]
  showCTA: boolean
  ctaText: string
  ctaUrl: string
}> = ({
  title,
  subtitle,
  features,
  showProofStrip,
  proofStrip,
  showCTA,
  ctaText,
  ctaUrl,
}) => {
  return (
    <section className="insurance-features container relative py-12">
      {/* Heading */}
      <div className="mb-10 text-left md:text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          {subtitle}
        </p>
      </div>

      {/* Desktop grid with subtle connectors */}
      <div className="hidden grid-cols-2 gap-6 md:grid">
        {features.map((f, i) => {
          const IconComponent =
            iconMap[f.icon as keyof typeof iconMap]
          return (
            <div key={i} className="opacity-100">
              <Card className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-none">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 rounded-xl p-3">
                      {IconComponent && (
                        <IconComponent className="h-6 w-6 text-primary" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold leading-tight">
                        {f.title}
                      </h3>
                      <div className="mt-2 text-sm text-muted-foreground [&>*]:m-0">
                        <RichText
                          data={f.text}
                          enableGutter={false}
                          enableProse={false}
                          className="[&>*:not(a)]:!text-inherit [&>*]:!text-sm [&_a:hover]:!text-[#37b0f0] [&_a]:!text-[#1e558e] [&_a]:!underline"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )
        })}
      </div>

      {/* Mobile: vertical stacked cards */}
      <div className="space-y-4 md:hidden">
        {features.map((f, i) => {
          const IconComponent =
            iconMap[f.icon as keyof typeof iconMap]
          return (
            <Card
              key={i}
              className="rounded-2xl border border-gray-200 shadow-none"
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div
                    className="shrink-0 rounded-xl p-2"
                    style={{
                      backgroundColor: '#f9f9ff',
                    }}
                  >
                    {IconComponent && (
                      <IconComponent className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold leading-tight">
                      {f.title}
                    </h3>
                    <div className="mt-2 text-sm text-muted-foreground [&>*]:m-0">
                      <RichText
                        data={f.text}
                        enableGutter={false}
                        enableProse={false}
                        className="[&>*:not(a)]:!text-inherit [&>*]:!text-sm [&_a:hover]:!text-[#37b0f0] [&_a]:!text-[#1e558e] [&_a]:!underline"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Proof strip */}
      {showProofStrip && proofStrip && (
        <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-3">
          {proofStrip.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border p-4 text-sm text-muted-foreground"
            >
              <span className="font-semibold text-foreground">
                {item.label}
              </span>{' '}
              — {item.description}
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
      {showCTA && (
        <div className="mt-8 flex justify-center">
          <Button size="lg" className="gap-2">
            {ctaText}
          </Button>
        </div>
      )}
    </section>
  )
}

// Pillars Grid Layout
const PillarsLayout: React.FC<{
  features: any[]
  showProofStrip: boolean
  proofStrip: any[]
}> = ({ features, showProofStrip, proofStrip }) => {
  return (
    <section className="insurance-features container py-12">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {features.map((f, i) => {
          const IconComponent =
            iconMap[f.icon as keyof typeof iconMap]
          return (
            <div
              key={i}
              className="rounded-2xl border p-5 transition-shadow hover:shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="rounded-lg bg-primary/10 p-2">
                  {IconComponent && (
                    <IconComponent className="h-5 w-5 text-primary" />
                  )}
                </span>
                <h3 className="font-semibold">{f.title}</h3>
              </div>
              <div className="mt-2 text-sm text-muted-foreground [&>*]:m-0">
                <RichText
                  data={f.text}
                  enableGutter={false}
                  enableProse={false}
                  className="[&>*:not(a)]:!text-inherit [&>*]:!text-sm [&_a:hover]:!text-[#37b0f0] [&_a]:!text-[#1e558e] [&_a]:!underline"
                />
              </div>
            </div>
          )
        })}
      </div>
      {showProofStrip && proofStrip && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {proofStrip.map((item, i) => (
            <React.Fragment key={i}>
              <span>
                <span className="font-semibold text-foreground">
                  {item.label}
                </span>{' '}
                {item.description}
              </span>
              {i < proofStrip.length - 1 && <span>•</span>}
            </React.Fragment>
          ))}
        </div>
      )}
    </section>
  )
}

// Sticky with Steps Layout
const StickyLayout: React.FC<{
  title: string
  subtitle: string
  features: any[]
  stickyImage?: any
  removePaddingLeftBox?: boolean
}> = ({
  title,
  subtitle,
  features,
  stickyImage,
  removePaddingLeftBox = false,
}) => {
  return (
    <section className="insurance-features container grid gap-4 py-8 md:grid-cols-5">
      <div className="self-start md:sticky md:top-24 md:col-span-2">
        <div
          className={`rounded-2xl border border-gray-100 bg-white/30 ${removePaddingLeftBox ? 'p-0' : 'p-6'}`}
        >
          {title && (
            <h2 className="text-3xl font-semibold">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mb-6 mt-3 text-muted-foreground">
              {subtitle}
            </p>
          )}
          {stickyImage && stickyImage.url ? (
            <div className="aspect-[4/3] w-full rounded-xl">
              <img
                src={stickyImage.url}
                alt={stickyImage.alt || 'Feature image'}
                className="h-auto w-full rounded-xl object-cover"
              />
            </div>
          ) : (
            <div className="mt-6 aspect-[4/3] w-full rounded-xl bg-gradient-to-br from-primary/10 to-transparent" />
          )}
        </div>
      </div>
      <ol className="space-y-4 md:col-span-3">
        {features.map((f, i) => {
          const IconComponent =
            iconMap[f.icon as keyof typeof iconMap]
          return (
            <li
              key={i}
              className="relative rounded-2xl border border-gray-100 bg-white/30 p-5"
            >
              <div className="flex items-start gap-3">
                <span className="rounded-xl bg-primary/10 p-2">
                  {IconComponent && (
                    <IconComponent className="h-5 w-5 text-primary" />
                  )}
                </span>
                <div>
                  <h3 className="font-semibold">
                    {f.title}
                  </h3>
                  <div className="mt-1 text-sm text-muted-foreground [&>*]:m-0">
                    <RichText
                      data={f.text}
                      enableGutter={false}
                      enableProse={false}
                      className="[&>*:not(a)]:!text-inherit [&>*]:!text-sm [&_a:hover]:!text-[#37b0f0] [&_a]:!text-[#1e558e] [&_a]:!underline"
                    />
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

// Audience Tabs Layout
const TabsLayout: React.FC<{
  audienceTabs: any
  features: any[]
}> = ({ audienceTabs, features }) => {
  const [activeTab, setActiveTab] =
    React.useState('employers')

  const common = audienceTabs?.commonFeatures || []
  const employers = audienceTabs?.employerFeatures || []
  const individuals = audienceTabs?.individualFeatures || []

  const Tile = ({ icon, title, subtitle }: any) => {
    const IconComponent =
      iconMap[icon as keyof typeof iconMap]
    return (
      <div className="flex items-start gap-3 rounded-2xl border p-5">
        <span className="rounded-xl bg-primary/10 p-2">
          {IconComponent && (
            <IconComponent className="h-5 w-5 text-primary" />
          )}
        </span>
        <div>
          <div className="font-semibold">{title}</div>
          <div className="text-sm text-muted-foreground [&>*]:m-0">
            <RichText
              data={subtitle}
              enableGutter={false}
              enableProse={false}
              className="[&>*:not(a)]:!text-inherit [&>*]:!text-sm [&_a:hover]:!text-[#37b0f0] [&_a]:!text-[#1e558e] [&_a]:!underline"
            />
          </div>
        </div>
      </div>
    )
  }

  const Grid = ({ items }: { items: any[] }) => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {items.map((x, i) => (
        <Tile key={i} {...x} />
      ))}
    </div>
  )

  return (
    <section className="insurance-features container py-12">
      <div className="w-full">
        <div className="mx-auto grid max-w-md grid-cols-2 rounded-lg border bg-muted p-1">
          <button
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'employers'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('employers')}
          >
            {audienceTabs?.employerLabel || 'Employers'}
          </button>
          <button
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'individuals'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('individuals')}
          >
            {audienceTabs?.individualLabel || 'Individuals'}
          </button>
        </div>
        <div className="mt-6">
          {activeTab === 'employers' && (
            <Grid items={[...common, ...employers]} />
          )}
          {activeTab === 'individuals' && (
            <Grid items={[...common, ...individuals]} />
          )}
        </div>
      </div>
    </section>
  )
}

// KPI Band Layout
const KPILayout: React.FC<{
  kpiBand: any
}> = ({ kpiBand }) => {
  const kpis = kpiBand?.kpis || []
  const bullets = kpiBand?.bullets || []

  return (
    <section className="container py-10">
      <div className="grid items-center gap-6 md:grid-cols-3">
        <div className="grid grid-cols-3 gap-3 md:col-span-2">
          {kpis.map((x: any, i: number) => (
            <div
              key={i}
              className="rounded-2xl border p-6 text-center"
            >
              <div className="text-3xl font-semibold">
                {x.key}
              </div>
              <div className="text-sm text-muted-foreground">
                {x.label}
              </div>
            </div>
          ))}
        </div>
        <ul className="space-y-2 text-sm">
          {bullets.map((b: any, i: number) => (
            <li key={i} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />{' '}
              {b.text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// Main Block Component
export const InsuranceFeaturesBlockComponent: React.FC<
  any & {
    disableInnerContainer?: boolean
  }
> = ({
  title = 'Why Choose Beneple?',
  subtitle = 'Your trusted insurance partner in the UAE with comprehensive coverage and personalized service.',
  layout = 'default',
  stickyImage,
  showProofStrip = true,
  showCTA = true,
  ctaText = 'Get a tailored quote',
  ctaUrl = '#',
  features = [],
  proofStrip = [],
  audienceTabs,
  kpiBand,
  removePaddingLeftBox = false,
  disableInnerContainer,
}) => {
  const renderLayout = () => {
    switch (layout) {
      case 'pillars':
        return (
          <PillarsLayout
            features={features}
            showProofStrip={showProofStrip}
            proofStrip={proofStrip}
          />
        )
      case 'sticky':
        return (
          <StickyLayout
            title={title}
            subtitle={subtitle}
            features={features}
            stickyImage={stickyImage}
            removePaddingLeftBox={removePaddingLeftBox}
          />
        )
      case 'tabs':
        return (
          <TabsLayout
            audienceTabs={audienceTabs}
            features={features}
          />
        )
      case 'kpi':
        return <KPILayout kpiBand={kpiBand} />
      default:
        return (
          <DefaultLayout
            title={title}
            subtitle={subtitle}
            features={features}
            showProofStrip={showProofStrip}
            proofStrip={proofStrip}
            showCTA={showCTA}
            ctaText={ctaText}
            ctaUrl={ctaUrl}
          />
        )
    }
  }

  return (
    <div
      className={disableInnerContainer ? '' : 'container'}
    >
      {renderLayout()}
    </div>
  )
}
