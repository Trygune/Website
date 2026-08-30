import { cn } from '@/lib/utils'
import { Pagination as PaginationQueryProps } from '@/types/pagination'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import Link from 'next/link'

type PaginationProps = {
  pagination: PaginationQueryProps
  baseUrl?: string
}

const Pagination = ({ pagination, baseUrl }: PaginationProps) => {
  if (pagination.totalPages <= 1) {
    return null
  }

  const getPages = () => {
    if (pagination.totalPages > 1) {
      return Array.from(
        { length: pagination.totalPages },
        (_, index) => index + 1
      )
    }
    return [1]
  }

  const pages = getPages()

  const linkClass =
    'flex size-9 items-center justify-center rounded-lg border text-sm transition-colors hover:bg-muted'

  const linkClassDisabled = 'pointer-events-none opacity-40'

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      {/* Page info */}
      <p className="text-sm text-muted-foreground">
        Page{' '}
        <span className="font-medium text-foreground">{pagination.page}</span>{' '}
        of{' '}
        <span className="font-medium text-foreground">
          {pagination.totalPages}
        </span>
      </p>

      {/* Controls */}
      <div className="flex items-center gap-1">
        {/* First */}
        <Link
          href={`${baseUrl}?page=1`}
          aria-label="First page"
          className={cn(
            linkClass,
            pagination.page === '1' && linkClassDisabled
          )}
        >
          <ChevronsLeft className="size-4" />
        </Link>

        {/* Previous */}
        <Link
          href={`${baseUrl}?page=${Number(pagination.page) - 1}`}
          aria-label="Previous page"
          className={cn(
            linkClass,
            !pagination.hasPrevPage && linkClassDisabled
          )}
        >
          <ChevronLeft className="size-4" />
        </Link>

        {/* Pages */}
        {pages.map((page) => (
          <Link
            href={`${baseUrl}?page=${page}`}
            key={page}
            type="button"
            aria-label={`Page ${page}`}
            aria-current={page === Number(pagination.page) ? 'page' : undefined}
            className={`flex size-9 items-center justify-center rounded-lg border text-sm transition-colors ${
              page === Number(pagination.page)
                ? 'bg-foreground text-background'
                : 'hover:bg-muted'
            }`}
          >
            {page}
          </Link>
        ))}

        {/* Next */}
        <Link
          href={`${baseUrl}?page=${Number(pagination.page) + 1}`}
          aria-label="Next page"
          className={cn(
            linkClass,
            !pagination.hasNextPage && linkClassDisabled
          )}
        >
          <ChevronRight className="size-4" />
        </Link>

        {/* Last */}
        <Link
          href={`${baseUrl}?page=${pagination.totalPages}`}
          aria-label="Last page"
          className={cn(
            linkClass,
            !pagination.hasNextPage && linkClassDisabled
          )}
        >
          <ChevronsRight className="size-4" />
        </Link>
      </div>
    </nav>
  )
}

export default Pagination
