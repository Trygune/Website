import { Project } from '@/types/project'
import { api } from './api'
import { buildQuery } from '@/lib/build-query'

type ProjectsResponse = {
  success: boolean
  data: Project[]
}

type ProjectResponse = {
  success: boolean
  data: Project
}

export type ProjectQuery = {
  featured?: boolean
  status?: Project['status']
  role?: string
  year?: string
  technologies?: string[]
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
