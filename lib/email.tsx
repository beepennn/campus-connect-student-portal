import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export interface EmailOptions {
  to: string
  subject: string
  html: string
}

export async function sendEmail(options: EmailOptions) {
  try {
    const response = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'CampusConnect <onboarding@resend.dev>',
      to: options.to,
      subject: options.subject,
      html: options.html,
    })

    if (response.error) {
      console.error('[v0] Resend error:', response.error)
      throw new Error(response.error.message)
    }

    console.log('[v0] Email sent successfully:', response.data?.id)
    return response.data
  } catch (error) {
    console.error('[v0] Failed to send email:', error)
    throw error
  }
}

export function generateVerificationEmail(
  recipientEmail: string,
  verificationLink: string,
  userName: string
) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 5px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; border-radius: 5px; margin: 20px 0; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; font-size: 12px; color: #999; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to CampusConnect!</h1>
          </div>
          <div class="content">
            <p>Hi ${userName},</p>
            <p>Thank you for signing up with CampusConnect. Please verify your email address by clicking the button below:</p>
            <a href="${verificationLink}" class="button">Verify Email Address</a>
            <p>If you didn't create this account, you can ignore this email.</p>
            <p>This link will expire in 24 hours.</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 CampusConnect. All rights reserved.</p>
            <p>If you have any issues, contact us at support@campusconnect.com</p>
          </div>
        </div>
      </body>
    </html>
  `
}

export function generateWelcomeEmail(userName: string, userRole: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 5px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; border-radius: 5px; margin: 20px 0; }
          .feature-list { list-style: none; padding: 0; }
          .feature-list li { padding: 10px 0; }
          .footer { text-align: center; font-size: 12px; color: #999; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to CampusConnect, ${userName}!</h1>
          </div>
          <div class="content">
            <p>Your email has been verified and your account is now active.</p>
            <p><strong>Account Role:</strong> ${userRole === 'admin' ? 'Administrator' : 'Student'}</p>
            <p>You can now:</p>
            <ul class="feature-list">
              <li>✓ Browse campus notices and announcements</li>
              <li>✓ Access course materials</li>
              <li>✓ View upcoming events</li>
              ${userRole === 'admin' ? '<li>✓ Manage campus content and announcements</li>' : ''}
            </ul>
            <p>Log in to your account to get started: <a href="https://www.snehalamichhane.com.np/auth/login">CampusConnect</a></p>
          </div>
          <div class="footer">
            <p>&copy; 2024 CampusConnect. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `
}

export function generateAnnouncementEmail(title: string, content: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 5px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; border-radius: 5px; margin: 20px 0; }
          .announcement-title { font-size: 18px; font-weight: bold; color: #667eea; margin: 15px 0; }
          .footer { text-align: center; font-size: 12px; color: #999; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Announcement from CampusConnect</h1>
          </div>
          <div class="content">
            <div class="announcement-title">${title}</div>
            <p>${content}</p>
            <p><a href="https://www.snehalamichhane.com.np">View more on CampusConnect</a></p>
          </div>
          <div class="footer">
            <p>&copy; 2024 CampusConnect. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `
}
