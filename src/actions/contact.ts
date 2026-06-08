'use server'

import { getServerSideURL } from '@/utilities/getURL'

export async function submitContact(formData: FormData) {
  const data = {
    firstName: formData.get('first-name'),
    lastName: formData.get('last-name'),
    companyName: formData.get('company-name'),
    insuranceRenewalDate: formData.get('insurance-date'),
    email: formData.get('email'),
    phone: formData.get('phone-number'),
    areaOfInterest: formData.get('area-of-interest'),
    message: formData.get('message'),
    consent: formData.get('consent') === 'true',
    optInMarketing:
      formData.get('optInMarketing') === 'true',
  }

  if (
    !data.firstName ||
    !data.lastName ||
    !data.email ||
    !data.message ||
    !data.consent
  ) {
    return {
      success: false,
      error: 'Please fill in all required fields.',
    }
  }

  try {
    const response = await fetch(
      `${getServerSideURL()}/api/submissions`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      },
    )

    if (!response.ok) {
      const error = await response.json()
      return {
        success: false,
        error: error.message || 'Submission failed.',
      }
    }

    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: 'Network error. Please try again.',
    }
  }
}
