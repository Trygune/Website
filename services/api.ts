const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000'

const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION ?? 'v1'

type ApiOptions = RequestInit & {
  body?: BodyInit | null
}

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
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

    throw new ApiError(data.message ?? 'Something went wrong', response.status)
  }

  return data
}
