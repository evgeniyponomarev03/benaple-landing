import type { CollectionConfig } from 'payload'

export const Submissions: CollectionConfig = {
  slug: 'submissions',
  admin: {
    useAsTitle: 'email',
    defaultColumns: [
      'firstName',
      'lastName',
      'email',
      'createdAt',
    ],
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
      admin: {
        width: '50%',
      },
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
      admin: {
        width: '50%',
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      admin: {
        width: '50%',
      },
    },
    {
      name: 'phone',
      type: 'text',
      admin: {
        width: '50%',
      },
    },
    {
      name: 'message',
      type: 'textarea',
      admin: {
        rows: 4,
      },
    },
    {
      name: 'consent',
      type: 'checkbox',
      label: 'GDPR consent',
      defaultValue: false,
      admin: {
        width: '50%',
      },
    },
    {
      name: 'optInMarketing',
      type: 'checkbox',
      label: 'Marketing emails',
      defaultValue: false,
      admin: {
        width: '50%',
      },
    },
    {
      name: 'companyName',
      type: 'text',
      admin: {
        width: '50%',
      },
    },
    {
      name: 'insuranceRenewalDate',
      type: 'date',
      admin: {
        width: '50%',
      },
    },
    {
      name: 'areaOfInterest',
      type: 'text',
      admin: {
        width: '50%',
      },
    },
    {
      name: 'countryCode',
      type: 'text',
      admin: {
        width: '50%',
      },
    },
    {
      name: 'hubspotSubmitted',
      type: 'checkbox',
      label: 'Successfully submitted to HubSpot',
      defaultValue: false,
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'hubspotError',
      type: 'textarea',
      label: 'HubSpot submission error (if any)',
      admin: {
        readOnly: true,
        position: 'sidebar',
        rows: 3,
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation !== 'create') return

        const portalId = process.env.HS_PORTAL_ID
        const formId = process.env.HS_FORM_ID
        const token = process.env.HS_PRIVATE_APP_TOKEN

        if (!portalId || !formId || !token) {
          req.payload.logger.warn(
            'HubSpot environment variables not configured',
          )
          return
        }

        try {
          // hubspotutk cookie improves tracking
          const hutk =
            (req as any)?.cookies?.hubspotutk ||
            req?.headers
              ?.get('cookie')
              ?.match(/hubspotutk=([^;]+)/)?.[1]

          const payloadBody = {
            fields: [
              { name: 'email', value: doc.email },
              { name: 'firstname', value: doc.firstName },
              { name: 'lastname', value: doc.lastName },
              { name: 'phone', value: doc.phone || '' },
              { name: 'message', value: doc.message || '' },
              {
                name: 'company',
                value: doc.companyName || '',
              },
              {
                name: 'area_of_interest',
                value: doc.areaOfInterest || '',
              },
              {
                name: 'insurance_renewal_date',
                value: doc.insuranceRenewalDate || '',
              },
            ],
            context: {
              hutk,
              pageUri:
                req?.headers?.get('referer') ||
                req?.headers?.get('origin') ||
                '',
              pageName: 'Contact form',
            },
            // Optional but recommended for GDPR regions
            legalConsentOptions: {
              consent: {
                consentToProcess: !!doc.consent,
                text: 'I agree to allow Example Co. to store and process my personal data.',
                communications: doc.optInMarketing
                  ? [
                      {
                        value: true,
                        subscriptionTypeId: 999, // replace with your Marketing Subscription ID
                        text: 'I agree to receive marketing communications.',
                      },
                    ]
                  : [],
              },
            },
          }

          const res = await fetch(
            `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payloadBody),
            },
          )

          if (res.ok) {
            // Update the document to mark HubSpot submission as successful
            await req.payload.update({
              collection: 'submissions',
              id: doc.id,
              data: {
                hubspotSubmitted: true,
              },
            })
            req.payload.logger.info(
              `HubSpot submission successful for ${doc.email}`,
            )
          } else {
            const errorText = await res.text()
            req.payload.logger.error(
              `HubSpot submit error: ${res.status} ${errorText}`,
            )

            // Update the document with the error
            await req.payload.update({
              collection: 'submissions',
              id: doc.id,
              data: {
                hubspotSubmitted: false,
                hubspotError: `HTTP ${res.status}: ${errorText}`,
              },
            })
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : 'Unknown error'
          req.payload.logger.error(
            `HubSpot submission failed: ${errorMessage}`,
          )

          // Update the document with the error
          await req.payload.update({
            collection: 'submissions',
            id: doc.id,
            data: {
              hubspotSubmitted: false,
              hubspotError: errorMessage,
            },
          })
        }
      },
    ],
  },
  access: {
    read: ({ req }) => {
      // Only admins can read submissions
      return Boolean(req.user)
    },
    create: () => true, // Allow public creation (form submissions)
    update: ({ req }) => {
      // Only admins can update submissions
      return Boolean(req.user)
    },
    delete: ({ req }) => {
      // Only admins can delete submissions
      return Boolean(req.user)
    },
  },
}
