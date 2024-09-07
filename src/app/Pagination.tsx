import { useState, useMemo } from 'react';

type Props = Readonly<{
  total: number,
  className?: String
}>
const PAGE_AMOUNT = 10

export default function Pagination({ total, className }: Props) {
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

  return (
    <div className={`flex align-center px-6 py-4 justify-between ${className}`}>
      <button
        disabled={!isBackEnabled}
        className={`w-8 h-8 rounded-full ${isBackEnabled && 'dark:hover:bg-cyan-500 hover:bg-blue-200'}`}
        onClick={() => setPageOffset(prev => prev - 1)}
      >
        &lt;
      </button>
      {pageNumbers.map(number => (
        <button
          key={number}
          className="w-8 h-8 rounded-full dark:hover:bg-cyan-500 hover:bg-blue-200"
        >
          {number}
        </button>
      ))}
      <button
        disabled={!isNextEnabled}
        className={`w-8 h-8 rounded-full ${isNextEnabled && 'dark:hover:bg-cyan-500 hover:bg-blue-200'}`}
        onClick={() => setPageOffset(prev => prev + 1)}
      >
        &gt;
      </button>
    </div>
  )
}
