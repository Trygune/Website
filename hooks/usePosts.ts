'use client'

import {
  createPost,
  deletePost,
  getPostById,
  getPostBySlug,
  getPosts,
  updatePost,
} from '@/services/posts'
import { PostQuery } from '@/types/post'
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { DASHBOARD_QUERY_KEY } from './useDashboard'

export const POSTS_QUERY_KEY = ['posts'] as const

export const usePosts = (query?: PostQuery) => {
  return useQuery({
    queryKey: [...POSTS_QUERY_KEY, query],
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

export const usePostById = (id: string) => {
  return useQuery({
    queryKey: [...POSTS_QUERY_KEY, id],
    queryFn: () => getPostById(id),
    enabled: !!id,
  })
}

export const useCreatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY })
      queryClient.invalidateQueries({ queryKey: DASHBOARD_QUERY_KEY })
    },
  })
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      updatePost(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY })
      queryClient.invalidateQueries({ queryKey: DASHBOARD_QUERY_KEY })
    },
  })
}

export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY })
      queryClient.invalidateQueries({ queryKey: DASHBOARD_QUERY_KEY })
    },
  })
}
