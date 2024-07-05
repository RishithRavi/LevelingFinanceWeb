import { type Metadata } from 'next'
import { Inter } from 'next/font/google'
import clsx from 'clsx'

import '@/styles/tailwind.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    template: '%s - Leveling Finance',
    default: 'Leveling Finance - Learn and Invest Smartly',
  },
  description:
    'Leveling Finance helps kids and teens learn about investing and financial literacy in a fun and engaging way. Start building your financial future today!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={clsx('bg-gray-50 antialiased scroll-smooth', inter.variable)}>
      <body>{children}</body>
    </html>
  )
}
