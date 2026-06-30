'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import type { Page } from '@/payload-types'
import styles from '@/styles/insurance-page.module.css'

export const InsuranceHero: React.FC<Page['hero']> = ({ richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  })

  return (
    <section className={styles.hero}>
      {/* Decorative ellipses */}
      <div className={`${styles.heroEllipse} ${styles.heroEllipse1}`} />
      <div className={`${styles.heroEllipse} ${styles.heroEllipse2}`} />

      <div className={styles.heroContainer}>
        {/* Content area */}
        <div className={styles.heroContent}>
          <div className={styles.heroPill}>Lorem ipsum dolore</div>
          <h1 className={styles.heroTitle}>
            Corporate insurance &amp; Employee benefits for{' '}
            <strong className={styles.heroTitleHighlight}>UAE Businesses</strong>
          </h1>
          <p className={styles.heroSubtitle}>
            Protect your people. Empower their wellbeing. Strengthen your business.
          </p>
          <a href="#contact" className={styles.heroCta}>
            Request a quote today
            <span className={styles.heroCtaIcon}>
              <svg viewBox="0 0 16 16">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </div>

        {/* Right scrolling columns */}
        <div className={styles.heroColumns}>
          {/* Column 1: scrolls up */}
          <div className={styles.heroColumn}>
            <div className={`${styles.heroCardsTrack} ${styles.heroColumnUp}`}>
              {[0, 1].map((setIdx) => (
                <React.Fragment key={setIdx}>
                  <div className={`${styles.heroCard} ${styles.heroCardImage}`}>
                    <img src="/insurance/hero-img-1.jpg" alt="Corporate team meeting" />
                  </div>
                  <div className={`${styles.heroCard} ${styles.heroCardStat} ${styles.heroCardStatTeal}`}>
                    <div className={styles.heroCardStatTop}>
                      <div className={styles.heroCardIcon}>
                        <img src="/insurance/icons/hero-health-icon.svg" alt="" />
                      </div>
                      <span className={styles.heroCardBadge}>Growing Teams</span>
                    </div>
                    <div className={styles.heroCardStatBottom}>
                      <div className={styles.heroCardNumber}>200K+</div>
                      <div className={styles.heroCardDesc}>Employees insured</div>
                    </div>
                  </div>
                  <div className={`${styles.heroCard} ${styles.heroCardImage}`}>
                    <img src="/insurance/hero-img-2.jpg" alt="Dubai skyline" />
                  </div>
                  <div className={`${styles.heroCard} ${styles.heroCardStat} ${styles.heroCardStatWhite}`}>
                    <div className={styles.heroCardStatTop}>
                      <div className={styles.heroCardIcon}>
                        <img src="/insurance/icons/hero-case-icon.svg" alt="" />
                      </div>
                      <span className={styles.heroCardBadge}>UAE Businesses</span>
                    </div>
                    <div className={styles.heroCardStatBottom}>
                      <div className={styles.heroCardNumber}>2,000+</div>
                      <div className={styles.heroCardDesc}>Companies trust Beneple</div>
                    </div>
                  </div>
                  <div className={`${styles.heroCard} ${styles.heroCardImage}`}>
                    <img src="/insurance/hero-img-3.jpg" alt="Business professionals" />
                  </div>
                  <div className={`${styles.heroCard} ${styles.heroCardStat} ${styles.heroCardStatDark}`}>
                    <div className={styles.heroCardStatTop}>
                      <div className={styles.heroCardIcon}>
                        <img src="/insurance/icons/hero-health-icon-2.svg" alt="" />
                      </div>
                      <span className={styles.heroCardBadge}>Growing Teams</span>
                    </div>
                    <div className={styles.heroCardStatBottom}>
                      <div className={styles.heroCardNumber}>200K+</div>
                      <div className={styles.heroCardDesc}>Employees insured</div>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Column 2: scrolls down */}
          <div className={styles.heroColumn}>
            <div className={`${styles.heroCardsTrack} ${styles.heroColumnDown}`}>
              {[0, 1].map((setIdx) => (
                <React.Fragment key={setIdx}>
                  <div className={`${styles.heroCard} ${styles.heroCardStat} ${styles.heroCardStatTeal}`}>
                    <div className={styles.heroCardStatTop}>
                      <div className={styles.heroCardIcon}>
                        <img src="/insurance/icons/hero-case-icon-2.svg" alt="" />
                      </div>
                      <span className={styles.heroCardBadge}>UAE Businesses</span>
                    </div>
                    <div className={styles.heroCardStatBottom}>
                      <div className={styles.heroCardNumber}>2,000+</div>
                      <div className={styles.heroCardDesc}>Trusted by 2,000+ companies</div>
                    </div>
                  </div>
                  <div className={`${styles.heroCard} ${styles.heroCardImage}`}>
                    <img src="/insurance/hero-img-4.jpg" alt="Office professional" />
                  </div>
                  <div className={`${styles.heroCard} ${styles.heroCardImage}`}>
                    <img src="/insurance/hero-img-5.jpg" alt="Business meeting" />
                  </div>
                  <div className={`${styles.heroCard} ${styles.heroCardStat} ${styles.heroCardStatWhite}`}>
                    <div className={styles.heroCardStatTop}>
                      <div className={styles.heroCardIcon}>
                        <img src="/insurance/icons/hero-health-icon-3.svg" alt="" />
                      </div>
                      <span className={styles.heroCardBadge}>Real Impact</span>
                    </div>
                    <div className={styles.heroCardStatBottom}>
                      <div className={styles.heroCardNumber}>200K+</div>
                      <div className={styles.heroCardDesc}>Employees insured</div>
                    </div>
                  </div>
                  <div className={`${styles.heroCard} ${styles.heroCardImage}`}>
                    <img src="/insurance/hero-img-6.jpg" alt="Dubai office" />
                  </div>
                  <div className={`${styles.heroCard} ${styles.heroCardStat} ${styles.heroCardStatDark}`}>
                    <div className={styles.heroCardStatTop}>
                      <div className={styles.heroCardIcon}>
                        <img src="/insurance/icons/hero-case-icon-3.svg" alt="" />
                      </div>
                      <span className={styles.heroCardBadge}>Growing Teams</span>
                    </div>
                    <div className={styles.heroCardStatBottom}>
                      <div className={styles.heroCardNumber}>200K+</div>
                      <div className={styles.heroCardDesc}>Employees insured</div>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
