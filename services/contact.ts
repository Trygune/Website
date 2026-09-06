import { api } from './api'

import type {
  ContactFormData,
  ContactMessage,
  ContactMessagesResponse,
  ContactResponse,
} from '@/types/contact'

export const getContactMessages = (): Promise<ContactMessagesResponse> => {
  return api<ContactMessagesResponse>('/contact')
}

export const sendContactMessage = (
  data: ContactFormData
): Promise<ContactResponse> => {
  return api<ContactResponse>('/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

export const updateContactMessage = (
  id: string,
  data: Pick<ContactMessage, 'isRead'>
): Promise<ContactResponse> => {
  return api<ContactResponse>(`/contact/id/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

export const deleteContactMessage = (
  id: string
): Promise<{ success: boolean }> => {
  return api<{ success: boolean }>(`/contact/id/${id}`, {
    method: 'DELETE',
  })
}
