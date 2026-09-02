'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'

import { Experience } from '@/types/experience'

import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import TechnologiesInput from '../shared/TechnologiesInput'

type ExperienceFormFieldsProps = {
  initialData?: Experience
  current: Experience['current']
  onCurrentChange: (current: Experience['current']) => void
}
const experienceTypes = [
  {
    label: 'Work',
    value: 'work',
  },
  {
    label: 'Internship',
    value: 'internship',
  },
  {
    label: 'Education',
    value: 'education',
  },
]

const ExperienceFormFields = ({
  current,
  onCurrentChange,
  initialData,
}: ExperienceFormFieldsProps) => {
  const [technologies, setTechnologies] = useState<string[]>(
    initialData?.technologies ?? []
  )

  const [responsibilities, setResponsibilities] = useState<string[]>(
    initialData?.responsibilities ?? []
  )

  const [responsibilityInput, setResponsibilityInput] = useState('')

  const addResponsibility = () => {
    const value = responsibilityInput.trim()

    if (!value) return

    setResponsibilities((prev) => [...prev, value])
    setResponsibilityInput('')
  }

  const removeResponsibility = (index: number) => {
    setResponsibilities((prev) => prev.filter((_, i) => i !== index))
  }

  const handleResponsibilityKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      addResponsibility()
    }
  }

  return (
    <div className="space-y-8">
      {responsibilities.map((responsibility, index) => (
        <input
          key={`responsibility-${index}`}
          type="hidden"
          name="responsibilities"
          value={responsibility}
        />
      ))}

      {/* Position & Company */}
      <section className="rounded-xl border bg-background">
        <div className="border-b px-5 py-4">
          <h2 className="font-semibold">Position & Company</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Basic information about this work experience.
          </p>
        </div>

        <FieldGroup className="grid gap-6 p-5 sm:grid-cols-2">
          {/* Role */}
          <Field>
            <FieldLabel htmlFor="role">Role</FieldLabel>

            <Input
              id="role"
              name="role"
              type="text"
              defaultValue={initialData?.role}
              placeholder="Front-End Developer Intern"
              required
            />

            <FieldDescription>
              Your role or position at the company.
            </FieldDescription>
          </Field>

          {/* Company */}
          <Field>
            <FieldLabel htmlFor="company">Company</FieldLabel>

            <Input
              id="company"
              name="company"
              type="text"
              defaultValue={initialData?.company}
              placeholder="Company name"
              required
            />
          </Field>

          {/* Type */}
          <Field>
            <FieldLabel htmlFor="type">Employment type</FieldLabel>

            <Select name="type" defaultValue={initialData?.type ?? ''} required>
              <SelectTrigger id="type" className="w-full">
                <SelectValue placeholder="Select employment type" />
              </SelectTrigger>

              <SelectContent>
                {experienceTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          {/* Location */}
          <Field>
            <FieldLabel htmlFor="location">Location</FieldLabel>

            <Input
              id="location"
              name="location"
              type="text"
              defaultValue={initialData?.location}
              placeholder="On-site / Remote / Tehran, Iran"
            />
          </Field>

          {/* Company URL */}
          <Field className="sm:col-span-2">
            <FieldLabel htmlFor="companyUrl">Company URL</FieldLabel>

            <Input
              id="companyUrl"
              name="companyUrl"
              type="url"
              defaultValue={initialData?.companyUrl}
              placeholder="https://example.com"
            />

            <FieldDescription>
              Optional. The company&apos;s official website.
            </FieldDescription>
          </Field>
        </FieldGroup>
      </section>

      {/* Duration */}
      <section className="rounded-xl border bg-background">
        <div className="border-b px-5 py-4">
          <h2 className="font-semibold">Duration</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Set the start and end dates of this experience.
          </p>
        </div>

        <FieldGroup className="p-5">
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Start date */}
            <Field>
              <FieldLabel htmlFor="startDate">Start date</FieldLabel>

              <Input
                id="startDate"
                name="startDate"
                type="month"
                defaultValue={initialData?.startDate}
                required
              />
            </Field>

            {/* End date */}
            <Field>
              <FieldLabel htmlFor="endDate">End date</FieldLabel>

              <Input
                id="endDate"
                name="endDate"
                type="month"
                defaultValue={initialData?.endDate ?? undefined}
                disabled={current}
                required={!current}
              />

              <FieldDescription>
                {current
                  ? 'End date is disabled because this experience is ongoing.'
                  : 'Leave disabled when the experience is ongoing.'}
              </FieldDescription>
            </Field>
          </div>

          {/* Current */}
          <label className="flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/50">
            <input
              type="checkbox"
              name="current"
              checked={current}
              onChange={(event) => onCurrentChange(event.target.checked)}
              className="mt-0.5 size-4 accent-foreground"
            />

            <div>
              <p className="text-sm font-medium">I currently work here</p>

              <p className="mt-1 text-sm text-muted-foreground">
                Mark this experience as ongoing.
              </p>
            </div>
          </label>
        </FieldGroup>
      </section>

      {/* Description */}
      <section className="rounded-xl border bg-background">
        <div className="border-b px-5 py-4">
          <h2 className="font-semibold">Description</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Add a short overview of this experience.
          </p>
        </div>

        <Field className="p-5">
          <FieldLabel htmlFor="description">Description</FieldLabel>

          <Textarea
            id="description"
            name="description"
            rows={7}
            defaultValue={initialData?.description}
            placeholder="Worked as a front-end development intern, contributing to responsive interfaces..."
            required
          />

          <FieldDescription>
            Keep this concise. Focus on the overall role and impact.
          </FieldDescription>
        </Field>
      </section>

      {/* Responsibilities */}
      <section className="rounded-xl border bg-background">
        <div className="border-b px-5 py-4">
          <h2 className="font-semibold">Responsibilities</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Add the main responsibilities, achievements, and contributions.
          </p>
        </div>

        <Field className="p-5">
          <FieldLabel htmlFor="responsibilityInput">
            Responsibilities
          </FieldLabel>

          <div className="flex gap-2">
            <Input
              id="responsibilityInput"
              value={responsibilityInput}
              onChange={(event) => setResponsibilityInput(event.target.value)}
              onKeyDown={handleResponsibilityKeyDown}
              placeholder="Developed responsive user interfaces..."
            />

            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={addResponsibility}
              disabled={!responsibilityInput.trim()}
              aria-label="Add responsibility"
            >
              <Plus />
            </Button>
          </div>

          {responsibilities.length > 0 && (
            <ul className="mt-4 space-y-2">
              {responsibilities.map((responsibility, index) => (
                <li
                  key={`${responsibility}-${index}`}
                  className="flex items-start gap-3 rounded-lg border p-3"
                >
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-foreground" />

                  <span className="flex-1 text-sm leading-6">
                    {responsibility}
                  </span>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8 shrink-0"
                    onClick={() => removeResponsibility(index)}
                    aria-label="Remove responsibility"
                  >
                    <X />
                  </Button>
                </li>
              ))}
            </ul>
          )}

          <FieldDescription>
            Press Enter or use the plus button to add a responsibility.
          </FieldDescription>
        </Field>
      </section>

      {/* Technologies */}
      <section className="rounded-xl border bg-background">
        <div className="border-b px-5 py-4">
          <h2 className="font-semibold">Technologies</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Add the technologies and tools you used during this experience.
          </p>
        </div>

        <Field className="p-5">
          <FieldLabel htmlFor="technologyInput">Technologies</FieldLabel>

          <TechnologiesInput value={technologies} onChange={setTechnologies} />
          {technologies.map((technology, index) => (
            <input
              key={`${technology}-${index}-hidden`}
              type="hidden"
              name="technologies"
              value={technology}
            />
          ))}

          <FieldDescription>
            Press Enter or comma to add a technology.
          </FieldDescription>
        </Field>
      </section>
    </div>
  )
}

export default ExperienceFormFields
