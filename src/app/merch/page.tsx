export default function MerchPage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-20 bg-gradient-to-br from-purple-900 via-black to-indigo-900">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-12">
            Merchandise
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Products will be populated from Shopify */}
            <div className="bg-black/50 backdrop-blur-sm p-6 rounded-lg">
              <p className="text-gray-400 mb-2">Coming Soon</p>
              <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
              <p className="text-gray-300">
                Our merchandise store is coming soon. Check back for exclusive items.
              </p>
            </div>
            
            <div className="bg-black/50 backdrop-blur-sm p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Latest Collection</h2>
              <p className="text-gray-300">
                New merchandise collection dropping soon.
              </p>
            </div>
            
            <div className="bg-black/50 backdrop-blur-sm p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Limited Edition</h2>
              <p className="text-gray-300">
                Special items and limited runs coming soon.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}