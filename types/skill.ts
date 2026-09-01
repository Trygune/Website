export type Skill = {
  id: string
  name: string
  category: string
  description: string
  icon: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  percent: number
  featured: boolean
  order: number
}

export type SkillSortField =
  | 'createdAt'
  | 'updatedAt'
  | 'name'
  | 'category'
  | 'level'
  | 'percent'
  | 'featured'
  | 'order'

type SortFieldWithDirection = SkillSortField | `-${SkillSortField}`

export type SkillSort =
  SortFieldWithDirection | `${SortFieldWithDirection},${SortFieldWithDirection}`

export type SkillQuery = {
  sort?: SkillSort
  featured?: boolean
  category?: string
  level?: Skill['level']
}
