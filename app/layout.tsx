import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

/* -------------------------
   Fonts (optimized & scoped)
-------------------------- */
const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

/* -------------------------
   SEO & Metadata
-------------------------- */
export const metadata: Metadata = {
  title: {
    default: 'CampusConnect',
    template: '%s | CampusConnect',
  },
  description:
    'CampusConnect is a modern campus communication hub for notices, study materials, events, and announcements.',
  applicationName: 'CampusConnect',
  keywords: [
    'CampusConnect',
    'campus communication',
    'student portal',
    'college notices',
    'study materials',
  ],
  authors: [{ name: 'CampusConnect Team' }],
  creator: 'CampusConnect',
  publisher: 'CampusConnect',
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL('https://snehalamichhane.com.np'),
  openGraph: {
    title: 'CampusConnect',
    description:
      'Connect with your campus community through notices, materials, events, and announcements.',
    url: 'https://https://snehalamichhane.com.np',
    siteName: 'CampusConnect',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CampusConnect',
    description:
      'A modern campus communication hub for students and faculty.',
  },
}

/* -------------------------
   Viewport (Next.js 14+)
-------------------------- */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1e40af',
}

/* -------------------------
   Root Layout
-------------------------- */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          min-h-screen
          bg-background
          text-foreground
          font-sans
          antialiased
        `}
      >
        {children}
      </body>
    </html>
  )
}
