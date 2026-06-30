'use client'
import React, { useState } from 'react'

interface Solution {
  title: string
  description?: string
  linkUrl?: string
}

interface Tab {
  tabLabel: string
  categoryTitle?: string
  categoryDescription?: string
  categoryIconSvg?: string
  solutions?: Solution[]
}

interface InsuranceSolutionsTabsProps {
  pillText?: string
  headline?: string
  highlightedWords?: string
  tabs?: Tab[]
  disableInnerContainer?: boolean
}

const defaultTabs: Tab[] = [
  {
    tabLabel: 'Employee & Workplace Benefits',
    categoryTitle: 'Employee & Workplace Benefits',
    categoryDescription:
      'Lorem ipsum dolor sit amet consectetur. Integer tristique nec sit varius bibendum. Vehicula habitant lobortis feugiat sit nunc et eget cras proin. Est ultricies in adipiscing in iaculis. Sed adipiscing.',
    categoryIconSvg:
      '<svg viewBox="0 0 28 28"><path d="M20 21v-2a4 4 0 00-4-4H12a4 4 0 00-4 4v2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="14" cy="7" r="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M24 21v-2a4 4 0 00-3-3.87M18 3.13a4 4 0 010 7.75" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    solutions: [
      { title: 'Medical Insurance', description: '\u2013 comprehensive health coverage to protect your team\u2019s physical wellbeing.' },
      { title: "Workmen's Compensation", description: '\u2013 cover workplace injuries and stay UAE labour law compliant.' },
      { title: 'Gratuity Management', description: '\u2013 fund end-of-service benefits and avoid surprises.' },
      { title: 'Group Life', description: '\u2013 secure your employees\u2019 families in unexpected events.' },
    ],
  },
  {
    tabLabel: 'Corporate Liability & Risk Management',
    categoryTitle: 'Corporate Liability & Risk Management',
    categoryDescription:
      'Shield your business from legal and financial exposure with coverage designed for the complexities of operating in the UAE.',
    categoryIconSvg:
      '<svg viewBox="0 0 28 28"><rect x="3" y="11" width="22" height="14" rx="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 11V7a6 6 0 1112 0v4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    solutions: [
      { title: 'Professional Indemnity', description: 'Protection against claims arising from professional advice, services, or errors that cause client losses.' },
      { title: 'Directors & Officers', description: 'Personal liability coverage for company directors and officers against wrongful act allegations.' },
      { title: 'Third Party Liability', description: 'Coverage for claims made by third parties for bodily injury or property damage.' },
      { title: 'Cyber Security', description: 'Protection against data breaches, cyber attacks, and digital threats.' },
    ],
  },
  {
    tabLabel: 'Specialized/High-Risk Insurance',
    categoryTitle: 'Specialized / High-Risk Insurance',
    categoryDescription:
      "Niche coverage for high-risk scenarios and unique operational environments that standard policies don't cover.",
    categoryIconSvg:
      '<svg viewBox="0 0 28 28"><path d="M14 2l3.09 6.26L24 9.27l-5 4.87 1.18 6.88L14 17.77l-6.18 3.25L9 14.14l-5-4.87 6.91-1.01L14 2z" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    solutions: [
      { title: 'Kidnap & Ransom', description: 'Comprehensive K&R coverage including crisis response.' },
      { title: 'Defense Base Act Insurance', description: 'Mandatory coverage for overseas government contractors.' },
      { title: 'Event Insurance', description: 'Cover cancellations, liability, and property damage for events.' },
    ],
  },
  {
    tabLabel: 'Property & Asset Protection',
    categoryTitle: 'Property & Asset Protection',
    categoryDescription:
      'Safeguard your physical assets, vehicles, and high-value items with coverage built for the UAE market.',
    categoryIconSvg:
      '<svg viewBox="0 0 28 28"><path d="M3 25V11l11-9 11 9v14a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 25V15h8v10" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    solutions: [
      { title: 'Commercial Property', description: 'Coverage for office spaces, warehouses, and commercial buildings against fire, flood, and natural disasters.' },
      { title: 'Motor Fleet', description: 'Comprehensive fleet insurance for company vehicles with competitive rates.' },
      { title: 'Luxury Insurance Coverage', description: 'Bespoke insurance for high-value assets including fine art, jewellery, yachts, and luxury property.' },
    ],
  },
]

// Arrow pill SVG — single arrow in pill border
const ArrowPillSvg = () => (
  <span style={{
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #45cbef',
    borderRadius: 'var(--radius-btn, 9999px)',
    width: '29px',
    height: '20px',
    flexShrink: 0,
  }}>
    <svg viewBox="0 0 13 9" fill="none" width="13" height="9">
      <path d="M8.19 1.69L11 4.5M11 4.5L8.19 7.33M11 4.5H1.87" stroke="#45cbef" strokeWidth="0.81" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
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

export const InsuranceSolutionsTabsBlockComponent: React.FC<InsuranceSolutionsTabsProps> = ({
  pillText = 'Services',
  headline = 'Our insurance solutions',
  highlightedWords = 'solutions',
  tabs,
}) => {
  const items = tabs && tabs.length > 0 ? tabs : defaultTabs
  const [activeTab, setActiveTab] = useState(0)
  const [fadeState, setFadeState] = useState<'visible' | 'fading'>('visible')

  const handleTabSwitch = (idx: number) => {
    if (idx === activeTab || fadeState === 'fading') return
    setFadeState('fading')
    setTimeout(() => {
      setActiveTab(idx)
      setFadeState('visible')
    }, 300)
  }

  const activeContent = items[activeTab]

  return (
    <section className="ins-solutions-section" style={{ padding: '120px 0' }}>
      {/* Arrow animation styles + responsive */}
      <style>{`
        .arrow-pill-svg .arrow-path {
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .sol-item-link:hover .arrow-pill-svg .arrow-path {
          animation: arrowSlide 0.6s ease forwards;
        }
        @keyframes arrowSlide {
          0% { transform: translateX(0); }
          40% { transform: translateX(6px); opacity: 0; }
          41% { transform: translateX(-8px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        .sol-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }
        @media (max-width: 768px) {
          .ins-solutions-section { padding: 60px 0 !important; }
          .ins-solutions-header { padding: 0 16px !important; margin-bottom: 32px !important; }
          .ins-solutions-title { font-size: 28px !important; }
          .ins-solutions-card {
            max-width: calc(100% - 32px) !important;
            padding: 24px 16px !important;
            border-radius: 16px !important;
            min-height: auto !important;
          }
          .ins-solutions-tabs {
            flex-direction: column !important;
            gap: 4px !important;
            padding: 8px !important;
            margin-bottom: 24px !important;
          }
          .ins-solutions-tab {
            padding: 12px 16px !important;
            font-size: 14px !important;
            text-align: left !important;
          }
          .ins-solutions-content {
            flex-direction: column !important;
            gap: 24px !important;
          }
          .ins-solutions-info {
            flex: none !important;
            width: 100% !important;
            padding-top: 0 !important;
          }
          .ins-solutions-info h3 { font-size: 24px !important; margin-bottom: 16px !important; }
          .ins-solutions-grid {
            flex: none !important;
            width: 100% !important;
            grid-template-columns: 1fr !important;
            display: grid !important;
          }
          .ins-solutions-grid .sol-item {
            margin-top: 0 !important;
          }
          .ins-solutions-grid .sol-item h4 { font-size: 20px !important; }
        }
      `}</style>

      {/* Header */}
      <div className="ins-solutions-header" style={{ textAlign: 'center', padding: '0 40px', marginBottom: '48px' }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', padding: '8px 16px',
          border: '1px solid rgba(17, 24, 39, 0.1)', borderRadius: '32px',
          fontSize: '16px', fontWeight: 600, color: '#111827',
          fontFamily: 'var(--font-inter), system-ui, sans-serif', marginBottom: '24px',
        }}>{pillText}</span>
        <h2 className="ins-solutions-title" style={{
          fontFamily: 'var(--font-manrope), system-ui, sans-serif',
          fontSize: '52px', fontWeight: 600, lineHeight: 1.1, color: '#172b5f',
        }}>
          {highlightText(headline, highlightedWords)}
        </h2>
      </div>

      {/* Solutions card */}
      <div className="ins-solutions-card" style={{
        maxWidth: '1360px', margin: '0 auto',
        background: 'linear-gradient(160deg, rgb(23, 43, 95) 5.28%, rgb(69, 203, 239) 128.71%)',
        borderRadius: '32px', padding: '80px 48px',
        position: 'relative', overflow: 'hidden',
        minHeight: '776px',
        border: '1px solid rgba(17, 24, 39, 0.1)',
        boxShadow: '0 0 10px rgba(23, 43, 95, 0.1)',
        color: 'white',
      }}>
        {/* Tab bar — bordered container */}
        <div className="ins-solutions-tabs" style={{
          display: 'flex', gap: '8px', marginBottom: '50px', flexWrap: 'wrap',
          border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '16px',
          padding: '16px',
          boxShadow: '0 0 10px rgba(23, 43, 95, 0.1)',
        }}>
          {items.map((tab, i) => (
            <button
              key={i}
              className="ins-solutions-tab"
              onClick={() => handleTabSwitch(i)}
              style={{
                flex: '1 0 0',
                padding: '16px 24px',
                borderRadius: '12px',
                fontFamily: 'var(--font-manrope), system-ui, sans-serif',
                fontSize: '16px', fontWeight: 600, lineHeight: 1.2,
                color: i === activeTab ? 'white' : 'rgba(255, 255, 255, 0.8)',
                background: i === activeTab ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                border: 'none', cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.25s ease',
              }}
            >
              {tab.tabLabel}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="ins-solutions-content" style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          opacity: fadeState === 'visible' ? 1 : 0,
          transform: fadeState === 'visible' ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.35s ease, transform 0.35s ease',
        }}>
          {/* Left info */}
          <div className="ins-solutions-info" style={{ flex: '0 0 302px', paddingTop: '40px' }}>
            {activeContent.categoryIconSvg && (
              <div
                style={{
                  width: '56px', height: '56px', background: 'white',
                  border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: '8px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '16px',
                  boxShadow: '0 0 10px rgba(23, 43, 95, 0.1)',
                }}
                dangerouslySetInnerHTML={{
                  __html: activeContent.categoryIconSvg.replace(/<svg/, '<svg style="width:40px;height:40px;stroke:#172b5f;fill:none;stroke-width:1.5"'),
                }}
              />
            )}
            <h3 style={{
              fontFamily: 'var(--font-manrope), system-ui, sans-serif',
              fontSize: '32px', fontWeight: 700, color: 'white', lineHeight: 1.1,
              marginBottom: '56px',
            }}>{activeContent.categoryTitle}</h3>
            <p style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '18px', fontWeight: 400, lineHeight: 1.3,
              letterSpacing: '-0.18px', color: 'rgba(255, 255, 255, 0.7)',
            }}>{activeContent.categoryDescription}</p>
          </div>

          {/* Right grid */}
          <div className="ins-solutions-grid" style={{
            flex: '0 0 731px',
            display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px',
          }}>
            {activeContent.solutions?.map((solution, j) => (
              <div
                key={j}
                className="sol-item"
                style={{
                  background: j === 0
                    ? 'white'
                    : 'linear-gradient(121.21deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.01) 108.84%)',
                  border: j === 0 ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px', padding: '24px',
                  transition: 'all 0.25s ease',
                  display: 'flex', flexDirection: 'column', gap: '16px',
                  marginTop: j === 1 ? '48px' : '0',
                  transform: j % 2 === 0 ? 'translateY(-24px)' : undefined,
                }}
              >
                <h4 style={{
                  fontFamily: 'var(--font-manrope), system-ui, sans-serif',
                  fontSize: '26px', fontWeight: 700,
                  color: j === 0 ? '#172b5f' : 'white', lineHeight: 1.2,
                }}>{solution.title}</h4>
                <p style={{
                  fontFamily: 'var(--font-inter), system-ui, sans-serif',
                  fontSize: '16px',
                  color: j === 0 ? 'rgba(23, 43, 95, 0.7)' : 'rgba(255, 255, 255, 0.7)',
                  lineHeight: 1.3, letterSpacing: '-0.16px', flex: 1,
                }}>{solution.description}</p>
                <a
                  href={solution.linkUrl || '#'}
                  className="sol-item-link"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    fontFamily: 'var(--font-manrope), system-ui, sans-serif',
                    fontSize: '20px', fontWeight: 500,
                    color: j === 0 ? '#172b5f' : 'white',
                    textDecoration: 'none',
                  }}
                >
                  <ArrowPillSvg />
                  Learn more
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
