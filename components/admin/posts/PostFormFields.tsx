'use client'

import ImageUpload from '../shared/ImageUpload'

type PostFormData = {
  title?: string
  slug?: string
  excerpt?: string
  content?: string
  category?: string
  tags?: string[]
  coverImage?: string
  published?: boolean
}

type PostFormFieldsProps = {
  initialData?: PostFormData
}

const categories = [
  'Frontend',
  'Backend',
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Other',
]

const PostFormFields = ({ initialData }: PostFormFieldsProps) => {
  return (
    <div className="space-y-8">
      {/* Basic Information */}
      <section className="rounded-xl border bg-background">
        <div className="border-b px-5 py-4">
          <h2 className="font-semibold">Basic information</h2>

          <p className="mt-1 text-xs text-muted-foreground">
            The basic information about your blog post.
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
              placeholder="Building a modern portfolio with Next.js"
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
              placeholder="building-modern-portfolio-nextjs"
              required
              className="h-11 w-full rounded-lg border bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground focus:border-foreground"
            />

            <p className="text-xs text-muted-foreground">
              Used in the URL of the post.
            </p>
          </div>

          {/* Excerpt */}
          <div className="space-y-2">
            <label htmlFor="excerpt" className="text-sm font-medium">
              Excerpt
            </label>

            <textarea
              id="excerpt"
              name="excerpt"
              rows={3}
              defaultValue={initialData?.excerpt}
              placeholder="A short description of the post..."
              required
              className="w-full resize-y rounded-lg border bg-transparent px-3 py-3 text-sm leading-6 outline-none placeholder:text-muted-foreground focus:border-foreground"
            />

            <p className="text-xs text-muted-foreground">
              A short summary shown in post cards and search results.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="rounded-xl border bg-background">
        <div className="border-b px-5 py-4">
          <h2 className="font-semibold">Content</h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Write the main content of your blog post.
          </p>
        </div>

        <div className="p-5">
          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">
              Content
            </label>

            <textarea
              id="content"
              name="content"
              rows={20}
              defaultValue={initialData?.content}
              placeholder="Write your post content here..."
              required
              className="w-full resize-y rounded-lg border bg-transparent px-4 py-3 text-sm leading-7 outline-none placeholder:text-muted-foreground focus:border-foreground"
            />

            <p className="text-xs text-muted-foreground">
              Markdown or rich-text support can be added later.
            </p>
          </div>
        </div>
      </section>

      {/* Organization */}
      <section className="rounded-xl border bg-background">
        <div className="border-b px-5 py-4">
          <h2 className="font-semibold">Organization</h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Categorize and organize your post.
          </p>
        </div>

        <div className="grid gap-6 p-5 sm:grid-cols-2">
          {/* Category */}
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">
              Category
            </label>

            <select
              id="category"
              name="category"
              defaultValue={initialData?.category ?? ''}
              required
              className="h-11 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-foreground"
            >
              <option value="" disabled>
                Select category
              </option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label htmlFor="tags" className="text-sm font-medium">
              Tags
            </label>

            <input
              id="tags"
              name="tags"
              type="text"
              defaultValue={initialData?.tags?.join(', ')}
              placeholder="React, Next.js, TypeScript"
              className="h-11 w-full rounded-lg border bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground focus:border-foreground"
            />

            <p className="text-xs text-muted-foreground">
              Separate tags with commas.
            </p>
          </div>
        </div>
      </section>

      {/* Cover Image */}
      <section className="rounded-xl border bg-background">
        <div className="border-b px-5 py-4">
          <h2 className="font-semibold">Cover image</h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Add a cover image for your blog post.
          </p>
        </div>

        <ImageUpload
          value={initialData?.coverImage}
          label="Cover image"
          description="This image will be displayed as the cover of your blog post."
        />
      </section>

      {/* Publishing */}
      <section className="rounded-xl border bg-background">
        <div className="border-b px-5 py-4">
          <h2 className="font-semibold">Publishing</h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Control the visibility of your post.
          </p>
        </div>

        <div className="p-5">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              name="published"
              defaultChecked={initialData?.published}
              className="mt-0.5 size-4 accent-foreground"
            />

            <span>
              <span className="block text-sm font-medium">
                Publish this post
              </span>

              <span className="mt-0.5 block text-xs text-muted-foreground">
                Published posts will be visible on your public blog.
              </span>
            </span>
          </label>
        </div>
      </section>
    </div>
  )
}

export default PostFormFields
