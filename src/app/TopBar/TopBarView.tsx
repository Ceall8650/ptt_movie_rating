import TopBarSearchBar from './TopBarSearchBar';
import TopBarThemeModeButton from './TopBarThemeModeButton';

type Props = {
  className?: string
}

function TopBar({ className }: Props) {
  const rootClassName = `fixed top-0 left-0 z-[1] w-full bg-white dark:bg-dark-mode-primary flex justify-between px-6 py-4 drop-shadow-lg`;

  return (
    <div className={className ? ` ${className} ${rootClassName} bg-blue-950` : rootClassName}>
      <h1 className='text-xl'>鄉民溫度計 - 電影版</h1>
      <div className='flex items-center'>
        <TopBarSearchBar className='mr-5' />
        <TopBarThemeModeButton />
      </div>
    </div>
  )
}

export default TopBar
