'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

import { createAnalytics } from '@/services/analytics'
import { getVisitorId } from '@/lib/analytics/visitor'

const AnalyticsProvider = () => {
  const pathname = usePathname()

  useEffect(() => {
    const trackVisit = async () => {
      try {
        const visitorId = getVisitorId()

        await createAnalytics({
          visitorId,
          path: pathname,
        })
      } catch (error) {
        console.error('Analytics tracking failed:', error)
      }
    }

    trackVisit()
  }, [])

  return null
}

export default AnalyticsProvider
