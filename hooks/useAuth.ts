import { getMe } from '@/services/auth'
import { useQuery } from '@tanstack/react-query'

export const ME_QUERY_KEY = ['me']

export const useMe = () => {
  return useQuery({
    queryKey: ME_QUERY_KEY,
    queryFn: getMe,
    retry: false,
  })
}
