import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import ExperienceForm from '@/components/admin/experience/ExperienceForm'

const NewExperiencePage = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Link
          href="/admin/experience"
          className="group mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          Back to experience
        </Link>

        <p className="text-sm text-muted-foreground">Experience</p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          Add experience
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Add a new professional experience or education entry.
        </p>
      </div>

      {/* Form */}
      <ExperienceForm />
    </div>
  )
}

export default NewExperiencePage
