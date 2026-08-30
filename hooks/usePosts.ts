'use client'

import {
  createPost,
  deletePost,
  getPostBySlug,
  getPosts,
  PostQuery,
  updatePost,
} from '@/services/posts'
import { Post } from '@/types/post'
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

export const POSTS_QUERY_KEY = ['posts'] as const

export const usePosts = (query?: PostQuery) => {
  return useQuery({
    queryKey: [POSTS_QUERY_KEY, query],
    queryFn: () => getPosts(query),
    placeholderData: keepPreviousData,
  })
}

export const usePostBySlug = (slug: string) => {
  return useQuery({
    queryKey: [...POSTS_QUERY_KEY, slug],
    queryFn: () => getPostBySlug(slug),
    enabled: !!slug,
  })
}

export const useCreatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY })
    },
  })
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string
      data: Partial<Omit<Post, 'id' | 'createdAt' | 'updatedAt'>>
    }) => updatePost(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY })
    },
  })
}

export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY })
    },
  })
}
