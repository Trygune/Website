export type Analysis = {
  visits: number
  date: string
  uniqueVisitors: number
}

export type AnalysisResponse = {
  success: boolean
  data?: Analysis[]
}

export type CreateAnalysisResponse = {
  success: boolean
}

export type AnalysisFormData = {
  visitorId: string
  path: string
}

export type AnalysisQuery = {
  range?: number
}
