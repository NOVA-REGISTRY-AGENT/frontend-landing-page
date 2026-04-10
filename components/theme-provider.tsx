'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  React.useEffect(() => {
    // Suppress specific browser extension unhandled rejections
    const handleRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason?.toString() || ''
      if (
        reason.includes('Could not establish connection') ||
        reason.includes('Receiving end does not exist') ||
        reason.includes('Null result') ||
        reason.includes('chrome-extension://')
      ) {
        event.preventDefault()
      }
    }
    
    // Suppress ResizeObserver loop limit exceeded error
    const handleError = (event: ErrorEvent) => {
      if (event.message.includes('ResizeObserver loop')) {
        event.preventDefault()
      }
    }

    window.addEventListener('unhandledrejection', handleRejection)
    window.addEventListener('error', handleError)

    return () => {
      window.removeEventListener('unhandledrejection', handleRejection)
      window.removeEventListener('error', handleError)
    }
  }, [])

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
