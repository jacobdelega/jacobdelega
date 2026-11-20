import { Funnel_Display, Funnel_Sans } from 'next/font/google'
import './globals.css'

const display = Funnel_Display({
  subsets: ['latin'],
  variable: '--font-funnel-display',
  display: 'swap',
})

const sans = Funnel_Sans({
  subsets: ['latin'],
  variable: '--font-funnel-sans',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL('https://www.jacobdelega.com'),
  title: 'Jacob Delega: websites, apps and AI automations',
  description:
    'I build websites, apps and AI automations that real customers use, for small businesses and founders. Fixed prices, a short call first.',
  openGraph: {
    title: 'Jacob Delega',
    description: 'Websites, apps and AI automations that real customers use. Taking new projects.',
    url: 'https://www.jacobdelega.com',
    siteName: 'Jacob Delega',
    type: 'website',
  },
}

export const viewport = {
  themeColor: '#ffffff',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-screen bg-page font-sans text-ink">{children}</body>
    </html>
  )
}
