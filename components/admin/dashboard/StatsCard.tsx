import { type LucideIcon } from 'lucide-react'

export type StatsCardProps = {
  icon: LucideIcon
  title?: string
  subtitle?: string
  length?: number
}

const StatsCard = ({ stat }: { stat: StatsCardProps }) => {
  const Icon = stat.icon
  return (
    <div className="rounded-xl border bg-background p-5">
      <div className="flex size-10 items-center justify-center rounded-lg border">
        <Icon className="size-4 text-muted-foreground" />
      </div>

      <p className="mt-5 text-sm text-muted-foreground">{stat.title}</p>

      <p className="mt-1 text-3xl font-bold tracking-tight">{stat.length}</p>
      {stat.subtitle && (
        <p className="mt-2 text-xs text-muted-foreground">{stat.subtitle}</p>
      )}
    </div>
  )
}

export default StatsCard
