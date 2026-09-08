import {
  AnalysisFormData,
  AnalysisQuery,
  AnalysisResponse,
  CreateAnalysisResponse,
} from '@/types/analytics'
import { api } from './api'
import { buildQuery } from '@/lib/build-query'

export const getAnalytics = (
  query?: AnalysisQuery
): Promise<AnalysisResponse> => {
  return api<AnalysisResponse>(`/analytics${buildQuery(query)}`)
}

export const createAnalytics = (
  data: AnalysisFormData
): Promise<CreateAnalysisResponse> => {
  return api<CreateAnalysisResponse>('/analytics', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}
