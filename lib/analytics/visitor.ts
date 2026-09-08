const VISITOR_ID_KEY = 'visitor_id'

export const getVisitorId = (): string => {
  const existingId = localStorage.getItem(VISITOR_ID_KEY)

  if (existingId) {
    return existingId
  }

  const visitorId = crypto.randomUUID()

  localStorage.setItem(VISITOR_ID_KEY, visitorId)

  return visitorId
}
