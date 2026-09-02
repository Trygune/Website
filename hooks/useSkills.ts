'use client'

import {
  createSkill,
  deleteSkill,
  getSkillById,
  getSkills,
  updateSkill,
} from '@/services/skills'
import { Skill, SkillQuery } from '@/types/skill'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { DASHBOARD_QUERY_KEY } from './useDashboard'

export const SKILLS_QUERY_KEY = ['skills'] as const

export const useSkills = (query?: SkillQuery) => {
  return useQuery({
    queryKey: [...SKILLS_QUERY_KEY, query],
    queryFn: () => getSkills(query),
  })
}

export const useSkillById = (id: string) => {
  return useQuery({
    queryKey: [...SKILLS_QUERY_KEY, id],
    queryFn: () => getSkillById(id),
    enabled: !!id,
  })
}

export const useCreateSkill = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SKILLS_QUERY_KEY })
      queryClient.invalidateQueries({ queryKey: DASHBOARD_QUERY_KEY })
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
      queryClient.invalidateQueries({ queryKey: DASHBOARD_QUERY_KEY })
    },
  })
}

export const useDeleteSkill = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SKILLS_QUERY_KEY })
      queryClient.invalidateQueries({ queryKey: DASHBOARD_QUERY_KEY })
    },
  })
}
