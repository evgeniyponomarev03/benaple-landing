import { getPayload } from 'payload'
import config from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config })

    const body = await request.json()
    const {
      firstName,
      lastName,
      email,
      phone,
      message,
      consent,
      optInMarketing,
    } = body

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        {
          error:
            'First name, last name, and email are required',
        },
        { status: 400 },
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 },
      )
    }

    // Create submission record (this will trigger the HubSpot integration via the afterChange hook)
    const submission = await payload.create({
      collection: 'submissions',
      data: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || '',
        message: message?.trim() || '',
        consent: !!consent,
        optInMarketing: !!optInMarketing,
      },
      req: {
        ...request,
        headers: Object.fromEntries(
          request.headers.entries(),
        ),
      } as any,
    })

    return NextResponse.json({
      success: true,
      message: 'Form submitted successfully',
      submissionId: submission.id,
    })
  } catch (error) {
    console.error('Form submission error:', error)

    return NextResponse.json(
      {
        error:
          'Failed to submit form. Please try again later.',
        details:
          error instanceof Error
            ? error.message
            : 'Unknown error',
      },
      { status: 500 },
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

