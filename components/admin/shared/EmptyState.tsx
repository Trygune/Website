import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { Plus } from 'lucide-react'

type EmptyStateProps = {
  icon: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    href: string
  }
}

const EmptyState = ({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateProps) => {
  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center rounded-xl border bg-background px-6 py-12 text-center">
      {/* Icon */}
      <div className="flex size-12 items-center justify-center rounded-xl border bg-muted/40">
        <Icon className="size-5 text-muted-foreground" />
      </div>

      {/* Content */}
      <h2 className="mt-5 text-lg font-semibold">{title}</h2>

      <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
        {description}
      </p>

      {/* Action */}
      {action && (
        <Link
          href={action.href}
          className="mt-6 inline-flex h-10 items-center gap-2 rounded-lg bg-foreground px-4 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
        >
          <Plus className="size-4" />
          {action.label}
        </Link>
      )}
    </div>
  )
}

export default EmptyState
