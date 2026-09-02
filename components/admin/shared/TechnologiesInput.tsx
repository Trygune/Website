'use client'

import { useState } from 'react'
import { Check, ChevronDown, X } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useSkills } from '@/hooks/useSkills'

type TechnologiesInputProps = {
  value: string[]
  onChange: (value: string[]) => void
}

const TechnologiesInput = ({ value, onChange }: TechnologiesInputProps) => {
  const { data: skills, isError, isPending } = useSkills()
  const technologyOptions = skills?.data ?? []

  const [open, setOpen] = useState(false)

  const addTechnology = (technology: string) => {
    const normalized = technology.trim()

    if (!normalized) return

    const exists = value.some(
      (item) => item.toLowerCase() === normalized.toLowerCase()
    )

    if (exists) return

    onChange([...value, normalized])
  }

  const removeTechnology = (technology: string) => {
    onChange(value.filter((item) => item !== technology))
  }

  return (
    <div className="space-y-3">
      {/* Selected technologies */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((technology) => (
            <Badge
              key={technology}
              variant="secondary"
              className="gap-1.5 rounded-md border bg-muted/40 px-2.5 py-1.5 font-medium"
            >
              {technology}

              <button
                type="button"
                aria-label={`Remove ${technology}`}
                onClick={() => removeTechnology(technology)}
                className="rounded-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="size-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Selector */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <button
              type="button"
              className={cn(
                'flex h-11 w-full items-center justify-between rounded-lg border bg-background px-3 text-sm',
                'text-muted-foreground outline-none transition-colors',
                'hover:bg-muted/30',
                'focus:border-foreground'
              )}
            >
              <span>
                {value.length > 0
                  ? 'Add another technology...'
                  : 'Select technologies...'}
              </span>

              <ChevronDown className="size-4 opacity-50" />
            </button>
          }
        />

        <PopoverContent
          align="start"
          className="w-[var(--radix-popover-trigger-width)] p-0"
        >
          <Command>
            <CommandInput
              placeholder="Search technologies..."
              disabled={isPending || isError}
            />

            <CommandList>
              {isPending && (
                <div className="px-3 py-6 text-center text-sm text-muted-foreground">
                  Loading technologies...
                </div>
              )}

              {isError && (
                <div className="px-3 py-6 text-center text-sm text-destructive">
                  Failed to load technologies.
                </div>
              )}

              {!isPending && !isError && (
                <>
                  <CommandEmpty>No technology found.</CommandEmpty>

                  <CommandGroup>
                    {technologyOptions.map((skill) => {
                      const selected = value.some(
                        (item) =>
                          item.toLowerCase() === skill.name.toLowerCase()
                      )

                      return (
                        <CommandItem
                          key={skill.id}
                          value={skill.name}
                          onSelect={() => {
                            if (selected) {
                              removeTechnology(skill.name)
                            } else {
                              addTechnology(skill.name)
                            }
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 size-4',
                              selected ? 'opacity-100' : 'opacity-0'
                            )}
                          />

                          {skill.name}
                        </CommandItem>
                      )
                    })}
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default TechnologiesInput
