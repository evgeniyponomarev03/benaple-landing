import { RequiredDataFromCollectionSlug } from 'payload'

export const contactForm: RequiredDataFromCollectionSlug<'forms'> =
  {
    confirmationMessage: {
      root: {
        type: 'root',
        children: [
          {
            type: 'heading',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'The contact form has been submitted successfully.',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            tag: 'h2',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
    confirmationType: 'message',
    createdAt: '2023-01-12T21:47:41.374Z',
    emails: [
      {
        emailFrom:
          '"Payload" \u003Cdemo@payloadcms.com\u003E',
        emailTo: '{{email}}',
        message: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Your contact form submission was successfully received.',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                textFormat: 0,
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
        subject: "You've received a new message.",
      },
    ],
    fields: [
      {
        name: 'firstName',
        blockName: 'firstName',
        blockType: 'text',
        label: 'First Name',
        required: true,
        width: 50,
      },
      {
        name: 'lastName',
        blockName: 'lastName',
        blockType: 'text',
        label: 'Last Name',
        required: true,
        width: 50,
      },
      {
        name: 'email',
        blockName: 'email',
        blockType: 'email',
        label: 'Email Address',
        required: true,
        width: 50,
      },
      {
        name: 'phone',
        blockName: 'phone',
        blockType: 'text',
        label: 'Phone Number',
        required: false,
        width: 50,
      },
      {
        name: 'company',
        blockName: 'company',
        blockType: 'text',
        label: 'Company',
        required: false,
        width: 100,
      },
      {
        name: 'message',
        blockName: 'message',
        blockType: 'textarea',
        label: 'Message',
        required: true,
        width: 100,
      },
      {
        name: 'consent',
        blockName: 'consent',
        blockType: 'checkbox',
        label:
          'I agree to allow this company to store and process my personal data for the purpose of responding to my inquiry. *',
        required: true,
        width: 100,
      },
      {
        name: 'optInMarketing',
        blockName: 'optInMarketing',
        blockType: 'checkbox',
        label:
          'I would like to receive marketing communications about products and services.',
        required: false,
        width: 100,
      },
    ],
    redirect: undefined,
    submitButtonLabel: 'Submit',
    title: 'Contact Form',
    updatedAt: '2023-01-12T21:47:41.374Z',
  }
