import { api } from './api'
import type { ContactFormData, ContactResponse } from '@/types/contact'

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
