'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { EnvelopeIcon, CheckIcon } from '@heroicons/react/24/outline'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    // TODO: Implement newsletter subscription API
    setTimeout(() => {
      setIsLoading(false)
      setIsSubscribed(true)
      setEmail('')
    }, 1000)
  }

  return (
    <section className="py-16 bg-gradient-to-r from-primary-500 to-secondary-500">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Подпишитесь на новости
          </h2>
          <p className="text-lg text-primary-100 max-w-2xl mx-auto mb-8">
            Получайте скидки, новости о товарах и специальные предложения прямо на почту
          </p>

          {isSubscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center px-6 py-3 bg-white bg-opacity-20 rounded-lg text-white"
            >
              <CheckIcon className="w-6 h-6 mr-2" />
              <span>Вы успешно подписались на рассылку!</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ваш email адрес"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:ring-opacity-50 text-neutral-900 placeholder-neutral-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-3 bg-white text-primary-500 rounded-lg font-semibold hover:bg-primary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
                >
                  {isLoading ? 'Подписка...' : 'Подписаться'}
                </button>
              </div>
            </form>
          )}

          <div className="mt-8 flex flex-wrap justify-center items-center gap-8 text-primary-100 text-sm">
            <div className="flex items-center">
              <CheckIcon className="w-4 h-4 mr-2" />
              <span>Скидки до 50%</span>
            </div>
            <div className="flex items-center">
              <CheckIcon className="w-4 h-4 mr-2" />
              <span>Новинки первыми</span>
            </div>
            <div className="flex items-center">
              <CheckIcon className="w-4 h-4 mr-2" />
              <span>Бесплатная доставка</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
