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

export type PostSortField =
  'createdAt' | 'updatedAt' | 'title' | 'category' | 'status' | 'publishedAt'

type SortFieldWithDirection = PostSortField | `-${PostSortField}`

export type PostSort =
  SortFieldWithDirection | `${SortFieldWithDirection},${SortFieldWithDirection}`

export type PostQuery = {
  page?: number
  limit?: number
  sort?: PostSort
  status?: Post['status']
  category?: string
  tags?: string
}
