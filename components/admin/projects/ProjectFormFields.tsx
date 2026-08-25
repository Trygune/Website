'use client'

import ImageUpload from '../shared/ImageUpload'
import { type ProjectStatus } from './ProjectForm'

type ProjectFormData = {
  title?: string
  slug?: string
  shortDescription?: string
  description?: string
  technologies?: string[]
  githubUrl?: string
  liveUrl?: string
  coverImage?: string
  featured?: boolean
  status?: 'completed' | 'in-progress'
}

type ProjectFormFieldsProps = {
  initialData?: ProjectFormData
  status: ProjectStatus
  featured: boolean
  onStatusChange: (status: ProjectStatus) => void
  onFeaturedChange: (featured: boolean) => void
}

const ProjectFormFields = ({
  initialData,
  status,
  featured,
  onStatusChange,
  onFeaturedChange,
}: ProjectFormFieldsProps) => {
  return (
    <div className="space-y-8">
      {/* Basic Information */}
      <section className="rounded-xl border bg-background">
        <div className="border-b px-5 py-4">
          <h2 className="font-semibold">Basic information</h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Basic information about your project.
          </p>
        </div>

        <div className="grid gap-6 p-5">
          {/* Title */}
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>

            <input
              id="title"
              name="title"
              type="text"
              defaultValue={initialData?.title}
              placeholder="Personal Portfolio"
              required
              className="h-11 w-full rounded-lg border bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground focus:border-foreground"
            />
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <label htmlFor="slug" className="text-sm font-medium">
              Slug
            </label>

            <input
              id="slug"
              name="slug"
              type="text"
              defaultValue={initialData?.slug}
              placeholder="personal-portfolio"
              required
              className="h-11 w-full rounded-lg border bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground focus:border-foreground"
            />

            <p className="text-xs text-muted-foreground">
              Used in the project URL.
            </p>
          </div>

          {/* Short Description */}
          <div className="space-y-2">
            <label htmlFor="shortDescription" className="text-sm font-medium">
              Short description
            </label>

            <textarea
              id="shortDescription"
              name="shortDescription"
              rows={3}
              defaultValue={initialData?.shortDescription}
              placeholder="A short description of your project..."
              required
              className="w-full resize-y rounded-lg border bg-transparent px-3 py-3 text-sm leading-6 outline-none placeholder:text-muted-foreground focus:border-foreground"
            />

            <p className="text-xs text-muted-foreground">
              Used on project cards and previews.
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Full description
            </label>

            <textarea
              id="description"
              name="description"
              rows={10}
              defaultValue={initialData?.description}
              placeholder="Describe the project, your role, challenges, and implementation..."
              required
              className="w-full resize-y rounded-lg border bg-transparent px-4 py-3 text-sm leading-7 outline-none placeholder:text-muted-foreground focus:border-foreground"
            />
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="rounded-xl border bg-background">
        <div className="border-b px-5 py-4">
          <h2 className="font-semibold">Technologies</h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Technologies and tools used in this project.
          </p>
        </div>

        <div className="p-5">
          <div className="space-y-2">
            <label htmlFor="technologies" className="text-sm font-medium">
              Technologies
            </label>

            <input
              id="technologies"
              name="technologies"
              type="text"
              defaultValue={initialData?.technologies?.join(', ')}
              placeholder="Next.js, TypeScript, Tailwind CSS, MongoDB"
              className="h-11 w-full rounded-lg border bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground focus:border-foreground"
            />

            <p className="text-xs text-muted-foreground">
              Separate technologies with commas.
            </p>
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="rounded-xl border bg-background">
        <div className="border-b px-5 py-4">
          <h2 className="font-semibold">Project links</h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Add links to the source code and live project.
          </p>
        </div>

        <div className="grid gap-6 p-5 sm:grid-cols-2">
          {/* GitHub */}
          <div className="space-y-2">
            <label htmlFor="githubUrl" className="text-sm font-medium">
              GitHub URL
            </label>

            <input
              id="githubUrl"
              name="githubUrl"
              type="url"
              defaultValue={initialData?.githubUrl}
              placeholder="https://github.com/username/project"
              className="h-11 w-full rounded-lg border bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground focus:border-foreground"
            />
          </div>

          {/* Live */}
          <div className="space-y-2">
            <label htmlFor="liveUrl" className="text-sm font-medium">
              Live URL
            </label>

            <input
              id="liveUrl"
              name="liveUrl"
              type="url"
              defaultValue={initialData?.liveUrl}
              placeholder="https://example.com"
              className="h-11 w-full rounded-lg border bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground focus:border-foreground"
            />
          </div>
        </div>
      </section>

      {/* Cover Image */}
      <section className="rounded-xl border bg-background">
        <div className="border-b px-5 py-4">
          <h2 className="font-semibold">Cover image</h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Add a cover image for this project.
          </p>
        </div>

        <div className="p-5">
          <ImageUpload
            value={initialData?.coverImage}
            label="Project cover"
            description="This image will be displayed on your project card and details page."
          />
        </div>
      </section>

      {/* Status & Featured */}
      <section className="rounded-xl border bg-background">
        <div className="border-b px-5 py-4">
          <h2 className="font-semibold">Settings</h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Control how this project appears on your portfolio.
          </p>
        </div>

        <div className="space-y-6 p-5">
          {/* Status */}
          <div className="space-y-2">
            <label htmlFor="status" className="text-sm font-medium">
              Status
            </label>

            <select
              id="status"
              name="status"
              value={status}
              onChange={(event) =>
                onStatusChange(event.target.value as ProjectStatus)
              }
              className="h-11 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-foreground"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          {/* Featured */}
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              name="featured"
              checked={featured}
              onChange={(event) => onFeaturedChange(event.target.checked)}
              className="mt-0.5 size-4 accent-foreground"
            />

            <span>
              <span className="block text-sm font-medium">
                Featured project
              </span>

              <span className="mt-0.5 block text-xs text-muted-foreground">
                Display this project prominently on your portfolio.
              </span>
            </span>
          </label>
        </div>
      </section>
    </div>
  )
}

export default ProjectFormFields
