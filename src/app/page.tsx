export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-black to-indigo-900">
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6">
            AFTER
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Experience the sound of tomorrow
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-8 text-center">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* News items will be populated from Sanity */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <p className="text-gray-400 mb-2">Coming Soon</p>
            <h3 className="text-xl font-semibold mb-4">News and Updates</h3>
            <p className="text-gray-300">Stay tuned for the latest updates from After.</p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-t from-purple-900 via-black to-black py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Upcoming Shows</h2>
          <div className="space-y-4">
            {/* Tour dates will be populated from Sanity */}
            <div className="bg-black/50 backdrop-blur-sm p-6 rounded-lg">
              <p className="text-gray-400 mb-2">Coming Soon</p>
              <h3 className="text-xl font-semibold mb-4">Tour Dates</h3>
              <p className="text-gray-300">Check back soon for upcoming shows.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
