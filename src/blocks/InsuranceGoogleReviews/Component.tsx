'use client'
import React from 'react'

interface Review {
  initials: string
  name: string
  stars?: number
  date?: string
  text: string
}

interface InsuranceGoogleReviewsProps {
  pillText?: string
  headline?: string
  highlightedWords?: string
  googleRating?: string
  reviewCount?: string
  writeReviewUrl?: string
  reviews?: Review[]
  disableInnerContainer?: boolean
}

const defaultReviews: Review[] = [
  {
    initials: 'SM',
    name: 'Sarah Mitchell',
    stars: 5,
    date: '2 weeks ago',
    text: "Exceptional service from start to finish. Beneple's team took the time to understand our company's specific needs and found us a medical insurance plan that was both comprehensive and cost-effective. Highly recommend their services.",
  },
  {
    initials: 'AK',
    name: 'Ahmed Khalid',
    stars: 5,
    date: '1 month ago',
    text: 'Best insurance brokers in Dubai, hands down. They managed our entire renewal process and negotiated better terms with our provider. The dedicated advisor makes everything so much easier. Five stars well deserved.',
  },
  {
    initials: 'LT',
    name: 'Lisa Thompson',
    stars: 5,
    date: '3 weeks ago',
    text: "We switched to Beneple last year for our company's medical and workmen's compensation insurance. The transition was smooth, and their support team is always responsive. Truly excellent service for businesses in the UAE.",
  },
]

const GoogleLogoSvg = () => (
  <svg height="40" viewBox="0 0 272 92" fill="none" style={{ flexShrink: 0 }}>
    <path d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#EA4335" />
    <path d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#FBBC05" />
    <path d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" fill="#4285F4" />
    <path d="M225 3v65h-9.5V3h9.5z" fill="#34A853" />
    <path d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.96 0-11.84 4.37-11.59 12.93z" fill="#EA4335" />
    <path d="M35.29 41.19V32H68c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C17.57 69.36 2 54.13 2 35.29S17.57 1.22 36.3 1.22c10.41 0 17.81 4.08 23.36 9.38l-6.57 6.57c-3.95-3.7-9.33-6.57-16.79-6.57-13.7 0-24.4 11.06-24.4 24.69 0 13.62 10.7 24.69 24.4 24.69 8.88 0 13.95-3.58 17.22-6.84 2.65-2.65 4.38-6.43 5.07-11.6l-22.3-.01z" fill="#4285F4" />
  </svg>
)

const GoogleIconSmall = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
)

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

export const InsuranceGoogleReviewsBlockComponent: React.FC<InsuranceGoogleReviewsProps> = ({
  pillText = 'Testimonials',
  headline = 'Verified Google reviews from our clients',
  highlightedWords = 'Google reviews',
  googleRating = '5.0',
  reviewCount = '420 reviews',
  writeReviewUrl = '#',
  reviews,
}) => {
  const items = reviews && reviews.length > 0 ? reviews : defaultReviews

  return (
    <section className="ins-reviews-section" style={{ padding: '120px 0', position: 'relative' }}>
      <style>{`
        @media (max-width: 768px) {
          .ins-reviews-section { padding: 60px 0 !important; }
          .ins-reviews-header { padding: 0 16px !important; margin-bottom: 32px !important; }
          .ins-reviews-title { font-size: 28px !important; }
          .ins-reviews-bar {
            flex-direction: column !important;
            gap: 16px !important;
            margin-left: 16px !important;
            margin-right: 16px !important;
            padding: 16px !important;
            border-radius: 12px !important;
          }
          .ins-reviews-grid {
            grid-template-columns: 1fr !important;
            padding: 0 16px !important;
          }
          .ins-reviews-card {
            padding: 24px !important;
            border-radius: 16px !important;
          }
        }
      `}</style>
      {/* Header */}
      <div className="ins-reviews-header" style={{ textAlign: 'center', padding: '0 40px', marginBottom: '48px' }}>
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
        <h2 className="ins-reviews-title" style={{
          fontFamily: 'var(--font-manrope), system-ui, sans-serif',
          fontSize: '52px',
          fontWeight: 600,
          lineHeight: 1.1,
          color: '#172b5f',
          marginTop: '24px',
        }}>
          {highlightText(headline, highlightedWords)}
        </h2>
      </div>

      {/* Rating bar — dark navy background */}
      <style>{`
        .ins-reviews-bar::before {
          content: '';
          position: absolute;
          top: -350px;
          left: 10%;
          width: 600px;
          height: 600px;
          background: #274BAB;
          filter: blur(100px);
          border-radius: 50%;
          pointer-events: none;
        }
      `}</style>
      <div className="ins-reviews-bar" style={{
        maxWidth: '1360px',
        margin: '0 auto 24px',
        padding: '24px',
        background: 'linear-gradient(126.46deg, rgb(23,43,95) 8.15%, rgb(17,24,39) 94.34%)',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        marginLeft: '40px',
        marginRight: '40px',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <GoogleLogoSvg />
            <span style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '24px', fontWeight: 500, lineHeight: '30px', color: 'white' }}>Rating</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '16px', fontWeight: 600, color: 'white' }}>{googleRating}</span>
            <div style={{ display: 'flex', gap: '2px' }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <span key={s} style={{ width: '24px', height: '24px', color: '#f5a623', fontSize: '24px', lineHeight: 1 }}>&#9733;</span>
              ))}
            </div>
            <span style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>{reviewCount}</span>
          </div>
        </div>
        <a href={writeReviewUrl} style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px 24px',
          background: 'white',
          borderRadius: '56px',
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
          fontSize: '16px',
          fontWeight: 500,
          lineHeight: '20px',
          color: '#172b5f',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          transition: 'all 0.25s ease',
        }}>Write A Review</a>
      </div>

      {/* Review cards */}
      <div className="ins-reviews-grid" style={{
        maxWidth: '1360px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '24px',
        padding: '0 40px',
      }}>
        {items.map((review, i) => (
          <div key={i} className="ins-reviews-card" style={{
            background: 'white',
            borderRadius: '24px',
            padding: '40px',
            boxShadow: '0 2px 15.1px rgba(20, 19, 19, 0.1)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}>
            {/* Header: avatar + google icon */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontFamily: 'var(--font-manrope), system-ui, sans-serif',
                fontSize: '20px',
                fontWeight: 600,
                color: '#172b5f',
              }}>{review.initials}</div>
              <GoogleIconSmall />
            </div>

            {/* Name + stars */}
            <div>
              <div style={{
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '18px',
                fontWeight: 600,
                lineHeight: 1.3,
                letterSpacing: '-0.18px',
                color: '#172b5f',
                marginBottom: '2px',
              }}>{review.name}</div>
              <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
                {Array.from({ length: review.stars || 5 }).map((_, s) => (
                  <span key={s} style={{ width: '16px', height: '16px', color: '#f5a623', fontSize: '16px', lineHeight: 1 }}>&#9733;</span>
                ))}
                {review.date && (
                  <span style={{
                    fontFamily: 'var(--font-inter), system-ui, sans-serif',
                    fontSize: '14px',
                    lineHeight: 1.3,
                    letterSpacing: '-0.14px',
                    color: 'rgba(23, 43, 95, 0.7)',
                    marginLeft: '4px',
                  }}>{review.date}</span>
                )}
              </div>
            </div>

            {/* Review text */}
            <p style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '16px',
              lineHeight: 1.3,
              letterSpacing: '-0.16px',
              color: 'rgba(23, 43, 95, 0.7)',
              margin: 0,
            }}>{review.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
