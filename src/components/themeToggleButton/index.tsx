import { useEffect, useState } from 'react'
import {
  getLocalStorageItem,
  setLocalStorageItem
} from '../../utils/localStorage'
import MoonIcon from '../icons/moon-icon'
import SunIcon from '../icons/sun-icon'

const ThemeToggleButton = () => {
  const [isLightTheme, setLightTheme] = useState(
    () =>
      getLocalStorageItem('color-theme') === 'light' ||
      window.matchMedia('(prefers-color-scheme: light)').matches
  )

  const toggle = () => {
    setLightTheme(!isLightTheme)
    setLocalStorageItem('color-theme', isLightTheme ? 'dark' : 'light')
  }

  useEffect(() => {
    if (isLightTheme) {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }, [isLightTheme])

  return (
    <button
      id='theme-toggle'
      type='button'
      className='absolute flex gap-2 right-8 bottom-8 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5'
      onClick={toggle}
    >
      Toggle
      {!isLightTheme && <MoonIcon />}
      {isLightTheme && <SunIcon />}
    </button>
  )
}
export default ThemeToggleButton
