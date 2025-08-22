import nodemailer from 'nodemailer';

// Email configuration using your provided settings
const emailConfig = {
  host: process.env.EMAIL_HOST || 'mail.1550plus.com',
  port: parseInt(process.env.EMAIL_PORT) || 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER || '1550plus@1550plus.com',
    pass: process.env.EMAIL_PASS || '1550plus1550plus'
  },
  tls: {
    rejectUnauthorized: false
  }
};

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport(emailConfig);
};

// Thank you email template with logo
const createThankYouEmailTemplate = (firstName, lastName) => {
  const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://1550plus.com';
  const logoUrl = `${websiteUrl}/logo.png`;
  
  return {
    subject: 'Thank You for Contacting 1550+ - We\'ll Be in Touch Soon!',
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
            background-color: #f8f9fa;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #113076 0%, #020610 100%);
            padding: 40px 20px;
            text-align: center;
            position: relative;
          }
          .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0);
            background-size: 20px 20px;
          }
          .logo {
            position: relative;
            z-index: 2;
            max-width: 200px;
            height: auto;
            margin: 0 auto;
            display: block;
          }
          .logo-text {
            position: relative;
            z-index: 2;
            color: white;
            font-size: 48px;
            font-weight: bold;
            font-family: 'Arial', sans-serif;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
            margin: 20px 0;
          }
          .content {
            padding: 40px 30px;
            text-align: center;
          }
          .greeting {
            font-size: 24px;
            color: #2c3e50;
            margin-bottom: 20px;
            font-weight: bold;
          }
          .message {
            font-size: 16px;
            color: #555;
            margin-bottom: 25px;
            line-height: 1.8;
          }
          .highlight-box {
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
            padding: 20px;
            border-radius: 8px;
            margin: 25px 0;
          }
          .highlight-box h3 {
            margin: 0 0 10px 0;
            font-size: 20px;
          }
          .highlight-box p {
            margin: 0;
            font-size: 14px;
            opacity: 0.9;
          }
          .features {
            display: flex;
            justify-content: space-around;
            margin: 30px 0;
            flex-wrap: wrap;
          }
          .feature {
            text-align: center;
            margin: 10px;
            flex: 1;
            min-width: 120px;
          }
          .feature-icon {
            font-size: 30px;
            margin-bottom: 10px;
          }
          .feature-text {
            font-size: 14px;
            color: #666;
            font-weight: bold;
          }
          .cta-section {
            background-color: #f8f9fa;
            padding: 25px;
            border-radius: 8px;
            margin: 25px 0;
          }
          .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            margin-top: 15px;
          }
          .footer {
            background-color: #2c3e50;
            color: white;
            padding: 25px;
            text-align: center;
            font-size: 14px;
          }
          .footer a {
            color: #3b82f6;
            text-decoration: none;
          }
          .social-links {
            margin: 20px 0;
          }
          .social-links a {
            color: white;
            text-decoration: none;
            margin: 0 10px;
            font-size: 16px;
          }
          @media (max-width: 600px) {
            .content {
              padding: 30px 20px;
            }
            .features {
              flex-direction: column;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header with Logo -->
          <div class="header">
            <img src="${logoUrl}" alt="1550+" class="logo" onerror="this.style.display='none';document.querySelector('.logo-text').style.display='block';" />
            <div class="logo-text" style="display: none;">1550+</div>
          </div>
          
          <!-- Main Content -->
          <div class="content">
            <h1 class="greeting">Thank You, ${firstName} ${lastName}! 🎉</h1>
            
            <p class="message">
              We've received your message and we're thrilled that you're interested in joining the <strong>1550+</strong> family! 
              Our team of expert educators and college admissions specialists will review your inquiry and get back to you within 24 hours.
            </p>
            
            <div class="highlight-box">
              <h3>What happens next?</h3>
              <p>Our college prep experts will analyze your message and reach out with personalized guidance tailored to your academic goals and college aspirations.</p>
            </div>
            
            <div class="features">
              <div class="feature">
                <div class="feature-icon">📚</div>
                <div class="feature-text">Expert Tutoring</div>
              </div>
              <div class="feature">
                <div class="feature-icon">🎯</div>
                <div class="feature-text">SAT/ACT Prep</div>
              </div>
              <div class="feature">
                <div class="feature-icon">🏆</div>
                <div class="feature-text">College Admissions</div>
              </div>
              <div class="feature">
                <div class="feature-icon">💼</div>
                <div class="feature-text">Career Guidance</div>
              </div>
            </div>
            
            <div class="cta-section">
              <h3>Ready to start your journey to academic excellence?</h3>
              <p>While you wait for our response, explore our programs and success stories.</p>
              <a href="${websiteUrl}" class="cta-button">Explore Our Programs</a>
            </div>
            
            <p class="message">
              <strong>Quick Reminder:</strong> Check your email regularly (including spam folder) for our response. 
              We're committed to helping you achieve your academic goals and get into your dream college!
            </p>
          </div>
          
          <!-- Footer -->
          <div class="footer">
            <div class="social-links">
              <a href="#">📘 Facebook</a>
              <a href="#">📸 Instagram</a>
              <a href="#">📺 YouTube</a>
              <a href="#">🎵 TikTok</a>
            </div>
            <p>
              <strong>1550+ College Prep</strong><br/>
              Your Gateway to College Success<br/>
              <a href="mailto:1550plus@1550plus.com">1550plus@1550plus.com</a><br/>
              <a href="${websiteUrl}" style="color: #3b82f6;">Visit Our Website</a>
            </p>
            <p style="margin-top: 15px; font-size: 12px; opacity: 0.8;">
              This email was sent because you contacted us through our website. 
              If you have any questions, reply to this email or contact us directly.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Dear ${firstName} ${lastName},

Thank you for contacting 1550+! 

We've received your message and we're thrilled that you're interested in joining our college prep program. Our team of expert educators and college admissions specialists will review your inquiry and get back to you within 24 hours.

What happens next?
Our college prep experts will analyze your message and reach out with personalized guidance tailored to your academic goals and college aspirations.

Our Services:
- Expert SAT/ACT Test Preparation
- College Admissions Counseling  
- Academic Tutoring
- Career Guidance

While you wait for our response, feel free to explore our programs and success stories on our website.

Quick Reminder: Check your email regularly (including spam folder) for our response. We're committed to helping you achieve your academic goals and get into your dream college!

Best regards,
The 1550+ Team
Your Gateway to College Success

Contact: 1550plus@1550plus.com
Website: ${websiteUrl}

This email was sent because you contacted us through our website.
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