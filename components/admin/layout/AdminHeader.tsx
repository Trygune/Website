'use client'

import { Bell } from 'lucide-react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'

const AdminHeader = () => {
  return (
    <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 2xl:pr-16">
        <SidebarTrigger />

        <Button variant="ghost" type="button" aria-label="Notifications">
          <Bell className="size-4" />
        </Button>
      </div>
    </header>
  )
}

export default AdminHeader
