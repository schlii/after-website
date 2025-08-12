import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchema, type ContactFormData } from 'lib/contactValidation'
import nodemailer from 'nodemailer'

interface StandardError {
  code: string
  message: string
  details?: unknown
}

export async function POST(req: NextRequest) {
  try {
    const json = await req.json().catch(() => null)

    const parseResult = contactFormSchema.safeParse(json)
    if (!parseResult.success) {
      const errorDetails = parseResult.error.flatten()
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid form submission',
            details: errorDetails,
          } satisfies StandardError,
        },
        { status: 400 }
      )
    }

    const data: ContactFormData = parseResult.data

    // Send email if SMTP credentials are configured
    const { PRIVATE_EMAIL_HOST, PRIVATE_EMAIL_PORT, PRIVATE_EMAIL_USER, PRIVATE_EMAIL_PASS, PRIVATE_CONTACT_RECEIVER } =
      process.env
    
    if (!PRIVATE_EMAIL_HOST || !PRIVATE_EMAIL_PORT || !PRIVATE_EMAIL_USER || !PRIVATE_EMAIL_PASS || !PRIVATE_CONTACT_RECEIVER) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'EMAIL_NOT_CONFIGURED',
            message: 'Email service is not configured'
          } satisfies StandardError,
        },
        { status: 500 }
      )
    }

    try {
      const transporter = nodemailer.createTransporter({
        host: PRIVATE_EMAIL_HOST,
        port: Number(PRIVATE_EMAIL_PORT),
        secure: Number(PRIVATE_EMAIL_PORT) === 465,
        auth: {
          user: PRIVATE_EMAIL_USER,
          pass: PRIVATE_EMAIL_PASS,
        },
      })

      await transporter.sendMail({
        from: `Band Website <${PRIVATE_EMAIL_USER}>`,
        to: PRIVATE_CONTACT_RECEIVER,
        subject: `New Contact: ${data.subject}`,
        text: `
Name: ${data.name}
Email: ${data.email}
Inquiry Type: ${data.inquiryType}
Subject: ${data.subject}

Message:
${data.message}
        `,
      })

      return NextResponse.json({ success: true, data: { sent: true } }, { status: 200 })
    } catch (err) {
      console.error('Failed to send email', err)
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'EMAIL_SEND_FAILED',
            message: 'Failed to send email'
          } satisfies StandardError,
        },
        { status: 500 }
      )
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json(
      { success: false, error: { code: 'UNEXPECTED_ERROR', message } satisfies StandardError },
      { status: 500 }
    )
  }
}