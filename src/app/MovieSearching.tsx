import Image from 'next/image';
import SearchingImage from 'assets/images/searching.svg';

type Props = {
  className?: string
}

function MovieSearching({ className }: Props) {
  let rootClassName = "w-full h-full flex flex-col justify-center items-center"

  if(className) {
    rootClassName = `${rootClassName} ${className}`
  }

  return (
    <div className={rootClassName}>
      <Image
        src={SearchingImage}
        alt='Searching'
        sizes="100vw 100vw"
        style={{
          width: '25%',
          height: 'auto',
        }}
      />
      <span className='dark:text-white'>
        Searching
        <span className="opacity-0 animate-dotOne"> .</span>
        <span className="opacity-0 animate-dotTwo"> .</span>
        <span className="opacity-0 animate-dotThree"> .</span>
      </span>
    </div>
  )
}

export default MovieSearching
