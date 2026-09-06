export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  isRead: boolean
  createdAt: string
  updatedAt: string
}

export interface ContactResponse {
  success: boolean
  message: string
  data?: {
    id: string
  }
}

export interface ContactMessagesResponse {
  success: boolean
  data: ContactMessage[]
}
