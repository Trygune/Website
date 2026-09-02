'use client'

import { useState } from 'react'
import { Skill } from '@/types/skill'

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type SkillFormFieldsProps = {
  initialData?: Skill
  featured: boolean
  onFeaturedChange: (featured: boolean) => void
}

const skillLevels = [
  {
    label: 'Beginner',
    value: 'Beginner',
    min: 0,
    max: 39,
  },
  {
    label: 'Intermediate',
    value: 'Intermediate',
    min: 40,
    max: 69,
  },
  {
    label: 'Advanced',
    value: 'Advanced',
    min: 70,
    max: 100,
  },
]

const getLevelFromPercent = (value: number[]) => {
  if (value < [40]) return 'Beginner'
  if (value < [70]) return 'Intermediate'

  return 'Advanced'
}

const getDefaultPercent = (level?: Skill['level']) => {
  switch (level) {
    case 'Beginner':
      return 25
    case 'Intermediate':
      return 50
    case 'Advanced':
      return 75
    default:
      return 0
  }
}

const SkillFormFields = ({
  initialData,
  featured,
  onFeaturedChange,
}: SkillFormFieldsProps) => {
  const [percent, setPercent] = useState<number[]>(
    initialData?.percent !== undefined
      ? [initialData.percent]
      : [getDefaultPercent(initialData?.level)]
  )

  const [level, setLevel] = useState<Skill['level']>(
    initialData?.level ?? 'Beginner'
  )

  return (
    <div className="space-y-8">
      {/* Basic information */}
      <section className="rounded-xl border bg-background">
        <div className="border-b px-5 py-4">
          <h2 className="font-semibold">Basic information</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Define the skill and its category.
          </p>
        </div>

        <FieldGroup className="p-5">
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Name */}
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>

              <Input
                id="name"
                name="name"
                type="text"
                defaultValue={initialData?.name}
                placeholder="React"
                required
              />

              <FieldDescription>
                The name of the technology or skill.
              </FieldDescription>
            </Field>

            {/* Category */}
            <Field>
              <FieldLabel htmlFor="category">Category</FieldLabel>

              <Input
                id="category"
                name="category"
                type="text"
                defaultValue={initialData?.category}
                placeholder="Frontend"
                required
              />

              <FieldDescription>
                For example: Frontend, Backend, Database, or Tools.
              </FieldDescription>
            </Field>
          </div>

          {/* Description */}
          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>

            <Textarea
              id="description"
              name="description"
              rows={5}
              defaultValue={initialData?.description}
              placeholder="Building modern user interfaces with React."
            />

            <FieldDescription>
              Add a short description explaining how you use this skill.
            </FieldDescription>
          </Field>
        </FieldGroup>
      </section>

      {/* Proficiency */}
      <section className="rounded-xl border bg-background">
        <div className="border-b px-5 py-4">
          <h2 className="font-semibold">Proficiency</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Define your proficiency level and confidence percentage.
          </p>
        </div>

        <FieldGroup className="p-5">
          {/* Level */}
          <Field>
            <FieldLabel htmlFor="level">Skill level</FieldLabel>

            <Select
              name="level"
              value={level}
              onValueChange={(value) => {
                const selectedLevel = value as Skill['level']
                setLevel(selectedLevel)
                setPercent([getDefaultPercent(selectedLevel)])
              }}
              required
            >
              <SelectTrigger id="level" className="w-full">
                <SelectValue placeholder="Select skill level" />
              </SelectTrigger>

              <SelectContent>
                {skillLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          {/* Percent */}
          <Field>
            <div className="flex items-center justify-between gap-4">
              <FieldLabel htmlFor="percent">Proficiency</FieldLabel>

              <span className="min-w-12 text-right text-sm font-medium tabular-nums">
                {percent}%
              </span>
            </div>

            <input type="hidden" name="level" value={level} />

            <input type="hidden" name="percent" value={String(percent)} />

            <Slider
              id="percent"
              min={0}
              max={100}
              step={1}
              value={percent}
              onValueChange={(value) => {
                setPercent(value as number[])
                setLevel(getLevelFromPercent(value as number[]))
              }}
              className="mt-3"
            />

            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Beginner</span>
              <span>Intermediate</span>
              <span>Advanced</span>
            </div>

            <FieldDescription>
              {percent}% proficiency · {level}
            </FieldDescription>
          </Field>
        </FieldGroup>
      </section>

      {/* Display settings */}
      <section className="rounded-xl border bg-background">
        <div className="border-b px-5 py-4">
          <h2 className="font-semibold">Display settings</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Control how this skill appears throughout your portfolio.
          </p>
        </div>

        <FieldGroup className="p-5">
          {/* Icon */}
          <Field>
            <FieldLabel htmlFor="icon">Icon</FieldLabel>

            <Input
              id="icon"
              name="icon"
              type="text"
              defaultValue={initialData?.icon}
              placeholder="react"
            />

            <FieldDescription>
              Use the icon identifier that your frontend uses to resolve the
              corresponding icon.
            </FieldDescription>
          </Field>

          {/* Order */}
          <Field>
            <FieldLabel htmlFor="order">Display order</FieldLabel>

            <Input
              id="order"
              name="order"
              type="number"
              min="0"
              defaultValue={initialData?.order ?? 0}
              placeholder="0"
            />

            <FieldDescription>
              Lower numbers are displayed first.
            </FieldDescription>
          </Field>

          {/* Featured */}
          <label
            htmlFor="featured"
            className="flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/50"
          >
            <input
              id="featured"
              name="featured"
              type="checkbox"
              checked={featured}
              onChange={(event) => onFeaturedChange(event.target.checked)}
              className="mt-0.5 size-4 accent-foreground"
            />

            <div className="space-y-1">
              <p className="text-sm font-medium">Featured skill</p>

              <p className="text-sm leading-5 text-muted-foreground">
                Highlight this skill in featured sections of your portfolio.
              </p>
            </div>
          </label>
        </FieldGroup>
      </section>
    </div>
  )
}

export default SkillFormFields
