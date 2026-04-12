import { useState } from "react";
import { motion } from "framer-motion";

const WishlistModal = () => {

  const [open, setOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  const [consent, setConsent] = useState(false);
  const [success, setSuccess] = useState(false);

  /* 🌍 Detect Location */

  const detectLocation = () => {

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(

        (position) => {

          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          setLocation(`Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`);

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

    if (!name) {
      alert("Name is required");
      return;
    }

    if (!consent) {
      alert("Please accept terms to continue");
      return;
    }

    const data = {
      email,
      name,
      phone,
      location,
      joinedAt: new Date().toISOString()
    };

    console.log("Wishlist Data:", data);

    // 👉 Next: send to Supabase

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
                  Be the first to access when we launch 🚀
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

                  {/* Name (NOW REQUIRED) */}

                  <input
                    type="text"
                    placeholder="Name (required)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 rounded-xl border outline-none"
                  />

                  {/* Phone */}

                  <input
                    type="tel"
                    placeholder="Phone (optional)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 rounded-xl border outline-none"
                  />

                  {/* Location */}

                  <input
                    type="text"
                    placeholder="City / Country (optional)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
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
                  We’ll notify you when Curex24 launches.
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