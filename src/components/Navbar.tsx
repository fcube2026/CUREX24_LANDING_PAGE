import { useState } from "react";
import { motion } from "framer-motion";
import WishlistModal from "./WishlistModal";

const Navbar = () => {

  const [darkMode, setDarkMode] = useState(false);

  const toggleDark = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (

    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-700">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}

        <div className="flex items-center gap-3">

          <img
            src="/logo.png"
            alt="Curex24"
            className="h-12 w-auto"
          />

          <span className="font-bold text-2xl text-gray-800 dark:text-white">
            Curex24
          </span>

        </div>

        {/* Navigation Links */}

        <div className="hidden md:flex gap-8 text-gray-600 dark:text-gray-300 font-medium">

          <a href="#about" className="hover:text-green-500 transition">
            About
          </a>

          <a href="#services" className="hover:text-green-500 transition">
            Services
          </a>

          <a href="#why" className="hover:text-green-500 transition">
            Why Us
          </a>

          <a href="#testimonials" className="hover:text-green-500 transition">
            Testimonials
          </a>

        </div>

        {/* Right Side */}

        <div className="flex items-center gap-4">

          {/* Dark Mode Toggle */}

          <button
            onClick={toggleDark}
            className="glass-card px-4 py-2"
          >
            🌙
          </button>

          {/* Coming Soon Badge */}

          <span className="hidden sm:inline text-sm font-medium text-gray-500 dark:text-gray-300">
            Coming Soon 🚀
          </span>

          {/* Wishlist Button */}

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <WishlistModal />
          </motion.div>

        </div>

      </div>

    </nav>

  );

};

export default Navbar;