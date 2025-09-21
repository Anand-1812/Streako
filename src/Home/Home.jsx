import studyImg from "../assets/study.jpg";

function Home() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <img
        src={studyImg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent
        dark:from-gray-900 dark:via-gray-800/80 dark:to-gray-950
      " />

      {/* Foreground content */}
      <div className="relative z-10 max-w-3xl text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-white mb-6 drop-shadow-lg">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500">
            Streako
          </span>
          <br />
          <span className="text-gray-100">Your personal habit tracker</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-200/90 mb-10 max-w-2xl mx-auto leading-relaxed">
          Build habits, maintain streaks, and gamify your growth with XP.
          Stay motivated with progress tracking that feels like a game.
        </p>

        <div className="flex justify-center gap-4">
          <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl shadow-lg hover:opacity-90 transition">
            Get Started
          </button>
          <button className="px-8 py-3 border border-white/50 text-white font-semibold rounded-xl hover:bg-white/10 transition">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

export default Home;

