import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { firstName, lastName, company, email, service, message, privacy, terms } = body

    if (!firstName || !lastName || !email || !service || !message || !privacy || !terms) {
      return NextResponse.json({ error: 'All required fields must be filled.' }, { status: 400 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'ADM Labworks <onboarding@resend.dev>',
      to: ['admlabworks@gmail.com'],
      subject: `New project inquiry from ${firstName} ${lastName}`,
      html: `<p><strong>Name:</strong> ${firstName} ${lastName}</p><p><strong>Company:</strong> ${company}</p><p><strong>Email:</strong> ${email}</p><p><strong>Service:</strong> ${service}</p><p><strong>Message:</strong> ${message}</p>`,
    })

    return NextResponse.json({ success: true, message: 'Message received successfully!' })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
