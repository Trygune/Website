'use client'

import Link from 'next/link'
import { X, LogOut } from 'lucide-react'
import { logout } from '@/services/auth'
import { useRouter } from 'next/navigation'
import { navItems } from './NaviItems'

type AdminMobileMenuProps = {
  open: boolean
  onClose: () => void
}

const AdminMobileMenu = ({ open, onClose }: AdminMobileMenuProps) => {
  const router = useRouter()

  if (!open) return null

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Overlay */}
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      {/* Drawer */}
      <aside className="relative flex h-full w-72 max-w-[85vw] flex-col border-r bg-background shadow-xl">
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b px-5">
          <div>
            <p className="font-semibold tracking-tight">Admin</p>

            <p className="text-xs text-muted-foreground">Portfolio Dashboard</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="flex size-9 items-center justify-center rounded-lg border transition-colors hover:bg-muted"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-5">
          <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Management
          </p>

          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t p-3">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <LogOut className="size-4" />
            Sign out
          </button>
        </div>
      </aside>
    </div>
  )
}

export default AdminMobileMenu
