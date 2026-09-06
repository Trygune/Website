'use client'

import { useEffect, type ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useMe } from '@/hooks/useAuth'
import { ApiError } from '@/services/api'

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const pathname = usePathname()
  const { error } = useMe()
  console.log('AuthProvider mounted')
  useEffect(() => {
    if (error instanceof ApiError && error.status === 401) {
      router.replace('/admin/login')
    }
  }, [error, router, pathname])

  return children
}

export default AuthProvider
