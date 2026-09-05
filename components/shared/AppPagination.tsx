import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { cn } from '@/lib/utils'
import { Pagination as PaginationQueryProps } from '@/types/pagination'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'

type AppPagination = {
  pagination?: PaginationQueryProps
  baseUrl?: string
}

const linkClassDisabled = 'pointer-events-none opacity-40'

const AppPagination = ({ pagination, baseUrl }: AppPagination) => {
  if (!pagination || pagination.totalPages <= 1) {
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

  const totalPages = getPages()
  const pages =
    totalPages.length > 3
      ? Number(pagination.page) > 2
        ? totalPages.slice(
            Number(pagination.page) - 2,
            Number(pagination.page) + 1
          )
        : totalPages.slice(0, 3)
      : totalPages

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink
            href={`${baseUrl}?page=1`}
            className={cn(pagination.page === '1' && linkClassDisabled)}
          >
            <ChevronsLeft className="size-4" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious
            href={`${baseUrl}?page=${Number(pagination.page) - 1}`}
            className={cn(!pagination.hasPrevPage && linkClassDisabled)}
          />
        </PaginationItem>
        {totalPages.length > 3 && Number(pagination.page) > 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {pages.map((page) => (
          <PaginationItem key={`page-${page}`}>
            <PaginationLink
              href={`${baseUrl}?page=${page}`}
              isActive={page === Number(pagination.page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {totalPages.length > 3 &&
          Number(pagination.page) !== totalPages.length && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
        <PaginationItem>
          <PaginationNext
            href={`${baseUrl}?page=${Number(pagination.page) + 1}`}
            className={cn(!pagination.hasNextPage && linkClassDisabled)}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href={`${baseUrl}?page=${pagination.totalPages}`}
            className={cn(!pagination.hasNextPage && linkClassDisabled)}
          >
            <ChevronsRight className="size-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default AppPagination
