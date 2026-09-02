'use client'

import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'

import { Project } from '@/types/project'
import ImageUpload from '../shared/ImageUpload'

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import TechnologiesInput from '../shared/TechnologiesInput'

type ChallengeSolution = {
  challenge: string
  solution: string
}

type ProjectFormFieldsProps = {
  initialData?: Project
  status: Project['status']
  featured: boolean
  onStatusChange: (status: Project['status']) => void
  onFeaturedChange: (featured: boolean) => void
}

const inputClassName = 'h-11 rounded-lg bg-background'

const ProjectFormFields = ({
  initialData,
  status,
  featured,
  onStatusChange,
  onFeaturedChange,
}: ProjectFormFieldsProps) => {
  const [features, setFeatures] = useState<string[]>(
    initialData?.features ?? ['']
  )
  const [technologies, setTechnologies] = useState<string[]>(
    initialData?.technologies ?? []
  )

  const [challengesSolutions, setChallengesSolutions] = useState<
    ChallengeSolution[]
  >(
    initialData?.challengesSolutions?.length
      ? initialData.challengesSolutions.map(({ challenge, solution }) => ({
          challenge,
          solution,
        }))
      : [{ challenge: '', solution: '' }]
  )

  const updateFeature = (index: number, value: string) => {
    setFeatures((current) =>
      current.map((feature, i) => (i === index ? value : feature))
    )
  }

  const addFeature = () => {
    setFeatures((current) => [...current, ''])
  }

  const removeFeature = (index: number) => {
    setFeatures((current) => {
      if (current.length === 1) return ['']

      return current.filter((_, i) => i !== index)
    })
  }

  const updateChallengeSolution = (
    index: number,
    field: keyof ChallengeSolution,
    value: string
  ) => {
    setChallengesSolutions((current) =>
      current.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    )
  }

  const addChallengeSolution = () => {
    setChallengesSolutions((current) => [
      ...current,
      {
        challenge: '',
        solution: '',
      },
    ])
  }

  const removeChallengeSolution = (index: number) => {
    setChallengesSolutions((current) => {
      if (current.length === 1) {
        return [{ challenge: '', solution: '' }]
      }

      return current.filter((_, i) => i !== index)
    })
  }

  return (
    <div className="space-y-8">
      {/* Basic Information */}
      <section className="rounded-xl border bg-background">
        <div className="border-b px-5 py-4">
          <h2 className="font-semibold">Basic information</h2>

          <p className="mt-1 text-xs text-muted-foreground">
            The main information visitors will see about this project.
          </p>
        </div>

        <FieldGroup className="gap-6 p-5">
          {/* Title */}
          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>

            <Input
              id="title"
              name="title"
              defaultValue={initialData?.title}
              placeholder="Habit Tracker"
              required
              className={inputClassName}
            />
          </Field>

          {/* Slug */}
          <Field>
            <FieldLabel htmlFor="slug">Slug</FieldLabel>

            <Input
              id="slug"
              name="slug"
              defaultValue={initialData?.slug}
              placeholder="habit-tracker"
              required
              className={inputClassName}
            />

            <FieldDescription>
              Used in the project URL. Keep it lowercase and use hyphens.
            </FieldDescription>
          </Field>

          {/* Role + Year */}
          <div className="grid gap-6 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="role">Role</FieldLabel>

              <Input
                id="role"
                name="role"
                defaultValue={initialData?.role}
                placeholder="Front-End Developer"
                required
                className={inputClassName}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="year">Year</FieldLabel>

              <Input
                id="year"
                name="year"
                type="text"
                inputMode="numeric"
                defaultValue={initialData?.year}
                placeholder="2026"
                required
                className={inputClassName}
              />
            </Field>
          </div>

          {/* Short Description */}
          <Field>
            <FieldLabel htmlFor="description">Short description</FieldLabel>

            <Textarea
              id="description"
              name="description"
              defaultValue={initialData?.description}
              placeholder="A short description of your project..."
              required
              rows={3}
            />

            <FieldDescription>
              Used on project cards, previews, and project listings.
            </FieldDescription>
          </Field>

          {/* Full Description */}
          <Field>
            <FieldLabel htmlFor="fullDescription">Full description</FieldLabel>

            <Textarea
              id="fullDescription"
              name="fullDescription"
              defaultValue={initialData?.fullDescription}
              placeholder="Describe the project, what it does, and what you built..."
              required
              rows={8}
            />
          </Field>

          {/* Overview */}
          <Field>
            <FieldLabel htmlFor="overview">Overview</FieldLabel>

            <Textarea
              id="overview"
              name="overview"
              defaultValue={initialData?.overview}
              placeholder="Give a concise overview of the project and its purpose..."
              rows={5}
            />

            <FieldDescription>
              A focused summary that can be displayed on the project details
              page.
            </FieldDescription>
          </Field>
        </FieldGroup>
      </section>

      {/* Technologies */}
      <section className="rounded-xl border bg-background">
        <div className="border-b px-5 py-4">
          <h2 className="font-semibold">Technologies</h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Technologies and tools used to build this project.
          </p>
        </div>

        <div className="p-5">
          <Field>
            <FieldLabel>Technologies</FieldLabel>

            <TechnologiesInput
              value={technologies}
              onChange={setTechnologies}
            />
            {technologies.map((technology, index) => (
              <input
                key={`${technology}-${index}-hidden`}
                type="hidden"
                name="technologies"
                value={technology}
              />
            ))}

            <FieldDescription>
              Select from the suggested technologies.
            </FieldDescription>
          </Field>
        </div>
      </section>

      {/* Features */}
      <section className="rounded-xl border bg-background">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div>
            <h2 className="font-semibold">Features</h2>

            <p className="mt-1 text-xs text-muted-foreground">
              Highlight the main features of the project.
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addFeature}
          >
            <Plus className="size-4" />
            Add feature
          </Button>
        </div>

        <div className="space-y-4 p-5">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-md border text-xs text-muted-foreground">
                {index + 1}
              </div>

              <Input
                name="features"
                value={feature}
                onChange={(event) => updateFeature(index, event.target.value)}
                placeholder="Create and manage daily habits"
                className="h-10"
              />

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeFeature(index)}
                disabled={features.length === 1}
                className="shrink-0 text-muted-foreground hover:text-destructive"
                aria-label="Remove feature"
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Challenges & Solutions */}
      <section className="rounded-xl border bg-background">
        <div className="flex flex-col gap-3 border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold">Challenges & solutions</h2>

            <p className="mt-1 text-xs text-muted-foreground">
              Explain important problems you faced and how you solved them.
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addChallengeSolution}
          >
            <Plus className="size-4" />
            Add challenge
          </Button>
        </div>

        <div className="space-y-5 p-5">
          {challengesSolutions.map((item, index) => (
            <article
              key={index}
              className="rounded-xl border bg-muted/10 p-4 sm:p-5"
            >
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Challenge {index + 1}</p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Describe the problem and your solution.
                  </p>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeChallengeSolution(index)}
                  disabled={challengesSolutions.length === 1}
                  className="text-muted-foreground hover:text-destructive"
                  aria-label="Remove challenge"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>

              <div className="grid gap-5">
                <Field>
                  <FieldLabel htmlFor={`challenge-${index}`}>
                    Challenge
                  </FieldLabel>

                  <Textarea
                    id={`challenge-${index}`}
                    name={`challengesSolutions[${index}][challenge]`}
                    value={item.challenge}
                    onChange={(event) =>
                      updateChallengeSolution(
                        index,
                        'challenge',
                        event.target.value
                      )
                    }
                    placeholder="Keeping the application usable when the user loses internet connectivity."
                    rows={4}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor={`solution-${index}`}>
                    Solution
                  </FieldLabel>

                  <Textarea
                    id={`solution-${index}`}
                    name={`challengesSolutions[${index}][solution]`}
                    value={item.solution}
                    onChange={(event) =>
                      updateChallengeSolution(
                        index,
                        'solution',
                        event.target.value
                      )
                    }
                    placeholder="Implemented Progressive Web App capabilities and service worker caching..."
                    rows={4}
                  />
                </Field>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Project Links */}
      <section className="rounded-xl border bg-background">
        <div className="border-b px-5 py-4">
          <h2 className="font-semibold">Project links</h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Links to the source code and live project.
          </p>
        </div>

        <FieldGroup className="gap-6 p-5">
          <Field>
            <FieldLabel htmlFor="githubUrl">GitHub URL</FieldLabel>

            <Input
              id="githubUrl"
              name="githubUrl"
              type="url"
              defaultValue={initialData?.githubUrl}
              placeholder="https://github.com/username/project"
              className={inputClassName}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="liveUrl">Live URL</FieldLabel>

            <Input
              id="liveUrl"
              name="liveUrl"
              type="url"
              defaultValue={initialData?.liveUrl}
              placeholder="https://example.com"
              className={inputClassName}
            />
          </Field>
        </FieldGroup>
      </section>

      {/* Cover Image */}
      <section className="rounded-xl border bg-background">
        <div className="border-b px-5 py-4">
          <h2 className="font-semibold">Cover image</h2>

          <p className="mt-1 text-xs text-muted-foreground">
            The main image displayed for this project.
          </p>
        </div>

        <div className="p-5">
          <ImageUpload
            value={initialData?.coverImage}
            label="Project cover"
            description="Use a high-quality image that represents the project."
          />
        </div>
      </section>

      {/* Settings */}
      <section className="rounded-xl border bg-background">
        <div className="border-b px-5 py-4">
          <h2 className="font-semibold">Settings</h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Control how this project appears on your portfolio.
          </p>
        </div>

        <div className="space-y-6 p-5">
          {/* Status */}
          <Field>
            <FieldLabel htmlFor="status">Status</FieldLabel>

            <select
              id="status"
              name="status"
              value={status}
              onChange={(event) =>
                onStatusChange(event.target.value as Project['status'])
              }
              className="h-11 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-foreground"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>

            <FieldDescription>
              Draft projects are not displayed publicly.
            </FieldDescription>
          </Field>

          {/* Featured */}
          <label className="flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/30">
            <Checkbox
              name="featured"
              checked={featured}
              onCheckedChange={(checked) => onFeaturedChange(checked === true)}
              className="mt-0.5"
            />

            <span>
              <span className="block text-sm font-medium">
                Featured project
              </span>

              <span className="mt-1 block text-xs leading-5 text-muted-foreground">
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
