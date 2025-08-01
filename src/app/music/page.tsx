export default function MusicPage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-20 bg-gradient-to-br from-purple-900 via-black to-indigo-900">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-12">
            Music
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Music player and tracks will be populated later */}
            <div className="bg-black/50 backdrop-blur-sm p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Latest Releases</h2>
              <p className="text-gray-300">
                Music player coming soon. Stay tuned for our latest tracks.
              </p>
            </div>
            
            <div className="bg-black/50 backdrop-blur-sm p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Featured Album</h2>
              <p className="text-gray-300">
                Album details and track list coming soon.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}