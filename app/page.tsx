import Link from "next/link";

const roadmaps = [
  {
    id: "ux-designer",
    title: "UX Designer",
    description: "Master user research, wireframing, and user-centered design",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "ui-designer",
    title: "UI Designer",
    description: "Learn visual design, typography, and interface aesthetics",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "product-designer",
    title: "Product Designer",
    description: "Combine UX and UI with product strategy and thinking",
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: "design-system",
    title: "Design System",
    description: "Build and maintain scalable design systems and components",
    gradient: "from-green-500 to-teal-500",
  },
  {
    id: "design-thinking",
    title: "Design Thinking",
    description: "Apply design thinking methodology to solve complex problems",
    gradient: "from-indigo-500 to-purple-500",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-300/20 to-cyan-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
          <div className="animate-fade-in">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Learn Design.<br />Step by Step.
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-2xl mx-auto animate-slide-up">
              Clear roadmaps for UX, UI and Product Designers.
            </p>
            <a
              href="#roadmaps"
              className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-scale-in"
            >
              Explore Roadmaps
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Roadmap Categories Section */}
      <section id="roadmaps" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Choose Your Path
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {roadmaps.map((roadmap, index) => (
              <Link
                key={roadmap.id}
                href={`/roadmap/${roadmap.id}`}
                className="group relative overflow-hidden rounded-3xl glass hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                style={{
                  animation: `slideUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 from-white/50 to-transparent"></div>

                <div className="relative p-8">
                  {/* Gradient icon */}
                  <div className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${roadmap.gradient} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {roadmap.title}
                  </h3>

                  <p className="text-gray-600 mb-6">
                    {roadmap.description}
                  </p>

                  <div className="flex items-center text-purple-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    View Roadmap
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why DesignAtlas Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Why DesignAtlas?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl glass-dark hover:bg-white/10 transition-all duration-300 group">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">No Login</h3>
              <p className="text-gray-300">
                Jump straight in. No accounts, no barriers, no friction.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl glass-dark hover:bg-white/10 transition-all duration-300 group">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">No Fluff</h3>
              <p className="text-gray-300">
                Only what matters. Clear, actionable content without noise.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl glass-dark hover:bg-white/10 transition-all duration-300 group">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">Clear Learning Paths</h3>
              <p className="text-gray-300">
                Know exactly what to learn next. No guesswork, just progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-gray-900 text-gray-400 text-center">
        <p>DesignAtlas BETA &copy; 2024 - Learn Design. Step by Step.</p>
      </footer>
    </main>
  );
}
