import type { MetadataRoute } from 'next'

import { getProjects } from '@/services/projects'
import { getPosts } from '@/services/posts'
import { siteConfig } from '@/lib/seo/config'

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const [{ data: projects }, { data: posts }] = await Promise.all([
    getProjects({ limit: 100 }),
    getPosts({ limit: 100 }),
  ])

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteConfig.url}/projects`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/experience`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/skills`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/about`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/blog`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/contact`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteConfig.url}/projects/${project.slug}`,
    lastModified: project.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticPages, ...projectPages, ...postPages]
}

export default sitemap
