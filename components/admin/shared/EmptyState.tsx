import { type LucideIcon } from 'lucide-react'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type EmptyStateProps = {
  icon: LucideIcon
  title: string
  description: string
  noBorder?: boolean
  action: {
    label: string
    href: string
  }
}

const EmptyState = ({
  icon: Icon,
  title,
  description,
  action,
  noBorder,
}: EmptyStateProps) => {
  return (
    <Empty
      className={cn('rounded-xl border bg-background', noBorder && 'border-0')}
    >
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <Link
          href={action?.href}
          className="bg-black/90 rounded-full text-white font-medium py-2 px-3"
        >
          {action?.label}
        </Link>
      </EmptyContent>
    </Empty>
  )
}

export default EmptyState
