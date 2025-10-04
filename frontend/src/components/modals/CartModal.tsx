'use client'

import { XMarkIcon, TrashIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '@/store/cartStore'
import Link from 'next/link'

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCartStore()

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
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-200">
            <h2 className="text-xl font-semibold text-neutral-900">
              Корзина ({totalItems})
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex flex-col h-full">
            {items.length > 0 ? (
              <>
                {/* Items list */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-4">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center space-x-4 p-4 bg-neutral-50 rounded-lg"
                      >
                        {/* Product image */}
                        <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                          <span className="text-2xl">🧽</span>
                        </div>

                        {/* Product info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-neutral-900 truncate">
                            {item.name}
                          </h3>
                          <p className="text-sm text-neutral-500">
                            {item.price}₽ за шт.
                          </p>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-neutral-400 hover:text-neutral-600 transition-colors"
                          >
                            <MinusIcon className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-neutral-400 hover:text-neutral-600 transition-colors"
                          >
                            <PlusIcon className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Remove button */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1 text-red-400 hover:text-red-600 transition-colors"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-neutral-200 p-6 space-y-4">
                  {/* Total */}
                  <div className="flex items-center justify-between text-lg font-semibold">
                    <span>Итого:</span>
                    <span className="text-primary-500">{totalPrice}₽</span>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <button
                      onClick={clearCart}
                      className="w-full py-2 text-sm text-red-500 hover:text-red-700 transition-colors"
                    >
                      Очистить корзину
                    </button>
                    
                    <Link
                      href="/checkout"
                      onClick={onClose}
                      className="block w-full py-3 bg-primary-500 text-white text-center rounded-lg font-semibold hover:bg-primary-600 transition-colors"
                    >
                      Оформить заказ
                    </Link>
                    
                    <Link
                      href="/cart"
                      onClick={onClose}
                      className="block w-full py-2 text-center text-primary-500 hover:text-primary-700 transition-colors"
                    >
                      Перейти в корзину
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              /* Empty cart */
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-4xl">🛒</span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  Корзина пуста
                </h3>
                <p className="text-neutral-500 mb-6">
                  Добавьте товары в корзину, чтобы оформить заказ
                </p>
                <Link
                  href="/catalog"
                  onClick={onClose}
                  className="px-6 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors"
                >
                  Перейти к покупкам
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
