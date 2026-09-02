import { Post, PostQuery } from '@/types/post'
import { api } from './api'
import { buildQuery } from '@/lib/build-query'
import { Pagination } from '@/types/pagination'

type PostsResponse = {
  success: boolean
  data: Post[]
  pagination: Pagination
}

type PostResponse = {
  success: boolean
  data: Post
}

export const getPosts = (query?: PostQuery): Promise<PostsResponse> => {
  return api<PostsResponse>(`/posts${buildQuery(query)}`)
}

export const getPostBySlug = (slug: string): Promise<PostResponse> => {
  return api<PostResponse>(`/posts/${slug}`)
}
export const getPostById = (id: string): Promise<PostResponse> => {
  return api<PostResponse>(`/posts/id/${id}`)
}

export const createPost = (data: FormData): Promise<PostResponse> => {
  return api<PostResponse>('/posts', {
    method: 'POST',
    body: data,
  })
}

export const updatePost = (
  id: string,
  data: FormData
): Promise<PostResponse> => {
  return api<PostResponse>(`/posts/id/${id}`, {
    method: 'PATCH',
    body: data,
  })
}

export const deletePost = (
  id: string
): Promise<{
  success: boolean
}> => {
  return api<{
    success: boolean
  }>(`/posts/id/${id}`, {
    method: 'DELETE',
  })
}
