import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import SkillForm from '@/components/admin/skills/SkillForm'

type EditSkillPageProps = {
  params: Promise<{
    id: string
  }>
}

const EditSkillPage = async ({ params }: EditSkillPageProps) => {
  const { id } = await params

  // TODO: Replace with API/TanStack Query
  const skill = {
    id,
    name: 'React',
    category: 'Frontend',
    description: 'Building reusable and scalable user interfaces with React.',
    icon: 'react',
    level: 'Advanced' as const,
    percent: 80,
    featured: true,
    order: 5,
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Link
          href="/admin/skills"
          className="group mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          Back to skills
        </Link>

        <p className="text-sm text-muted-foreground">Management</p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight">Edit skill</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Update the information and settings for this skill.
        </p>
      </div>

      {/* Form */}
      <div className="rounded-xl border bg-background p-6 sm:p-8">
        <SkillForm initialData={skill} isEditing />
      </div>
    </div>
  )
}

export default EditSkillPage
