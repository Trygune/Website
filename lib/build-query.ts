type QueryValue = string | number | boolean | string[] | null | undefined

export const buildQuery = (query?: Record<string, QueryValue>): string => {
  if (!query) return ''

  const params = new URLSearchParams()

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return

    if (Array.isArray(value)) {
      if (value.length > 0) {
        params.set(key, value.join(','))
      }

      return
    }

    params.set(key, String(value))
  })

  const queryString = params.toString()

  return queryString ? `?${queryString}` : ''
}
