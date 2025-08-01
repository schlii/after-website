export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-20 bg-gradient-to-br from-purple-900 via-black to-indigo-900">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-12">
            Contact Us
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-black/50 backdrop-blur-sm p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
              {/* Contact form will be added later */}
              <p className="text-gray-300 mb-4">
                Contact form coming soon. Stay tuned for updates.
              </p>
            </div>
            
            <div className="bg-black/50 backdrop-blur-sm p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Business Inquiries</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Booking</h3>
                  <p className="text-gray-300">
                    Booking information coming soon.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">Press</h3>
                  <p className="text-gray-300">
                    Press contact information coming soon.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 bg-black/50 backdrop-blur-sm p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Newsletter</h2>
            <p className="text-gray-300">
              Newsletter signup form coming soon. Stay updated with the latest news and tour dates.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}