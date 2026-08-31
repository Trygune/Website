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

export type SkillQuery = {
  sort?: string
  featured?: boolean
  category?: string
  level?: Skill['level']
}
