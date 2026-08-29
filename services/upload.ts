import { api } from './api'

type UploadImageResponse = {
  success: boolean
  data: {
    filename: string
    url: string
  }
}

export const uploadImage = (file: File): Promise<UploadImageResponse> => {
  const formData = new FormData()

  formData.append('image', file)

  return api<UploadImageResponse>('/api/uploads/image', {
    method: 'POST',
    body: formData,
  })
}
