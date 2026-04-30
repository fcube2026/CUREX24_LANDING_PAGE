import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-white/70 to-white/90 backdrop-blur-md border-t border-white/60 dark:from-gray-900/70 dark:to-gray-900/90 dark:border-white/10">
      {/* top accent line */}
      <div className="h-[3px] w-full bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-400" />

      <div className="max-w-7xl mx-auto px-6 pt-14 pb-8 grid md:grid-cols-4 gap-10">

        <div>
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="CureX24" className="h-10 w-auto" />
            <h3 className="font-extrabold text-2xl gradient-text tracking-tight">
              Curex24
            </h3>
          </div>

          <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Care that comes to you — instantly connecting patients with trusted healthcare providers.
          </p>

          <div className="mt-5 flex gap-3">
            {[
              { emoji: "🌐", label: "Visit our website" },
              { emoji: "📧", label: "Email Curex24 support" },
              { emoji: "💬", label: "Chat with Curex24" },
            ].map((item) => (
              <a
                key={item.label}
                href="#"
                aria-label={item.label}
                className="w-10 h-10 rounded-xl bg-white/70 border border-white/60 flex items-center justify-center hover:scale-110 hover:border-emerald-400 transition shadow-sm"
              >
                <span aria-hidden>{item.emoji}</span>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">
            Services
          </h4>
          <ul className="mt-4 space-y-2.5 text-gray-600 dark:text-gray-400">
            {["Doctors", "Physiotherapy", "Nursing", "Speech Therapy"].map((s) => (
              <li key={s}>
                <a href="#services" className="hover:text-emerald-600 transition">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">
            Company
          </h4>
          <ul className="mt-4 space-y-2.5 text-gray-600 dark:text-gray-400">
            {["About", "Careers", "Partners", "Blog"].map((s) => (
              <li key={s}>
                <a href="#about" className="hover:text-emerald-600 transition">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">
            Stay in the loop
          </h4>
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">
            Get launch updates and early access invites.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-4 flex items-center gap-2 bg-white/80 border border-white/70 rounded-xl p-1.5 shadow-sm focus-within:border-emerald-400 max-w-xs"
          >
            <label htmlFor="footer-newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="footer-newsletter-email"
              type="email"
              required
              placeholder="you@email.com"
              className="flex-1 min-w-0 bg-transparent px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-sm font-semibold whitespace-nowrap hover:opacity-90 transition"
            >
              Notify me
            </button>
          </form>
          <p className="mt-3 text-xs text-gray-500">
            <span className="font-medium">partnerships@curex24.com</span>
          </p>
        </div>

      </div>

      <div className="border-t border-white/60 dark:border-white/10 mt-6">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-500 dark:text-gray-500">
          <p>© {year} Curex24. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-emerald-600 transition">Privacy</a>
            <a href="#" className="hover:text-emerald-600 transition">Terms</a>
            <a href="#" className="hover:text-emerald-600 transition">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
