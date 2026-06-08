'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { getClientSideURL } from '@/utilities/getURL'

interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  message: string
  consent: boolean
  optInMarketing: boolean
}

interface ContactFormProps {
  className?: string
}

export const ContactForm: React.FC<ContactFormProps> = ({
  className = '',
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<ContactFormData>({
    defaultValues: {
      consent: false,
      optInMarketing: false,
    },
  })

  const watchConsent = watch('consent')
  const watchOptIn = watch('optInMarketing')

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch(
        `${getClientSideURL()}/api/submit-form`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      )

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        reset()
      } else {
        setSubmitStatus('error')
        setErrorMessage(
          result.error ||
            'Something went wrong. Please try again.',
        )
      }
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage(
        'Network error. Please check your connection and try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === 'success') {
    return (
      <div
        className={`mx-auto max-w-2xl rounded-lg border border-green-200 bg-green-50 p-6 ${className}`}
      >
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-green-900">
            Thank you for your message!
          </h3>
          <p className="mb-4 text-green-700">
            We&apos;ve received your inquiry and will get back to
            you soon.
          </p>
          <Button
            onClick={() => setSubmitStatus('idle')}
            variant="outline"
            className="border-green-300 text-green-700 hover:bg-green-100"
          >
            Send another message
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={`mx-auto max-w-2xl ${className}`}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* First Name */}
          <div>
            <Label
              htmlFor="firstName"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              First Name *
            </Label>
            <Input
              id="firstName"
              {...register('firstName', {
                required: 'First name is required',
                minLength: {
                  value: 2,
                  message:
                    'First name must be at least 2 characters',
                },
              })}
              className={
                errors.firstName ? 'border-red-500' : ''
              }
              placeholder="Enter your first name"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <Label
              htmlFor="lastName"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Last Name *
            </Label>
            <Input
              id="lastName"
              {...register('lastName', {
                required: 'Last name is required',
                minLength: {
                  value: 2,
                  message:
                    'Last name must be at least 2 characters',
                },
              })}
              className={
                errors.lastName ? 'border-red-500' : ''
              }
              placeholder="Enter your last name"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Email */}
          <div>
            <Label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message:
                    'Please enter a valid email address',
                },
              })}
              className={
                errors.email ? 'border-red-500' : ''
              }
              placeholder="Enter your email address"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <Label
              htmlFor="phone"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              {...register('phone')}
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <Label
            htmlFor="message"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Message *
          </Label>
          <Textarea
            id="message"
            {...register('message', {
              required: 'Message is required',
              minLength: {
                value: 10,
                message:
                  'Message must be at least 10 characters',
              },
            })}
            className={
              errors.message ? 'border-red-500' : ''
            }
            placeholder="Tell us about your inquiry..."
            rows={4}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Consent Checkbox */}
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="consent"
              checked={watchConsent}
              onCheckedChange={(checked) =>
                setValue('consent', !!checked)
              }
            />
            <Label
              htmlFor="consent"
              className="cursor-pointer text-sm leading-5 text-gray-700"
            >
              I agree to allow this company to store and
              process my personal data for the purpose of
              responding to my inquiry. *
            </Label>
          </div>
          {errors.consent && (
            <p className="ml-6 text-sm text-red-600">
              {errors.consent.message}
            </p>
          )}

          <div className="flex items-start space-x-3">
            <Checkbox
              id="optInMarketing"
              checked={watchOptIn}
              onCheckedChange={(checked) =>
                setValue('optInMarketing', !!checked)
              }
            />
            <Label
              htmlFor="optInMarketing"
              className="cursor-pointer text-sm leading-5 text-gray-700"
            >
              I would like to receive marketing
              communications about products and services.
            </Label>
          </div>
        </div>

        {/* Error Message */}
        {submitStatus === 'error' && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-700">
              {errorMessage}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            disabled={isSubmitting || !watchConsent}
            className="w-full bg-primary px-8 py-3 text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="-ml-1 mr-3 h-4 w-4 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </>
            ) : (
              'Send Message'
            )}
          </Button>
        </div>

        <p className="text-xs text-gray-500">
          * Required fields
        </p>
      </form>
    </div>
  )
}








