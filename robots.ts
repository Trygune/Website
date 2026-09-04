import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/seo/config'

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin',
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}

export default robots
