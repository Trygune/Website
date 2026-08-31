import { buildQuery } from '@/lib/build-query'
import { api } from './api'
import { DashboardQuery, DashboardResponse } from '@/types/dashboard'

export const getDashboard = (
  query?: DashboardQuery
): Promise<DashboardResponse> => {
  return api<DashboardResponse>(`/dashboard${buildQuery(query)}`)
}
