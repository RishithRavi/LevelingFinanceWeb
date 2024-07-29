import { type Metadata } from 'next'
import { Inter } from 'next/font/google'
import clsx from 'clsx'
import { GoogleAnalytics } from '@next/third-parties/google'
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import '../styles/tailwind.css'
import { Toaster } from 'react-hot-toast'
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
import { loadStripe } from '@stripe/stripe-js'
import AdSense from '../components/AdSense'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={clsx('scroll-smooth bg-gray-50 antialiased', inter.variable)}
      >
        <head>
          {/* <meta
            name="google-adsense-account"
            content="ca-pub-3578270982337601"
          ></meta> */}
          <AdSense pId="ca-pub-3578270982337601" />
        </head>
        <body>
          <header>
            {/* <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn> */}
          </header>
          <main>
            <Toaster position="top-right" />
            {children}
          </main>
        </body>
        <GoogleAnalytics gaId="G-XTHEJZRFFL" />
      </html>
    </ClerkProvider>
  )
}
