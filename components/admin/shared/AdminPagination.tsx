'use client'

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

type AdminPaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  siblingCount?: number
}

const AdminPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}: AdminPaginationProps) => {
  if (totalPages <= 1) {
    return null
  }

  const getPages = () => {
    const pages: (number | 'ellipsis')[] = []

    const totalVisiblePages = siblingCount * 2 + 5

    if (totalPages <= totalVisiblePages) {
      return Array.from({ length: totalPages }, (_, index) => index + 1)
    }

    const leftSibling = Math.max(currentPage - siblingCount, 1)

    const rightSibling = Math.min(currentPage + siblingCount, totalPages)

    const showLeftEllipsis = leftSibling > 2
    const showRightEllipsis = rightSibling < totalPages - 1

    pages.push(1)

    if (showLeftEllipsis) {
      pages.push('ellipsis')
    } else {
      for (let page = 2; page < leftSibling; page++) {
        pages.push(page)
      }
    }

    for (let page = leftSibling; page <= rightSibling; page++) {
      if (page !== 1 && page !== totalPages) {
        pages.push(page)
      }
    }

    if (showRightEllipsis) {
      pages.push('ellipsis')
    } else {
      for (let page = rightSibling + 1; page < totalPages; page++) {
        pages.push(page)
      }
    }

    if (totalPages > 1) {
      pages.push(totalPages)
    }

    return pages
  }

  const pages = getPages()

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) {
      return
    }

    onPageChange(page)
  }

  const buttonClass =
    'flex size-9 items-center justify-center rounded-lg border text-sm transition-colors disabled:pointer-events-none disabled:opacity-40 hover:bg-muted'

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      {/* Page info */}
      <p className="text-sm text-muted-foreground">
        Page <span className="font-medium text-foreground">{currentPage}</span>{' '}
        of <span className="font-medium text-foreground">{totalPages}</span>
      </p>

      {/* Controls */}
      <div className="flex items-center gap-1">
        {/* First */}
        <button
          type="button"
          aria-label="First page"
          disabled={currentPage === 1}
          onClick={() => goToPage(1)}
          className={buttonClass}
        >
          <ChevronsLeft className="size-4" />
        </button>

        {/* Previous */}
        <button
          type="button"
          aria-label="Previous page"
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
          className={buttonClass}
        >
          <ChevronLeft className="size-4" />
        </button>

        {/* Pages */}
        {pages.map((page, index) =>
          page === 'ellipsis' ? (
            <span
              key={`ellipsis-${index}`}
              className="flex size-9 items-center justify-center text-sm text-muted-foreground"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              type="button"
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
              onClick={() => goToPage(page)}
              className={`flex size-9 items-center justify-center rounded-lg border text-sm transition-colors ${
                page === currentPage
                  ? 'bg-foreground text-background'
                  : 'hover:bg-muted'
              }`}
            >
              {page}
            </button>
          )
        )}

        {/* Next */}
        <button
          type="button"
          aria-label="Next page"
          disabled={currentPage === totalPages}
          onClick={() => goToPage(currentPage + 1)}
          className={buttonClass}
        >
          <ChevronRight className="size-4" />
        </button>

        {/* Last */}
        <button
          type="button"
          aria-label="Last page"
          disabled={currentPage === totalPages}
          onClick={() => goToPage(totalPages)}
          className={buttonClass}
        >
          <ChevronsRight className="size-4" />
        </button>
      </div>
    </nav>
  )
}

export default AdminPagination
