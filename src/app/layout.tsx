import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from 'next'
import './globals.css'
import LayoutWrapper from '@/components/LayoutWrapper'

export const metadata: Metadata = {
  title: 'ADM LABWORKS - Digital Services',
  description: 'Logos, websites, motion graphics, and video—handled. I deliver high-end digital design without the agency headaches. Just direct, stress-free collaboration to make your brand look incredible.',
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', sizes: 'any' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/apple-icon.png' },
      { url: '/favicon/apple-touch-icon.png' },
    ],
  },
  manifest: '/favicon/site.webmanifest',
  other: {
    'apple-mobile-web-app-title': 'ADM LabWorks',
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
      </body>
    </html>
  )
}
