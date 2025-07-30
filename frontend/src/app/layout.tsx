import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'COCOनटम् - From Nature, For Nature',
  description: 'At COCOnutam, we turn humble coconut shells into premium, eco-friendly products that don\'t compromise on style or sustainability.',
  keywords: 'coconut, eco-friendly, sustainable, handcrafted, bowls, candles, decor',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.png" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet" />
        <link href="/css/bootstrap.min.css" rel="stylesheet" />
        <link href="/css/tiny-slider.css" rel="stylesheet" />
        <link href="/css/style.css" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <Toaster position='top-right' />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
} 