'use client'

import { useState } from 'react'
import ProjectFormFields from './ProjectFormFields'

export type ProjectStatus = 'draft' | 'published'

export type ProjectFormData = {
  title?: string
  slug?: string
  description?: string
  fullDescription?: string
  technologies?: string[]
  coverImage?: string
  githubUrl?: string
  liveUrl?: string
  featured?: boolean
  status?: ProjectStatus
}

type ProjectFormProps = {
  initialData?: ProjectFormData
  isEditing?: boolean
}

const ProjectForm = ({ initialData, isEditing = false }: ProjectFormProps) => {
  const [status, setStatus] = useState<ProjectStatus>(
    initialData?.status ?? 'draft'
  )

  const [featured, setFeatured] = useState(initialData?.featured ?? false)

  return (
    <form className="space-y-8">
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
          className="h-10 rounded-lg border px-4 text-sm font-medium transition-colors hover:bg-muted"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="h-10 rounded-lg bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          {isEditing ? 'Save changes' : 'Create project'}
        </button>
      </div>
    </form>
  )
}

export default ProjectForm
