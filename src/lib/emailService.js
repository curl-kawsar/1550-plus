import nodemailer from 'nodemailer';

// Email configuration using your provided settings
const emailConfig = {
  host: process.env.EMAIL_HOST || 'giowm1091.siteground.biz',
  port: parseInt(process.env.EMAIL_PORT) || 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER || '1550plus@1550plus.com',
    pass: process.env.EMAIL_PASS || 'd,$$1#13Nl?D'
  },
  tls: {
    rejectUnauthorized: false
  }
};

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport(emailConfig);
};

// Thank you email template - minimal and professional
const createThankYouEmailTemplate = (firstName, lastName) => {
  const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://1550plus.com';
  const logoUrl = `${websiteUrl}/logo.png`;
  
  return {
    subject: 'Thank You for Contacting 1550+ - We Will Be in Touch Soon',
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You - 1550+</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            background-color: #f9f9f9;
            color: #333333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: white;
            border: 1px solid #e5e5e5;
          }
          .header {
            background-color: #113076;
            padding: 30px 40px;
            text-align: center;
          }
          .logo {
            max-width: 150px;
            height: auto;
            margin: 0 auto;
            display: block;
          }
          .logo-text {
            color: white;
            font-size: 36px;
            font-weight: bold;
            margin: 0;
            display: none;
          }
          .content {
            padding: 40px;
          }
          .greeting {
            font-size: 24px;
            color: #113076;
            margin-bottom: 20px;
            font-weight: normal;
          }
          .message {
            font-size: 16px;
            color: #555555;
            margin-bottom: 20px;
            line-height: 1.6;
            text-align: left;
          }
          .info-section {
            background-color: #f8f9fa;
            border-left: 4px solid #113076;
            padding: 20px;
            margin: 25px 0;
          }
          .info-section h3 {
            margin: 0 0 10px 0;
            font-size: 18px;
            color: #113076;
          }
          .info-section p {
            margin: 0;
            font-size: 15px;
            color: #666666;
          }
          .services-list {
            margin: 25px 0;
          }
          .services-list ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .services-list li {
            padding: 8px 0;
            border-bottom: 1px solid #f0f0f0;
            font-size: 15px;
            color: #555555;
          }
          .services-list li:last-child {
            border-bottom: none;
          }
          .contact-info {
            background-color: #f8f9fa;
            padding: 20px;
            margin: 25px 0;
            border: 1px solid #e5e5e5;
          }
          .contact-info h3 {
            margin: 0 0 15px 0;
            font-size: 18px;
            color: #113076;
          }
          .contact-info p {
            margin: 5px 0;
            font-size: 14px;
            color: #666666;
          }
          .footer {
            background-color: #f8f9fa;
            border-top: 1px solid #e5e5e5;
            padding: 25px 40px;
            text-align: center;
            font-size: 13px;
            color: #888888;
          }
          .footer a {
            color: #113076;
            text-decoration: none;
          }
          .company-name {
            font-weight: bold;
            color: #113076;
          }
          @media (max-width: 600px) {
            .content {
              padding: 30px 20px;
            }
            .header {
              padding: 25px 20px;
            }
            .footer {
              padding: 20px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header with Logo -->
          <div class="header">
            <img src="${logoUrl}" alt="1550+" class="logo" onerror="this.style.display='none';document.querySelector('.logo-text').style.display='block';" />
            <h1 class="logo-text">1550+</h1>
          </div>
          
          <!-- Main Content -->
          <div class="content">
            <h2 class="greeting">Dear ${firstName} ${lastName},</h2>
            
            <p class="message">
              Thank you for contacting <strong>1550+</strong>. We have received your inquiry and appreciate your interest in our college preparation services.
            </p>
            
            <div class="info-section">
              <h3>Next Steps</h3>
              <p>Our team will review your message and respond within 24 hours with information tailored to your academic goals and requirements.</p>
            </div>
            
            <p class="message">
              <strong>1550+</strong> specializes in comprehensive college preparation services designed to help students achieve their academic potential and gain admission to their preferred institutions.
            </p>
            
            <div class="services-list">
              <h3 style="color: #113076; margin-bottom: 15px;">Our Services Include:</h3>
              <ul>
                <li>SAT and ACT Test Preparation</li>
                <li>College Admissions Counseling</li>
                <li>Academic Tutoring and Support</li>
                <li>Career Guidance and Planning</li>
              </ul>
            </div>
            
            <p class="message">
              Please check your email regularly, including your spam folder, for our response. If you have any immediate questions or concerns, feel free to contact us directly.
            </p>
            
            <div class="contact-info">
              <h3>Contact Information</h3>
              <p><strong>Email:</strong> <a href="mailto:1550plus@1550plus.com">1550plus@1550plus.com</a></p>
              <p><strong>Website:</strong> <a href="${websiteUrl}">${websiteUrl}</a></p>
            </div>
            
            <p class="message">
              Thank you for considering <strong>1550+</strong> for your college preparation needs. We look forward to helping you achieve your academic goals.
            </p>
            
            <p class="message">
              Best regards,<br/>
              <span class="company-name">The 1550+ Team</span>
            </p>
          </div>
          
          <!-- Footer -->
          <div class="footer">
            <p class="company-name">1550+ College Preparation Services</p>
            <p>
              <a href="mailto:1550plus@1550plus.com">1550plus@1550plus.com</a> | 
              <a href="${websiteUrl}">Visit Our Website</a>
            </p>
            <p style="margin-top: 15px;">
              This email was sent in response to your inquiry through our website contact form. 
              Please contact us directly if you have any questions.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Dear ${firstName} ${lastName},

Thank you for contacting 1550+. We have received your inquiry and appreciate your interest in our college preparation services.

NEXT STEPS:
Our team will review your message and respond within 24 hours with information tailored to your academic goals and requirements.

1550+ specializes in comprehensive college preparation services designed to help students achieve their academic potential and gain admission to their preferred institutions.

OUR SERVICES INCLUDE:
- SAT and ACT Test Preparation
- College Admissions Counseling
- Academic Tutoring and Support
- Career Guidance and Planning

Please check your email regularly, including your spam folder, for our response. If you have any immediate questions or concerns, feel free to contact us directly.

CONTACT INFORMATION:
Email: 1550plus@1550plus.com
Website: ${websiteUrl}

Thank you for considering 1550+ for your college preparation needs. We look forward to helping you achieve your academic goals.

Best regards,
The 1550+ Team

---
1550+ College Preparation Services
1550plus@1550plus.com | ${websiteUrl}

This email was sent in response to your inquiry through our website contact form.
    `
  };
};

// Function to send thank you email
export const sendThankYouEmail = async (recipientEmail, firstName, lastName) => {
  try {
    const transporter = createTransporter();
    
    // Verify transporter configuration
    await transporter.verify();
    
    const emailTemplate = createThankYouEmailTemplate(firstName, lastName);
    
    const mailOptions = {
      from: {
        name: '1550+ College Prep',
        address: '1550plus@1550plus.com'
      },
      to: recipientEmail,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
      text: emailTemplate.text,
      // Add headers for better deliverability
      headers: {
        'X-Priority': '3',
        'X-Mailer': '1550+ Contact System',
        'Reply-To': '1550plus@1550plus.com'
      }
    };
    
    const result = await transporter.sendMail(mailOptions);
    console.log('Thank you email sent successfully:', result.messageId);
    
    return {
      success: true,
      messageId: result.messageId
    };
    
  } catch (error) {
    console.error('Error sending thank you email:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Function to send notification email to admin
export const sendAdminNotification = async (contactData) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: {
        name: '1550+ Contact System',
        address: '1550plus@1550plus.com'
      },
      to: '1550plus@1550plus.com',
      subject: `New Contact Form Submission from ${contactData.firstName} ${contactData.lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #113076;">New Contact Form Submission</h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${contactData.firstName} ${contactData.lastName}</p>
            <p><strong>Email:</strong> ${contactData.email}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          </div>
          <div style="background: white; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h3>Message:</h3>
            <p style="white-space: pre-wrap;">${contactData.message}</p>
          </div>
          <p style="margin-top: 20px; color: #666;">
            Please respond to this inquiry as soon as possible. The user has been sent an automated thank you email.
          </p>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${contactData.firstName} ${contactData.lastName}
Email: ${contactData.email}
Submitted: ${new Date().toLocaleString()}

Message:
${contactData.message}

Please respond to this inquiry as soon as possible.
      `
    };
    
    const result = await transporter.sendMail(mailOptions);
    console.log('Admin notification email sent successfully:', result.messageId);
    
    return {
      success: true,
      messageId: result.messageId
    };
    
  } catch (error) {
    console.error('Error sending admin notification email:', error);
    return {
      success: false,
      error: error.message
    };
  }
};