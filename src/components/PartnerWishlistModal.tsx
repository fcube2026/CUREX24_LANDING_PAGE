import { useState } from "react";
import { motion } from "framer-motion";

type PartnerWishlistModalProps = {
  close: () => void;
};

const PartnerWishlistModal = ({ close }: PartnerWishlistModalProps) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [location, setLocation] = useState("");

  const [consent, setConsent] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return alert("Email is required");
    if (!name) return alert("Name is required");
    if (!consent) return alert("Please accept terms to continue");

    console.log("Partner Wishlist Data:", {
      email,
      name,
      phone,
      organization,
      specialty,
      location,
      joinedAt: new Date().toISOString(),
    });

    setSuccess(true);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-[9999]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card w-[90%] max-w-md p-8 overflow-y-auto max-h-[90vh]"
      >
        {!success ? (
          <>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Become a Curex24 Partner
            </h2>

            <p className="text-gray-600 mt-2">
              Join our network of healthcare providers and expand your reach 🏥
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input
                type="email"
                placeholder="Email (required)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-xl border outline-none"
              />

              <input
                type="text"
                placeholder="Full Name (required)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-xl border outline-none"
              />

              <input
                type="tel"
                placeholder="Phone (optional)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 rounded-xl border outline-none"
              />

              <input
                type="text"
                placeholder="Clinic / Hospital / Organization (optional)"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="w-full p-3 rounded-xl border outline-none"
              />

              <input
                type="text"
                placeholder="Specialty (e.g. General Physician, Therapist)"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="w-full p-3 rounded-xl border outline-none"
              />

              <input
                type="text"
                placeholder="City / Country (optional)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-3 rounded-xl border outline-none"
              />

              <label className="flex items-start gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={() => setConsent(!consent)}
                />
                I agree to be contacted by Curex24 regarding the partner program.
              </label>

              <button type="submit" className="btn-primary w-full">
                Register as Partner
              </button>
            </form>

            <button onClick={close} className="text-sm text-gray-500 mt-4">
              Close
            </button>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-600">
              Welcome aboard, Partner! 🎉
            </h2>

            <p className="mt-2 text-gray-600">
              Our team will reach out to you soon about onboarding.
            </p>

            <button onClick={close} className="btn-primary mt-6">
              Done
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PartnerWishlistModal;
