'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { DASHBOARD_QUERY_KEY } from './useDashboard'

import {
  deleteContactMessage,
  getContactMessages,
  updateContactMessage,
} from '@/services/contact'

import type { ContactMessage } from '@/types/contact'

export const CONTACTS_QUERY_KEY = ['contacts'] as const

export const useContactMessages = () => {
  return useQuery({
    queryKey: CONTACTS_QUERY_KEY,
    queryFn: getContactMessages,
    refetchInterval: 5_000,
    refetchOnWindowFocus: true,
  })
}

export const useUpdateContactMessage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string
      data: Pick<ContactMessage, 'isRead'>
    }) => updateContactMessage(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CONTACTS_QUERY_KEY,
      })

      queryClient.invalidateQueries({
        queryKey: DASHBOARD_QUERY_KEY,
      })
    },
  })
}

export const useDeleteContactMessage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteContactMessage,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CONTACTS_QUERY_KEY,
      })

      queryClient.invalidateQueries({
        queryKey: DASHBOARD_QUERY_KEY,
      })
    },
  })
}
