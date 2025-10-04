'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRightIcon, StarIcon } from '@heroicons/react/24/solid'

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      title: 'Добро пожаловать в Clean House',
      subtitle: 'Сеть магазинов товаров для дома',
      description: 'Современные товары для уборки, организации пространства и создания уюта в вашем доме',
      image: '/images/hero/cleaning-basket.jpg',
      cta: 'Смотреть каталог',
      ctaLink: '/catalog',
      badge: 'Новая коллекция'
    },
    {
      id: 2,
      title: 'Скидки до 50%',
      subtitle: 'На товары для кухни',
      description: 'Специальные предложения на моющие средства, губки, тряпки и аксессуары для кухни',
      image: '/images/hero/kitchen-products.jpg',
      cta: 'Купить со скидкой',
      ctaLink: '/catalog/kitchen?sale=true',
      badge: 'Акция'
    },
    {
      id: 3,
      title: 'Бесплатная доставка',
      subtitle: 'При заказе от 2000₽',
      description: 'Быстрая и надежная доставка по всей России. Закажите сейчас и получите завтра!',
      image: '/images/hero/delivery.jpg',
      cta: 'Оформить заказ',
      ctaLink: '/catalog',
      badge: 'Бесплатно'
    }
  ]

  const features = [
    { icon: '🚚', text: 'Быстрая доставка' },
    { icon: '💳', text: 'Безопасная оплата' },
    { icon: '🔄', text: 'Легкий возврат' },
    { icon: '⭐', text: 'Высокое качество' }
  ]

  return (
    <section className="relative bg-gradient-to-br from-secondary-50 to-primary-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200 rounded-full opacity-30 animate-bounce-gentle"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-accent-200 rounded-full opacity-40 animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-secondary-200 rounded-full opacity-30 animate-bounce-gentle" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 right-1/3 w-14 h-14 bg-success-200 rounded-full opacity-35 animate-bounce-gentle" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16 lg:py-24">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-full text-sm font-medium"
            >
              <StarIcon className="w-4 h-4 mr-2" />
              {slides[currentSlide].badge}
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-neutral-900 leading-tight">
                {slides[currentSlide].title}
              </h1>
              <p className="text-xl lg:text-2xl text-secondary-500 font-semibold mt-2">
                {slides[currentSlide].subtitle}
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-neutral-600 leading-relaxed"
            >
              {slides[currentSlide].description}
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href={slides[currentSlide].ctaLink}
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors group"
              >
                {slides[currentSlide].cta}
                <ChevronRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary-500 text-primary-500 rounded-lg font-semibold hover:bg-primary-500 hover:text-white transition-colors"
              >
                Все товары
              </Link>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-2 gap-4 pt-8"
            >
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <span className="text-2xl">{feature.icon}</span>
                  <span className="text-sm font-medium text-neutral-700">{feature.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full h-96 lg:h-[500px] bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl overflow-hidden">
              {/* Placeholder for product image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 bg-white rounded-2xl shadow-2xl flex items-center justify-center">
                  <div className="text-6xl">🧽</div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute top-8 right-8 w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center text-white text-2xl animate-bounce-gentle">
                🧽
              </div>
              <div className="absolute bottom-8 left-8 w-12 h-12 bg-success-500 rounded-full flex items-center justify-center text-white text-xl animate-bounce-gentle" style={{ animationDelay: '1s' }}>
                🧴
              </div>
              <div className="absolute top-1/2 right-4 w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white animate-bounce-gentle" style={{ animationDelay: '2s' }}>
                🧤
              </div>
            </div>
          </motion.div>
        </div>

        {/* Slide indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-primary-500' : 'bg-neutral-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
