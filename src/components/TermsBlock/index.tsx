'use client'

import { useState } from 'react'

interface Props {
  onChange?: (agreed: boolean) => void
  onConsentChange?: (value: boolean) => void
  onOptInChange?: (value: boolean) => void
  required?: boolean
}

const TermsAgreement: React.FC<Props> = ({
  onChange,
  onOptInChange,
  onConsentChange,
  required = true,
}) => {
  const [shareDataAgreement, setShareDataAgreement] =
    useState(false)
  const [storeDataAgreement, setStoreDataAgreement] =
    useState(false)
  const [touchedShareData, setShareDataTouched] =
    useState(false)
  const [touchedStoreData, setStoreDataTouched] =
    useState(false)

  const handleFirstChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setShareDataAgreement(e.target.checked)
    setShareDataTouched(true)
    onChange?.(e.target.checked)
    onOptInChange?.(e.target.checked) // share data = marketing opt-in
  }

  const handleSecondChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setStoreDataAgreement(e.target.checked)
    setStoreDataTouched(true)
    onChange?.(e.target.checked)
    onConsentChange?.(e.target.checked) // store data = consent
  }

  //   const showError = required && touched && !agreed

  return (
    <>
      <div className="item flex flex-col gap-1">
        <label className="inline-flex items-start gap-2">
          <span className="relative">
            <input
              type="checkbox"
              checked={shareDataAgreement}
              onChange={handleFirstChange}
              className="h-4 w-4 appearance-none rounded-[2.67px] border border-[#172B5F] bg-white checked:flex checked:items-center checked:justify-center checked:bg-white"
            />

            {shareDataAgreement && (
              <svg
                className="pointer-events-none absolute left-0 top-0 h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#172B5F"
                strokeWidth={2}
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            )}
          </span>
          <span className="text-sm">
            I agree to receive other communications from
            Blue Sky Thinking Group and its affiliates (FAEU
            Insurance Brokers, Beneple DMCC, and Finsbury
            Wealth DIFC Limited) and understand that my data
            may be shared among the above entities.*
          </span>
        </label>

        {/* {showError && (
        <p className="text-sm text-red-500">
          You must agree before submitting.
        </p>
      )} */}
      </div>
      <div className="item flex flex-col gap-1">
        <label className="inline-flex items-start gap-2">
          <span className="relative">
            <input
              type="checkbox"
              checked={storeDataAgreement}
              onChange={handleSecondChange}
              className="h-4 w-4 appearance-none rounded-[2.67px] border border-[#172B5F] bg-white checked:flex checked:items-center checked:justify-center checked:bg-white"
            />

            {storeDataAgreement && (
              <svg
                className="pointer-events-none absolute left-0 top-0 h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#172B5F"
                strokeWidth={2}
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            )}
          </span>
          <span className="text-sm">
            I agree to allow Blue Sky Thinking Group and
            it&apos;s affiliates FAEU Insurance Brokers LLC,
            Beneple DMCC, Finsbury Wealth DIFC Limited and
            partners to store and process my personal data
            and understand that my data may be shared among
            the above entities and their partners.*
          </span>
        </label>

        {/* {showError && (
        <p className="text-sm text-red-500">
          You must agree before submitting.
        </p>
      )} */}
      </div>
    </>
  )
}

export default TermsAgreement
