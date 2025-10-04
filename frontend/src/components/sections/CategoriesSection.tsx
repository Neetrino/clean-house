'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

const categories = [
  {
    id: 1,
    name: 'Моющие средства',
    description: 'Средства для уборки всех поверхностей',
    icon: '🧽',
    href: '/catalog/cleaning',
    color: 'from-primary-500 to-primary-600',
    products: 45
  },
  {
    id: 2,
    name: 'Товары для кухни',
    description: 'Аксессуары и средства для кухни',
    icon: '🍽️',
    href: '/catalog/kitchen',
    color: 'from-secondary-500 to-secondary-600',
    products: 32
  },
  {
    id: 3,
    name: 'Товары для ванной',
    description: 'Организация и уход за ванной комнатой',
    icon: '🛁',
    href: '/catalog/bathroom',
    color: 'from-accent-500 to-accent-600',
    products: 28
  },
  {
    id: 4,
    name: 'Органайзеры',
    description: 'Системы хранения и организации',
    icon: '📦',
    href: '/catalog/organizers',
    color: 'from-success-500 to-success-600',
    products: 67
  },
  {
    id: 5,
    name: 'Аксессуары',
    description: 'Полезные мелочи для дома',
    icon: '✨',
    href: '/catalog/accessories',
    color: 'from-purple-500 to-purple-600',
    products: 23
  },
  {
    id: 6,
    name: 'Специальные предложения',
    description: 'Скидки и акции',
    icon: '🏷️',
    href: '/catalog/sale',
    color: 'from-red-500 to-red-600',
    products: 15
  }
]

export function CategoriesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
            Категории товаров
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Найдите все необходимое для создания идеального дома в наших категориях товаров
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                href={category.href}
                className="group block bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-200 hover:border-primary-300 overflow-hidden"
              >
                <div className={`h-32 bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                  <span className="text-5xl">{category.icon}</span>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-neutral-900 group-hover:text-primary-500 transition-colors">
                      {category.name}
                    </h3>
                    <ChevronRightIcon className="w-5 h-5 text-neutral-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                  </div>
                  
                  <p className="text-neutral-600 mb-3 text-sm">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-500">
                      {category.products} товаров
                    </span>
                    <span className="text-sm font-medium text-primary-500 group-hover:text-primary-600">
                      Смотреть →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/catalog"
            className="inline-flex items-center px-8 py-4 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors group"
          >
            Посмотреть все категории
            <ChevronRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
