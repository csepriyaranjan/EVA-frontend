import { FaSun, FaMoon, FaBars } from "react-icons/fa";
import { useState } from "react";

const Header = ({ isDarkMode, toggleDarkMode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header
      className={`w-full px-6 py-4 shadow-sm border-b transition-colors duration-300 ${
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold tracking-tight">EVA</h1>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          {["Home", "Features", "About", "Contact"].map((link) => (
            <a
              key={link}
              href="#"
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              {link}
            </a>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-colors cursor-pointer !rounded-button ${
              isDarkMode
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>

          <button
            onClick={toggleMobileMenu}
            className={`md:hidden p-2 rounded-full transition-colors cursor-pointer !rounded-button ${
              isDarkMode
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <FaBars className="text-lg" />
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className={`md:hidden mt-4 pb-4 border-t transition-colors duration-300 ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <nav className="flex flex-col space-y-3 mt-4">
            {["Home", "Features", "About", "Contact"].map((link) => (
              <a
                key={link}
                href="#"
                className="hover:text-blue-600 transition-colors cursor-pointer"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
