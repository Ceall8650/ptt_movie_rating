'use client'

import { useTheme } from 'next-themes'
import ThemeMode from '@/app/enums/ThemeMode'

function TopBarThemeModeButton() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      className='theme-mode-button-wrapper'
      onClick={() => setTheme(theme === ThemeMode.DARK ? ThemeMode.LIGHT : ThemeMode.DARK)}
    >

      <div className="theme-mode-button">
        <div className="theme-mode-light">
          <i
            className='icon-sun text-xl'
            aria-hidden="true"
          />
        </div>
        <div className="theme-mode-dark">
          <i
            className='icon-moon text-xl'
            aria-hidden="true"
          />
        </div>
      </div>
    </button>
  )
}

export default TopBarThemeModeButton
