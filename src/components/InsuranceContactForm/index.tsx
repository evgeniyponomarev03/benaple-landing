'use client'

import { useState } from 'react'
import { submitContact } from '@/actions/contact'
import DatePickerInput from '@/components/DatePicker'
import CountryPicker from '@/components/CountryPicker'
import SubjectDropdown from '@/components/SubjectDropdown'
import TermsAgreement from '@/components/TermsBlock'

const countriesDropdown = [
  {
    id: '1',
    countryCode: '(+123)',
    flag: '/flags/usa.svg',
  },
  {
    id: '2',
    countryCode: '(+123)',
    flag: '/flags/uk.svg',
  },
  {
    id: '3',
    countryCode: '(+123)',
    flag: '/flags/romania.svg',
  },
  {
    id: '4',
    countryCode: '(+123)',
    flag: '/flags/germany.svg',
  },
  {
    id: '5',
    countryCode: '(+123)',
    flag: '/flags/france.svg',
  },
]

const subjectsDropdown = [
  {
    id: '1',
    name: 'Employee & Workplace Benefits',
  },
  {
    id: '2',
    name: 'Corporate Liability & Risk Management',
  },
  {
    id: '3',
    name: 'Specialized/High-Risk Insurance',
  },
  {
    id: '4',
    name: 'Property & Asset Protection',
  },
]

type Subject = {
  id: string
  name: string
}

export default function InsuranceContactForm() {
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  const [error, setError] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [consent, setConsent] = useState(false)
  const [optInMarketing, setOptInMarketing] =
    useState(false)

  const handleCountrySelect = (country: string) =>
    setSelectedCountry(country)
  const handleSubjectSelect = (subject: Subject) =>
    setSelectedSubject(subject.name)

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault()
    setStatus('loading')

    const form = e.currentTarget // store reference here
    const formData = new FormData(form)
    formData.append('area-of-interest', selectedSubject)
    formData.append('insurance-date', selectedDate)
    formData.append('consent', String(consent))
    formData.append(
      'optInMarketing',
      String(optInMarketing),
    )

    const result = await submitContact(formData)

    if (result.success) {
      setStatus('success')
      form.reset() // use stored reference
    } else {
      setStatus('error')
      setError(result.error || 'Something went wrong.')
    }
  }

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="formGrid">
          <div className="item">
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              id="first-name"
              name="first-name"
              placeholder="John"
              required
            />
          </div>
          <div className="item">
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              id="last-name"
              name="last-name"
              placeholder="Doe"
              required
            />
          </div>
          <div className="item">
            <label htmlFor="company-name">
              Company name
            </label>
            <input
              type="text"
              id="company-name"
              name="company-name"
              placeholder="Ex: Beneple"
            />
          </div>
          <div className="item">
            <label htmlFor="insurance-date">
              Company Medical Insurance Renewal Date
              (optional)
            </label>
            <DatePickerInput
              onSelect={(date: string) =>
                setSelectedDate(date)
              }
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="john@example.com"
              required
            />
          </div>
          <div className="item">
            <label htmlFor="phone-number">
              Phone number
            </label>
            <div className="phoneInput">
              <div className="countryCodesDropdown">
                <CountryPicker
                  countriesDropdown={countriesDropdown}
                  onSelect={handleCountrySelect}
                />
                <input
                  type="tel"
                  name="phone-number"
                  id="phone"
                  placeholder="123 456 789"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="interestsDropdown">
          <label>Area of interest</label>
          <SubjectDropdown
            subjects={subjectsDropdown}
            defaultSubjectId="1"
            onSelect={handleSubjectSelect}
          />
        </div>

        <div className="messageInput">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Please describe your needs..."
            rows={5}
          />
        </div>

        <div className="agreements">
          <TermsAgreement
            onConsentChange={setConsent}
            onOptInChange={setOptInMarketing}
          />
        </div>

        {status === 'error' && (
          <p className="errorMessage">{error}</p>
        )}
        {status === 'success' && (
          <p className="successMessage">
            Message sent successfully!
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Sending...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}
