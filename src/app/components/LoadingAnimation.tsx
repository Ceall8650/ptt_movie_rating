import Image from 'next/image';
import Loading from 'assets/images/loading.svg';

type Props = {
  className?: string
}

function LoadingAnimation({ className }: Props) {
  return (
    <div className={className ? `${className} flex justify-center items-center` : 'flex justify-center items-center'}>
      <Image 
          priority
          src={Loading}
          alt="Loading the content"
          width="96"
          height="96"
      />
    </div>
  )  
}

export default LoadingAnimation
