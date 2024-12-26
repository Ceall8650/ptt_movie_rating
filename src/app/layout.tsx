import { Inter } from 'next/font/google'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import 'scss/app.scss'
import Providers from './Providers';
import TopBarView from './(TopBar)/TopBarView';

const inter = Inter({
  subsets: ['latin'],
})

export const metadata = {
  title: 'PTT Movie Ratings',
  description: 'Find the movie on the PTT Movie Board and get the ratings of the movie among the users',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const darkModeClassName = 'dark:bg-dark-mode-primary dark:text-white'

  return (
    <html
      // Add `suppressHydrationWarning` prevent the warning in console because of the next-theme
      // Based on: https://github.com/pacocoursey/next-themes/tree/main?tab=readme-ov-file#with-app
      suppressHydrationWarning
      lang="en"
      className={inter.className}
    >
      <body
        // Add `suppressHydrationWarning` prevent the warning in console because of the chrome extensions
        // Based on: https://stackoverflow.com/a/75339011 
        suppressHydrationWarning
        className={`${inter.className} ${darkModeClassName}`}
      >
        <Providers>
        <div className="h-full overflow-auto flex flex-col">
            <TopBarView className="mb-5" />
            <div className="h-full px-6">
              {children}
            </div>
          </div>
          <ReactQueryDevtools initialIsOpen={false} />
        </Providers>
      </body>
    </html>
  )
}
