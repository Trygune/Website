'use client'

type ExperienceFormData = {
  company?: string
  position?: string
  location?: string
  type?: string
  startDate?: string
  endDate?: string
  current?: boolean
  description?: string
  technologies?: string[]
  companyUrl?: string
}

type ExperienceFormFieldsProps = {
  initialData?: ExperienceFormData
}

const experienceTypes = [
  'Full-time',
  'Part-time',
  'Internship',
  'Freelance',
  'Contract',
]

const ExperienceFormFields = ({ initialData }: ExperienceFormFieldsProps) => {
  return (
    <div className="space-y-8">
      {/* Position & Company */}
      <section className="rounded-xl border bg-background">
        <div className="border-b px-5 py-4">
          <h2 className="font-semibold">Position</h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Basic information about this experience.
          </p>
        </div>

        <div className="grid gap-6 p-5 sm:grid-cols-2">
          {/* Position */}
          <div className="space-y-2">
            <label htmlFor="position" className="text-sm font-medium">
              Position
            </label>

            <input
              id="position"
              name="position"
              type="text"
              defaultValue={initialData?.position}
              placeholder="Frontend Developer"
              required
              className="h-11 w-full rounded-lg border bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground focus:border-foreground"
            />
          </div>

          {/* Company */}
          <div className="space-y-2">
            <label htmlFor="company" className="text-sm font-medium">
              Company
            </label>

            <input
              id="company"
              name="company"
              type="text"
              defaultValue={initialData?.company}
              placeholder="Company name"
              required
              className="h-11 w-full rounded-lg border bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground focus:border-foreground"
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-medium">
              Location
            </label>

            <input
              id="location"
              name="location"
              type="text"
              defaultValue={initialData?.location}
              placeholder="Remote / Tehran, Iran"
              className="h-11 w-full rounded-lg border bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground focus:border-foreground"
            />
          </div>

          {/* Type */}
          <div className="space-y-2">
            <label htmlFor="type" className="text-sm font-medium">
              Employment type
            </label>

            <select
              id="type"
              name="type"
              defaultValue={initialData?.type ?? ''}
              className="h-11 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-foreground"
            >
              <option value="" disabled>
                Select type
              </option>

              {experienceTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Company URL */}
          <div className="space-y-2 sm:col-span-2">
            <label htmlFor="companyUrl" className="text-sm font-medium">
              Company URL
            </label>

            <input
              id="companyUrl"
              name="companyUrl"
              type="url"
              defaultValue={initialData?.companyUrl}
              placeholder="https://example.com"
              className="h-11 w-full rounded-lg border bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground focus:border-foreground"
            />
          </div>
        </div>
      </section>

      {/* Duration */}
      <section className="rounded-xl border bg-background">
        <div className="border-b px-5 py-4">
          <h2 className="font-semibold">Duration</h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Set when this experience started and ended.
          </p>
        </div>

        <div className="space-y-6 p-5">
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Start date */}
            <div className="space-y-2">
              <label htmlFor="startDate" className="text-sm font-medium">
                Start date
              </label>

              <input
                id="startDate"
                name="startDate"
                type="month"
                defaultValue={initialData?.startDate}
                required
                className="h-11 w-full rounded-lg border bg-transparent px-3 text-sm outline-none focus:border-foreground"
              />
            </div>

            {/* End date */}
            <div className="space-y-2">
              <label htmlFor="endDate" className="text-sm font-medium">
                End date
              </label>

              <input
                id="endDate"
                name="endDate"
                type="month"
                defaultValue={initialData?.endDate}
                disabled={initialData?.current}
                className="h-11 w-full rounded-lg border bg-transparent px-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:border-foreground"
              />
            </div>
          </div>

          {/* Current */}
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              name="current"
              defaultChecked={initialData?.current}
              className="mt-0.5 size-4 accent-foreground"
            />

            <span>
              <span className="block text-sm font-medium">
                I currently work here
              </span>

              <span className="mt-0.5 block text-xs text-muted-foreground">
                The experience will be displayed as ongoing.
              </span>
            </span>
          </label>
        </div>
      </section>

      {/* Description */}
      <section className="rounded-xl border bg-background">
        <div className="border-b px-5 py-4">
          <h2 className="font-semibold">Description</h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Describe your responsibilities and achievements.
          </p>
        </div>

        <div className="p-5">
          <textarea
            id="description"
            name="description"
            rows={10}
            defaultValue={initialData?.description}
            placeholder="Describe your responsibilities, achievements, and what you worked on..."
            required
            className="w-full resize-y rounded-lg border bg-transparent px-4 py-3 text-sm leading-7 outline-none placeholder:text-muted-foreground focus:border-foreground"
          />
        </div>
      </section>

      {/* Technologies */}
      <section className="rounded-xl border bg-background">
        <div className="border-b px-5 py-4">
          <h2 className="font-semibold">Technologies</h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Technologies and tools used during this experience.
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
              placeholder="React, TypeScript, Tailwind CSS"
              className="h-11 w-full rounded-lg border bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground focus:border-foreground"
            />

            <p className="text-xs text-muted-foreground">
              Separate technologies with commas.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ExperienceFormFields
