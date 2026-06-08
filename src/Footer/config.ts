import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'columns',
      type: 'array',
      label: 'Footer Columns',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Column Title',
          admin: {
            placeholder: 'e.g., Contact, Company Info',
          },
        },
        {
          name: 'items',
          type: 'array',
          label: 'Column Items',
          minRows: 1,
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'Text',
              required: true,
            },
            {
              name: 'type',
              type: 'select',
              label: 'Type',
              options: [
                { label: 'Regular Text', value: 'text' },
                { label: 'Phone', value: 'phone' },
                { label: 'Email', value: 'email' },
                { label: 'Address', value: 'address' },
              ],
              defaultValue: 'text',
            },
            {
              name: 'link',
              type: 'text',
              label: 'Link (optional)',
            },
          ],
        },
      ],
      admin: {
        initCollapsed: true,
      },
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'socialMedia',
      type: 'group',
      label: 'Social Media Links',
      fields: [
        {
          name: 'instagram',
          type: 'text',
          label: 'Instagram URL',
          admin: {
            placeholder:
              'https://instagram.com/yourusername',
          },
        },
        {
          name: 'linkedin',
          type: 'text',
          label: 'LinkedIn URL',
          admin: {
            placeholder:
              'https://linkedin.com/company/yourcompany',
          },
        },
        {
          name: 'facebook',
          type: 'text',
          label: 'Facebook URL',
          admin: {
            placeholder: 'https://facebook.com/yourpage',
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
