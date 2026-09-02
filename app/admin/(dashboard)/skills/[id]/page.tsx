import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import SkillForm from '@/components/admin/skills/SkillForm'
import { getSkillById } from '@/services/skills'

type EditSkillPageProps = {
  params: Promise<{
    id: string
  }>
}

const EditSkillPage = async ({ params }: EditSkillPageProps) => {
  const { id } = await params

  const skill = await getSkillById(String(id))

  if (!skill) {
    return (
      <main className="py-16">
        <div className="mx-auto max-w-lg text-center">
          <p className="text-sm font-medium text-muted-foreground">404</p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight">
            Skill not found
          </h1>

          <p className="mt-3 text-sm text-muted-foreground">
            The skill you are looking for does not exist.
          </p>

          <Link
            href="/admin/skills"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background"
          >
            <ArrowLeft className="size-4" />
            Back to skills
          </Link>
        </div>
      </main>
    )
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
      <SkillForm initialData={skill.data} isEditing />
    </div>
  )
}

export default EditSkillPage
