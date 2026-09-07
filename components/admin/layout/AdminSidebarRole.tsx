import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { User } from '@/types/auth'
import { UserCircle } from 'lucide-react'

const AdminSidebarRole = ({ user }: { user: User }) => {
  const name =
    user.username.charAt(0).toUpperCase() + user.username.slice(1).toLowerCase()
  const role =
    user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          tooltip={role}
          className="hover:bg-inherit cursor-default"
        >
          <UserCircle />
          <div className="flex flex-col text-xs font-semibold">
            {name}
            <span className="text-[10px]">{role}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export default AdminSidebarRole
