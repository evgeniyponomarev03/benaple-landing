'use client'
import React from 'react'
import styles from '@/styles/insurance-page.module.css'

interface PartnerLogo {
  image?: { url?: string } | string
  alt?: string
}

interface InsurancePartnersTickerProps {
  pillText?: string
  headline?: string
  highlightedWords?: string
  row1Logos?: PartnerLogo[]
  row2Logos?: PartnerLogo[]
  disableInnerContainer?: boolean
}

// Default partner logo paths for when CMS data isn't populated
const defaultRow1 = Array.from({ length: 15 }, (_, i) => `/insurance/partners/partner-${i + 1}.png`)
const defaultRow2 = Array.from({ length: 14 }, (_, i) => `/insurance/partners/partner-r2-${i + 1}.png`)

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

function getImageUrl(image: { url?: string } | string | undefined): string | null {
  if (!image) return null
  if (typeof image === 'string') return image
  return image.url || null
}

export const InsurancePartnersTickerBlockComponent: React.FC<InsurancePartnersTickerProps> = ({
  pillText = 'Our trusted partners',
  headline = 'Working with 30+ leading insurance providers',
  highlightedWords = '30+,leading insurance',
  row1Logos,
  row2Logos,
}) => {
  const hasRow1 = row1Logos && row1Logos.length > 0
  const hasRow2 = row2Logos && row2Logos.length > 0
  const row1Urls = hasRow1
    ? row1Logos.map((l) => getImageUrl(l.image)).filter(Boolean)
    : defaultRow1
  const row2Urls = hasRow2
    ? row2Logos.map((l) => getImageUrl(l.image)).filter(Boolean)
    : defaultRow2

  return (
    <section className="ins-partners" style={{ padding: '120px 40px', maxWidth: '1440px', margin: '0 auto' }}>
      <style>{`
        @media (max-width: 768px) {
          .ins-partners { padding: 60px 16px !important; }
          .ins-partners-title { font-size: 28px !important; }
        }
      `}</style>
      <div style={{ textAlign: 'center', marginBottom: '12px' }}>
        <span className={styles.sectionPill}>{pillText}</span>
      </div>
      <h2 className={`${styles.sectionTitle} ins-partners-title`} style={{ textAlign: 'center', marginBottom: 0 }}>
        {highlightText(headline, highlightedWords)}
      </h2>

      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeRows}>
          {/* Row 1: scrolls left */}
          <div className={`${styles.marqueeRow} ${styles.marqueeRowLeft}`}>
            {[...row1Urls, ...row1Urls].map((url, i) => (
              <div key={i} className={styles.marqueeLogo}>
                <img src={url as string} alt="Insurance partner" />
              </div>
            ))}
          </div>

          {/* Row 2: scrolls right */}
          <div className={`${styles.marqueeRow} ${styles.marqueeRowRight}`}>
            {[...row2Urls, ...row2Urls].map((url, i) => (
              <div key={i} className={styles.marqueeLogo}>
                <img src={url as string} alt="Insurance partner" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
