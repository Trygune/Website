'use client'

import { Skill } from '@/types/skill'
import SkillFormFields from './SkillFormFields'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useCreateSkill, useUpdateSkill } from '@/hooks/useSkills'

type SkillFormProps = {
  initialData?: Skill
  isEditing?: boolean
}

const SkillForm = ({ initialData, isEditing = false }: SkillFormProps) => {
  const router = useRouter()

  const [featured, setFeatured] = useState<boolean>(
    initialData?.featured ?? false
  )

  const createMutation = useCreateSkill()
  const updateMutation = useUpdateSkill()

  const isPending = createMutation.isPending || updateMutation.isPending

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const data = {
      name: String(formData.get('name') ?? ''),
      category: String(formData.get('category') ?? ''),
      level: String(formData.get('level') ?? 'Beginner') as
        'Beginner' | 'Intermediate' | 'Advanced',
      percent: Number(formData.get('percent') ?? 0),
      icon: String(formData.get('icon') ?? ''),
      description: String(formData.get('description') ?? ''),
      featured,
      order: Number(formData.get('order') ?? ''),
    }

    try {
      if (isEditing && initialData) {
        await updateMutation.mutateAsync({
          id: initialData.id,
          data,
        })
      } else {
        await createMutation.mutateAsync(data)
      }

      router.push('/admin/skills')
    } catch (error) {
      console.error('Failed to save skill:', error)
    }
  }
  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <SkillFormFields
        initialData={initialData}
        featured={featured}
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

export default SkillForm
