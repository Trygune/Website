import { buildQuery } from '@/lib/build-query'
import { api } from './api'

type UploadImageResponse = {
  success: boolean
  data: {
    filename: string
    url: string
  }
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

export const deleteImage = (
  fileName: string,
  query?: ImageQuery
): Promise<UploadImageResponse> => {
  return api<UploadImageResponse>(
    `/uploads/image/delete/${fileName}${buildQuery(query)}`,
    {
      method: 'DELETE',
    }
  )
}
