'use client'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { navItems } from './NaviItems'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const AdminSidebarMenu = () => {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin'
    }

    return pathname.startsWith(href)
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Management</SidebarGroupLabel>
      <SidebarMenu>
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)

            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  render={
                    <Link href={item.href}>
                      <Icon className="size-4" />
                      <span>{item.label}</span>
                    </Link>
                  }
                  tooltip={item.label}
                  className={cn(active && 'bg-muted text-foreground')}
                />
              </SidebarMenuItem>
            )
          })}
        </div>
      </SidebarMenu>
    </SidebarGroup>
  )
}

export default AdminSidebarMenu
