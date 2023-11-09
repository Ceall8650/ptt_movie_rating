'use client'

import { KeyboardEvent, useState, ChangeEvent } from 'react';
import Review from 'services/Review';
import InputText from 'components/Input/InputText';

type Props = {
  className?: string,
}

function SearchBar({ className }: Props) {
  const [keyword, setLKeyword] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [allReviews, setAllReviews] = useState<Review[]|null>(null)

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setLKeyword(e.target.value)
  }

  function search() {
    if (keyword) {
      handleSearch(keyword)
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      search()
    }
  }

  async function handleSearch(keyword:string) {
    try {
      setIsSearching(true)
      setAllReviews(null)

      const allReviews = await Review.getAll(keyword);
  
      setIsSearching(false)
      setAllReviews(allReviews)
    } catch (error) {
      console.log('error :>> ', error);
    }
  }

  return (
    <div className={`${className} ${isSearching ? 'bg-gray-100 dark:bg-dark-mode-primary dark:opacity-70 cursor-not-allowed' : ''} w-[300px] flex justify-between border border-slate-300 rounded-lg px-3`}>
      <InputText
        placeholder='Enter a movie name'
        className='w-full border-0'
        onKeyDown={handleKeyDown}
        onChange={e => handleChange(e)}
        disabled={isSearching}
      />
      <i 
        className="icon-search dib text-2xl cursor-pointer"
        onClick={search} 
      />
    </div>
  )
}

export default SearchBar
