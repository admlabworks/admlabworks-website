import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata, Viewport } from 'next'
import './globals.css'
import LayoutWrapper from '@/components/LayoutWrapper'
import { PreloaderProvider } from '@/context/PreloaderContext'

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
      <body style={{ backgroundColor: '#000' }}>
        <style dangerouslySetInnerHTML={{ __html: '.hero-logo-3d{position:relative}.hero-logo-3d::after{content:"";position:absolute;inset:0;background:#000;z-index:5;pointer-events:none}' }} />
        <PreloaderProvider><LayoutWrapper>{children}</LayoutWrapper></PreloaderProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
