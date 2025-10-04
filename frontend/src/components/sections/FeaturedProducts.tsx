export function FeaturedProducts() {
  const products = [
    { name: 'Premium Cleaning Kit', price: 29.99, image: '/api/placeholder/300/300' },
    { name: 'Eco-Friendly Detergent', price: 12.99, image: '/api/placeholder/300/300' },
    { name: 'Microfiber Cloths Set', price: 8.99, image: '/api/placeholder/300/300' },
    { name: 'All-Purpose Cleaner', price: 6.99, image: '/api/placeholder/300/300' },
  ]

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600">
            Our most popular cleaning and home products
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-64 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Product Image</span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-2xl font-bold text-blue-600 mb-4">
                  ${product.price}
                </p>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}