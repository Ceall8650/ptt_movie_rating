'use client'

// Since QueryClientProvider relies on useContext under the hood, we have to put 'use client' on top
// Doc: https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr
import {
  isServer,
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { ThemeProvider } from 'next-themes'
import StoreProvider from './(Provider)/ProviderStore';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient()
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    return browserQueryClient || makeQueryClient()
  }
}

export const queryClient = getQueryClient()

// Display the system theme whenever the page is opened
if (typeof window !== 'undefined') {
  localStorage.setItem('theme', 'system')
}

function Providers({ children }: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ThemeProvider attribute="class">
      <StoreProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </StoreProvider>
    </ThemeProvider>
  )
}

export default Providers
