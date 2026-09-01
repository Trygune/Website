import { ProjectSort } from '@/types/project'

const projectSorts: ProjectSort[] = [
  'title',
  '-title',
  'year',
  '-year',
  'createdAt',
  '-createdAt',
  'updatedAt',
  '-updatedAt',
]

export const isProjectSort = (value: string | null): value is ProjectSort => {
  return value !== null && projectSorts.includes(value as ProjectSort)
}
