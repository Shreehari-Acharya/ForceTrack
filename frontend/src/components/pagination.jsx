import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


export default function PaginationForStudentTable({ 
    total,
    currentPage,
    totalPages,
    onPageChange, 
    startIndex,
    endIndex
}) {


  const renderPages = () => {
    const pages = []

    if (totalPages <= 4) {
      // Show all pages if 4 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={i == currentPage}
              onClick={() => onPageChange(i)}
              href="#"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        )
      }
    } else {

      const firstPage = 1
      const lastPage = totalPages

      const pagesToShow = new Set([firstPage, lastPage, currentPage])

      if (currentPage > 2) pagesToShow.add(currentPage - 1)
      if (currentPage < totalPages - 1) pagesToShow.add(currentPage + 1)

      const sortedPages = Array.from(pagesToShow).sort((a, b) => a - b)

      for (let i = 0; i < sortedPages.length; i++) {
        const page = sortedPages[i]
        pages.push(
          <PaginationItem key={page}>
            <PaginationLink
              isActive={page == currentPage}
              onClick={() => onPageChange(page)}
              href="#"
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        )

        const nextPage = sortedPages[i + 1]
        if (nextPage && nextPage - page > 1) {
          pages.push(
            <PaginationItem key={`ellipsis-${page}`}>
              <PaginationEllipsis />
            </PaginationItem>
          )
        }
      }
    }

    return pages
  }

    return (
        <div className="flex items-center justify-between w-full">
            <div className="text-sm text-muted-foreground w-1/4">
                Showing {startIndex} to {endIndex} of {total} students
            </div>
            <Pagination className={"justify-end"}>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                            className={currentPage == 1 ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>

                    {renderPages()}

                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={() => onPageChange(Math.min(parseInt(currentPage) + 1, parseInt(totalPages)))}
                            className={currentPage == totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
