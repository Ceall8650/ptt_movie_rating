'use client'

import { KeyboardEvent, useState, ChangeEvent } from 'react';
import { useAppDispatch } from 'store/hooks';
import {
  searchMovies,
  mutateKeyword
} from 'store/slices/movieSlice';
import InputText from 'components/Input/InputText';

type Props = {
  className?: string,
}

function TopBarSearchBar({ className }: Props) {
  const [keyword, setKeyword] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const dispatch = useAppDispatch()

  async function handleSearch() {
    try {
      if (keyword) {
        setIsSearching(true)
        dispatch(mutateKeyword(keyword))

        await dispatch(searchMovies(keyword))

        setIsSearching(false)
      }
    } catch (error) {
      console.log('error :>> ', error);
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className={`${className} ${isSearching ? 'bg-gray-100 dark:bg-dark-mode-primary dark:opacity-70 cursor-not-allowed' : ''} w-[300px] flex justify-between border border-slate-300 rounded-lg px-3`}>
      <InputText
        placeholder='Enter a movie name'
        className='w-full border-0'
        onKeyDown={handleKeyDown}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
        disabled={isSearching}
      />
      <i
        aria-hidden="true"
        className="icon-search dib text-2xl cursor-pointer"
        onClick={handleSearch}
      />
    </div>
  )
}

export default TopBarSearchBar
