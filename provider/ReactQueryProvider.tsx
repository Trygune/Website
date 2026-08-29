'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'
import { getQueryClient } from '@/lib/query-client'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

type ReactQueryProviderProps = {
  children: ReactNode
}

const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
  const [queryClient] = useState(() => getQueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default ReactQueryProvider
