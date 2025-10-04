'use client'

import { motion } from 'framer-motion'

const features = [
  {
    icon: '🚚',
    title: 'Быстрая доставка',
    description: 'Доставляем заказы в течение 1-2 дней по всей России'
  },
  {
    icon: '💳',
    title: 'Безопасная оплата',
    description: 'Принимаем все виды платежей с защитой данных'
  },
  {
    icon: '🔄',
    title: 'Легкий возврат',
    description: 'Возвращаем товар в течение 14 дней без вопросов'
  },
  {
    icon: '⭐',
    title: 'Высокое качество',
    description: 'Только проверенные бренды и качественные товары'
  },
  {
    icon: '🎁',
    title: 'Бонусная программа',
    description: 'Копите баллы и получайте скидки на покупки'
  },
  {
    icon: '📞',
    title: 'Поддержка 24/7',
    description: 'Наша служба поддержки всегда готова помочь'
  }
]

export function FeaturesSection() {
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
            Почему выбирают нас
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Мы заботимся о каждом клиенте и предлагаем лучший сервис
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-4xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
