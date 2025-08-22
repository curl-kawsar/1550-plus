# Email Configuration Setup for 1550+ Contact Form

This document explains how to set up the automated email functionality for the contact form.

## Environment Variables Required

Create or update your `.env.local` file with the following variables:

```bash
# Email Configuration (1550+ Email Server)
EMAIL_USER=1550plus@1550plus.com
EMAIL_PASS=1550plus1550plus
EMAIL_HOST=mail.1550plus.com
EMAIL_PORT=465

# Website URL (for logo and links in emails)
NEXT_PUBLIC_WEBSITE_URL=https://your-actual-domain.com
```

## Email Server Configuration Used

- **Username**: 1550plus@1550plus.com
- **Password**: 1550plus1550plus
- **Incoming Server**: mail.1550plus.com
- **IMAP Port**: 993
- **POP3 Port**: 995
- **Outgoing Server**: mail.1550plus.com
- **SMTP Port**: 465 (SSL/TLS)

## Features

### Automated Thank You Email
When someone submits the contact form, they automatically receive:
- Professional HTML email with 1550+ branding
- Logo included (with fallback text if logo fails to load)
- Welcome message personalized with their name
- Information about what happens next
- Links to explore your programs
- Social media links
- Mobile-responsive design

### Admin Notification Email
The system also sends a notification email to the admin (1550plus@1550plus.com) containing:
- New contact form submission details
- Sender's name and email
- Full message content
- Timestamp of submission

## Email Template Features

- **Professional Design**: Matches your brand colors and design
- **Logo Integration**: Displays your logo in the email header
- **Responsive Design**: Works on desktop and mobile devices
- **Fallback Handling**: If logo fails to load, shows "1550+" text instead
- **Brand Consistency**: Uses the same gradient and colors as your website

## Testing

To test the email functionality:

1. Make sure all environment variables are set
2. Submit a test message through your contact form
3. Check that:
   - The contact form shows success message
   - User receives thank you email
   - Admin receives notification email
   - Both emails display properly

## Troubleshooting

### If emails are not being sent:
1. Verify all environment variables are correct
2. Check server logs for email errors
3. Ensure email server credentials are valid
4. Check if emails are going to spam folder

### If logo doesn't display:
1. Verify `NEXT_PUBLIC_WEBSITE_URL` is set correctly
2. Ensure `/logo.png` exists in your public folder
3. Check if the image URL is accessible from external sources

### Email deliverability tips:
1. Configure SPF records for your domain
2. Set up DKIM signing if possible
3. Monitor email reputation
4. Ask users to check spam folder and add to contacts

## File Structure

```
src/
├── lib/
│   └── emailService.js          # Email sending logic and templates
├── app/api/
│   └── contact/
│       ├── route.js            # Contact form API with email integration
│       └── [id]/route.js       # Individual message management
└── hooks/
    └── useContact.js           # TanStack Query hooks for contact form
```

## Security Notes

- Email credentials are stored in environment variables
- Sensitive information is never logged in production
- Email failures don't break the contact form submission
- All user inputs are validated before sending emails

## Next Steps

1. Set up the environment variables
2. Test the contact form
3. Customize the email template if needed
4. Configure your domain's email settings for better deliverability
5. Monitor email sending logs for any issues