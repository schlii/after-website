export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-20 bg-gradient-to-br from-purple-900 via-black to-indigo-900">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-12">
            About After
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-black/50 backdrop-blur-sm p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">The Band</h2>
              <p className="text-gray-300 mb-4">
                Band biography and history will be updated soon. Stay tuned to learn more about After.
              </p>
            </div>
            
            <div className="bg-black/50 backdrop-blur-sm p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Band Members</h2>
              <div className="space-y-4">
                {/* Band member profiles will be populated from Sanity */}
                <p className="text-gray-300">
                  Band member profiles coming soon.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 bg-black/50 backdrop-blur-sm p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Discography</h2>
            <p className="text-gray-300">
              Our complete discography and musical journey will be available soon.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}