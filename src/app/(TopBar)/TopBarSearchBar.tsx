import { KeyboardEvent, useState, ChangeEvent, useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import MovieMode from 'enums/MovieMode';
import { useSearchingMovies } from 'services/hooks/useSearchingMovies';
import InputText from 'components/Input/InputText';
import { mutateMovieMode, changePage, mutateKeyword } from '@/store/slices/movieSlice'

type Props = Readonly<{
  className?: string,
}>

function TopBarSearchBar({ className }: Props) {
  const [keyword, setKeyword] = useState('')
  const [searchTriggered, setSearchTriggered] = useState(false)
  const dispatch = useAppDispatch()
  const mode = useAppSelector(state => state.movie.mode)
  const page = useAppSelector(state => state.movie.currentPage)
  const currentPage = useRef(page)
  const enabled = mode === MovieMode.SEARCH && searchTriggered
  const { isFetching } = useSearchingMovies({
    keyword,
    page,
    mode,
    enabled: mode === MovieMode.SEARCH && searchTriggered
  })

  function search() {
    dispatch(changePage({ pageNumber: 1 }))
    dispatch(mutateMovieMode({ mode: MovieMode.SEARCH }))
    setSearchTriggered(true)
    dispatch(mutateKeyword({ keyword }))
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      search()
    }
  }

  useEffect(() => {
    if (currentPage.current !== page) {
      setSearchTriggered(true)
      currentPage.current = page
    }
  }, [page, enabled])

  useEffect(() => {
    if (searchTriggered) {
      setSearchTriggered(false)
    }
  }, [searchTriggered, enabled])

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
        onClick={search}
      />
    </div>
  )
}

export default TopBarSearchBar
