export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      text: 'Amazing products! My home has never been cleaner.',
      rating: 5
    },
    {
      name: 'Mike Chen',
      text: 'Great quality and fast shipping. Highly recommended!',
      rating: 5
    },
    {
      name: 'Emily Davis',
      text: 'The best cleaning products I\'ve ever used.',
      rating: 5
    }
  ]

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600">
            Don't just take our word for it
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "{testimonial.text}"
              </p>
              <p className="font-semibold text-gray-900">
                - {testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}