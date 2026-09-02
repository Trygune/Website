'use client'

import { Experience } from '@/types/experience'
import ExperienceFormFields from './ExperienceFormFields'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  useCreateExperience,
  useUpdateExperience,
} from '@/hooks/useExperiences'

type ExperienceFormProps = {
  initialData?: Experience
  isEditing?: boolean
}

const ExperienceForm = ({
  isEditing = false,
  initialData,
}: ExperienceFormProps) => {
  const router = useRouter()

  const [current, setCurrent] = useState<Experience['current']>(
    initialData?.current ?? false
  )

  const createMutation = useCreateExperience()
  const updateMutation = useUpdateExperience()

  const isPending = createMutation.isPending || updateMutation.isPending

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const data = {
      role: String(formData.get('role') ?? ''),
      company: String(formData.get('company') ?? ''),
      type: String(formData.get('type') ?? '') as
        'work' | 'internship' | 'education',
      description: String(formData.get('description') ?? ''),
      startDate: String(formData.get('startDate') ?? ''),
      endDate: current ? null : String(formData.get('endDate') ?? ''),
      period: `${String(formData.get('startDate') ?? '')} – ${current ? 'Present' : String(formData.get('endDate') ?? '')}`,
      current,
      technologies: formData.getAll('technologies').map(String),
      responsibilities: formData.getAll('responsibilities').map(String),
      location: String(formData.get('location') ?? ''),
      companyUrl: String(formData.get('companyUrl') ?? ''),
    }

    try {
      if (isEditing && initialData) {
        await updateMutation.mutateAsync({
          id: initialData.id,
          data: data,
        })
      } else {
        await createMutation.mutateAsync(data)
      }

      router.push('/admin/experiences')
    } catch (error) {
      console.error('Failed to save experience:', error)
    }
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <ExperienceFormFields
        initialData={initialData}
        current={current}
        onCurrentChange={setCurrent}
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

export default ExperienceForm
