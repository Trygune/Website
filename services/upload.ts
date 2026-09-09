import { buildQuery } from '@/lib/build-query'
import { api } from './api'

type UploadImageResponse = {
  success: boolean
  data: {
    url: string
    publicId: string
  }
}

type DeleteImageResponse = {
  success: boolean
}

type ImageQuery = {
  for?: 'projects' | 'posts' | 'avatars'
}

export const uploadImage = (
  file: File,
  query?: ImageQuery
): Promise<UploadImageResponse> => {
  const formData = new FormData()

  formData.append('coverImage', file)

  return api<UploadImageResponse>(`/uploads/image${buildQuery(query)}`, {
    method: 'POST',
    body: formData,
  })
}

export const deleteImage = (publicId: string): Promise<DeleteImageResponse> => {
  return api<DeleteImageResponse>('/uploads/image', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      publicId,
    }),
  })
}
