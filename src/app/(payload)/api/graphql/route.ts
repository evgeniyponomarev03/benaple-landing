/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import config from '@payload-config'
import { GRAPHQL_POST, REST_OPTIONS } from '@payloadcms/next/routes'
import type { NextRequest } from 'next/server'

export const POST = GRAPHQL_POST(config)

// Wrap OPTIONS handler to match Next.js 15 API
const payloadOptions = REST_OPTIONS(config)
export const OPTIONS = async (
  request: NextRequest,
  _context: { params: Promise<Record<string, never>> },
) => {
  // Convert NextRequest to Request for Payload compatibility
  const req = new Request(request.url, {
    method: request.method,
    headers: request.headers,
    body: request.body,
  })
  // GraphQL route doesn't have slug params, so pass empty array
  return payloadOptions(req, { params: Promise.resolve({ slug: [] }) })
}
