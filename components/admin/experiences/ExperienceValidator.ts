import { ExperienceSort } from '@/types/experience'

const experienceSorts: ExperienceSort[] = [
  'createdAt',
  '-createdAt',
  'updatedAt',
  '-updatedAt',
  'type',
  '-type',
  'role',
  '-role',
  'company',
  '-company',
  'startDate',
  '-startDate',
  'endDate',
  '-endDate',
  'period',
  '-period',
  'current',
  '-current',
  'location',
  '-location',
]

export const isExperienceSort = (
  value: string | null
): value is ExperienceSort => {
  return value !== null && experienceSorts.includes(value as ExperienceSort)
}
