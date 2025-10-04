'use client'

import { useState, useEffect } from 'react'
import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // Mock search results
  const mockResults = [
    { id: 1, name: 'Губка для посуды', category: 'Кухня', price: 150 },
    { id: 2, name: 'Моющее средство', category: 'Уборка', price: 300 },
    { id: 3, name: 'Тряпка микрофибра', category: 'Уборка', price: 200 },
    { id: 4, name: 'Органайзер для ванной', category: 'Ванная', price: 1200 },
    { id: 5, name: 'Перчатки резиновые', category: 'Уборка', price: 180 },
  ]

  useEffect(() => {
    if (query.length > 2) {
      setIsLoading(true)
      // Simulate API call
      setTimeout(() => {
        const filtered = mockResults.filter(item =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
        )
        setResults(filtered)
        setIsLoading(false)
      }, 300)
    } else {
      setResults([])
    }
  }, [query])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="relative bg-white rounded-t-2xl mt-20 mx-4 shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-200">
            <h2 className="text-xl font-semibold text-neutral-900">Поиск товаров</h2>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Search input */}
          <div className="p-6">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Введите название товара..."
                className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                autoFocus
              />
            </div>
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="p-6 text-center">
                <div className="animate-spin w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full mx-auto"></div>
                <p className="mt-2 text-neutral-600">Поиск...</p>
              </div>
            ) : query.length > 2 ? (
              results.length > 0 ? (
                <div className="divide-y divide-neutral-200">
                  {results.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 hover:bg-neutral-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-neutral-900">{item.name}</h3>
                          <p className="text-sm text-neutral-500">{item.category}</p>
                        </div>
                        <div className="text-lg font-semibold text-primary-500">
                          {item.price}₽
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-neutral-500">
                  <p>Товары не найдены</p>
                  <p className="text-sm mt-1">Попробуйте изменить запрос</p>
                </div>
              )
            ) : (
              <div className="p-6 text-center text-neutral-500">
                <p>Введите минимум 3 символа для поиска</p>
              </div>
            )}
          </div>

          {/* Popular searches */}
          {query.length === 0 && (
            <div className="p-6 border-t border-neutral-200">
              <h3 className="text-sm font-medium text-neutral-700 mb-3">Популярные запросы:</h3>
              <div className="flex flex-wrap gap-2">
                {['Губки', 'Моющие средства', 'Перчатки', 'Тряпки', 'Органайзеры'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm hover:bg-primary-100 hover:text-primary-700 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
