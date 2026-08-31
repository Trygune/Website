import { Skill, SkillQuery } from '@/types/skill'
import { api } from './api'
import { buildQuery } from '@/lib/build-query'

type SkillsResponse = {
  success: boolean
  data: Skill[]
}

type SkillResponse = {
  success: boolean
  data: Skill
}

export const getSkills = (query?: SkillQuery): Promise<SkillsResponse> => {
  return api<SkillsResponse>(`/skills${buildQuery(query)}`)
}

export const createSkill = (
  data: Omit<Skill, 'id' | 'createdAt' | 'updatedAt'>
): Promise<SkillResponse> => {
  return api<SkillResponse>('/skills', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

export const updateSkill = (
  id: string,
  data: Partial<Omit<Skill, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<SkillResponse> => {
  return api<SkillResponse>(`/skills/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

export const deleteSkill = (
  id: string
): Promise<{
  success: boolean
}> => {
  return api<{
    success: boolean
  }>(`/skills/${id}`, {
    method: 'DELETE',
  })
}
