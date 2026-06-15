import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Providers from '@/components/Providers'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'FurFinds — Less Stress, More Pets',
  description: 'Find verified pet-friendly businesses. Hotels, restaurants, groomers, vets, housing, and more — every listing reviewed and rated.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Providers>
          <Nav />
          <main className="pt-[68px]">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
