import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#how", label: "How it works" },
  { href: "#why", label: "Why Us" },
  { href: "#partner", label: "Partner" },
  { href: "#about", label: "About" },
];

const Navbar = () => {

  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

        {/* Desktop Navigation Links */}

        <div className="hidden md:flex gap-8 text-gray-700 dark:text-gray-300 font-medium">

          {NAV_LINKS.map((link) => (
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

        <div className="flex items-center gap-3">

          {/* Dark Mode Toggle */}

          <motion.button
            onClick={toggleDark}
            className="glass-card px-4 py-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Toggle dark mode"
          >
            🌙
          </motion.button>

          {/* Hamburger button (mobile only) */}

          <motion.button
            className="md:hidden glass-card flex flex-col gap-[5px] items-center justify-center w-10 h-10 p-2"
            onClick={() => setMenuOpen((prev) => !prev)}
            whileTap={{ scale: 0.92 }}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-5 h-[2px] bg-emerald-700 dark:bg-emerald-400 rounded-full transition-all duration-300 origin-center ${
                menuOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-[2px] bg-emerald-700 dark:bg-emerald-400 rounded-full transition-all duration-300 ${
                menuOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-[2px] bg-emerald-700 dark:bg-emerald-400 rounded-full transition-all duration-300 origin-center ${
                menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </motion.button>

        </div>

      </div>

      {/* Mobile Menu */}

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-white/30 dark:border-white/10"
          >
            <div className="flex flex-col px-4 py-3 gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-3 px-4 rounded-xl text-gray-700 dark:text-gray-300 font-medium text-base hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-900/30 active:bg-emerald-100 dark:active:bg-emerald-900/50 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </nav>

  );

};

export default Navbar;