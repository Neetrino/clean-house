export function CategoriesSection() {
  const categories = [
    { name: 'Cleaning Supplies', image: '/api/placeholder/300/200', count: 25 },
    { name: 'Home Decor', image: '/api/placeholder/300/200', count: 18 },
    { name: 'Kitchen Essentials', image: '/api/placeholder/300/200', count: 32 },
    { name: 'Bathroom Products', image: '/api/placeholder/300/200', count: 15 },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600">
            Find exactly what you need for your home
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Image Placeholder</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600">
                  {category.count} products
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}