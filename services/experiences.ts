import { Experience } from '@/types/experience'
import { api } from './api'
import { buildQuery } from '@/lib/build-query'
import { Pagination } from '@/types/pagination'

type ExperiencesResponse = {
  success: boolean
  data: Experience[]
  pagination: Pagination
}

type ExperienceResponse = {
  success: boolean
  data: Experience
}

export type ExperienceQuery = {
  page?: number
  limit?: number
  sort?: string
  current?: boolean
  type?: string
  location?: string
  role?: string
  technologies?: string
}

export const getExperiences = (
  query?: ExperienceQuery
): Promise<ExperiencesResponse> => {
  return api<ExperiencesResponse>(`/experiences${buildQuery(query)}`)
}

export const createExperience = (
  data: Omit<Experience, 'id' | 'createdAt' | 'updatedAt'>
): Promise<ExperienceResponse> => {
  return api<ExperienceResponse>('/experiences', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

export const updateExperience = (
  id: string,
  data: Partial<Omit<Experience, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<ExperienceResponse> => {
  return api<ExperienceResponse>(`/experiences/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

export const deleteExperience = (
  id: string
): Promise<{
  success: boolean
}> => {
  return api<{
    success: boolean
  }>(`/experiences/${id}`, {
    method: 'DELETE',
  })
}
