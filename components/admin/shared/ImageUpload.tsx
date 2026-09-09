'use client'

import { useRef, useState } from 'react'
import { ImagePlus, Loader2, Trash2, Upload } from 'lucide-react'
import { deleteImage, uploadImage } from '@/services/upload'

type ImageUploadProps = {
  value?: string
  onChange?: (value: string) => void
  label?: string
  description?: string
  accept?: string
  folder?: 'projects' | 'posts' | 'avatars'
}

const backendUrl = process.env.NEXT_PUBLIC_API_URL

const ImageUpload = ({
  value,
  onChange,
  label = 'Image',
  description = 'Upload an image or provide an image URL.',
  accept = 'image/*',
  folder,
}: ImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [preview, setPreview] = useState(value ? `${backendUrl}${value}` : '')
  const [isUploading, setIsUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState(value ?? '')
  const [filename, setFilename] = useState(
    value ? (value.split('/').pop() ?? '') : ''
  )

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]

    if (!file) return

    const oldFilename = filename

    setIsUploading(true)

    try {
      const response = await uploadImage(file, { for: folder })

      const newFilename = response.data.filename
      const newUrl = response.data.url

      setFilename(newFilename)
      setImageUrl(newUrl)
      setPreview(`${backendUrl}${newUrl}`)
      onChange?.(newUrl)

      if (oldFilename) {
        await deleteImage(oldFilename, { for: folder })
      }
    } catch (error) {
      console.error('Image upload failed:', error)
      setPreview(value ?? '')
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemove = async () => {
    try {
      if (filename) {
        await deleteImage(filename, { for: folder })
      }

      setFilename('')
      setPreview('')
      setImageUrl('')
      onChange?.('')
    } catch (error) {
      console.log('remove error', error)
    } finally {
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    }
  }

  return (
    <div className="space-y-3">
      {/* Label */}
      <div>
        <label className="text-sm font-medium">{label}</label>

        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </div>

      {/* Preview */}
      {imageUrl ? (
        <div className="relative overflow-hidden rounded-xl border bg-muted/20">
          <div className="aspect-video w-full">
            <img src={preview} alt="" className="size-full object-cover" />
          </div>

          {/* Overlay */}
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/60 p-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={isUploading}
              className="inline-flex h-9 items-center gap-2 rounded-lg bg-white/10 px-3 text-xs font-medium text-white backdrop-blur transition-colors hover:bg-white/20 disabled:opacity-50"
            >
              {isUploading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Upload className="size-4" />
              )}
              Replace
            </button>

            <button
              type="button"
              onClick={handleRemove}
              disabled={isUploading}
              className="inline-flex h-9 items-center gap-2 rounded-lg bg-destructive/80 px-3 text-xs font-medium text-white transition-colors hover:bg-destructive disabled:opacity-50"
            >
              <Trash2 className="size-4" />
              Remove
            </button>
          </div>
        </div>
      ) : (
        /* Empty */
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          className="flex aspect-video w-full flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 px-6 text-center transition-colors hover:bg-muted/40 disabled:pointer-events-none disabled:opacity-50"
        >
          {isUploading ? (
            <Loader2 className="size-7 animate-spin text-muted-foreground" />
          ) : (
            <div className="flex size-11 items-center justify-center rounded-lg border bg-background">
              <ImagePlus className="size-5 text-muted-foreground" />
            </div>
          )}

          <p className="mt-4 text-sm font-medium">
            {isUploading ? 'Uploading...' : 'Upload an image'}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            PNG, JPG, WEBP up to 5MB
          </p>
        </button>
      )}

      {/* Hidden input */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* URL fallback */}
      <div className="space-y-2">
        <label
          htmlFor="image-url"
          className="text-xs font-medium text-muted-foreground"
        >
          Or use an image URL
        </label>

        <input
          id="image-url"
          type="text"
          value={imageUrl}
          onChange={(event) => {
            const url = event.target.value

            setImageUrl(url)

            const constructedUrl = `${backendUrl}${url}`

            setPreview(constructedUrl)
            onChange?.(event.target.value)
          }}
          placeholder="example.com/image.jpg"
          className="h-10 w-full rounded-lg border bg-transparent px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
        />
      </div>
    </div>
  )
}

export default ImageUpload
