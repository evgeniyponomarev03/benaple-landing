'use client'
import React, { useState } from 'react'
import styles from '@/styles/insurance-page.module.css'

interface CaseStudySlide {
  industry?: string
  companyLogo?: { url?: string } | string
  quote?: string
  reviewText?: string
  authorName?: string
  authorRole?: string
  metricText?: string
  metricIconSvg?: string
  chartSvg?: string
  navLogoSrc?: string
}

interface InsuranceCaseStudyProps {
  pillText?: string
  headline?: string
  highlightedWords?: string
  slides?: CaseStudySlide[]
  disableInnerContainer?: boolean
}

const defaultSlides: CaseStudySlide[] = [
  {
    industry: 'Industry',
    quote: 'The Beneple team are *the best I\'ve worked with* \u2014 professional, attentive, and genuinely focused on our needs, not upselling.',
    reviewText: 'The Beneple team are the best I\'ve worked with \u2014 professional, attentive, and genuinely focused on our needs, not upselling. They are outstanding: fast, communicative, and spot-on with solutions.',
    authorName: 'Managing Director at Reverse Psychology',
    authorRole: 'Ross Addison',
    metricText: 'Reduced *insurance* costs by *18%*',
    navLogoSrc: '/insurance/cigna.png',
    metricIconSvg: '<svg viewBox="0 0 24 24"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    chartSvg: '<svg viewBox="0 0 300 160" fill="none"><text x="200" y="20" fill="rgba(255,255,255,0.5)" font-size="10">Dolor</text><text x="220" y="40" fill="white" font-size="16" font-weight="700">$ 183,382</text><line x1="0" y1="60" x2="300" y2="60" stroke="rgba(255,255,255,0.08)"/><line x1="0" y1="90" x2="300" y2="90" stroke="rgba(255,255,255,0.08)"/><line x1="0" y1="120" x2="300" y2="120" stroke="rgba(255,255,255,0.08)"/><path d="M0 140 Q30 130, 60 120 T120 100 T180 80 T210 90 T240 70 T270 50 T300 55" stroke="#45cbef" stroke-width="2" fill="none"/><path d="M0 140 Q30 130, 60 120 T120 100 T180 80 T210 90 T240 70 T270 50 T300 55 V160 H0 Z" fill="url(#cg1)" opacity="0.2"/><defs><linearGradient id="cg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#45cbef"/><stop offset="100%" stop-color="transparent"/></linearGradient></defs></svg>',
  },
  {
    industry: 'Hospitality',
    quote: '"The team *guided us through every step* of the renewal process seamlessly."',
    reviewText: 'Managing insurance for 200+ hospitality staff across multiple locations was a nightmare. Beneple consolidated everything into one streamlined process.',
    authorName: 'Sarah Al Maktoum',
    authorRole: 'HR Director, Gulf Hotels Group',
    metricText: 'Claims resolution time cut by *45%*',
    navLogoSrc: '/insurance/bupa.png',
    metricIconSvg: '<svg viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>',
    chartSvg: '<svg viewBox="0 0 300 120" fill="none"><path d="M0 80 Q40 75, 80 60 T160 40 T240 20 T300 5" stroke="#45cbef" stroke-width="2.5" fill="none"/><path d="M0 80 Q40 75, 80 60 T160 40 T240 20 T300 5 V120 H0 Z" fill="url(#cg2)" opacity="0.15"/><defs><linearGradient id="cg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#45cbef"/><stop offset="100%" stop-color="transparent"/></linearGradient></defs></svg>',
  },
  {
    industry: 'Construction',
    quote: '"Our *claims process became seamless* after switching to Beneple."',
    reviewText: "With a workforce of 500+ across active construction sites, we needed workmen's compensation and medical insurance that actually worked when needed.",
    authorName: 'Ahmed Al Dhaheri',
    authorRole: 'CEO, Emirates Build Corp',
    metricText: 'Employee satisfaction up *32%*',
    navLogoSrc: '/insurance/allianz.png',
    metricIconSvg: '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
    chartSvg: '<svg viewBox="0 0 300 120" fill="none"><path d="M0 110 Q60 100, 100 70 T200 35 T300 8" stroke="#45cbef" stroke-width="2.5" fill="none"/><path d="M0 110 Q60 100, 100 70 T200 35 T300 8 V120 H0 Z" fill="url(#cg3)" opacity="0.15"/><defs><linearGradient id="cg3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#45cbef"/><stop offset="100%" stop-color="transparent"/></linearGradient></defs></svg>',
  },
]

function renderAccentText(text: string): React.ReactNode {
  const parts = text.split(/\*([^*]+)\*/)
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className={styles.highlight}>
        {part}
      </span>
    ) : (
      part
    ),
  )
}

function renderMetricAccent(text: string): React.ReactNode {
  const parts = text.split(/\*([^*]+)\*/)
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} style={{ color: '#45cbef' }}>
        {part}
      </span>
    ) : (
      part
    ),
  )
}

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

export const InsuranceCaseStudyBlockComponent: React.FC<InsuranceCaseStudyProps> = ({
  pillText = 'Case study',
  headline = 'Trusted by growing companies',
  highlightedWords = 'growing companies',
  slides,
}) => {
  const items = slides && slides.length > 0 ? slides : defaultSlides
  const [activeSlide, setActiveSlide] = useState(0)

  const goTo = (idx: number) => {
    setActiveSlide(((idx % items.length) + items.length) % items.length)
  }

  return (
    <section className={styles.caseStudy}>
      <div className={styles.caseStudyHeader}>
        <span className={styles.sectionPill}>{pillText}</span>
        <h2 className={styles.sectionTitle} style={{ marginTop: '24px' }}>
          {highlightText(headline, highlightedWords)}
        </h2>
      </div>

      <div className={styles.caseStudyCarousel}>
        <div className={styles.caseStudyTrackWrapper}>
          <div
            className={styles.caseStudyTrack}
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {items.map((slide, i) => (
              <div key={i} className={styles.caseStudySlide}>
                <div className={styles.caseStudySlideInner}>
                  <div className={styles.caseStudyTestimonial}>
                    <span className={styles.caseStudyIndustry}>{slide.industry}</span>
                    {slide.companyLogo && (
                      <img
                        src={typeof slide.companyLogo === 'string' ? slide.companyLogo : slide.companyLogo.url}
                        alt="Company"
                        style={{ height: '32px', width: 'auto', marginBottom: '16px' }}
                      />
                    )}
                    {!slide.companyLogo && slide.navLogoSrc && (
                      <img
                        src={slide.navLogoSrc}
                        alt="Company"
                        style={{ height: '32px', width: 'auto', marginBottom: '16px' }}
                      />
                    )}
                    <h3 className={styles.caseStudyQuote}>
                      {slide.quote ? renderAccentText(slide.quote) : ''}
                    </h3>
                    <p className={styles.caseStudyReviewText}>{slide.reviewText}</p>
                    <div className={styles.caseStudyAuthor}>
                      <div className={styles.caseStudyAuthorName}>{slide.authorName}</div>
                      <div className={styles.caseStudyAuthorRole}>{slide.authorRole}</div>
                    </div>
                  </div>
                  <div className={styles.caseStudyMetric}>
                    {slide.metricIconSvg && (
                      <div
                        className={styles.caseStudyMetricIcon}
                        dangerouslySetInnerHTML={{ __html: slide.metricIconSvg }}
                      />
                    )}
                    <div className={styles.caseStudyMetricText}>
                      {slide.metricText ? renderMetricAccent(slide.metricText) : ''}
                    </div>
                    {slide.chartSvg && (
                      <div
                        className={styles.caseStudyChart}
                        dangerouslySetInnerHTML={{ __html: slide.chartSvg }}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.caseStudyNav}>
          <button className={styles.caseStudyArrow} onClick={() => goTo(activeSlide - 1)} aria-label="Previous">
            <svg viewBox="0 0 18 18"><path d="M12 4L6 9l6 5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <div className={styles.caseStudyLogosNav}>
            {items.map((slide, i) => (
              <button
                key={i}
                className={`${styles.caseStudyLogoDot} ${i === activeSlide ? styles.caseStudyLogoDotActive : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
              >
                {slide.navLogoSrc && <img src={slide.navLogoSrc} alt="" />}
              </button>
            ))}
          </div>
          <button className={styles.caseStudyArrow} onClick={() => goTo(activeSlide + 1)} aria-label="Next">
            <svg viewBox="0 0 18 18"><path d="M6 4l6 5-6 5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>
    </section>
  )
}
