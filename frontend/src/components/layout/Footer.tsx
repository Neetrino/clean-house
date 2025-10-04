import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { name: 'О компании', href: '/about' },
      { name: 'Наша команда', href: '/team' },
      { name: 'Карьера', href: '/careers' },
      { name: 'Новости', href: '/news' },
    ],
    catalog: [
      { name: 'Моющие средства', href: '/catalog/cleaning' },
      { name: 'Товары для кухни', href: '/catalog/kitchen' },
      { name: 'Товары для ванной', href: '/catalog/bathroom' },
      { name: 'Органайзеры', href: '/catalog/organizers' },
      { name: 'Аксессуары', href: '/catalog/accessories' },
    ],
    support: [
      { name: 'Доставка и оплата', href: '/delivery' },
      { name: 'Возврат товара', href: '/returns' },
      { name: 'Гарантии', href: '/warranty' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Контакты', href: '/contacts' },
    ],
    legal: [
      { name: 'Политика конфиденциальности', href: '/privacy' },
      { name: 'Условия использования', href: '/terms' },
      { name: 'Публичная оферта', href: '/offer' },
      { name: 'Согласие на обработку данных', href: '/consent' },
    ],
  }

  const socialLinks = [
    { name: 'Instagram', href: '#', icon: '📷' },
    { name: 'Facebook', href: '#', icon: '📘' },
    { name: 'VKontakte', href: '#', icon: '📘' },
    { name: 'Telegram', href: '#', icon: '📱' },
  ]

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container">
        {/* Main footer content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
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
                <div className="text-xl font-bold">CLEAN HOUSE</div>
                <div className="text-sm text-neutral-400">Товары для дома</div>
              </div>
            </div>
            <p className="text-neutral-300 mb-6 max-w-md">
              Современный интернет-магазин товаров для дома, уборки и чистоты. 
              Мы предлагаем качественные товары по доступным ценам с быстрой доставкой.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-primary-500 transition-colors"
                  aria-label={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Компания</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Catalog links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Каталог</h3>
            <ul className="space-y-2">
              {footerLinks.catalog.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Поддержка</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="py-8 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Подпишитесь на новости</h3>
              <p className="text-neutral-300">Получайте скидки и новости о товарах</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Ваш email"
                className="flex-1 md:w-80 px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-l-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-white placeholder-neutral-400"
              />
              <button className="px-6 py-3 bg-primary-500 hover:bg-primary-600 rounded-r-lg font-medium transition-colors">
                Подписаться
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-neutral-400 text-sm mb-4 md:mb-0">
              © {currentYear} Clean House. Все права защищены.
            </div>
            <div className="flex flex-wrap items-center space-x-6 text-sm">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
