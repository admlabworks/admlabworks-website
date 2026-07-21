import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      firstName, lastName, company, email, phone, service, serviceDetails,
      message, budget, brandName, colors, brief, videoDuration, category, privacy, terms,
    } = body

    if (!firstName || !email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    const rows: string[] = []
    rows.push(`<tr><td style="padding:6px 12px;font-weight:600;color:#888;">Name</td><td style="padding:6px 12px;">${firstName}${lastName ? ' ' + lastName : ''}</td></tr>`)
    rows.push(`<tr><td style="padding:6px 12px;font-weight:600;color:#888;">Email</td><td style="padding:6px 12px;">${email}</td></tr>`)
    if (phone) rows.push(`<tr><td style="padding:6px 12px;font-weight:600;color:#888;">Phone</td><td style="padding:6px 12px;">${phone}</td></tr>`)
    if (company) rows.push(`<tr><td style="padding:6px 12px;font-weight:600;color:#888;">Company</td><td style="padding:6px 12px;">${company}</td></tr>`)
    if (service) rows.push(`<tr><td style="padding:6px 12px;font-weight:600;color:#888;">Service</td><td style="padding:6px 12px;">${service}</td></tr>`)
    if (serviceDetails) rows.push(`<tr><td style="padding:6px 12px;font-weight:600;color:#888;">Service Details</td><td style="padding:6px 12px;">${serviceDetails}</td></tr>`)
    if (budget) rows.push(`<tr><td style="padding:6px 12px;font-weight:600;color:#888;">Budget</td><td style="padding:6px 12px;">${budget}</td></tr>`)
    if (brandName) rows.push(`<tr><td style="padding:6px 12px;font-weight:600;color:#888;">Brand Name</td><td style="padding:6px 12px;">${brandName}</td></tr>`)
    if (colors) rows.push(`<tr><td style="padding:6px 12px;font-weight:600;color:#888;">Colors</td><td style="padding:6px 12px;">${colors}</td></tr>`)
    if (message) rows.push(`<tr><td style="padding:6px 12px;font-weight:600;color:#888;">Message</td><td style="padding:6px 12px;">${message}</td></tr>`)
    if (brief) rows.push(`<tr><td style="padding:6px 12px;font-weight:600;color:#888;">Brief</td><td style="padding:6px 12px;">${brief}</td></tr>`)
    if (videoDuration) rows.push(`<tr><td style="padding:6px 12px;font-weight:600;color:#888;">Video Duration</td><td style="padding:6px 12px;">${videoDuration}</td></tr>`)

    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#000;border-bottom:2px solid #00DEFF;padding-bottom:8px;">New ${category || 'Contact'} Submission</h2>
        <table style="width:100%;border-collapse:collapse;">${rows.join('')}</table>
      </div>
    `

    await resend.emails.send({
      from: 'ADM Website <onboarding@resend.dev>',
      to: ['admlabworks@gmail.com'],
      subject: `[${category || 'Contact'}] ${firstName} — ${service || 'General inquiry'}`,
      html,
    })

    return NextResponse.json({ success: true, message: 'Message received successfully!' })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
