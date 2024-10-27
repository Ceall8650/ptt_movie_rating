import { useState, useMemo, useEffect } from 'react';
import { PAGE_AMOUNT } from 'common/pagination'

type Props = Readonly<{
  total: number,
  currentPage: number,
  changePage: Function
  className?: string,
}>
export default function Pagination({
  total,
  className,
  currentPage = 1,
  changePage
}: Props) {
  const MAX_PAGE_OFFSET = Math.ceil(total / PAGE_AMOUNT) - 1
  const [pageOffset, setPageOffset] = useState(0)
  const isBackEnabled = useMemo(() => pageOffset > 0, [pageOffset])
  const isNextEnabled = useMemo(() => pageOffset < MAX_PAGE_OFFSET, [pageOffset, MAX_PAGE_OFFSET])
  const firstPage = useMemo(() => 1 + (PAGE_AMOUNT * pageOffset), [pageOffset])
  const lastPage = useMemo(() => Math.min((PAGE_AMOUNT * pageOffset) + PAGE_AMOUNT, total), [pageOffset, total])
  const pageNumbers = useMemo(() => Array.from(
    { length: lastPage - firstPage + 1 },
    (_, i) => firstPage + i
  ), [firstPage, lastPage])

  function clickPage(pageNumber: number) {
    changePage(pageNumber)
  }

  function backOffset() {
    if (isBackEnabled) {
      setPageOffset(prev => prev - 1)
      changePage(firstPage - PAGE_AMOUNT)
    }
  }

  function nextOffset() {
    if (isNextEnabled) {
      setPageOffset(prev => prev + 1)
      changePage(lastPage + 1)
    }
  }

  useEffect(() => {
    const newPageOffset = Math.floor(currentPage / PAGE_AMOUNT)

    setPageOffset(newPageOffset)
  }, [currentPage])

  return (
    <div className={`flex align-center px-6 py-4 justify-between ${className}`}>
      <button
        disabled={!isBackEnabled}
        className={`
          w-8
          h-8
          cursor-pointer
          rounded-full
          ${isBackEnabled && 'dark:hover:bg-cyan-500 hover:bg-blue-200'}
        `}
        onClick={backOffset}
      >
        &lt;
      </button>
      {pageNumbers.map(number => (
        <button
          key={number}
          className={`
            w-8
            h-8
            rounded-full
            dark:hover:bg-cyan-500
            hover:bg-blue-200
            ${currentPage === number && 'dark:bg-cyan-600 bg-blue-300'}
          `}
          onClick={() => clickPage(number)}
        >
          {number}
        </button>
      ))}
      <button
        disabled={!isNextEnabled}
        className={`
          w-8
          h-8
          cursor-pointer
          rounded-full
          ${isNextEnabled && 'dark:hover:bg-cyan-500 hover:bg-blue-200'}
        `}
        onClick={nextOffset}
      >
        &gt;
      </button>
    </div>
  )
}
