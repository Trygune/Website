'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import ProjectFormFields from './ProjectFormFields'
import { Project } from '@/types/project'
import { useCreateProject, useUpdateProject } from '@/hooks/useProjects'

type ProjectFormProps = {
  initialData?: Project
  isEditing?: boolean
}

const ProjectForm = ({ initialData, isEditing = false }: ProjectFormProps) => {
  const router = useRouter()

  const [status, setStatus] = useState<Project['status']>(
    initialData?.status ?? 'draft'
  )

  const [featured, setFeatured] = useState(initialData?.featured ?? false)

  const createMutation = useCreateProject()
  const updateMutation = useUpdateProject()

  const isPending = createMutation.isPending || updateMutation.isPending

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    formData.set('status', status)
    formData.set('featured', String(!!featured))

    try {
      if (isEditing && initialData) {
        await updateMutation.mutateAsync({
          id: initialData.id,
          data: formData,
        })
      } else {
        await createMutation.mutateAsync(formData)
      }

      router.push('/admin/projects')
    } catch (error) {
      console.error('Failed to save project:', error)
    }
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <ProjectFormFields
        initialData={initialData}
        status={status}
        featured={featured}
        onStatusChange={setStatus}
        onFeaturedChange={setFeatured}
      />

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 border-t pt-6">
        <button
          type="button"
          onClick={() => router.back()}
          disabled={isPending}
          className="h-10 rounded-lg border px-4 text-sm font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isPending}
          className="h-10 rounded-lg bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending
            ? isEditing
              ? 'Saving...'
              : 'Creating...'
            : isEditing
              ? 'Save changes'
              : 'Create project'}
        </button>
      </div>
    </form>
  )
}

export default ProjectForm
