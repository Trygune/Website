'use client'

import { KeyboardEvent, useState } from 'react'
import { X } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'

type TagInputProps = {
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  disabled?: boolean
}

const TagInput = ({
  value,
  onChange,
  placeholder = 'Add a tag...',
  disabled = false,
}: TagInputProps) => {
  const [inputValue, setInputValue] = useState('')

  const addTag = (tag: string) => {
    const normalized = tag.trim()

    if (!normalized) return

    const exists = value.some(
      (item) => item.toLowerCase() === normalized.toLowerCase()
    )

    if (exists) {
      setInputValue('')
      return
    }

    onChange([...value, normalized])
    setInputValue('')
  }

  const removeTag = (tag: string) => {
    onChange(value.filter((item) => item !== tag))
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault()
      addTag(inputValue)
    }

    if (event.key === 'Backspace' && !inputValue && value.length > 0) {
      removeTag(value[value.length - 1])
    }
  }

  return (
    <div
      className={cn(
        'flex min-h-11 w-full flex-wrap items-center gap-2 rounded-lg border bg-background px-3 py-2',
        'focus-within:border-foreground',
        disabled && 'cursor-not-allowed opacity-50'
      )}
    >
      {value.map((tag) => (
        <Badge
          key={tag}
          variant="secondary"
          className="gap-1.5 rounded-md border bg-muted/40 px-2.5 py-1.5 font-medium"
        >
          {tag}

          <button
            type="button"
            aria-label={`Remove ${tag}`}
            disabled={disabled}
            onClick={() => removeTag(tag)}
            className="rounded-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-3" />
          </button>
        </Badge>
      ))}

      <Input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={value.length === 0 ? placeholder : ''}
        disabled={disabled}
        className="h-7 min-w-[120px] flex-1 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
      />
    </div>
  )
}

export default TagInput
