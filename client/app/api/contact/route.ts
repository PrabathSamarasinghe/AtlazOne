import nodemailer from 'nodemailer';
import { NextRequest } from 'next/server';
import { 
  EmailTemplate, 
  type ContactFormData, 
  type EmailTemplateOptions 
} from '@/lib/template/email_template';
import { ApiResponse } from '@/lib/cache-utils';

// Email configuration - use environment variables in production
const emailConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, 
    pass: process.env.SMTP_PASS, 
  },
};

const defaultEmailOptions: EmailTemplateOptions = {
  logoUrl: 'https://atlazone.vercel.app/ATLAZONE.png',
  companyName: 'AtlazOne',
  supportEmail: process.env.SUPPORT_EMAIL || 'atlazone4@gmail.com',
  phoneNumber: '+94 71 130 7990',
  address: 'Colombo, Sri Lanka'
};

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { name, email, company, message } = body as ContactFormData;

    // Validate required fields
    if (!name || !email || !message) {
      return ApiResponse.error('Missing required fields: name, email, and message are required', 400);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return ApiResponse.error('Invalid email format', 400);
    }

    // Create transporter
    const transporter = nodemailer.createTransport(emailConfig);

    // Verify SMTP connection
    try {
      await transporter.verify();
    } catch (error) {
      console.error('SMTP connection failed:', error);
      return ApiResponse.error('Email service temporarily unavailable', 503);
    }

    const contactFormData: ContactFormData = { name, email, company, message };

    // Send admin notification email
    const adminHtmlTemplate = EmailTemplate.getAdminNotificationTemplate(contactFormData, defaultEmailOptions);
    const adminPlainText = EmailTemplate.getPlainTextTemplate(contactFormData, true);

    const adminMailOptions = {
      from: `"${defaultEmailOptions.companyName} Contact Form" <${emailConfig.auth.user}>`,
      to: defaultEmailOptions.supportEmail,
      subject: `New Contact Form Submission from ${name}`,
      text: adminPlainText,
      html: adminHtmlTemplate,
      replyTo: email, // Allow direct reply to the customer
    };

    // Send customer confirmation email
    const customerHtmlTemplate = EmailTemplate.getCustomerConfirmationTemplate(contactFormData, defaultEmailOptions);
    const customerPlainText = EmailTemplate.getPlainTextTemplate(contactFormData, false);

    const customerMailOptions = {
      from: `"${defaultEmailOptions.companyName}" <${emailConfig.auth.user}>`,
      to: email,
      subject: `Thank you for contacting ${defaultEmailOptions.companyName} - We'll be in touch soon!`,
      text: customerPlainText,
      html: customerHtmlTemplate,
    };

    // Send both emails
    const emailPromises = [
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(customerMailOptions)
    ];

    await Promise.all(emailPromises);

    // Log successful submission (without sensitive data)
    console.log(`Contact form submitted successfully: ${name} (${email}) - ${new Date().toISOString()}`);

    return ApiResponse.success({
      message: 'Emails sent successfully',
      timestamp: new Date().toISOString(),
      recipient: email
    }, 200);

  } catch (error) {
    console.error('Email sending failed:', error);
    
    // Don't expose internal errors to the client
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return ApiResponse.error('Failed to send email. Please try again later.', 500);
  }
}

// Handle unsupported methods
export async function GET() {
  return ApiResponse.error('Method not allowed. Use POST to send emails.', 405);
}

export async function PUT() {
  return ApiResponse.error('Method not allowed. Use POST to send emails.', 405);
}

export async function DELETE() {
  return ApiResponse.error('Method not allowed. Use POST to send emails.', 405);
}