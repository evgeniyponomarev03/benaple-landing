import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'insuranceMegaMenu',
      type: 'group',
      label: 'Insurance Mega Menu',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Enable Insurance Mega Menu',
          defaultValue: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Menu Title',
          defaultValue: 'Insurance Solutions',
          admin: {
            condition: (_, siblingData) =>
              siblingData?.enabled,
          },
        },
        {
          name: 'subtitle',
          type: 'text',
          label: 'Menu Subtitle',
          defaultValue:
            'Comprehensive coverage tailored for UAE businesses',
          admin: {
            condition: (_, siblingData) =>
              siblingData?.enabled,
          },
        },
        {
          name: 'categories',
          type: 'array',
          label: 'Insurance Categories',
          minRows: 1,
          maxRows: 6,
          admin: {
            condition: (_, siblingData) =>
              siblingData?.enabled,
            initCollapsed: true,
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Category Title',
              required: true,
            },
            {
              name: 'description',
              type: 'text',
              label: 'Category Description',
              required: false,
            },
            {
              name: 'icon',
              type: 'select',
              label: 'Category Icon',
              required: true,
              options: [
                { label: 'Users', value: 'users' },
                { label: 'Shield', value: 'shield' },
                { label: 'File Text', value: 'fileText' },
                { label: 'Bar Chart', value: 'barChart' },
                { label: 'Building', value: 'building' },
                { label: 'Heart', value: 'heart' },
              ],
            },
            {
              name: 'items',
              type: 'array',
              label: 'Insurance Types',
              minRows: 1,
              maxRows: 8,
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Insurance Type Title',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'text',
                  label:
                    'Insurance Type Description (Optional - for internal reference)',
                  required: false,
                  admin: {
                    description:
                      'Optional description for internal reference - not displayed in the menu',
                  },
                },
                link({
                  appearances: false,
                  disableLabel: true,
                }),
              ],
            },
          ],
        },
        {
          name: 'ctaButtons',
          type: 'group',
          label: 'Call-to-Action Buttons',
          admin: {
            condition: (_, siblingData) =>
              siblingData?.enabled,
          },
          fields: [
            {
              name: 'primaryCta',
              type: 'group',
              label: 'Primary CTA',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  label: 'Button Label',
                  defaultValue: 'Get Quote',
                },
                link({
                  appearances: false,
                  disableLabel: true,
                }),
              ],
            },
            {
              name: 'secondaryCta',
              type: 'group',
              label: 'Secondary CTA',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  label: 'Button Label',
                  defaultValue: 'Contact Us',
                },
                link({
                  appearances: false,
                  disableLabel: true,
                }),
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: [
            'link',
            'default',
            'cta',
            'outline',
          ],
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
