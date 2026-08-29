import { Post } from '@/types/post'
import { api } from './api'
import { buildQuery } from '@/lib/build-query'

type PostsResponse = {
  success: boolean
  data: Post[]
}

type PostResponse = {
  success: boolean
  data: Post
}

export type PostQuery = {
  status?: Post['status']
  category?: string
  tags?: string[]
}

export const getPosts = (query?: PostQuery): Promise<PostsResponse> => {
  return api<PostsResponse>(`/posts${buildQuery(query)}`)
}

export const getPostBySlug = (slug: string): Promise<PostResponse> => {
  return api<PostResponse>(`/posts/${slug}`)
}

export const createPost = (
  data: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>
): Promise<PostResponse> => {
  return api<PostResponse>('/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

export const updatePost = (
  id: string,
  data: Partial<Omit<Post, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<PostResponse> => {
  return api<PostResponse>(`/posts/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

export const deletePost = (
  id: string
): Promise<{
  success: boolean
}> => {
  return api<{
    success: boolean
  }>(`/posts/${id}`, {
    method: 'DELETE',
  })
}
