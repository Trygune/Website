export type PostStatus = 'draft' | 'published'

export type Post = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  readTime: string
  coverImage?: string
  category: string
  tags: string[]
  status: PostStatus
  publishedAt?: string | null
  createdAt: string
  updatedAt: string
}

export type PostQuery = {
  page?: number
  limit?: number
  sort?: string
  status?: Post['status']
  category?: string
  tags?: string
}
