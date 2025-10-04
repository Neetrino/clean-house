import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Providers } from '@/components/providers/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Clean House - Товары для дома и уборки',
  description: 'Современный интернет-магазин товаров для дома, уборки и чистоты. Качественные товары по доступным ценам.',
  keywords: 'товары для дома, уборка, чистота, бытовая химия, моющие средства',
  authors: [{ name: 'Clean House' }],
  openGraph: {
    title: 'Clean House - Товары для дома и уборки',
    description: 'Современный интернет-магазин товаров для дома, уборки и чистоты',
    type: 'website',
    locale: 'ru_RU',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
