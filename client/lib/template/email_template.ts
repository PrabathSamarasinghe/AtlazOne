/**
 * Email Templates for AtlazOne - Professional HTML Email Templates
 * Matches the brand theme colors and styling from Contact.tsx
 */

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
}

interface EmailTemplateOptions {
  logoUrl?: string;
  companyName?: string;
  supportEmail?: string;
  phoneNumber?: string;
  address?: string;
}

export class EmailTemplate {
  private static readonly BRAND_COLORS = {
    primary: '#ff3131',
    primaryDark: '#a93226',
    dark: '#2E2E2E',
    darkText: '#1C1C1C',
    lightGray: '#BDC3C7',
    white: '#ffffff',
    background: '#f8f9fa'
  };

  private static readonly DEFAULT_OPTIONS: Required<EmailTemplateOptions> = {
    logoUrl: 'https://atlazone.vercel.app/ATLAZONE.png', // Update with your actual logo URL
    companyName: 'AtlazOne',
    supportEmail: 'hello@innovatelab.com',
    phoneNumber: '+94 71 130 7990',
    address: 'Colombo, Sri Lanka'
  };

  /**
   * Email template for new contact form submissions (for admin notification)
   */
  static getAdminNotificationTemplate(formData: ContactFormData, options?: Partial<EmailTemplateOptions>): string {
    const opts = { ...this.DEFAULT_OPTIONS, ...options };
    
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission - ${opts.companyName}</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: ${this.BRAND_COLORS.darkText};
                background-color: ${this.BRAND_COLORS.background};
            }
            
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: ${this.BRAND_COLORS.white};
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            }
            
            .header {
                background: linear-gradient(135deg, ${this.BRAND_COLORS.dark} 0%, #1A1A1A 100%);
                padding: 30px 40px;
                text-align: center;
                color: ${this.BRAND_COLORS.white};
            }
            
            .logo {
                max-width: 150px;
                height: auto;
                margin-bottom: 20px;
            }
            
            .header h1 {
                font-size: 24px;
                font-weight: 700;
                margin: 0;
            }
            
            .content {
                padding: 40px;
            }
            
            .notification-badge {
                background-color: ${this.BRAND_COLORS.primary};
                color: ${this.BRAND_COLORS.white};
                padding: 8px 16px;
                border-radius: 20px;
                font-size: 14px;
                font-weight: 600;
                display: inline-block;
                margin-bottom: 20px;
            }
            
            .form-data {
                background-color: ${this.BRAND_COLORS.background};
                padding: 25px;
                border-radius: 12px;
                margin: 20px 0;
                border-left: 4px solid ${this.BRAND_COLORS.primary};
            }
            
            .form-field {
                margin-bottom: 16px;
                padding-bottom: 16px;
                border-bottom: 1px solid ${this.BRAND_COLORS.lightGray};
            }
            
            .form-field:last-child {
                border-bottom: none;
                margin-bottom: 0;
                padding-bottom: 0;
            }
            
            .field-label {
                font-weight: 600;
                color: ${this.BRAND_COLORS.primaryDark};
                font-size: 14px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 5px;
            }
            
            .field-value {
                color: ${this.BRAND_COLORS.darkText};
                font-size: 16px;
                word-wrap: break-word;
            }
            
            .message-content {
                background-color: ${this.BRAND_COLORS.white};
                padding: 20px;
                border-radius: 8px;
                border: 1px solid ${this.BRAND_COLORS.lightGray};
                font-style: italic;
                line-height: 1.8;
            }
            
            .footer {
                background-color: ${this.BRAND_COLORS.dark};
                color: ${this.BRAND_COLORS.white};
                padding: 30px 40px;
                text-align: center;
            }
            
            .footer-content {
                font-size: 14px;
                line-height: 1.6;
            }
            
            .contact-info {
                margin-top: 20px;
                padding-top: 20px;
                border-top: 1px solid ${this.BRAND_COLORS.lightGray};
            }
            
            .contact-info a {
                color: ${this.BRAND_COLORS.primary};
                text-decoration: none;
            }
            
            .timestamp {
                color: ${this.BRAND_COLORS.lightGray};
                font-size: 12px;
                font-style: italic;
                margin-top: 20px;
            }
            
            @media (max-width: 600px) {
                .email-container {
                    margin: 0;
                    width: 100%;
                }
                
                .header,
                .content,
                .footer {
                    padding: 20px;
                }
                
                .header h1 {
                    font-size: 20px;
                }
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <!-- Header with Logo -->
            <div class="header">
                <img src="${opts.logoUrl}" alt="${opts.companyName} Logo" class="logo" />
                <h1>New Contact Form Submission</h1>
            </div>
            
            <!-- Content -->
            <div class="content">
                <div class="notification-badge">🚀 New Lead Alert</div>
                
                <p>You have received a new contact form submission from your website. Here are the details:</p>
                
                <div class="form-data">
                    <div class="form-field">
                        <div class="field-label">Full Name</div>
                        <div class="field-value">${formData.name}</div>
                    </div>
                    
                    <div class="form-field">
                        <div class="field-label">Email Address</div>
                        <div class="field-value">
                            <a href="mailto:${formData.email}" style="color: ${this.BRAND_COLORS.primary}; text-decoration: none;">
                                ${formData.email}
                            </a>
                        </div>
                    </div>
                    
                    ${formData.company ? `
                    <div class="form-field">
                        <div class="field-label">Company</div>
                        <div class="field-value">${formData.company}</div>
                    </div>
                    ` : ''}
                    
                    <div class="form-field">
                        <div class="field-label">Message</div>
                        <div class="field-value">
                            <div class="message-content">
                                "${formData.message}"
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="timestamp">
                    Submitted on: ${new Date().toLocaleString('en-US', { 
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      timeZoneName: 'short'
                    })}
                </div>
            </div>
            
            <!-- Footer -->
            <div class="footer">
                <div class="footer-content">
                    <strong>${opts.companyName}</strong><br>
                    Transforming Ideas Into Digital Reality
                    
                    <div class="contact-info">
                        <p>
                            📧 <a href="mailto:${opts.supportEmail}">${opts.supportEmail}</a><br>
                            📞 <a href="tel:${opts.phoneNumber.replace(/\s+/g, '')}">${opts.phoneNumber}</a><br>
                            📍 ${opts.address}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;
  }

  /**
   * Auto-reply email template for customers (confirmation email)
   */
  static getCustomerConfirmationTemplate(formData: ContactFormData, options?: Partial<EmailTemplateOptions>): string {
    const opts = { ...this.DEFAULT_OPTIONS, ...options };
    
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You for Contacting ${opts.companyName}</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: ${this.BRAND_COLORS.darkText};
                background-color: ${this.BRAND_COLORS.background};
            }
            
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: ${this.BRAND_COLORS.white};
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            }
            
            .header {
                background: linear-gradient(135deg, ${this.BRAND_COLORS.dark} 0%, #1A1A1A 100%);
                padding: 40px;
                text-align: center;
                color: ${this.BRAND_COLORS.white};
            }
            
            .logo {
                max-width: 150px;
                height: auto;
                margin-bottom: 20px;
            }
            
            .header h1 {
                font-size: 28px;
                font-weight: 700;
                margin-bottom: 10px;
            }
            
            .header p {
                font-size: 16px;
                opacity: 0.9;
            }
            
            .content {
                padding: 40px;
            }
            
            .greeting {
                font-size: 18px;
                font-weight: 600;
                color: ${this.BRAND_COLORS.primaryDark};
                margin-bottom: 20px;
            }
            
            .message-summary {
                background-color: ${this.BRAND_COLORS.background};
                padding: 25px;
                border-radius: 12px;
                margin: 25px 0;
                border-left: 4px solid ${this.BRAND_COLORS.primary};
            }
            
            .summary-title {
                font-weight: 600;
                color: ${this.BRAND_COLORS.primaryDark};
                margin-bottom: 10px;
                font-size: 16px;
            }
            
            .summary-content {
                color: ${this.BRAND_COLORS.darkText};
                font-style: italic;
                line-height: 1.7;
            }
            
            .next-steps {
                background-color: ${this.BRAND_COLORS.white};
                border: 2px solid ${this.BRAND_COLORS.primary};
                border-radius: 12px;
                padding: 25px;
                margin: 25px 0;
            }
            
            .next-steps h3 {
                color: ${this.BRAND_COLORS.primaryDark};
                font-size: 18px;
                margin-bottom: 15px;
                display: flex;
                align-items: center;
            }
            
            .next-steps ul {
                list-style: none;
                padding: 0;
            }
            
            .next-steps li {
                padding: 8px 0;
                padding-left: 25px;
                position: relative;
            }
            
            .next-steps li:before {
                content: "✓";
                position: absolute;
                left: 0;
                color: ${this.BRAND_COLORS.primary};
                font-weight: bold;
            }
            
            .cta-section {
                text-align: center;
                margin: 30px 0;
            }
            
            .cta-button {
                display: inline-block;
                background: linear-gradient(135deg, ${this.BRAND_COLORS.primary} 0%, ${this.BRAND_COLORS.primaryDark} 100%);
                color: ${this.BRAND_COLORS.white};
                padding: 15px 30px;
                text-decoration: none;
                border-radius: 25px;
                font-weight: 600;
                font-size: 16px;
                box-shadow: 0 5px 15px rgba(255, 49, 49, 0.3);
                transition: all 0.3s ease;
            }
            
            .footer {
                background-color: ${this.BRAND_COLORS.dark};
                color: ${this.BRAND_COLORS.white};
                padding: 30px 40px;
                text-align: center;
            }
            
            .footer-content {
                font-size: 14px;
                line-height: 1.6;
            }
            
            .contact-info {
                margin-top: 20px;
                padding-top: 20px;
                border-top: 1px solid ${this.BRAND_COLORS.lightGray};
            }
            
            .contact-info a {
                color: ${this.BRAND_COLORS.primary};
                text-decoration: none;
            }
            
            .social-links {
                margin-top: 20px;
            }
            
            .social-links a {
                display: inline-block;
                margin: 0 10px;
                color: ${this.BRAND_COLORS.primary};
                text-decoration: none;
                font-size: 14px;
            }
            
            @media (max-width: 600px) {
                .email-container {
                    margin: 0;
                    width: 100%;
                }
                
                .header,
                .content,
                .footer {
                    padding: 20px;
                }
                
                .header h1 {
                    font-size: 22px;
                }
                
                .cta-button {
                    padding: 12px 25px;
                    font-size: 14px;
                }
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <!-- Header with Logo -->
            <div class="header">
                <img src="${opts.logoUrl}" alt="${opts.companyName} Logo" class="logo" />
                <h1>Thank You for Reaching Out!</h1>
                <p>We've received your message and we're excited to connect</p>
            </div>
            
            <!-- Content -->
            <div class="content">
                <div class="greeting">
                    Hello ${formData.name}! 👋
                </div>
                
                <p>
                    Thank you for contacting <strong>${opts.companyName}</strong>! We're thrilled that you're interested in working with us to bring your vision to life.
                </p>
                
                <div class="message-summary">
                    <div class="summary-title">Your Message Summary:</div>
                    <div class="summary-content">
                        "${formData.message}"
                    </div>
                </div>
                
                <div class="next-steps">
                    <h3>🚀 What Happens Next?</h3>
                    <ul>
                        <li>Our team will review your inquiry within 24 hours</li>
                        <li>We'll reach out to schedule a consultation call</li>
                        <li>We'll discuss your project requirements in detail</li>
                        <li>You'll receive a customized proposal and timeline</li>
                    </ul>
                </div>
                
                <p>
                    Our team specializes in digital transformation, innovative solutions, and delivering exceptional results. 
                    We can't wait to learn more about your project and explore how we can help you achieve your goals.
                </p>
                
                <div class="cta-section">
                    <a href="mailto:${opts.supportEmail}" class="cta-button">
                        📧 Reply to This Email
                    </a>
                </div>
                
                <p style="margin-top: 30px;">
                    <strong>Need immediate assistance?</strong><br>
                    Feel free to call us at <a href="tel:${opts.phoneNumber.replace(/\s+/g, '')}" style="color: ${this.BRAND_COLORS.primary}; text-decoration: none;">${opts.phoneNumber}</a> 
                    or email us directly at <a href="mailto:${opts.supportEmail}" style="color: ${this.BRAND_COLORS.primary}; text-decoration: none;">${opts.supportEmail}</a>
                </p>
            </div>
            
            <!-- Footer -->
            <div class="footer">
                <div class="footer-content">
                    <strong>${opts.companyName}</strong><br>
                    Transforming Ideas Into Digital Reality
                    
                    <div class="contact-info">
                        <p>
                            📧 <a href="mailto:${opts.supportEmail}">${opts.supportEmail}</a><br>
                            📞 <a href="tel:${opts.phoneNumber.replace(/\s+/g, '')}">${opts.phoneNumber}</a><br>
                            📍 ${opts.address}
                        </p>
                    </div>
                    
                    <div class="social-links">
                        <p style="margin-bottom: 10px;">Connect with us:</p>
                        <a href="#">LinkedIn</a> • 
                        <a href="#">Twitter</a> • 
                        <a href="#">GitHub</a> • 
                        <a href="#">Portfolio</a>
                    </div>
                    
                    <p style="margin-top: 20px; font-size: 12px; opacity: 0.8;">
                        © ${new Date().getFullYear()} ${opts.companyName}. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;
  }

  /**
   * Get plain text version for email clients that don't support HTML
   */
  static getPlainTextTemplate(formData: ContactFormData, isAdmin: boolean = false): string {
    if (isAdmin) {
      return `
NEW CONTACT FORM SUBMISSION - ATLAZ ONE

Contact Details:
================
Name: ${formData.name}
Email: ${formData.email}
${formData.company ? `Company: ${formData.company}` : ''}

Message:
--------
${formData.message}

Submitted: ${new Date().toLocaleString()}

---
AtlazOne - Transforming Ideas Into Digital Reality
Email: hello@innovatelab.com
Phone: +94 71 130 7990
Location: Colombo, Sri Lanka
      `.trim();
    } else {
      return `
Thank you for contacting AtlazOne!

Hi ${formData.name},

We've received your message and appreciate you reaching out to us. Our team will review your inquiry and get back to you within 24 hours.

Your message: "${formData.message}"

What's Next:
- Our team will review your inquiry within 24 hours
- We'll reach out to schedule a consultation call
- We'll discuss your project requirements in detail
- You'll receive a customized proposal and timeline

If you have any urgent questions, feel free to contact us:
Email: hello@innovatelab.com
Phone: +94 71 130 7990

Best regards,
The AtlazOne Team

---
AtlazOne - Transforming Ideas Into Digital Reality
Colombo, Sri Lanka
      `.trim();
    }
  }
}

// Export individual template functions for easier usage
export const getAdminNotificationEmail = EmailTemplate.getAdminNotificationTemplate;
export const getCustomerConfirmationEmail = EmailTemplate.getCustomerConfirmationTemplate;
export const getPlainTextEmail = EmailTemplate.getPlainTextTemplate;

// Type exports
export type { ContactFormData, EmailTemplateOptions };
