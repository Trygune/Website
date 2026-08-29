import {
  BriefcaseBusiness,
  Code2,
  FileText,
  FolderKanban,
  LayoutDashboard,
} from 'lucide-react'

export const navItems = [
  {
    label: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    label: 'Projects',
    href: '/admin/projects',
    icon: FolderKanban,
  },
  {
    label: 'Skills',
    href: '/admin/skills',
    icon: Code2,
  },
  {
    label: 'Blog',
    href: '/admin/posts',
    icon: FileText,
  },
  {
    label: 'Experience',
    href: '/admin/experience',
    icon: BriefcaseBusiness,
  },
]
