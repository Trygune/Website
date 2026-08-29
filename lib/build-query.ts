export const buildQuery = (query?: Record<string, unknown>): string => {
  if (!query) return ''

  const params = new URLSearchParams()

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null) return

    params.set(key, String(value))
  })

  const queryString = params.toString()

  return queryString ? `?${queryString}` : ''
}
