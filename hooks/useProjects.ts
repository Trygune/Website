'use client'

import {
  createProject,
  deleteProject,
  getProjectBySlug,
  getProjects,
  updateProject,
} from '@/services/projects'
import { Project } from '@/types/project'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const PROJECTS_QUERY_KEY = ['projects'] as const

export const useProjects = () => {
  return useQuery({ queryKey: PROJECTS_QUERY_KEY, queryFn: getProjects })
}

export const useProjectBySlug = (slug: string) => {
  return useQuery({
    queryKey: [...PROJECTS_QUERY_KEY, slug],
    queryFn: () => getProjectBySlug(slug),
    enabled: !!slug,
  })
}

export const useCreateProject = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY })
    },
  })
}

export const useUpdateProject = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string
      data: Partial<Omit<Project, 'id' | 'createdAt' | 'updatedAt'>>
    }) => updateProject(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY })
    },
  })
}

export const useDeleteProject = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY })
    },
  })
}
