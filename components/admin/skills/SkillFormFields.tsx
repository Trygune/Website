'use client'

import { Skill } from '@/types/skill'

type SkillFormFieldsProps = {
  initialData?: Omit<Skill, 'id'>
}

const SkillFormFields = ({ initialData }: SkillFormFieldsProps) => {
  return (
    <div className="space-y-8">
      {/* Basic information */}
      <section className="space-y-5">
        <div>
          <h2 className="text-lg font-semibold">Basic information</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Define the skill and how it should appear on your portfolio.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {/* Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              defaultValue={initialData?.name}
              placeholder="React"
              required
              className="h-11 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">
              Category
            </label>

            <input
              id="category"
              name="category"
              type="text"
              defaultValue={initialData?.category}
              placeholder="Frontend"
              required
              className="h-11 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">
            Description
          </label>

          <textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={initialData?.description}
            placeholder="A short description of your experience with this technology..."
            className="w-full resize-y rounded-lg border bg-background px-3 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
          />
        </div>
      </section>

      {/* Skill level */}
      <section className="space-y-5">
        <div>
          <h2 className="text-lg font-semibold">Skill level</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Set your proficiency level from 0 to 100.
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="level" className="text-sm font-medium">
              Level
            </label>

            <span className="text-sm text-muted-foreground">
              {initialData?.level ?? 0}%
            </span>
          </div>

          <input
            id="level"
            name="level"
            type="range"
            min="0"
            max="100"
            defaultValue={initialData?.level ?? 0}
            className="w-full accent-foreground"
          />

          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Beginner</span>
            <span>Intermediate</span>
            <span>Advanced</span>
          </div>
        </div>
      </section>

      {/* Display settings */}
      <section className="space-y-5">
        <div>
          <h2 className="text-lg font-semibold">Display settings</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Control how this skill is displayed on your portfolio.
          </p>
        </div>

        {/* Icon */}
        <div className="space-y-2">
          <label htmlFor="icon" className="text-sm font-medium">
            Icon
          </label>

          <input
            id="icon"
            name="icon"
            type="text"
            defaultValue={initialData?.icon}
            placeholder="react"
            className="h-11 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
          />

          <p className="text-xs text-muted-foreground">
            Use an icon identifier that your frontend can resolve.
          </p>
        </div>

        {/* Order */}
        <div className="space-y-2">
          <label htmlFor="order" className="text-sm font-medium">
            Display order
          </label>

          <input
            id="order"
            name="order"
            type="number"
            min="0"
            defaultValue={initialData?.order ?? 0}
            className="h-11 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-colors focus:border-foreground"
          />
        </div>

        {/* Featured */}
        <label className="flex cursor-pointer items-start gap-3 rounded-lg border p-4">
          <input
            id="featured"
            name="featured"
            type="checkbox"
            defaultChecked={initialData?.featured ?? false}
            className="mt-0.5 size-4 accent-foreground"
          />

          <span>
            <span className="block text-sm font-medium">Featured skill</span>

            <span className="mt-1 block text-xs text-muted-foreground">
              Show this skill in featured skill sections on the portfolio.
            </span>
          </span>
        </label>
      </section>
    </div>
  )
}

export default SkillFormFields
