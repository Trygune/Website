import { Post } from './post'
import { Project } from './project'

export type DashboardResponse = {
  success: boolean
  data: {
    projects: {
      total: number
      published: number
      drafts: number
    }
    posts: {
      total: number
      published: number
      drafts: number
    }
    experience: {
      total: number
      current: number
    }
    recentProjects: Project[]
    recentPosts: Post[]
  }
}
