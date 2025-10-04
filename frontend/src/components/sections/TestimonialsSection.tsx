'use client'

import { motion } from 'framer-motion'
import { StarIcon } from '@heroicons/react/24/solid'

const testimonials = [
  {
    id: 1,
    name: 'Анна Петрова',
    location: 'Москва',
    rating: 5,
    text: 'Отличный магазин! Быстрая доставка, качественные товары. Особенно понравились губки для посуды - очень долговечные.',
    avatar: '👩'
  },
  {
    id: 2,
    name: 'Михаил Смирнов',
    location: 'Санкт-Петербург',
    rating: 5,
    text: 'Заказываю здесь уже второй год. Всегда все приходит в срок, товары соответствуют описанию. Рекомендую!',
    avatar: '👨'
  },
  {
    id: 3,
    name: 'Елена Козлова',
    location: 'Екатеринбург',
    rating: 5,
    text: 'Очень довольна покупками. Цены адекватные, качество отличное. Служба поддержки всегда помогает с вопросами.',
    avatar: '👩‍💼'
  },
  {
    id: 4,
    name: 'Дмитрий Волков',
    location: 'Новосибирск',
    rating: 5,
    text: 'Лучший магазин товаров для дома! Широкий ассортимент, быстрая доставка. Буду заказывать еще.',
    avatar: '👨‍💼'
  }
]

export function TestimonialsSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
            Отзывы наших клиентов
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Более 10,000 довольных клиентов по всей России
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-neutral-600 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center text-2xl mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-neutral-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-neutral-500">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 text-center"
        >
          <div>
            <div className="text-3xl lg:text-4xl font-bold text-primary-500 mb-2">
              10,000+
            </div>
            <div className="text-neutral-600">Довольных клиентов</div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-bold text-primary-500 mb-2">
              50,000+
            </div>
            <div className="text-neutral-600">Заказов выполнено</div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-bold text-primary-500 mb-2">
              4.9
            </div>
            <div className="text-neutral-600">Средняя оценка</div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-bold text-primary-500 mb-2">
              24/7
            </div>
            <div className="text-neutral-600">Поддержка клиентов</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
