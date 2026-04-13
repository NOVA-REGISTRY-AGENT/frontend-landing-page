import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as SonnerToaster } from '@/components/ui/sonner'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Nova Registry SDK — Autonomous Music IP on Stellar',
  description:
    'TypeScript SDK for AI agents to register music IP on Stellar blockchain with automatic x402 payment handling, Ed25519 signatures, and Soroban smart contracts.',
  keywords: [
    'Stellar', 'blockchain', 'AI agent', 'x402', 'SDK', 'TypeScript',
    'music IP', 'Soroban', 'Claude AI', 'autonomous payments', 'Nova Registry',
  ],
  authors: [{ name: 'Nova Registry' }],
  openGraph: {
    title: 'Nova Registry SDK',
    description: 'Autonomous Music IP Registration on Stellar',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <SonnerToaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
