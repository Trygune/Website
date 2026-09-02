'use client'

import {
  createExperience,
  deleteExperience,
  getExperienceById,
  getExperiences,
  updateExperience,
} from '@/services/experiences'
import { Experience, ExperienceQuery } from '@/types/experience'
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { DASHBOARD_QUERY_KEY } from './useDashboard'

export const EXPERIENCES_QUERY_KEY = ['experiences'] as const

export const useExperiences = (query?: ExperienceQuery) => {
  return useQuery({
    queryKey: [...EXPERIENCES_QUERY_KEY, query],
    queryFn: () => getExperiences(query),
    placeholderData: keepPreviousData,
  })
}

export const useExperienceById = (id: string) => {
  return useQuery({
    queryKey: [...EXPERIENCES_QUERY_KEY, id],
    queryFn: () => getExperienceById(id),
    enabled: !!id,
  })
}

export const useCreateExperience = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPERIENCES_QUERY_KEY })
      queryClient.invalidateQueries({ queryKey: DASHBOARD_QUERY_KEY })
    },
  })
}

export const useUpdateExperience = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string
      data: Partial<Omit<Experience, 'id' | 'createdAt' | 'updatedAt'>>
    }) => updateExperience(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPERIENCES_QUERY_KEY })
      queryClient.invalidateQueries({ queryKey: DASHBOARD_QUERY_KEY })
    },
  })
}

export const useDeleteExperience = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPERIENCES_QUERY_KEY })
      queryClient.invalidateQueries({ queryKey: DASHBOARD_QUERY_KEY })
    },
  })
}
