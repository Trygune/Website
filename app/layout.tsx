import type { Metadata } from 'next'
import { Geist, Geist_Mono, Outfit, Public_Sans } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import ReactQueryProvider from '@/provider/ReactQueryProvider'
import { siteConfig } from '@/lib/seo/config'
import JsonLd from '@/lib/seo/JsonLd'

const publicSansHeading = Public_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
})

const outfit = Outfit({ subsets: ['latin'], variable: '--font-sans' })

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },

  description: siteConfig.description,

  authors: [
    {
      name: siteConfig.author,
    },
  ],

  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },

  robots: {
    index: true,
    follow: true,
  },
}

const RootLayout = ({ children }: LayoutProps<'/'>) => {
  return (
    <html
      lang="en"
      className={cn(
        'h-full',
        'antialiased',
        geistSans.variable,
        geistMono.variable,
        'font-sans',
        outfit.variable,
        publicSansHeading.variable
      )}
    >
      <body className="min-h-screen">
        <JsonLd />
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  )
}

export default RootLayout
