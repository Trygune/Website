import type { Metadata } from 'next'
import { siteConfig } from './config'

export const createMetadata = ({
  title,
  description,
  path = '',
}: {
  title?: string
  description?: string
  path?: string
}): Metadata => {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title

  return {
    title: fullTitle,
    description: description ?? siteConfig.description,

    alternates: {
      canonical: `${siteConfig.url}${path}`,
    },

    openGraph: {
      title: fullTitle,
      description: description ?? siteConfig.description,
      url: `${siteConfig.url}${path}`,
      siteName: siteConfig.name,
      type: 'website',
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: description ?? siteConfig.description,
      images: [siteConfig.ogImage],
    },
  }
}
