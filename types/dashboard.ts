import { ContactMessage } from './contact'
import { Post } from './post'
import { Project } from './project'

export type DashboardQuery = {
  categories?: string
}

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
    skills: {
      total: number
      featured: number
    }
    messages: {
      total: number
      unread: number
    }
    recentProjects: Project[]
    recentMessages: ContactMessage[]
    recentPosts: Post[]
  }
}
