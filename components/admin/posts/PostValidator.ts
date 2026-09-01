import { PostSort } from '@/types/post'

const postSorts: PostSort[] = [
  'createdAt',
  '-createdAt',
  'updatedAt',
  '-updatedAt',
  'title',
  '-title',
  'category',
  '-category',
  'status',
  '-status',
  'publishedAt',
  '-publishedAt',
]

export const isPostSort = (value: string | null): value is PostSort => {
  return value !== null && postSorts.includes(value as PostSort)
}
