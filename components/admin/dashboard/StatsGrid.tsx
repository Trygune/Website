import { cn } from '@/lib/utils'
import StatsCard, { StatsCardProps } from './StatsCard'

const StatsGrid = ({ stats }: { stats: StatsCardProps[] }) => {
  return (
    <div
      className={cn(
        'grid gap-4',
        stats.length === 2 && 'sm:grid-cols-2',
        stats.length === 3 && 'sm:grid-cols-3',
        stats.length === 4 && 'sm:grid-cols-4'
      )}
    >
      {stats.map((stat, index) => (
        <StatsCard key={`stat-${index}`} stat={stat} />
      ))}
    </div>
  )
}

export default StatsGrid
