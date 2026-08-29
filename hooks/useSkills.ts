'use client'

import {
  createSkill,
  deleteSkill,
  getSkills,
  updateSkill,
} from '@/services/skills'
import { Skill } from '@/types/skill'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const SKILLS_QUERY_KEY = ['skills'] as const

export const useSkills = () => {
  return useQuery({ queryKey: SKILLS_QUERY_KEY, queryFn: getSkills })
}

export const useCreateSkill = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SKILLS_QUERY_KEY })
    },
  })
}

export const useUpdateSkill = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string
      data: Partial<Omit<Skill, 'id' | 'createdAt' | 'updatedAt'>>
    }) => updateSkill(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SKILLS_QUERY_KEY })
    },
  })
}

export const useDeleteSkill = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SKILLS_QUERY_KEY })
    },
  })
}
