export function FeaturesSection() {
  const features = [
    {
      icon: '🚚',
      title: 'Free Shipping',
      description: 'Free shipping on orders over $50'
    },
    {
      icon: '💎',
      title: 'Premium Quality',
      description: 'Only the highest quality products'
    },
    {
      icon: '🔄',
      title: 'Easy Returns',
      description: '30-day return policy'
    },
    {
      icon: '🛡️',
      title: 'Secure Payment',
      description: 'Safe and secure checkout'
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Clean House?
          </h2>
          <p className="text-lg text-gray-600">
            We make shopping for home products easy and convenient
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}