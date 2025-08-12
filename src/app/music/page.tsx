import { MusicPlayer } from '../../components/MusicPlayer'

export default function MusicPage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-20 bg-gradient-to-br from-purple-900 via-black to-indigo-900">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-12">
            Music
          </h1>
          
          <div className="max-w-4xl mx-auto">
            <MusicPlayer className="mb-8" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-black/50 backdrop-blur-sm p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">About Our Music</h2>
                <p className="text-gray-300 mb-4">
                  Experience our latest tracks with 30-second previews from Apple Music. 
                  Each track showcases our unique sound and musical evolution.
                </p>
                <p className="text-gray-400 text-sm">
                  Use keyboard shortcuts for quick navigation: Space (play/pause), 
                  arrow keys (skip/volume), M (mute).
                </p>
              </div>
              
              <div className="bg-black/50 backdrop-blur-sm p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Listen Everywhere</h2>
                <p className="text-gray-300 mb-4">
                  Find our music on all major streaming platforms. Click the Spotify 
                  button when available to listen to full tracks.
                </p>
                <div className="space-y-2 text-sm text-gray-400">
                  <p>• Full albums on streaming services</p>
                  <p>• High-quality audio previews</p>
                  <p>• Latest releases updated automatically</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}