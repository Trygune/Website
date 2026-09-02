'use client'

import ImageUpload from '../shared/ImageUpload'

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
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
import { Post } from '@/types/post'
import { useState } from 'react'
import TagInput from '../shared/TagInput'

type PostFormFieldsProps = {
  initialData?: Post
  status: Post['status']
  onStatusChange: (status: Post['status']) => void
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

const statuses = [
  {
    value: 'draft',
    label: 'Draft',
    description: 'Keep this post hidden from the public.',
  },
  {
    value: 'published',
    label: 'Published',
    description: 'Make this post visible on your public blog.',
  },
]

const PostFormFields = ({
  status: stat,
  onStatusChange,
  initialData,
}: PostFormFieldsProps) => {
  const [tags, setTags] = useState<string[]>(initialData?.tags ?? [])
  return (
    <div className="space-y-8">
      {/* Basic Information */}
      <section className="rounded-xl border bg-background">
        <div className="border-b px-5 py-4">
          <h2 className="font-semibold">Basic information</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Add the main information visitors will see about this post.
          </p>
        </div>

        <div className="p-5">
          <FieldGroup>
            {/* Title */}
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>

              <Input
                id="title"
                name="title"
                type="text"
                defaultValue={initialData?.title}
                placeholder="Building Modern React Applications"
                required
              />

              <FieldDescription>
                Use a clear and descriptive title for your post.
              </FieldDescription>
            </Field>

            {/* Slug */}
            <Field>
              <FieldLabel htmlFor="slug">Slug</FieldLabel>

              <Input
                id="slug"
                name="slug"
                type="text"
                defaultValue={initialData?.slug}
                placeholder="building-modern-react-applications"
                required
              />

              <FieldDescription>
                This will be used as the URL of your post.
              </FieldDescription>
            </Field>

            {/* Excerpt */}
            <Field>
              <FieldLabel htmlFor="excerpt">Excerpt</FieldLabel>

              <Textarea
                id="excerpt"
                name="excerpt"
                defaultValue={initialData?.excerpt}
                placeholder="A practical look at building scalable and maintainable React applications..."
                rows={4}
                required
              />

              <FieldDescription>
                A short summary displayed on post cards and search results.
              </FieldDescription>
            </Field>
          </FieldGroup>
        </div>
      </section>

      {/* Content */}
      <section className="rounded-xl border bg-background">
        <div className="border-b px-5 py-4">
          <h2 className="font-semibold">Content</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Write the main content of your blog post.
          </p>
        </div>

        <div className="p-5">
          <Field>
            <FieldLabel htmlFor="content">Content</FieldLabel>

            <Textarea
              id="content"
              name="content"
              defaultValue={initialData?.content}
              placeholder="Write your post content here..."
              rows={20}
              required
              className="min-h-[400px] resize-y leading-7"
            />

            <FieldDescription>
              Markdown or rich-text support can be added later.
            </FieldDescription>
          </Field>
        </div>
      </section>

      {/* Organization */}
      <section className="rounded-xl border bg-background">
        <div className="border-b px-5 py-4">
          <h2 className="font-semibold">Organization</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Categorize your post and add relevant tags.
          </p>
        </div>

        <div className="p-5">
          <FieldGroup>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Category */}
              <Field>
                <FieldLabel htmlFor="category">Category</FieldLabel>

                <Select name="category" defaultValue={initialData?.category}>
                  <SelectTrigger id="category" className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>

                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FieldDescription>
                  Choose the category that best describes this post.
                </FieldDescription>
              </Field>

              {/* Read Time */}
              <Field>
                <FieldLabel htmlFor="readTime">Read time</FieldLabel>

                <Input
                  id="readTime"
                  name="readTime"
                  type="text"
                  defaultValue={initialData?.readTime}
                  placeholder="5 min read"
                />

                <FieldDescription>
                  Estimated reading time for this post.
                </FieldDescription>
              </Field>
            </div>

            {/* Tags */}
            <Field>
              <FieldLabel htmlFor="tags">Tags</FieldLabel>

              <TagInput value={tags} onChange={setTags} />
              {tags.map((tag, index) => (
                <input
                  key={`${tag}-${index}-hidden`}
                  type="hidden"
                  name="tags"
                  value={tag}
                />
              ))}

              <FieldDescription>
                Select from the suggested tags.
              </FieldDescription>
            </Field>
          </FieldGroup>
        </div>
      </section>

      {/* Cover Image */}
      <section className="rounded-xl border bg-background">
        <div className="border-b px-5 py-4">
          <h2 className="font-semibold">Cover image</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Add an image that represents your blog post.
          </p>
        </div>

        <div className="p-5">
          <ImageUpload
            value={initialData?.coverImage}
            label="Cover image"
            description="This image will be displayed as the cover of your blog post."
          />
        </div>
      </section>

      {/* Publishing */}
      <section className="rounded-xl border bg-background">
        <div className="border-b px-5 py-4">
          <h2 className="font-semibold">Publishing</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Control when and how this post becomes visible.
          </p>
        </div>

        <div className="p-5">
          <FieldSet>
            <FieldLegend variant="label">Status</FieldLegend>

            <FieldDescription>
              Choose whether this post should be visible on your blog.
            </FieldDescription>

            <FieldGroup className="mt-4 gap-3">
              {statuses.map((status) => (
                <Field
                  key={status.value}
                  orientation="horizontal"
                  className="rounded-lg border p-4"
                >
                  <FieldContent>
                    <FieldLabel htmlFor={`status-${status.value}`}>
                      {status.label}
                    </FieldLabel>

                    <FieldDescription>{status.description}</FieldDescription>
                  </FieldContent>

                  <input
                    id={`status-${status.value}`}
                    type="radio"
                    name="status"
                    value={status.value}
                    defaultChecked={
                      stat === status.value ||
                      (!stat && status.value === 'draft')
                    }
                    onChange={(event) =>
                      onStatusChange(event.target.value as Post['status'])
                    }
                    className="size-4 accent-foreground"
                  />
                </Field>
              ))}
            </FieldGroup>
          </FieldSet>

          {/* Published At */}
          <div className="mt-6 border-t pt-6">
            <Field>
              <FieldLabel htmlFor="publishedAt">Publication date</FieldLabel>

              <Input
                id="publishedAt"
                name="publishedAt"
                type="datetime-local"
                defaultValue={
                  initialData?.publishedAt
                    ? initialData.publishedAt.slice(0, 16)
                    : ''
                }
              />

              <FieldDescription>
                Set the date and time when the post should be published.
              </FieldDescription>
            </Field>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PostFormFields
