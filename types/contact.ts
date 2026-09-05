export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface ContactResponse {
  success: boolean
  message: string
  data?: {
    id: string
  }
}
