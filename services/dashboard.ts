import { api } from './api'
import { DashboardResponse } from '@/types/dashboard'

export const getDashboard = (): Promise<DashboardResponse> => {
  return api<DashboardResponse>('/dashboard')
}
