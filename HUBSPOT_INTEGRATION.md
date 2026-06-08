# HubSpot Form Integration

This project now includes a complete HubSpot form integration that automatically submits form data to your HubSpot account while maintaining GDPR compliance.

## Environment Variables Required

Add these to your `.env.local` file:

```bash
# HubSpot Integration
HS_PORTAL_ID=your-hubspot-portal-id
HS_FORM_ID=your-hubspot-form-id
HS_PRIVATE_APP_TOKEN=your-hubspot-private-app-token
```

## How It Works

### 1. Submissions Collection (`src/collections/Submissions.ts`)

- Stores all form submissions in your Payload database
- Automatically submits to HubSpot via `afterChange` hook
- Tracks HubSpot submission status and errors
- Includes GDPR consent and marketing opt-in fields

### 2. API Endpoint (`src/app/(frontend)/api/submit-form/route.ts`)

- Validates form data
- Creates records in the Submissions collection
- Returns success/error responses to the frontend

### 3. ContactForm Component (`src/components/ContactForm/index.tsx`)

- Complete form with validation
- GDPR-compliant consent checkboxes
- Success and error handling
- Responsive design with Tailwind CSS

## Usage

### Basic Usage

```tsx
import { ContactForm } from '@/components/ContactForm'

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="mb-8 text-3xl font-bold">
        Contact Us
      </h1>
      <ContactForm />
    </div>
  )
}
```

### With Custom Styling

```tsx
import { ContactForm } from '@/components/ContactForm'

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="mb-8 text-3xl font-bold">
        Contact Us
      </h1>
      <ContactForm className="rounded-lg bg-white p-8 shadow-lg" />
    </div>
  )
}
```

## Form Fields

The form includes the following fields:

- **First Name** (required)
- **Last Name** (required)
- **Email** (required)
- **Phone** (optional)
- **Message** (required)
- **GDPR Consent** (required) - "I agree to allow this company to store and process my personal data..."
- **Marketing Opt-in** (optional) - "I would like to receive marketing communications..."

## HubSpot Integration Details

### Data Mapping

The following data is sent to HubSpot:

```javascript
{
  fields: [
    { name: "email", value: formData.email },
    { name: "firstname", value: formData.firstName },
    { name: "lastname", value: formData.lastName },
    { name: "phone", value: formData.phone || "" },
    { name: "message", value: formData.message || "" },
  ],
  context: {
    hutk: "hubspot-tracking-cookie", // for better tracking
    pageUri: "referring-page-url",
    pageName: "Contact form",
  },
  legalConsentOptions: {
    consent: {
      consentToProcess: formData.consent,
      text: "I agree to allow Example Co. to store and process my personal data.",
      communications: formData.optInMarketing ? [
        {
          value: true,
          subscriptionTypeId: 999, // Update this with your Marketing Subscription ID
          text: "I agree to receive marketing communications.",
        },
      ] : [],
    },
  },
}
```

### Error Handling

- All HubSpot submission errors are logged in the Payload admin
- Form submissions are still saved locally even if HubSpot fails
- Users see appropriate success/error messages

## Admin Features

In the Payload admin panel, you can:

1. **View all submissions** in the "Submissions" collection
2. **See HubSpot status** for each submission
3. **Review error messages** if HubSpot submission failed
4. **Export submission data** for analysis

## Customization

### Update HubSpot Form Fields

Edit `src/collections/Submissions.ts` to modify the fields sent to HubSpot:

```typescript
const payloadBody = {
  fields: [
    { name: 'email', value: doc.email },
    { name: 'firstname', value: doc.firstName },
    { name: 'lastname', value: doc.lastName },
    // Add more fields as needed
    { name: 'company', value: doc.company || '' },
  ],
  // ... rest of the payload
}
```

### Update Marketing Subscription ID

In `src/collections/Submissions.ts`, update line with `subscriptionTypeId: 999` to your actual HubSpot Marketing Subscription ID.

### Customize Form Validation

Edit `src/components/ContactForm/index.tsx` to modify form validation rules:

```typescript
const {
  register,
  // ... other form methods
} = useForm<ContactFormData>({
  defaultValues: {
    consent: false,
    optInMarketing: false,
  },
})

// Example: Add custom validation
{...register('email', {
  required: 'Email is required',
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address'
  }
})}
```

## Testing

1. **Test form submission** by filling out the contact form
2. **Check Payload admin** to see the submission record
3. **Verify HubSpot** to confirm the contact was created
4. **Check logs** for any HubSpot integration errors

## Troubleshooting

### Common Issues

1. **HubSpot submission fails**
   - Check your environment variables are correct
   - Verify your HubSpot Private App token has the right permissions
   - Check the Payload logs for detailed error messages

2. **Form validation errors**
   - Check the browser console for JavaScript errors
   - Verify all required fields are filled out
   - Ensure email format is valid

3. **GDPR consent not working**
   - Make sure the consent checkbox is checked before submitting
   - Verify the checkbox state is being tracked properly

### Getting Help

- Check the Payload admin logs for detailed error messages
- Review the browser network tab for API request/response details
- Check your HubSpot form settings and field mappings








