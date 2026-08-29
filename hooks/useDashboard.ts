'use client'

import { getDashboard } from '@/services/dashboard'
import { useQuery } from '@tanstack/react-query'

export const DASHBOARD_QUERY_KEY = ['Dashboard'] as const

export const useDashboard = () => {
  return useQuery({ queryKey: DASHBOARD_QUERY_KEY, queryFn: getDashboard })
}
