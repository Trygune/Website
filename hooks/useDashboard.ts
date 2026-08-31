'use client'

import { getDashboard } from '@/services/dashboard'
import { DashboardQuery } from '@/types/dashboard'
import { useQuery } from '@tanstack/react-query'

export const DASHBOARD_QUERY_KEY = ['Dashboard'] as const

export const useDashboard = (query?: DashboardQuery) => {
  return useQuery({
    queryKey: [DASHBOARD_QUERY_KEY, query],
    queryFn: () => getDashboard(query),
  })
}
