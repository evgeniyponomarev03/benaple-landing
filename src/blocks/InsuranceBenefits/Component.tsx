'use client'
import React from 'react'
import styles from '@/styles/insurance-page.module.css'

interface BenefitItem {
  title: string
  description: string
  iconSvg?: string
}

interface InsuranceBenefitsProps {
  pillText?: string
  headline?: string
  highlightedWords?: string
  largeNumber?: string
  benefits?: BenefitItem[]
  disableInnerContainer?: boolean
}

const defaultBenefits: BenefitItem[] = [
  {
    title: 'Licensed & Compliant',
    description:
      'Beneple, licensed as FAEU Insurance Brokers LLC (License #92), operates with full UAE compliance and the highest standards of transparency and data protection.',
    iconSvg:
      '<svg viewBox="0 0 28 28"><path d="M14 2L3 7v7c0 6.075 4.925 11 11 11s11-4.925 11-11V7L14 2z" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 14l3 3 7-7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  },
  {
    title: 'Market-wide Access',
    description:
      'We partner with leading local and global brands \u2014 including Allianz, Bupa, and Cigna \u2014 to offer flexible, competitive coverage tailored to your needs and budget.',
    iconSvg:
      '<svg viewBox="0 0 28 28"><circle cx="14" cy="14" r="12" stroke-linecap="round"/><path d="M2 14h24M14 2c3.314 4.012 5 8 5 12s-1.686 7.988-5 12c-3.314-4.012-5-8-5-12s1.686-7.988 5-12z" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  },
  {
    title: 'Specialist Advisors',
    description:
      "You'll never get a generic policy. Our expert advisors combine sector knowledge and local insight to tailor insurance solutions that fit your industry, goals, and budget.",
    iconSvg:
      '<svg viewBox="0 0 28 28"><circle cx="14" cy="8" r="5" stroke-linecap="round"/><path d="M3 26c0-6.075 4.925-11 11-11s11 4.925 11 11" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  },
  {
    title: 'Wellbeing',
    description:
      'We deliver custom regional solutions with a genuine wellness focus \u2014 not token programmes, but measurable results that boost wellbeing and business performance.',
    iconSvg:
      '<svg viewBox="0 0 28 28"><path d="M14 25s-10-6.5-10-13.5C4 7.5 7 4 10.5 4c2 0 3.5 1.5 3.5 1.5S15.5 4 17.5 4C21 4 24 7.5 24 11.5 24 18.5 14 25 14 25z" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  },
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
      next.push(<span key={word + idx} className={styles.highlight}>{part.slice(idx, idx + word.length)}</span>)
      if (idx + word.length < part.length) next.push(part.slice(idx + word.length))
    })
    result = next
  })
  return result
}

// Stagger offsets matching Figma: each card shifts right by ~346px
const cardOffsets = [0, 346, 692, 1038]

export const InsuranceBenefitsBlockComponent: React.FC<InsuranceBenefitsProps> = ({
  pillText = 'Our benefits',
  headline = 'Local Expertise. International Standards. Real Wellbeing.',
  highlightedWords = 'International Standards.',
}) => {
  const items = defaultBenefits

  return (
    <section className="ins-benefits-section" style={{ position: 'relative', paddingTop: '120px', paddingBottom: '120px' }}>
      <style>{`
        .ins-benefits-card::before {
          content: '';
          position: absolute;
          bottom: -125px;
          right: -125px;
          width: 250px;
          height: 250px;
          border-radius: 50%;
          background: rgba(39,75,171,0.5);
          filter: blur(60px);
          pointer-events: none;
        }
        @media (max-width: 768px) {
          .ins-benefits-section { padding-top: 60px !important; padding-bottom: 60px !important; }
          .ins-benefits-title { font-size: 42px !important; max-width: 100% !important; }
          .ins-benefits-header { padding: 0 16px !important; margin-bottom: 40px !important; }
          .ins-benefits-cards { padding: 0 16px !important; }
          .ins-benefits-card-wrapper {
            position: relative !important;
            top: auto !important;
            height: auto !important;
            padding-left: 0 !important;
            margin-bottom: 16px;
          }
          .ins-benefits-card {
            width: 100% !important;
            height: auto !important;
            min-height: 280px;
          }
          .ins-benefits-card h3 { font-size: 24px !important; }
        }
        @media (max-width: 480px) {
          .ins-benefits-title { font-size: 32px !important; }
        }
      `}</style>

      {/* Header */}
      <div className="ins-benefits-header" style={{ textAlign: 'center', padding: '0 40px', marginBottom: '80px' }}>
        <span className={styles.sectionPill} style={{ marginBottom: '24px', display: 'inline-flex' }}>{pillText}</span>
        <h2 className="ins-benefits-title" style={{
          fontFamily: 'var(--font-manrope), system-ui, sans-serif',
          fontSize: '96px',
          fontWeight: 600,
          lineHeight: 1.05,
          color: '#172b5f',
          maxWidth: '900px',
          margin: '24px auto 0',
        }}>
          {highlightText(headline, highlightedWords)}
        </h2>
      </div>

      {/* Staggered diagonal cards */}
      <div className="ins-benefits-cards" style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px', position: 'relative' }}>
        {items.map((benefit, i) => (
          <div
            key={i}
            className="ins-benefits-card-wrapper"
            style={{
              position: 'sticky',
              top: '96px',
              height: '700px',
              display: 'flex',
              alignItems: 'flex-end',
              paddingLeft: `${cardOffsets[i]}px`,
            }}
          >
            <div className="ins-benefits-card" style={{
              width: '322px',
              height: '430px',
              padding: '24px',
              background: 'linear-gradient(121.56deg, rgb(23, 43, 95) 19.4%, rgb(17, 24, 39) 94.4%)',
              borderRadius: '16px',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}>
              {/* Decorative blur */}
              <div style={{
                position: 'absolute',
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                background: 'rgba(64, 168, 197, 0.1)',
                filter: 'blur(80px)',
                top: '-50px',
                right: '-80px',
                pointerEvents: 'none',
              }} />

              {/* Icon */}
              {benefit.iconSvg && (
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '24px',
                  }}
                  dangerouslySetInnerHTML={{
                    __html: benefit.iconSvg.replace(/<svg/, '<svg style="width:28px;height:28px;stroke:white;fill:none;stroke-width:1.5"'),
                  }}
                />
              )}

              {/* Text */}
              <div style={{ marginTop: 'auto' }}>
                <h3 style={{
                  fontFamily: 'var(--font-manrope), system-ui, sans-serif',
                  fontSize: '32px',
                  fontWeight: 700,
                  lineHeight: 1,
                  marginBottom: '8px',
                }}>
                  {benefit.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-inter), system-ui, sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: 1.6,
                  color: 'rgba(255, 255, 255, 0.9)',
                }}>
                  {benefit.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
