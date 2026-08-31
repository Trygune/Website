import { Project, ProjectQuery } from '@/types/project'
import { api } from './api'
import { buildQuery } from '@/lib/build-query'
import { Pagination } from '@/types/pagination'

type ProjectsResponse = {
  success: boolean
  data: Project[]
  pagination: Pagination
}

type ProjectResponse = {
  success: boolean
  data: Project
}

export const getProjects = (
  query?: ProjectQuery
): Promise<ProjectsResponse> => {
  return api<ProjectsResponse>(`/projects${buildQuery(query)}`)
}

export const getProjectBySlug = (slug: string): Promise<ProjectResponse> => {
  return api<ProjectResponse>(`/projects/${slug}`)
}

export const createProject = (
  data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>
): Promise<ProjectResponse> => {
  return api<ProjectResponse>('/projects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

export const updateProject = (
  id: string,
  data: Partial<Omit<Project, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<ProjectResponse> => {
  return api<ProjectResponse>(`/projects/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

export const deleteProject = (
  id: string
): Promise<{
  success: boolean
}> => {
  return api<{
    success: boolean
  }>(`/projects/${id}`, {
    method: 'DELETE',
  })
}
