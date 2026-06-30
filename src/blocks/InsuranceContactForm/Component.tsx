'use client'
import React, { useState } from 'react'

interface InsuranceType {
  label: string
}

interface InsuranceContactFormProps {
  pillText?: string
  headline?: string
  subtitle?: string
  hubspotPortalId?: string
  hubspotFormId?: string
  insuranceTypes?: InsuranceType[]
  disableInnerContainer?: boolean
}

// Custom checkbox component matching Figma
const CustomCheckbox: React.FC<{
  checked: boolean
  onChange: (checked: boolean) => void
  children: React.ReactNode
}> = ({ checked, onChange, children }) => (
  <label
    className="ins-checkbox-label"
    style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '8px',
      fontSize: '14px',
      color: 'rgba(11, 21, 12, 0.6)',
      lineHeight: 1.5,
      cursor: 'pointer',
      fontFamily: 'var(--font-inter), system-ui, sans-serif',
    }}
    onClick={() => onChange(!checked)}
  >
    <svg
      className="ins-checkbox-box"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={{ flexShrink: 0, marginTop: '3px', overflow: 'visible' }}
    >
      <rect x="0.5" y="0.5" width="15" height="15" rx="2.167" stroke="#172B5F" fill="white" />
      {checked && (
        <path d="M6.667 10.391L4.471 8.195 3.529 9.138 6.667 12.276 13.138 5.805 12.195 4.862z" fill="#172B5F" />
      )}
    </svg>
    <span>{children}</span>
  </label>
)

export const InsuranceContactFormBlockComponent: React.FC<InsuranceContactFormProps> = ({
  pillText = 'Contact us',
  headline = 'Get expert guidance tailored to your business',
  hubspotPortalId = '6136505',
  hubspotFormId,
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    renewalDate: '',
    email: '',
    phone: '',
    countryCode: '+(097)',
    areaOfInterest: '',
    message: '',
    consent1: false,
    consent2: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [phoneDropdownOpen, setPhoneDropdownOpen] = useState(false)

  // Inline SVG flag components for reliable rendering
  const flags: Record<string, React.ReactNode> = {
    UAE: <svg width="16" height="12" viewBox="0 0 16 12"><rect width="16" height="4" fill="#00732f"/><rect y="4" width="16" height="4" fill="#fff"/><rect y="8" width="16" height="4" fill="#000"/><rect width="4" height="12" fill="#ff0000"/></svg>,
    US: <svg width="16" height="12" viewBox="0 0 16 12"><rect width="16" height="12" fill="#b22234"/><rect y="0.92" width="16" height="0.92" fill="#fff"/><rect y="2.77" width="16" height="0.92" fill="#fff"/><rect y="4.62" width="16" height="0.92" fill="#fff"/><rect y="6.46" width="16" height="0.92" fill="#fff"/><rect y="8.31" width="16" height="0.92" fill="#fff"/><rect y="10.15" width="16" height="0.92" fill="#fff"/><rect width="6.4" height="6.46" fill="#3c3b6e"/></svg>,
    GB: <svg width="16" height="12" viewBox="0 0 16 12"><rect width="16" height="12" fill="#012169"/><path d="M0 0L16 12M16 0L0 12" stroke="#fff" strokeWidth="2"/><path d="M0 0L16 12M16 0L0 12" stroke="#C8102E" strokeWidth="1"/><path d="M8 0V12M0 6H16" stroke="#fff" strokeWidth="3.5"/><path d="M8 0V12M0 6H16" stroke="#C8102E" strokeWidth="2"/></svg>,
    FR: <svg width="16" height="12" viewBox="0 0 16 12"><rect width="5.33" height="12" fill="#002395"/><rect x="5.33" width="5.34" height="12" fill="#fff"/><rect x="10.67" width="5.33" height="12" fill="#ED2939"/></svg>,
    DE: <svg width="16" height="12" viewBox="0 0 16 12"><rect width="16" height="4" fill="#000"/><rect y="4" width="16" height="4" fill="#DD0000"/><rect y="8" width="16" height="4" fill="#FFCE00"/></svg>,
    IT: <svg width="16" height="12" viewBox="0 0 16 12"><rect width="5.33" height="12" fill="#009246"/><rect x="5.33" width="5.34" height="12" fill="#fff"/><rect x="10.67" width="5.33" height="12" fill="#CE2B37"/></svg>,
  }

  const countryCodes = [
    { code: '+(097)', label: 'UAE' },
    { code: '+(1)', label: 'US' },
    { code: '+(44)', label: 'GB' },
    { code: '+(33)', label: 'FR' },
    { code: '+(49)', label: 'DE' },
    { code: '+(39)', label: 'IT' },
  ]

  const selectedCountry = countryCodes.find((c) => c.code === formData.countryCode) || countryCodes[0]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (hubspotFormId && hubspotPortalId) {
      try {
        await fetch(
          `https://api.hsforms.com/submissions/v3/integration/submit/${hubspotPortalId}/${hubspotFormId}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              fields: [
                { name: 'firstname', value: formData.firstName },
                { name: 'lastname', value: formData.lastName },
                { name: 'company', value: formData.company },
                { name: 'phone', value: `+971${formData.phone}` },
                { name: 'email', value: formData.email },
                { name: 'message', value: formData.message },
              ],
            }),
          },
        )
      } catch {
        // silently handle
      }
    }

    setIsSubmitting(false)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 16px',
    background: 'white',
    border: '1px solid rgba(17, 24, 39, 0.15)',
    borderRadius: '8px',
    color: '#111827',
    fontSize: '16px',
    fontFamily: 'var(--font-inter), system-ui, sans-serif',
    height: '44px',
    outline: 'none',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '14px',
    fontWeight: 500,
    color: '#111827',
    marginBottom: '4px',
    fontFamily: 'var(--font-inter), system-ui, sans-serif',
  }

  const rowStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    marginBottom: '16px',
  }

  return (
    <section id="contact" className="ins-contact-section" style={{ padding: '120px 0 0' }}>
      {/* Scoped styles for date input, custom checkbox, and responsive */}
      <style>{`
        .ins-date-input::-webkit-calendar-picker-indicator {
          opacity: 0;
          position: absolute;
          right: 0;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }
        .ins-date-input {
          position: relative;
          color: rgba(17, 24, 39, 0.4);
        }
        .ins-date-input:valid {
          color: #111827;
        }
        .ins-select:focus, .ins-input:focus {
          border-color: #40a8c5;
          box-shadow: 0 0 0 2px rgba(64, 168, 197, 0.15);
        }
        @media (max-width: 768px) {
          .ins-contact-section { padding: 60px 0 0 !important; }
          .ins-contact-header { margin-bottom: 32px !important; }
          .ins-contact-title { font-size: 28px !important; }
          .ins-contact-form { padding: 0 16px !important; }
          .ins-contact-row { grid-template-columns: 1fr !important; }
          .ins-contact-submit { width: 100% !important; min-width: unset !important; }
        }
      `}</style>

      {/* Header */}
      <div className="ins-contact-header" style={{ textAlign: 'center', marginBottom: '48px' }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', padding: '8px 16px',
          border: '1px solid rgba(17, 24, 39, 0.1)', borderRadius: '32px',
          fontSize: '16px', fontWeight: 600, color: '#111827',
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
        }}>{pillText}</span>
        <h2 className="ins-contact-title" style={{
          fontFamily: 'var(--font-manrope), system-ui, sans-serif',
          fontSize: '52px', fontWeight: 600, lineHeight: 1.1, color: '#172b5f',
          marginTop: '24px',
        }}>{headline}</h2>
      </div>

      {/* Form area — transparent to show Aurora gradient behind */}
      <div style={{ padding: '48px 0 60px' }}>
        <form
          onSubmit={handleSubmit}
          className="ins-contact-form"
          style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 40px' }}
        >
          {/* Row 1: First name / Last name */}
          <div className="ins-contact-row" style={rowStyle}>
            <div>
              <label style={labelStyle}>First name</label>
              <input
                className="ins-input"
                style={inputStyle}
                type="text"
                placeholder="John"
                value={formData.firstName}
                onChange={(e) => setFormData((p) => ({ ...p, firstName: e.target.value }))}
              />
            </div>
            <div>
              <label style={labelStyle}>Last name</label>
              <input
                className="ins-input"
                style={inputStyle}
                type="text"
                placeholder="John"
                value={formData.lastName}
                onChange={(e) => setFormData((p) => ({ ...p, lastName: e.target.value }))}
              />
            </div>
          </div>

          {/* Row 2: Company name / Renewal date */}
          <div className="ins-contact-row" style={rowStyle}>
            <div>
              <label style={labelStyle}>Company name</label>
              <input
                className="ins-input"
                style={inputStyle}
                type="text"
                placeholder="Ex: Beneple"
                value={formData.company}
                onChange={(e) => setFormData((p) => ({ ...p, company: e.target.value }))}
              />
            </div>
            <div>
              <label style={labelStyle}>
                Company Medical Insurance Renewal Date <span style={{ color: 'rgba(17,24,39,0.4)' }}>(optional)</span>
              </label>
              <div style={{ position: 'relative' }}>
                {/* Calendar icon */}
                <svg
                  style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 1 }}
                  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#172b5f" strokeWidth="1.5"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <input
                  className="ins-date-input ins-input"
                  style={{ ...inputStyle, paddingLeft: '50px' }}
                  type="date"
                  value={formData.renewalDate}
                  onChange={(e) => setFormData((p) => ({ ...p, renewalDate: e.target.value }))}
                />
              </div>
            </div>
          </div>

          {/* Row 3: Email / Phone */}
          <div className="ins-contact-row" style={rowStyle}>
            <div>
              <label style={labelStyle}>Email</label>
              <input
                className="ins-input"
                style={inputStyle}
                type="email"
                placeholder="John"
                value={formData.email}
                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
              />
            </div>
            <div>
              <label style={labelStyle}>Phone number</label>
              <div style={{ display: 'flex', border: '1px solid rgba(17, 24, 39, 0.15)', borderRadius: '8px', background: 'white', height: '44px', position: 'relative' }}>
                {/* Country code selector */}
                <div
                  onClick={() => setPhoneDropdownOpen(!phoneDropdownOpen)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '0 12px', fontSize: '14px', color: '#111827',
                    whiteSpace: 'nowrap', cursor: 'pointer',
                    fontFamily: 'var(--font-inter), system-ui, sans-serif',
                    userSelect: 'none',
                  }}
                >
                  {flags[selectedCountry.label]}
                  <span>{formData.countryCode}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2.5"
                    style={{ transform: phoneDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>

                {/* Country dropdown */}
                {phoneDropdownOpen && (
                  <div style={{
                    position: 'absolute', top: '48px', left: 0, zIndex: 50,
                    background: 'white', border: '1px solid rgba(17,24,39,0.1)',
                    borderRadius: '8px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    minWidth: '140px', overflow: 'hidden',
                  }}>
                    {countryCodes.map((c) => (
                      <div
                        key={c.code}
                        onClick={() => {
                          setFormData((p) => ({ ...p, countryCode: c.code }))
                          setPhoneDropdownOpen(false)
                        }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '8px',
                          padding: '10px 16px', cursor: 'pointer',
                          fontSize: '14px', color: '#111827',
                          fontFamily: 'var(--font-inter), system-ui, sans-serif',
                          background: c.code === formData.countryCode ? 'rgba(17,24,39,0.04)' : 'transparent',
                          transition: 'background 0.15s ease',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(17,24,39,0.06)' }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = c.code === formData.countryCode ? 'rgba(17,24,39,0.04)' : 'transparent' }}
                      >
                        {flags[c.label]}
                        <span>{c.code}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Vertical divider */}
                <div style={{ width: '1px', background: 'rgba(17,24,39,0.15)', margin: '10px 0' }} />
                {/* Phone input */}
                <input
                  className="ins-input"
                  style={{
                    ...inputStyle,
                    border: 'none',
                    borderRadius: '0 8px 8px 0',
                    height: '42px',
                    flex: 1,
                  }}
                  type="tel"
                  placeholder="123 456 789"
                  value={formData.phone}
                  onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                />
              </div>
            </div>
          </div>

          {/* Row 4: Area of interest */}
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Area of interest</label>
            <div style={{ position: 'relative' }}>
              <select
                className="ins-select"
                style={{
                  ...inputStyle,
                  appearance: 'none',
                  paddingRight: '40px',
                  cursor: 'pointer',
                  color: formData.areaOfInterest ? '#111827' : 'rgba(17,24,39,0.4)',
                }}
                value={formData.areaOfInterest}
                onChange={(e) => setFormData((p) => ({ ...p, areaOfInterest: e.target.value }))}
              >
                <option value="">Choose an option</option>
                <option value="medical">Medical Insurance</option>
                <option value="group-life">Group Life</option>
                <option value="workmens">Workmen&apos;s Compensation</option>
                <option value="gratuity">Gratuity Management</option>
                <option value="professional">Professional Indemnity</option>
                <option value="property">Property Insurance</option>
                <option value="motor">Motor Fleet</option>
                <option value="other">Other</option>
              </select>
              <svg
                style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </div>

          {/* Row 5: Message */}
          <div style={{ marginBottom: '32px' }}>
            <label style={labelStyle}>Message</label>
            <textarea
              className="ins-input"
              style={{
                ...inputStyle,
                height: '120px',
                resize: 'vertical',
                padding: '10px 16px',
              }}
              placeholder="Please describe your needs ..."
              value={formData.message}
              onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
            />
          </div>

          {/* Custom checkboxes */}
          <div style={{ marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <CustomCheckbox
              checked={formData.consent1}
              onChange={(v) => setFormData((p) => ({ ...p, consent1: v }))}
            >
              I agree to receive other communications from Blue Sky Thinking Group and its affiliates (FAEU Insurance Brokers, Beneple DMCC, and Finsbury Wealth DIFC Limited and understand that my data may be shared among the above entities.*
            </CustomCheckbox>
            <CustomCheckbox
              checked={formData.consent2}
              onChange={(v) => setFormData((p) => ({ ...p, consent2: v }))}
            >
              I agree to allow Blue Sky Thinking Group and it&apos;s affiliates FAEU Insurance Brokers LLC, Beneple DMCC, Finsbury Wealth DIFC Limited and partners to store and process my personal data and understand that my data may be shared among the above entities and their partners.*
            </CustomCheckbox>
          </div>

          {/* Submit button — simple pill, matching Figma CTA component */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              type="submit"
              className="ins-contact-submit"
              disabled={isSubmitting}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '167px',
                height: '56px',
                padding: '0 40px',
                background: 'linear-gradient(165.44deg, #172b5f 8.15%, #111827 94.34%)',
                color: 'white',
                borderRadius: '40px',
                border: 'none',
                fontFamily: 'var(--font-manrope), system-ui, sans-serif',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                lineHeight: 1.2,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)'
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(23, 43, 95, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {submitted ? 'Thank you!' : isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
