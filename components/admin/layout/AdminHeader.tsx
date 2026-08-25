'use client'

import { Menu, Bell } from 'lucide-react'
import { useState } from 'react'

import AdminMobileMenu from './AdminMobileMenu'

const AdminHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Mobile menu */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open navigation"
            className="flex size-9 items-center justify-center rounded-lg border transition-colors hover:bg-muted lg:hidden"
          >
            <Menu className="size-4" />
          </button>

          {/* Page title */}
          <div className="hidden lg:block">
            <p className="text-sm font-medium">Admin Dashboard</p>
          </div>

          {/* Right side */}
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              aria-label="Notifications"
              className="flex size-9 items-center justify-center rounded-lg border transition-colors hover:bg-muted"
            >
              <Bell className="size-4 text-muted-foreground" />
            </button>

            <div className="ml-2 hidden items-center gap-3 border-l pl-4 sm:flex">
              <div className="flex size-8 items-center justify-center rounded-full bg-foreground text-xs font-medium text-background">
                F
              </div>

              <div className="hidden md:block">
                <p className="text-sm font-medium">Farbod</p>

                <p className="text-xs text-muted-foreground">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <AdminMobileMenu open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}

export default AdminHeader
