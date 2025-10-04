'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  MagnifyingGlassIcon, 
  ShoppingCartIcon, 
  HeartIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { SearchModal } from '@/components/modals/SearchModal'
import { CartModal } from '@/components/modals/CartModal'
import { AuthModal } from '@/components/modals/AuthModal'

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const cartItems = useCartStore((state) => state.items)
  const wishlistItems = useWishlistStore((state) => state.items)
  
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const wishlistItemsCount = wishlistItems.length

  const navigation = [
    { name: 'Главная', href: '/' },
    { name: 'Каталог', href: '/catalog' },
    { name: 'О нас', href: '/about' },
    { name: 'Контакты', href: '/contacts' },
  ]

  const categories = [
    { name: 'Моющие средства', href: '/catalog/cleaning' },
    { name: 'Товары для кухни', href: '/catalog/kitchen' },
    { name: 'Товары для ванной', href: '/catalog/bathroom' },
    { name: 'Органайзеры', href: '/catalog/organizers' },
    { name: 'Аксессуары', href: '/catalog/accessories' },
  ]

  return (
    <>
      {/* Top bar */}
      <div className="bg-primary-500 text-white">
        <div className="container">
          <div className="flex items-center justify-between py-2 text-sm">
            <div className="flex items-center space-x-6">
              <Link href="/about" className="hover:text-primary-100 transition-colors">
                О компании
              </Link>
              <Link href="/cooperation" className="hover:text-primary-100 transition-colors">
                Сотрудничество
              </Link>
              <Link href="/branches" className="hover:text-primary-100 transition-colors">
                Филиалы
              </Link>
              <Link href="/careers" className="hover:text-primary-100 transition-colors">
                Карьера
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-white rounded-full"></div>
                <span>RU</span>
              </div>
              <Link href="/bonus-card" className="flex items-center space-x-2 hover:text-primary-100 transition-colors">
                <div className="w-4 h-4 bg-accent-500 rounded"></div>
                <span>Бонусная карта</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-success-500 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-success-500 rounded-full"></div>
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-secondary-500 rounded-lg flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded"></div>
                </div>
              </div>
              <div>
                <div className="text-xl font-bold text-secondary-500">CLEAN HOUSE</div>
                <div className="text-xs text-neutral-600">Товары для дома</div>
              </div>
            </Link>

            {/* Search */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Поиск товаров..."
                  className="w-full pl-4 pr-12 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  onClick={() => setIsSearchOpen(true)}
                />
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-primary-500"
                >
                  <MagnifyingGlassIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Wishlist */}
              <button
                onClick={() => {/* TODO: Open wishlist */}}
                className="relative p-2 text-neutral-600 hover:text-primary-500 transition-colors"
              >
                <HeartIcon className="w-6 h-6" />
                {wishlistItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistItemsCount}
                  </span>
                )}
              </button>

              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-neutral-600 hover:text-primary-500 transition-colors"
              >
                <ShoppingCartIcon className="w-6 h-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>

              {/* User */}
              <button
                onClick={() => setIsAuthOpen(true)}
                className="p-2 text-neutral-600 hover:text-primary-500 transition-colors"
              >
                <UserIcon className="w-6 h-6" />
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-neutral-600 hover:text-primary-500 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center justify-between py-4 border-t border-neutral-200">
            <div className="flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-neutral-700 hover:text-primary-500 font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            <div className="flex items-center space-x-6">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="text-sm text-neutral-600 hover:text-primary-500 transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </nav>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-neutral-200 py-4">
              <div className="space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-neutral-700 hover:text-primary-500 font-medium transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 border-t border-neutral-200">
                  <div className="text-sm font-medium text-neutral-500 mb-2">Категории:</div>
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      className="block text-sm text-neutral-600 hover:text-primary-500 transition-colors py-1"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Modals */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  )
}
