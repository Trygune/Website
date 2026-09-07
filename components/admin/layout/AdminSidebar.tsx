'use client'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar'
import AdminSidebarUser from './AdminSidebarUser'
import AdminSidebarMenu from './AdminSidebarMenu'
import AdminSidebarRole from './AdminSidebarRole'
import { useUser } from '@/provider/AuthProvider'

const AdminSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const user = useUser()

  if (!user) {
    return null
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <AdminSidebarRole user={user} />
      </SidebarHeader>
      <SidebarContent>
        <AdminSidebarMenu />
      </SidebarContent>
      <SidebarFooter>
        <AdminSidebarUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}

export default AdminSidebar
