import { useTheme } from 'next-themes'
import THEME_MODE from '../enums/ThemeMode'

function TopBarThemeModeButton() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      className='theme-mode-button-wrapper'
      onClick={() => setTheme(theme === THEME_MODE.DARK ? THEME_MODE.LIGHT : THEME_MODE.DARK)}
      aria-label={`Switch to ${theme === THEME_MODE.LIGHT ? 'light' : 'dark'} mode`}
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
