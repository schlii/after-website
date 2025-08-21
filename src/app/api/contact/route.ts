import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { contactFormSchema } from 'lib/contactValidation'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parseResult = contactFormSchema.safeParse(body)
    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input' } },
        { status: 400 }
      )
    }

    const { name, email, subject, message } = parseResult.data

    // Ensure required SMTP env vars are provided
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL } = process.env as Record<string, string | undefined>

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_TO_EMAIL) {
      console.error('Missing SMTP configuration environment variables')
      return NextResponse.json(
        { success: false, error: { code: 'CONFIG_ERROR', message: 'Email service not configured' } },
        { status: 500 }
      )
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465, // true for 465, false for other ports
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: email,
      to: CONTACT_TO_EMAIL,
      subject: `[Band Website] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form submission failed', err)
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'Failed to send message' } },
      { status: 500 }
    )
  }
}
