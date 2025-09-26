import { FaGithub, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="w-full dark:bg-gray-900 bg-white/90 dark:border-t dark:border-gray-700 backdrop-blur-md shadow-inner transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
        {/* Left: Copyright */}
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
          &#169; 2025 Anand Kumar
        </p>

        {/* Center: Social Icons */}
        <div className="flex items-center gap-4">
          <a
            href="https://twitter.com/anand_kumar1812"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300
              hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white
              transition-all duration-300 transform hover:-translate-y-1 hover:scale-110 shadow-sm"
          >
            <FaTwitter className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/anand-1812"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300
              hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white
              transition-all duration-300 transform hover:-translate-y-1 hover:scale-110 shadow-sm"
          >
            <FaGithub className="w-5 h-5" />
          </a>
        </div>

        {/* Right: Made by */}
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 text-center md:text-right">
          Made with ❤️ by <span className="font-semibold">Anand Kumar</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;

