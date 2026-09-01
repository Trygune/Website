import { SkillSort } from '@/types/skill'

const skillSorts: SkillSort[] = [
  'createdAt',
  '-createdAt',
  'updatedAt',
  '-updatedAt',
  'name',
  '-name',
  'category',
  '-category',
  'level',
  '-level',
  'percent',
  '-percent',
  'featured',
  '-featured',
  'order',
  '-order',
]

export const isSkillSort = (value: string | null): value is SkillSort => {
  return value !== null && skillSorts.includes(value as SkillSort)
}
