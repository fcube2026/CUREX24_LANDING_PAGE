import { useState } from "react";
import { motion } from "framer-motion";

const WishlistModal = () => {

  const [open, setOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");

  const [consent, setConsent] = useState(false);

  const [success, setSuccess] = useState(false);

  /* 🌍 Detect Location */

  const detectLocation = () => {

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(

        async (position) => {

          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          // For now just store coordinates
          setCountry(`Lat: ${lat}, Lon: ${lon}`);

        },

        () => {
          alert("Location permission denied");
        }

      );

    }

  };

  /* 🚀 Submit */

  const handleSubmit = (e: any) => {

    e.preventDefault();

    if (!email) {
      alert("Email is required");
      return;
    }

    if (!consent) {
      alert("Please accept terms");
      return;
    }

    const data = {
      email,
      name,
      country,
      joinedAt: new Date().toISOString()
    };

    console.log("Wishlist Data:", data);

    // 👉 Next step: send to Supabase

    setSuccess(true);

  };

  return (

    <>

      {/* BUTTON */}

      <motion.button
        onClick={() => setOpen(true)}
        className="btn-primary"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Join Wishlist
      </motion.button>

      {/* MODAL */}

      {open && (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-[9999]">

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card w-[90%] max-w-md p-8"
          >

            {!success ? (

              <>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Join Curex24 Wishlist
                </h2>

                <p className="text-gray-600 mt-2">
                  Get early access when we launch 🚀
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="mt-6 space-y-4"
                >

                  {/* Email */}

                  <input
                    type="email"
                    placeholder="Email (required)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 rounded-xl border outline-none"
                  />

                  {/* Name */}

                  <input
                    type="text"
                    placeholder="Name (optional)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 rounded-xl border outline-none"
                  />

                  {/* Country */}

                  <input
                    type="text"
                    placeholder="Country / City"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full p-3 rounded-xl border outline-none"
                  />

                  {/* Detect Location */}

                  <button
                    type="button"
                    onClick={detectLocation}
                    className="glass-card w-full p-3"
                  >
                    Detect Location 📍
                  </button>

                  {/* Consent */}

                  <label className="flex items-start gap-2 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={() => setConsent(!consent)}
                    />
                    I agree to receive updates about Curex24 launch.
                  </label>

                  {/* Submit */}

                  <button
                    type="submit"
                    className="btn-primary w-full"
                  >
                    Join Wishlist
                  </button>

                </form>

                {/* Close */}

                <button
                  onClick={() => setOpen(false)}
                  className="text-sm text-gray-500 mt-4"
                >
                  Close
                </button>

              </>

            ) : (

              <div className="text-center">

                <h2 className="text-2xl font-bold text-green-600">
                  You're on the list 🎉
                </h2>

                <p className="mt-2 text-gray-600">
                  We’ll notify you when we launch.
                </p>

                <button
                  onClick={() => setOpen(false)}
                  className="btn-primary mt-6"
                >
                  Done
                </button>

              </div>

            )}

          </motion.div>

        </div>

      )}

    </>

  );

};

export default WishlistModal;