import { Inter } from 'next/font/google'
import './scss/app.scss'
import StoreProvider from './store/StoreProvider';

const inter = Inter({ 
  subsets: ['latin'],
})

export const metadata = {
  title: 'PTT Movie Ratings',
  description: 'Find the movie on the PTT Movie Board and get the ratings of the movie among the users',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const darkModeClassName = 'dark:bg-dark-mode-primary dark:text-white'
 
  return (
    <html
      lang="en"
      className={`${inter.className}`}
    >
      <body
        className={`${inter.className} ${darkModeClassName}`}
        // Add `suppressHydrationWarning` prevent the warning in console because of the chrome extensions
        // Based on: https://stackoverflow.com/a/75339011 
        suppressHydrationWarning={true}
      >
          <StoreProvider>
            {children}
          </StoreProvider>
        </body>
      </html>
  )
}
