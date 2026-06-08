import { useEffect, useRef } from 'react'
import {
  ShieldCheck,
  Link2,
  FileCheck,
  BarChart3,
  ArrowRight,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// Drop-in section for Next.js / shadcn / Tailwind
// Props allow reuse; replace copy as needed.
export default function InsuranceFeatures() {
  const features = [
    {
      icon: ShieldCheck,
      title: 'Licensed & compliant',
      text: 'FAEU Insurance Brokers LLC, License #92 – fully authorized to operate in the UAE with regulatory compliance.',
    },
    {
      icon: Link2,
      title: 'Market-wide access',
      text: 'Access to leading insurance providers ensuring competitive rates and comprehensive coverage options.',
    },
    {
      icon: FileCheck,
      title: 'Specialist advisors',
      text: 'Qualified British insurance specialists with deep local knowledge and a personalized service approach.',
    },
    {
      icon: BarChart3,
      title: 'Wellness included',
      text: 'Complimentary wellness package with select group health plans to improve employee health.',
    },
  ]

  return (
    <section className="container relative py-12">
      {/* Heading */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Why Choose{' '}
          <span className="text-primary">Beneple</span>?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Your trusted insurance partner in the UAE with
          comprehensive coverage and personalized service.
        </p>
      </div>

      {/* Desktop grid with subtle connectors */}
      <div className="hidden grid-cols-2 gap-6 md:grid">
        {features.map((f, i) => (
          <div
            key={i}
            className="translate-y-3 opacity-0 duration-500 animate-in slide-in-from-bottom-4"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <Card className="relative overflow-hidden rounded-2xl">
              {/* decorative connection line */}
              <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(200px_200px_at_0_0,black,transparent)]">
                <div className="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-primary/5" />
              </div>

              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 rounded-xl bg-primary/10 p-3">
                    <f.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold leading-tight">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {f.text}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Mobile: swipeable cards */}
      <div className="scrollbar-none -mx-4 overflow-x-auto px-4 md:hidden">
        <div className="flex gap-4 pr-4">
          {features.map((f, i) => (
            <div
              key={i}
              className="min-w-[82%] translate-y-2 opacity-0 duration-500 animate-in slide-in-from-bottom-4"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <Card className="rounded-2xl">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 rounded-xl bg-primary/10 p-2">
                      <f.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold leading-tight">
                        {f.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {f.text}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Proof strip (replace with real data/logos) */}
      <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="rounded-xl border p-4 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">
            92
          </span>{' '}
          — DHA license number & full regulatory compliance
        </div>
        <div className="rounded-xl border p-4 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">
            25+ providers
          </span>{' '}
          compared to get you better rates
        </div>
        <div className="rounded-xl border p-4 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">
            Wellness perks
          </span>{' '}
          included with select group plans
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 flex justify-center">
        <Button size="lg" className="gap-2">
          Get a tailored quote{' '}
        </Button>
      </div>
    </section>
  )
}

// =============================
// ALT #1 – Four Pillars Grid with headline + microproof band
// Clean, compact grid where titles carry the weight and copy is concise.
export function PillarsGrid() {
  const items = [
    {
      icon: ShieldCheck,
      title: 'Licensed broker',
      blurb: 'UAE • License #92',
    },
    {
      icon: Link2,
      title: 'Market access',
      blurb: '25+ insurers compared',
    },
    {
      icon: FileCheck,
      title: 'Specialist advisors',
      blurb: 'Local + British team',
    },
    {
      icon: BarChart3,
      title: 'Wellness perks',
      blurb: 'Included with group plans',
    },
  ]
  return (
    <section className="container py-12">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {items.map((it, i) => (
          <div
            key={i}
            className="rounded-2xl border p-5 transition-shadow hover:shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-primary/10 p-2">
                <it.icon className="h-5 w-5 text-primary" />
              </span>
              <h3 className="font-semibold">{it.title}</h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {it.blurb}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
        <span>
          <span className="font-semibold text-foreground">
            #92
          </span>{' '}
          licensed
        </span>
        <span>•</span>
        <span>25+ providers</span>
        <span>•</span>
        <span>Wellness included</span>
      </div>
    </section>
  )
}

// =============================
// ALT #2 – Sticky Illustration + Vertical Features (great for storytelling)
// Left column stays visible; right column lists benefits as steps.
export function StickyWithSteps() {
  const steps = [
    {
      icon: ShieldCheck,
      title: 'Regulated & trusted',
      text: 'Fully authorized under UAE law, License #92.',
    },
    {
      icon: Link2,
      title: 'Compare the market',
      text: 'We source quotes across 25+ providers to fit your needs.',
    },
    {
      icon: FileCheck,
      title: 'Human expertise',
      text: 'Advisors with UK credentials & local experience.',
    },
    {
      icon: BarChart3,
      title: 'Employee wellness',
      text: 'Health perks bundled with select group policies.',
    },
  ]
  return (
    <section className="container grid gap-10 py-16 md:grid-cols-5">
      <div className="self-start md:sticky md:top-24 md:col-span-2">
        <div className="rounded-2xl border p-6">
          <h2 className="text-3xl font-semibold">
            Why Beneple
          </h2>
          <p className="mt-3 text-muted-foreground">
            Coverage breadth + expert guidance, delivered
            with local compliance.
          </p>
          <div className="mt-6 aspect-[4/3] w-full rounded-xl bg-gradient-to-br from-primary/10 to-transparent" />
        </div>
      </div>
      <ol className="space-y-4 md:col-span-3">
        {steps.map((s, i) => (
          <li
            key={i}
            className="relative rounded-2xl border p-5"
          >
            <div className="flex items-start gap-3">
              <span className="rounded-xl bg-primary/10 p-2">
                <s.icon className="h-5 w-5 text-primary" />
              </span>
              <div>
                <h3 className="font-semibold">
                  {i + 1}. {s.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {s.text}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

// =============================
// ALT #3 – Audience Tabs (Employers vs. Individuals) with tailored benefits
// Keeps the page compact while personalizing copy.
export function AudienceTabs() {
  const common = [
    {
      icon: ShieldCheck,
      t: 'Licensed in UAE',
      s: 'FAEU #92 compliance',
    },
    {
      icon: Link2,
      t: 'Broad provider panel',
      s: 'Competitive quotes',
    },
  ]
  const employers = [
    {
      icon: BarChart3,
      t: 'Wellness & engagement',
      s: 'Reduce absenteeism',
    },
    {
      icon: FileCheck,
      t: 'Policy admin help',
      s: 'Onboarding & claims support',
    },
  ]
  const individuals = [
    {
      icon: FileCheck,
      t: 'Advisor-guided',
      s: 'Right plan for your needs',
    },
    {
      icon: BarChart3,
      t: 'Add-on benefits',
      s: 'Dental, optical, more',
    },
  ]
  const Tile = ({ icon: Icon, t, s }: any) => (
    <div className="flex items-start gap-3 rounded-2xl border p-5">
      <span className="rounded-xl bg-primary/10 p-2">
        <Icon className="h-5 w-5 text-primary" />
      </span>
      <div>
        <div className="font-semibold">{t}</div>
        <div className="text-sm text-muted-foreground">
          {s}
        </div>
      </div>
    </div>
  )
  const Grid = ({ items }: any) => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {items.map((x: any, i: number) => (
        <Tile key={i} {...x} />
      ))}
    </div>
  )
  return (
    <section className="container py-12">
      <div className="w-full">
        <div className="mx-auto grid max-w-md grid-cols-2 rounded-lg border bg-muted p-1">
          <button className="rounded-full bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm">
            Employers
          </button>
          <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
            Individuals
          </button>
        </div>
        <div className="mt-6">
          <Grid items={[...common, ...employers]} />
        </div>
      </div>
    </section>
  )
}

// =============================
// ALT #4 – KPI Band + Compact Bullets (minimalist, above the fold)
export function KPIBand() {
  const kpis = [
    { k: '#92', l: 'DHA license' },
    { k: '25+', l: 'providers compared' },
    { k: '<24h', l: 'quote turnaround' },
  ]
  const bullets = [
    'Licensed broker',
    'Competitive rates',
    'Local specialists',
    'Wellness included',
  ]
  return (
    <section className="container py-10">
      <div className="grid items-center gap-6 md:grid-cols-3">
        <div className="grid grid-cols-3 gap-3 md:col-span-2">
          {kpis.map((x, i) => (
            <div
              key={i}
              className="rounded-2xl border p-6 text-center"
            >
              <div className="text-3xl font-semibold">
                {x.k}
              </div>
              <div className="text-sm text-muted-foreground">
                {x.l}
              </div>
            </div>
          ))}
        </div>
        <ul className="space-y-2 text-sm">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />{' '}
              {b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
