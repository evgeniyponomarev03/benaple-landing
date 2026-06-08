import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import {
  GenerateTitle,
  GenerateURL,
} from '@payloadcms/plugin-seo/types'
import {
  FixedToolbarFeature,
  HeadingFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'

import { Page, Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

const generateTitle: GenerateTitle<Post | Page> = ({
  doc,
}) => {
  return doc?.title
    ? `${doc.title} | Beneple Website Template`
    : 'Beneple Website Template'
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  vercelBlobStorage({
    enabled: true,
    collections: {
      media: {
        prefix: 'media',
      },
    },
    token: process.env.BLOB_READ_WRITE_TOKEN || '',
    cacheControlMaxAge: 31536000, // 1 year
    addRandomSuffix: false, // Keep original filenames
  }),
  redirectsPlugin({
    collections: ['pages', 'posts'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description:
                  'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) =>
      docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formOverrides: {
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if (
            'name' in field &&
            field.name === 'confirmationMessage'
          ) {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({
                      enabledHeadingSizes: [
                        'h1',
                        'h2',
                        'h3',
                        'h4',
                      ],
                    }),
                  ]
                },
              }),
            }
          }
          return field
        })
      },
    },
    formSubmissionOverrides: {
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
              // Get the form data from submissionData
              const formData: Record<string, string> = {}
              if (
                doc.submissionData &&
                Array.isArray(doc.submissionData)
              ) {
                doc.submissionData.forEach((item: any) => {
                  if (item.field && item.value) {
                    formData[item.field] = item.value
                  }
                })
              }

              // Map common form fields to HubSpot properties
              const hubspotFields: Array<{
                name: string
                value: string
              }> = []

              // Map your specific form fields to HubSpot properties
              const firstName =
                formData['firstName'] ||
                formData['first-name'] ||
                ''
              const lastName =
                formData['lastName'] ||
                formData['last-name'] ||
                ''
              const companyName =
                formData['companyName'] ||
                formData['company-name'] ||
                formData['company'] ||
                ''
              const email = formData['email'] || ''
              const phoneNumber =
                formData['phoneNumber'] ||
                formData['phone-number'] ||
                formData['phone'] ||
                ''
              const message = formData['message'] || ''

              // Handle the renewal date fields (if needed for HubSpot)
              const renewalYear =
                formData['renewalYear'] || ''
              const renewalMonth =
                formData['renewalMonth'] || ''
              const renewalDay =
                formData['renewalDay'] || ''
              const renewalDate =
                renewalYear && renewalMonth && renewalDay
                  ? `${renewalYear}-${renewalMonth.padStart(2, '0')}-${renewalDay.padStart(2, '0')}`
                  : ''

              // Handle area of interest (checkboxes)
              const areaOfInterest = []
              if (
                formData['areaOfInterest-insurance'] ===
                  'true'
              ) {
                areaOfInterest.push('Insurance')
              }
              if (
                formData['areaOfInterest-hrPlatform'] ===
                  'true'
              ) {
                areaOfInterest.push('HR Platform')
              }
              if (
                formData['areaOfInterest-wellness'] ===
                  'true'
              ) {
                areaOfInterest.push('Wellness')
              }

              // Add standard fields to HubSpot payload
              if (firstName)
                hubspotFields.push({
                  name: 'firstname',
                  value: firstName,
                })
              if (lastName)
                hubspotFields.push({
                  name: 'lastname',
                  value: lastName,
                })
              if (email)
                hubspotFields.push({
                  name: 'email',
                  value: email,
                })
              if (phoneNumber)
                hubspotFields.push({
                  name: 'phone',
                  value: phoneNumber,
                })
              if (companyName)
                hubspotFields.push({
                  name: 'company',
                  value: companyName,
                })
              if (message)
                hubspotFields.push({
                  name: 'message',
                  value: message,
                })

              // Add custom fields
              if (renewalDate)
                hubspotFields.push({
                  name: 'medical_insurance_renewal_date',
                  value: renewalDate,
                })
              if (areaOfInterest.length > 0)
                hubspotFields.push({
                  name: 'area_of_interest',
                  value: areaOfInterest.join(', '),
                })

              // Add any other custom fields
              Object.entries(formData).forEach(
                ([key, value]) => {
                  if (
                    ![
                      'firstName',
                      'first-name',
                      'lastName',
                      'last-name',
                      'companyName',
                      'company-name',
                      'company',
                      'email',
                      'phoneNumber',
                      'phone-number',
                      'phone',
                      'message',
                      'renewalYear',
                      'renewalMonth',
                      'renewalDay',
                      'areaOfInterest-insurance',
                      'areaOfInterest-hrPlatform',
                      'areaOfInterest-wellness',
                      'consent',
                      'optInMarketing',
                    ].includes(key)
                  ) {
                    hubspotFields.push({
                      name: key,
                      value: value,
                    })
                  }
                },
              )

              if (hubspotFields.length === 0) {
                req.payload.logger.warn(
                  'No valid form fields found for HubSpot submission',
                )
                return
              }

              // hubspotutk cookie improves tracking
              const hutk =
                (req as any)?.cookies?.hubspotutk ||
                req?.headers?.get('cookie')?.match(
                  /hubspotutk=([^;]+)/,
                )?.[1]

              const payloadBody = {
                fields: hubspotFields,
                context: {
                  hutk,
                  pageUri:
                    req?.headers?.get('referer') ||
                    req?.headers?.get('origin') ||
                    '',
                  pageName: 'Contact form',
                },
                // GDPR consent handling
                legalConsentOptions: {
                  consent: {
                    consentToProcess:
                      formData['consent'] === 'true',
                    text: 'I agree to allow this company to store and process my personal data for the purpose of responding to my inquiry.',
                    communications:
                      formData['optInMarketing'] === 'true' ? [
                            {
                              value: true,
                              subscriptionTypeId: 999, // Replace with your actual Marketing Subscription ID
                              text: 'I agree to receive marketing communications about products and services.',
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
                req.payload.logger.info(
                  `HubSpot submission successful for form submission ${doc.id}`,
                )
              } else {
                const errorText = await res.text()
                req.payload.logger.error(
                  `HubSpot submit error: ${res.status} ${errorText}`,
                )
              }
            } catch (error) {
              const errorMessage =
                error instanceof Error
                  ? error.message
                  : 'Unknown error'
              req.payload.logger.error(
                `HubSpot submission failed: ${errorMessage}`,
              )
            }
          },
        ],
      },
    },
  }),
  searchPlugin({
    collections: ['posts', 'pages'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
  payloadCloudPlugin(),
]
