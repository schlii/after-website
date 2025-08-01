export default function TourPage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-20 bg-gradient-to-br from-purple-900 via-black to-indigo-900">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-12">
            Tour Dates
          </h1>
          
          <div className="space-y-6">
            {/* Tour dates will be populated from Sanity */}
            <div className="bg-black/50 backdrop-blur-sm p-6 rounded-lg">
              <p className="text-gray-400 mb-2">Coming Soon</p>
              <h2 className="text-2xl font-semibold mb-4">Upcoming Shows</h2>
              <p className="text-gray-300">
                Tour dates will be announced soon. Sign up for our newsletter to stay updated.
              </p>
            </div>
            
            <div className="bg-black/50 backdrop-blur-sm p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Past Shows</h2>
              <p className="text-gray-300">
                Archive of our previous performances coming soon.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}