import { KeyboardEvent, useState, ChangeEvent, useEffect } from 'react';
import { useSearchingMovies } from 'services/hooks/useMovies';
import InputText from 'components/Input/InputText';

type Props = Readonly<{
  className?: string,
}>

function TopBarSearchBar({ className }: Props) {
  const [keyword, setKeyword] = useState('')
  const [searchTriggered, setSearchTriggered] = useState(false)
  const { isFetching, refetch } = useSearchingMovies({
    keyword,
    enabled: false
  })

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      setSearchTriggered(true)
    }
  }

  useEffect(() => {
    if (searchTriggered && !isFetching) {
      refetch();
      setSearchTriggered(false)
    }
  }, [searchTriggered, isFetching, refetch])

  return (
    <div className={`${className} ${isFetching ? 'bg-gray-100 dark:bg-dark-mode-primary dark:opacity-70 cursor-not-allowed' : ''} w-[300px] flex justify-between border border-slate-300 rounded-lg px-3`}>
      <InputText
        placeholder='Enter a movie name'
        className='w-full border-0'
        onKeyDown={handleKeyDown}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
        disabled={isFetching}
      />
      <i
        aria-hidden="true"
        className="icon-search dib text-2xl cursor-pointer"
        onClick={() => setSearchTriggered(true)}
      />
    </div>
  )
}

export default TopBarSearchBar
