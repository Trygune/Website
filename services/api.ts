const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000'
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION ?? 'v1'

type ApiOptions = RequestInit & {
  body?: BodyInit | null
}

export const api = async <T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> => {
  const response = await fetch(`${API_URL}/api/${API_VERSION}${endpoint}`, {
    ...options,
    credentials: 'include',
  })

  const data = await response.json()

  if (!response.ok) {
    console.error('API Error:', data.errors)
    throw new Error(data.message ?? 'Something went wrong')
  }

  return data
}
