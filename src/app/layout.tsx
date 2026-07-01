import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata, Viewport } from 'next'
import './globals.css'
import LayoutWrapper from '@/components/LayoutWrapper'

export const metadata: Metadata = {
  title: 'ADM LABWORKS - Digital Services',
  description: 'Logos, websites, motion graphics, and video—handled. I deliver high-end digital design without the agency headaches. Just direct, stress-free collaboration to make your brand look incredible.',
  other: {
    'apple-mobile-web-app-title': 'ADM LABWORKS',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
