import { useState } from "react";
import { motion } from "framer-motion";

const Navbar = () => {

  const [darkMode, setDarkMode] = useState(false);

  const toggleDark = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (

    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/40 shadow-[0_2px_20px_rgba(2,32,24,0.05)] dark:bg-gray-900/70 dark:border-white/10">

      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

        {/* Logo */}

        <a href="#" className="flex items-center gap-3 group">

          <img
            src="/logo.png"
            alt="Curex24"
            className="h-11 w-auto transition-transform duration-300 group-hover:scale-105"
          />

          <span className="font-extrabold text-2xl tracking-tight gradient-text">
            Curex24
          </span>

        </a>

        {/* Navigation Links */}

        <div className="hidden md:flex gap-8 text-gray-700 dark:text-gray-300 font-medium">

          {[
            { href: "#about", label: "About" },
            { href: "#services", label: "Services" },
            { href: "#why", label: "Why Us" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 transition hover:text-emerald-600 after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-emerald-400 after:to-teal-500 after:transition-all hover:after:w-full"
            >
              {link.label}
            </a>
          ))}

        </div>

        {/* Right Side */}

        <div className="flex items-center gap-4">

          {/* Dark Mode Toggle */}

          <motion.button
            onClick={toggleDark}
            className="glass-card px-4 py-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🌙
          </motion.button>

        </div>

      </div>

    </nav>

  );

};

export default Navbar;