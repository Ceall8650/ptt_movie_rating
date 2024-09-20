import Image from 'next/image';
import noResultImage from 'assets/images/noResult.svg';

type Props = Readonly<{
  className?: string
}>

function MovieEmpty({ className }: Props) {
  let rootClassName = "w-full h-full flex flex-col justify-center items-center"

  if (className) {
    rootClassName = `${rootClassName} ${className}`
  }

  return (
    <div className={rootClassName}>
      <Image
        src={noResultImage}
        alt='No Result'
        sizes="100vw 100vw"
        style={{
          width: '25%',
          height: 'auto',
        }}
      />
      <span className='dark:text-white'>Oops... No results found.</span>
    </div>
  )
}

export default MovieEmpty
