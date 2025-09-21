import { FaGithub, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="fixed bottom-0 w-full dark:border-gray-900 dark:bg-gray-900 backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">

        <p className="text-sm md:text-base text-gray-400 dark:text-gray-300">
          &#169; 2025 Anand Kumar
        </p>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <a
            href="https://twitter.com/yourhandle"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 dark:text-gray-300
            hover:text-blue-500 dark:hover:text-blue-400
            transition-all duration-300 delay-150
            transform hover:-translate-y-1 hover:scale-110"
          >
            <FaTwitter className="w-8 h-8" />
          </a>
          <a
            href="https://github.com/anand-1812"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 dark:text-gray-300
            hover:text-blue-500 dark:hover:text-blue-400
            transition-all duration-300 delay-150
            transform hover:-translate-y-1 hover:scale-110"
          >
            <FaGithub className="w-8 h-8" />
          </a>
        </div>

        <p className="text-sm md:text-base text-gray-400 dark:text-gray-300">
          Made with ❤️ by <span className="font-semibold">Anand Kumar</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;

