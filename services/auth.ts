import { User } from '@/types/auth'
import { api } from './api'

type AuthResponse = {
  success: boolean
  message: string
  user?: User
}

export const login = (
  email: string,
  password: string
): Promise<AuthResponse> => {
  return api<AuthResponse>('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
}

export const forgotPassword = (email: string): Promise<AuthResponse> => {
  return api<AuthResponse>('/auth/forgot-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
}

export const resetPassword = ({
  token,
  password,
}: {
  token: string
  password: string
}): Promise<AuthResponse> => {
  return api<AuthResponse>(`/auth/reset-password/${token}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  })
}

export const getMe = (): Promise<Omit<AuthResponse, 'message'>> => {
  return api<Omit<AuthResponse, 'message'>>('/auth/me')
}

export const logout = (): Promise<Omit<AuthResponse, 'user'>> => {
  return api<Omit<AuthResponse, 'user'>>('/auth/logout', { method: 'POST' })
}
