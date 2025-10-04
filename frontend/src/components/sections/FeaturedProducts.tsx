'use client'

import { motion } from 'framer-motion'
import { HeartIcon, StarIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import Link from 'next/link'

// Mock data for featured products
const featuredProducts = [
  {
    id: '1',
    name: 'Набор губок для посуды',
    price: 299,
    originalPrice: 399,
    image: '🧽',
    rating: 4.8,
    reviews: 124,
    category: 'Кухня',
    badge: 'Хит продаж'
  },
  {
    id: '2',
    name: 'Моющее средство универсальное',
    price: 450,
    originalPrice: 600,
    image: '🧴',
    rating: 4.6,
    reviews: 89,
    category: 'Уборка',
    badge: 'Скидка'
  },
  {
    id: '3',
    name: 'Тряпки микрофибра 5шт',
    price: 350,
    originalPrice: null,
    image: '🧻',
    rating: 4.9,
    reviews: 156,
    category: 'Уборка',
    badge: 'Новинка'
  },
  {
    id: '4',
    name: 'Органайзер для ванной',
    price: 1200,
    originalPrice: 1500,
    image: '📦',
    rating: 4.7,
    reviews: 67,
    category: 'Ванная',
    badge: 'Акция'
  },
  {
    id: '5',
    name: 'Перчатки резиновые',
    price: 180,
    originalPrice: null,
    image: '🧤',
    rating: 4.5,
    reviews: 203,
    category: 'Уборка',
    badge: null
  },
  {
    id: '6',
    name: 'Спрей для стекол',
    price: 280,
    originalPrice: 350,
    image: '💨',
    rating: 4.8,
    reviews: 91,
    category: 'Уборка',
    badge: 'Скидка'
  }
]

export function FeaturedProducts() {
  const addToCart = useCartStore((state) => state.addItem)
  const addToWishlist = useWishlistStore((state) => state.addItem)
  const isInWishlist = useWishlistStore((state) => state.isInWishlist)

  const handleAddToCart = (product: typeof featuredProducts[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
  }

  const handleToggleWishlist = (product: typeof featuredProducts[0]) => {
    if (isInWishlist(product.id)) {
      // TODO: Remove from wishlist
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        originalPrice: product.originalPrice,
        discount: product.originalPrice ? product.originalPrice - product.price : undefined,
      })
    }
  }

  return (
    <section className="py-16 bg-neutral-50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
            Популярные товары
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Самые востребованные товары для дома, выбранные нашими покупателями
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-200 hover:border-primary-300 overflow-hidden"
            >
              {/* Product image */}
              <div className="relative h-48 bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center">
                {product.badge && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      product.badge === 'Хит продаж' ? 'bg-red-500 text-white' :
                      product.badge === 'Скидка' ? 'bg-primary-500 text-white' :
                      product.badge === 'Новинка' ? 'bg-green-500 text-white' :
                      product.badge === 'Акция' ? 'bg-orange-500 text-white' :
                      'bg-neutral-500 text-white'
                    }`}>
                      {product.badge}
                    </span>
                  </div>
                )}
                
                <button
                  onClick={() => handleToggleWishlist(product)}
                  className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all"
                >
                  {isInWishlist(product.id) ? (
                    <HeartSolidIcon className="w-5 h-5 text-red-500" />
                  ) : (
                    <HeartIcon className="w-5 h-5 text-neutral-400 group-hover:text-red-500" />
                  )}
                </button>

                <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                  {product.image}
                </div>
              </div>

              {/* Product info */}
              <div className="p-4">
                <div className="mb-2">
                  <span className="text-xs text-neutral-500 uppercase tracking-wide">
                    {product.category}
                  </span>
                </div>
                
                <h3 className="font-semibold text-neutral-900 mb-2 group-hover:text-primary-500 transition-colors">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarSolidIcon
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400'
                            : 'text-neutral-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-neutral-600">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-primary-500">
                      {product.price}₽
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-neutral-400 line-through">
                        {product.originalPrice}₽
                      </span>
                    )}
                  </div>
                  {product.originalPrice && (
                    <span className="text-sm font-medium text-green-600">
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </span>
                  )}
                </div>

                {/* Add to cart button */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full py-2 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors group-hover:shadow-lg"
                >
                  В корзину
                </button>
              </div>
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
            Посмотреть все товары
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
