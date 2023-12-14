'use client'

import { useState, useEffect, useCallback } from 'react';

function TopBarThemeModeButton() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const handleDarkMode = useCallback((isDarkMode: boolean) => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    setIsDarkMode(isDarkMode)
  }, [])

  useEffect(() => {
    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    setIsDarkMode(isSystemDark)
    handleDarkMode(isSystemDark)

  }, [handleDarkMode])

  return (
    <div
      className={`theme-mode-button-wrapper${isDarkMode ? ' darkMode' : ''}`}
      onClick={() => handleDarkMode(!isDarkMode)}
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
    </div>
  )
}

export default TopBarThemeModeButton
