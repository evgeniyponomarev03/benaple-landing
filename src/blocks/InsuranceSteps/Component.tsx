'use client'
import React, { useState, useEffect, useRef } from 'react'

interface StepItem {
  stepNumber?: string
  title: string
  description?: string
  image?: { url?: string } | string
}

interface InsuranceStepsProps {
  pillText?: string
  headline?: string
  highlightedWords?: string
  steps?: StepItem[]
  disableInnerContainer?: boolean
}

const defaultSteps: StepItem[] = [
  {
    stepNumber: '01',
    title: 'Tell us about your company',
    description:
      'Lorem ipsum dolor sit amet consectetur. Integer tristique nec sit varius bibendum. Vehicula habitant lobortis feugiat sit nunc et eget cras proin. Est ultricies in adipiscing in iaculis. Sed adipiscing.',
  },
  {
    stepNumber: '02',
    title: 'We compare the best insurance options',
    description:
      'Lorem ipsum dolor sit amet consectetur. Integer tristique nec sit varius bibendum. Vehicula habitant lobortis feugiat sit nunc et eget cras proin. Est ultricies in adipiscing in iaculis. Sed adipiscing.',
  },
  {
    stepNumber: '03',
    title: 'Choose your plan',
    description:
      'Lorem ipsum dolor sit amet consectetur. Integer tristique nec sit varius bibendum. Vehicula habitant lobortis feugiat sit nunc et eget cras proin. Est ultricies in adipiscing in iaculis. Sed adipiscing.',
  },
  {
    stepNumber: '04',
    title: 'We handle the rest',
    description:
      'Lorem ipsum dolor sit amet consectetur. Integer tristique nec sit varius bibendum. Vehicula habitant lobortis feugiat sit nunc et eget cras proin. Est ultricies in adipiscing in iaculis. Sed adipiscing.',
  },
]

const defaultImages = [
  '/insurance/hero-img-7.jpg',
  '/insurance/hero-img-8.jpg',
  '/insurance/hero-img-5.jpg',
  '/insurance/hero-img-6.jpg',
]

function highlightText(text: string, highlights: string): React.ReactNode {
  if (!highlights) return text
  const words = highlights.split(',').map((w) => w.trim()).filter(Boolean)
  let result: React.ReactNode[] = [text]
  words.forEach((word) => {
    const next: React.ReactNode[] = []
    result.forEach((part) => {
      if (typeof part !== 'string') { next.push(part); return }
      const idx = part.toLowerCase().indexOf(word.toLowerCase())
      if (idx === -1) { next.push(part); return }
      if (idx > 0) next.push(part.slice(0, idx))
      next.push(<span key={word + idx} style={{ color: '#40a8c5' }}>{part.slice(idx, idx + word.length)}</span>)
      if (idx + word.length < part.length) next.push(part.slice(idx + word.length))
    })
    result = next
  })
  return result
}

function getImageUrl(image: { url?: string } | string | undefined, fallback: string): string {
  if (!image) return fallback
  if (typeof image === 'string') return image
  return image.url || fallback
}

const ScrollDownIcon = () => (
  <span style={{
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #45cbef',
    borderRadius: '40px',
    width: '29px',
    padding: '4px 8px',
    flexShrink: 0,
  }}>
    <svg viewBox="0 0 13 9" fill="none" width="13" height="9" style={{ transform: 'rotate(90deg)' }}>
      <path d="M8.19 1.69L11 4.5M11 4.5L8.19 7.33M11 4.5H1.87" stroke="#45cbef" strokeWidth="0.81" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
)

export const InsuranceStepsBlockComponent: React.FC<InsuranceStepsProps> = ({
  pillText = 'How it works',
  headline = '4 steps to start',
  highlightedWords = 'to start',
  steps,
}) => {
  const items = steps && steps.length > 0 ? steps : defaultSteps
  const [activeStep, setActiveStep] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const totalSteps = items.length

    const handleScroll = () => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const viewportHeight = window.innerHeight
      const scrollY = window.scrollY

      const scrollInSection = scrollY - sectionTop
      const maxScroll = sectionHeight - viewportHeight
      if (maxScroll <= 0) return

      const progress = Math.max(0, Math.min(1, scrollInSection / maxScroll))
      const slideIndex = Math.min(totalSteps - 1, Math.floor(progress * totalSteps))
      setActiveStep(slideIndex)

      // Calculate horizontal translation — each slide is 1360px + 40px gap
      const slides = section.querySelectorAll('[data-step-slide]')
      if (slides.length > 0) {
        const slideWidth = (slides[0] as HTMLElement).offsetWidth
        const gap = 40
        const translateX = progress * (totalSteps - 1) * (slideWidth + gap)
        track.style.transform = `translateX(-${translateX}px)`
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [items.length])

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Mobile: vertical stack layout, no horizontal scroll
  if (isMobile) {
    return (
      <section className="ins-steps-section" style={{ padding: '60px 16px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', padding: '6px 14px',
            border: '1px solid rgba(17, 24, 39, 0.1)', borderRadius: '32px',
            fontSize: '14px', fontWeight: 600, color: '#111827',
            fontFamily: 'var(--font-inter), system-ui, sans-serif', marginBottom: '24px',
          }}>{pillText}</span>
          <h2 style={{
            fontFamily: 'var(--font-manrope), system-ui, sans-serif',
            fontSize: '28px', fontWeight: 600, lineHeight: 1.1, color: '#172b5f',
          }}>
            {highlightText(headline, highlightedWords)}
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {items.map((step, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{
                  padding: '6px 14px', borderRadius: '32px',
                  fontFamily: 'var(--font-inter), system-ui, sans-serif',
                  fontSize: '14px', fontWeight: 600, background: '#45cbef', color: 'white',
                }}>
                  {step.stepNumber || `0${i + 1}`}
                </span>
                <h3 style={{
                  fontFamily: 'var(--font-manrope), system-ui, sans-serif',
                  fontSize: '22px', fontWeight: 700, lineHeight: 1.1, color: '#172b5f',
                }}>{step.title}</h3>
              </div>
              <div style={{
                width: '100%', height: '200px', borderRadius: '16px',
                overflow: 'hidden', background: 'linear-gradient(135deg, #e8f4f8 0%, #d4e8ec 100%)',
              }}>
                <img
                  src={getImageUrl(step.image, defaultImages[i] || defaultImages[0])}
                  alt={step.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <p style={{
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '14px', lineHeight: 1.5, color: 'rgba(23, 43, 95, 0.7)',
              }}>{step.description}</p>
            </div>
          ))}
        </div>

        {/* Progress dots */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '32px' }}>
          {items.map((_, i) => (
            <div key={i} style={{
              flex: 1, height: '2px', background: i <= activeStep ? '#45cbef' : 'rgba(17, 24, 39, 0.1)',
              borderRadius: '1px',
            }} />
          ))}
        </div>
      </section>
    )
  }

  // Desktop: horizontal scroll on vertical scroll
  return (
    <section
      ref={sectionRef}
      style={{ height: '300vh', position: 'relative' }}
    >
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', padding: '48px 40px 0', flexShrink: 0 }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '8px 16px',
            border: '1px solid rgba(17, 24, 39, 0.1)',
            borderRadius: '32px',
            fontSize: '16px',
            fontWeight: 600,
            color: '#111827',
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            marginBottom: '24px',
          }}>{pillText}</span>
          <h2 style={{
            fontFamily: 'var(--font-manrope), system-ui, sans-serif',
            fontSize: '52px',
            fontWeight: 600,
            lineHeight: 1.1,
            color: '#172b5f',
          }}>
            {highlightText(headline, highlightedWords)}
          </h2>
        </div>

        {/* Viewport */}
        <div style={{ flex: 1, overflow: 'hidden', padding: '48px 0 0' }}>
          <div
            ref={trackRef}
            style={{
              display: 'flex',
              gap: '40px',
              paddingLeft: '40px',
              paddingRight: '40px',
              transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              willChange: 'transform',
              height: '100%',
              alignItems: 'flex-start',
            }}
          >
            {items.map((step, i) => (
              <div
                key={i}
                data-step-slide
                style={{
                  flex: '0 0 1360px',
                  width: '1360px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                }}
              >
                {/* Step number badge */}
                <span style={{
                  padding: '8px 16px',
                  borderRadius: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-inter), system-ui, sans-serif',
                  fontSize: '16px',
                  fontWeight: 600,
                  background: '#45cbef',
                  color: 'white',
                  letterSpacing: '-0.16px',
                  flexShrink: 0,
                }}>
                  {step.stepNumber || `0${i + 1}`}
                </span>

                {/* Content */}
                <div style={{ display: 'flex', gap: '180px', alignItems: 'flex-start' }}>
                  {/* Text */}
                  <div style={{
                    width: '322px',
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '32px',
                    minHeight: '340px',
                  }}>
                    <h3 style={{
                      fontFamily: 'var(--font-manrope), system-ui, sans-serif',
                      fontSize: '32px',
                      fontWeight: 700,
                      lineHeight: 1.1,
                      color: '#172b5f',
                    }}>{step.title}</h3>
                    <p style={{
                      fontFamily: 'var(--font-inter), system-ui, sans-serif',
                      fontSize: '18px',
                      lineHeight: 1.3,
                      color: 'rgba(23, 43, 95, 0.7)',
                      letterSpacing: '-0.18px',
                      flex: 1,
                    }}>{step.description}</p>
                    <a
                      href="#contact"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontFamily: 'var(--font-manrope), system-ui, sans-serif',
                        fontSize: '20px',
                        fontWeight: 500,
                        color: '#172b5f',
                        textDecoration: 'none',
                      }}
                    >
                      <ScrollDownIcon />
                      scroll down
                    </a>
                  </div>

                  {/* Image */}
                  <div style={{
                    width: '520px',
                    height: '340px',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    background: 'linear-gradient(135deg, #e8f4f8 0%, #d4e8ec 100%)',
                    flexShrink: 0,
                  }}>
                    <img
                      src={getImageUrl(step.image, defaultImages[i] || defaultImages[0])}
                      alt={step.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '0 40px 48px',
          display: 'flex',
          alignItems: 'center',
          gap: 0,
          flexShrink: 0,
          width: '100%',
        }}>
          {items.map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: '2px',
                background: 'rgba(17, 24, 39, 0.1)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: '100%',
                width: i <= activeStep ? '100%' : '0%',
                background: '#45cbef',
                transition: 'width 0.5s ease',
              }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
