'use client'

import { Skill } from '@/types/skill'
import SkillFormFields from './SkillFormFields'

type SkillFormProps = {
  initialData?: Omit<Skill, 'id'>
  isEditing?: boolean
}

const SkillForm = ({ initialData, isEditing = false }: SkillFormProps) => {
  return (
    <form className="space-y-8">
      <SkillFormFields initialData={initialData} />

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 border-t pt-6">
        <button
          type="button"
          className="rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
        >
          {isEditing ? 'Update skill' : 'Create skill'}
        </button>
      </div>
    </form>
  )
}

export default SkillForm
