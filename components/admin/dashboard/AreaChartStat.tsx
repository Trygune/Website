'use client'

import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import { useMemo, useState } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { useAnalytics } from '@/hooks/useAnalytics'

export const description = 'Analytics visits chart'

const chartConfig = {
  visits: {
    label: 'Visits',
    color: 'var(--chart-1)',
  },
  uniqueVisitors: {
    label: 'Unique Visitors',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig

type TimeRange = '7d' | '30d' | '90d'

const AreaChartStat = () => {
  const { data, isPending, isError } = useAnalytics()

  const [timeRange, setTimeRange] = useState<TimeRange>('90d')

  const filteredData = useMemo(() => {
    const chartData = data?.data ?? []

    if (!chartData.length) return []

    const referenceDate = new Date(
      `${chartData[chartData.length - 1].date}T00:00:00`
    )

    const daysToSubtract =
      timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90

    const startDate = new Date(referenceDate)

    startDate.setDate(startDate.getDate() - daysToSubtract)

    return chartData.filter((item) => {
      const date = new Date(`${item.date}T00:00:00`)

      return date >= startDate && date <= referenceDate
    })
  }, [data?.data, timeRange])

  if (isPending) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Total Visits</CardTitle>
          <CardDescription>Loading analytics...</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="h-[300px] w-full animate-pulse rounded-lg bg-muted" />
        </CardContent>
      </Card>
    )
  }

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Total Visits</CardTitle>
          <CardDescription>Failed to load analytics data.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Total Visits</CardTitle>

            <CardDescription>
              Website visits and unique visitors
            </CardDescription>
          </div>

          <Select
            value={timeRange}
            onValueChange={(value) => setTimeRange(value as TimeRange)}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        {filteredData.length > 0 ? (
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart
              accessibilityLayer
              data={filteredData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />

              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => {
                  const date = new Date(`${value}T00:00:00`)

                  return date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })
                }}
              />

              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      const date = new Date(`${value}T00:00:00`)

                      return date.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    }}
                  />
                }
              />

              <ChartLegend content={<ChartLegendContent />} />

              <Bar
                dataKey="visits"
                stackId="a"
                fill="var(--color-visits)"
                radius={[0, 0, 0, 0]}
              />

              <Bar
                dataKey="uniqueVisitors"
                stackId="a"
                fill="var(--color-uniqueVisitors)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        ) : (
          <div className="flex h-[300px] items-center justify-center text-sm text-muted-foreground">
            No analytics data available.
          </div>
        )}
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Website analytics <TrendingUp className="h-4 w-4" />
        </div>

        <div className="leading-none text-muted-foreground">
          Showing visits and unique visitors for the selected period
        </div>
      </CardFooter>
    </Card>
  )
}

export default AreaChartStat
