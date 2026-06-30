'use client'
import React from 'react'

interface FooterLink {
  label: string
  url?: string
}

interface FooterCategory {
  title: string
  links?: FooterLink[]
}

interface InsuranceFooterProps {
  phone?: string
  email?: string
  address?: string
  categories?: FooterCategory[]
  disableInnerContainer?: boolean
}

const defaultCategories: FooterCategory[] = [
  {
    title: 'Employee & Workplace Benefits',
    links: [
      { label: 'Medical Insurance' },
      { label: "Workmen's Compensation" },
      { label: 'Gratuity Management' },
    ],
  },
  {
    title: 'Corporate Liability & Risk Management',
    links: [
      { label: 'Professional Indemnity' },
      { label: 'Directors & Officers' },
      { label: 'Third Party Liability' },
      { label: 'Cyber Security' },
    ],
  },
  {
    title: 'Specialized/High-Risk Insurance',
    links: [
      { label: 'Kidnap & Ransom' },
      { label: 'Defense Base Act Insurance' },
      { label: 'Event Insurance' },
    ],
  },
  {
    title: 'Property & Asset Protection',
    links: [
      { label: 'Commercial Property' },
      { label: 'Motor Fleet' },
      { label: 'Luxury Insurance Coverage' },
    ],
  },
]

export const InsuranceFooterBlockComponent: React.FC<InsuranceFooterProps> = ({
  phone = '+971 (0) 4567 4500',
  email = 'info@beneple.com',
  address = '16th Floor, Ubora Tower, Business Bay, Dubai, UAE',
  categories,
}) => {
  const cats = categories && categories.length > 0 ? categories : defaultCategories

  return (
    <footer
      className="ins-footer"
      style={{
        background: '#111827',
        color: 'white',
        fontFamily: 'var(--font-inter), system-ui, sans-serif',
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .ins-footer-inner { padding: 40px 16px 24px !important; }
          .ins-footer-top { flex-direction: column !important; gap: 24px !important; align-items: flex-start !important; }
          .ins-footer-content { flex-direction: column !important; gap: 32px !important; }
          .ins-footer-nav-grid { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
          .ins-footer-contact { flex: none !important; width: 100% !important; }
          .ins-footer-vdivider { width: 100% !important; height: 1px !important; }
          .ins-footer-bottom { flex-direction: column !important; gap: 16px !important; text-align: center !important; }
          .ins-footer-legal { flex-wrap: wrap !important; justify-content: center !important; gap: 12px !important; }
        }
        @media (max-width: 480px) {
          .ins-footer-nav-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div className="ins-footer-inner" style={{ maxWidth: '1360px', margin: '0 auto', padding: '64px 40px 32px' }}>
        {/* Top: Logo + Social */}
        <div className="ins-footer-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <img src="/img/Beneple-logo.png" alt="Beneple" style={{ height: '36px', filter: 'brightness(0) invert(1)' }} onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none'
          }} />
          <div style={{ display: 'flex', gap: '16px' }}>
            {['instagram', 'linkedin', 'facebook', 'whatsapp'].map((social) => (
              <a
                key={social}
                href="#"
                aria-label={social}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={`/insurance/icons/social-${social}.svg`}
                  alt={social}
                  width="18"
                  height="18"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '40px' }} />

        {/* Content: Nav + Contact */}
        <div className="ins-footer-content" style={{ display: 'flex', gap: '48px' }}>
          {/* Navigation */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                color: 'rgba(255,255,255,0.4)',
                marginBottom: '24px',
              }}
            >
              Our insurance solutions
            </div>
            <div className="ins-footer-nav-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' }}>
              {cats.map((cat, i) => (
                <div key={i}>
                  <h6
                    style={{
                      fontFamily: 'var(--font-manrope), system-ui, sans-serif',
                      fontSize: '14px',
                      fontWeight: 700,
                      marginBottom: '16px',
                      color: 'white',
                    }}
                  >
                    {cat.title}
                  </h6>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {cat.links?.map((link, j) => (
                      <a
                        key={j}
                        href={link.url || '#'}
                        style={{
                          fontSize: '13px',
                          color: 'rgba(255,255,255,0.5)',
                          textDecoration: 'none',
                          transition: 'color 0.25s',
                        }}
                        onMouseEnter={(e) => { (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.8)' }}
                        onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.5)' }}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vertical divider */}
          <div className="ins-footer-vdivider" style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }} />

          {/* Contact */}
          <div className="ins-footer-contact" style={{ flex: '0 0 220px' }}>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                color: 'rgba(255,255,255,0.4)',
                marginBottom: '24px',
              }}
            >
              Lets get in touch
            </div>
            <h6
              style={{
                fontFamily: 'var(--font-manrope), system-ui, sans-serif',
                fontSize: '14px',
                fontWeight: 700,
                marginBottom: '16px',
              }}
            >
              Contact us
            </h6>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a
                href={`tel:${phone.replace(/\s/g, '')}`}
                style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}
              >
                {phone}
              </a>
              <a
                href={`mailto:${email}`}
                style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}
              >
                {email}
              </a>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>{address}</p>
            </div>
          </div>
        </div>

        {/* Bottom divider */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '40px 0 24px' }} />

        {/* Bottom: Copyright + Legal */}
        <div className="ins-footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
            Copyright &copy;{new Date().getFullYear()} Beneple
          </span>
          <div className="ins-footer-legal" style={{ display: 'flex', gap: '24px' }}>
            {['Privacy Policy', 'Terms of use', 'Redress and complaints', 'License Number 92'].map((text) => (
              <a
                key={text}
                href="#"
                style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}
              >
                {text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
