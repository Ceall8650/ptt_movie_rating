'use client'

import { useState } from 'react';
import Image from 'next/image';
import MoviePosterImage from 'assets/images/moviePoster.svg';
import { getImageUrl } from 'common/utilities';
import MovieDetailModal from './MovieDetailModal';

type Props = {
  movie: FormattedResponseMovie
}

function MoviePoster({ movie }: Props) {
  const [isModalOpened, setIsModalOpened] = useState(false)
  const imageSource = movie.posterPath ? getImageUrl(movie.posterPath) : MoviePosterImage

  return (
    <>
      <div
        key={movie.id} 
        className={`flex
          flex-col
          items-center 
          hover:cursor-pointer
          group
        `}
        onClick={() => setIsModalOpened(true)}
      >
        <div className="relative mb-2">
          <Image
            loading="lazy"
            src={imageSource}
            width={150}
            height={240}
            sizes="100vw"
            style={{ width: '100%', height: '100%' }} // optional
            alt={`Movie Poster: ${movie.originalTitle}`}
            className='
              group-hover:blur-[1px]
              group-hover:brightness-50
            '
          />
          <div
            className='
              absolute
              top-1/2 
              left-1/2 
              text-2xl
              translate-y-[-50%] 
              translate-x-[-50%]
              hidden
              group-hover:inline-block
              text-white
            '
          >
            <div className='flex flex-col items-center justify-center'>
              <i className='icon-comment mb-2' />
              <span className='text-sm'>查詢評價</span>
            </div>
          </div>
        </div>
        <span className='text-sm'>{movie.title}</span>
      </div>
      {
        isModalOpened &&
        <MovieDetailModal onClose={() => setIsModalOpened(false)} />
      }
    </>
  )
}

export default MoviePoster
