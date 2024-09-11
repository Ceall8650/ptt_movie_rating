'use client'

import { useState, useLayoutEffect } from 'react';

function TopBarThemeModeButton() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  function toggleDarkMode(isDarkMode: boolean) {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    setIsDarkMode(isDarkMode)
  }

  useLayoutEffect(() => {
    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    toggleDarkMode(isSystemDark)
  }, [])

  return (
    <button
      className={`theme-mode-button-wrapper${isDarkMode ? ' darkMode' : ''}`}
      onClick={() => toggleDarkMode(!isDarkMode)}
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
