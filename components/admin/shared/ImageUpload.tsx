'use client'

import { useRef, useState } from 'react'
import { ImagePlus, Loader2, Trash2, Upload } from 'lucide-react'

import { deleteImage, uploadImage } from '@/services/upload'
import type { Image as ImageProps } from '@/types/image'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

type ImageUploadProps = {
  value?: ImageProps
  onChange?: (image: ImageProps) => void
  label?: string
  description?: string
  accept?: string
  folder?: 'projects' | 'posts' | 'avatars'
}

const ImageUpload = ({
  value,
  onChange,
  label = 'Image',
  description = 'Upload an image or provide an image URL.',
  accept = 'image/*',
  folder,
}: ImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [preview, setPreview] = useState(value?.url ?? '')
  const [isUploading, setIsUploading] = useState(false)
  const [publicId, setPublicId] = useState(value?.publicId ?? '')

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]

    if (!file) return

    const oldPublicId = publicId

    setIsUploading(true)

    try {
      const response = await uploadImage(file, {
        for: folder,
      })

      const newImage: ImageProps = {
        url: response.data.url,
        publicId: response.data.publicId,
      }

      setPublicId(newImage.publicId)
      setPreview(newImage.url)

      onChange?.(newImage)

      if (oldPublicId) {
        await deleteImage(oldPublicId)
      }
    } catch (error) {
      console.error('Image upload failed:', error)
    } finally {
      setIsUploading(false)

      if (inputRef.current) {
        inputRef.current.value = ''
      }
    }
  }

  const handleRemove = async () => {
    try {
      if (publicId) {
        await deleteImage(publicId)
      }

      setPublicId('')
      setPreview('')

      onChange?.({
        url: '',
        publicId: '',
      })
    } catch (error) {
      console.error('Remove image failed:', error)
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
        <Label className="text-sm font-medium">{label}</Label>

        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </div>

      {/* Preview */}
      {preview ? (
        <div className="relative overflow-hidden rounded-xl border bg-muted/20">
          <div className="relative aspect-video w-full">
            <Image
              src={preview}
              alt=""
              fill
              className="size-full object-cover"
            />
          </div>

          {/* Overlay */}
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/60 p-3">
            <Button
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
            </Button>

            <Button
              type="button"
              variant="destructive"
              onClick={handleRemove}
              disabled={isUploading}
              className="inline-flex h-9 items-center gap-2 rounded-lg bg-destructive/80 px-3 text-xs font-medium text-white transition-colors hover:bg-destructive disabled:opacity-50"
            >
              <Trash2 className="size-4" />
              Remove
            </Button>
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
        <Label
          htmlFor="image-url"
          className="text-xs font-medium text-muted-foreground"
        >
          Or use an image URL
        </Label>

        <Input
          id="image-url"
          type="text"
          value={preview}
          onChange={(event) => {
            const url = event.target.value

            setPreview(url)
            setPublicId('')

            onChange?.({
              url,
              publicId: '',
            })
          }}
          placeholder="https://example.com/image.jpg"
        />
      </div>
    </div>
  )
}

export default ImageUpload
