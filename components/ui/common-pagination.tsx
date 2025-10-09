'use client'

import * as React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/ui/pagination'

interface AppPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange?: (page: number) => void
}

export function CommonPagination({
  currentPage,
  totalPages,
  onPageChange,
}: AppPaginationProps) {
  if (totalPages <= 1) return null

  // Hàm xử lý khi click trang
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    onPageChange?.(page)
  }

  // Tạo danh sách trang cần hiển thị (tối đa 5 trang, có dấu “...”)
  const getPages = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(
          1,
          '...',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          '...',
          totalPages
        )
      }
    }
    return pages
  }

  const pages = getPages()

  return (
    <Pagination className="mt-4">
      <PaginationContent>
        {/* Nút Previous */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            aria-disabled={currentPage === 1}
            onClick={(e) => {
              e.preventDefault()
              handlePageChange(currentPage - 1)
            }}
          />
        </PaginationItem>

        {/* Các trang */}
        {pages.map((p, idx) => (
          <PaginationItem key={idx}>
            {typeof p === 'number' ? (
              <PaginationLink
                href="#"
                isActive={p === currentPage}
                onClick={(e) => {
                  e.preventDefault()
                  handlePageChange(p)
                }}
              >
                {p}
              </PaginationLink>
            ) : (
              <PaginationEllipsis />
            )}
          </PaginationItem>
        ))}

        {/* Nút Next */}
        <PaginationItem>
          <PaginationNext
            href="#"
            aria-disabled={currentPage === totalPages}
            onClick={(e) => {
              e.preventDefault()
              handlePageChange(currentPage + 1)
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
