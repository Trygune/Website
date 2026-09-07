'use client'

import { createContext, useContext, useEffect, type ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useMe } from '@/hooks/useAuth'
import { ApiError } from '@/services/api'
import { User } from '@/types/auth'

type UserContextType = User | null

export const UserContext = createContext<UserContextType>(null)

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const pathname = usePathname()
  const { data, error } = useMe()

  useEffect(() => {
    if (error instanceof ApiError && error.status === 401) {
      router.replace('/admin/login')
    }
  }, [error, router, pathname])

  return (
    <UserContext.Provider value={data?.user ?? null}>
      {children}
    </UserContext.Provider>
  )
}

export default AuthProvider

export const useUser = () => {
  return useContext(UserContext)
}
