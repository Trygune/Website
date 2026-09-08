'use client'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getAnalytics } from '@/services/analytics'
import { AnalysisQuery } from '@/types/analytics'

export const ANALYTICS_QUERY_KEY = ['analytics'] as const

export const useAnalytics = (query?: AnalysisQuery) => {
  return useQuery({
    queryKey: [...ANALYTICS_QUERY_KEY, query],
    queryFn: () => getAnalytics(query),
    placeholderData: keepPreviousData,
  })
}
