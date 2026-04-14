import { motion } from "framer-motion";
import { useState } from "react";

const FloatingChatButton = () => {

  const [open, setOpen] = useState(false);

  return (

    <div className="fixed bottom-6 right-6 z-[9999]">

      {/* Chat Popup */}

      {open && (

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}

          className="glass-card w-72 p-4 mb-3 shadow-lg"
        >

          <h3 className="font-semibold text-gray-800 dark:text-white">

            Talk to a Doctor 👨‍⚕️

          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">

            Our healthcare team is ready to assist you.
            Start a conversation now.

          </p>

          <button
            className="btn-primary w-full mt-4"

            onClick={() => alert("Chat feature coming soon!")}
          >
            Start Chat
          </button>

        </motion.div>

      )}

      {/* Floating Button */}

      <motion.button
        onClick={() => setOpen(!open)}

        className="relative btn-primary rounded-full w-16 h-16 flex items-center justify-center text-2xl shadow-lg"

        whileHover={{ scale: 1.1 }}

        whileTap={{ scale: 0.9 }}
      >

        💬

        {/* Pulse Animation */}

        <span className="absolute w-full h-full rounded-full bg-green-400 opacity-30 animate-ping"></span>

      </motion.button>

    </div>

  );

};

export default FloatingChatButton;