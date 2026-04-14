import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type ChatSession = {
  id: string;
  title: string;
  archived: boolean;
};

const CHAT_SESSIONS_STORAGE_KEY = "curex24_chat_sessions_v1";

const defaultSessions: ChatSession[] = [
  { id: "session-active", title: "Doctor Follow-up", archived: false },
  { id: "session-archived", title: "Archived: Skin Care Advice", archived: true },
];

const FloatingChatButton = () => {

  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"active" | "archived">("active");
  const [sessions, setSessions] = useState<ChatSession[]>(defaultSessions);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedSessions = window.localStorage.getItem(CHAT_SESSIONS_STORAGE_KEY);
    if (!savedSessions) return;

    try {
      const parsed = JSON.parse(savedSessions) as ChatSession[];
      if (Array.isArray(parsed)) {
        setSessions(parsed);
      }
    } catch {
      setSessions(defaultSessions);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(CHAT_SESSIONS_STORAGE_KEY, JSON.stringify(sessions));
  }, [sessions]);

  const activeSessions = sessions.filter((session) => !session.archived);
  const archivedSessions = sessions.filter((session) => session.archived);

  const restoreSession = (id: string) => {
    setSessions((prev) =>
      prev.map((session) =>
        session.id === id ? { ...session, archived: false } : session
      )
    );
    setActiveTab("active");
  };

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

          <div className="mt-4 rounded-xl border border-gray-200 bg-white/80 p-2">
            <div className="mb-2 flex gap-2">
              <button
                className={`text-xs px-3 py-1.5 rounded-full ${
                  activeTab === "active"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setActiveTab("active")}
              >
                Active
              </button>
              <button
                className={`text-xs px-3 py-1.5 rounded-full ${
                  activeTab === "archived"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setActiveTab("archived")}
              >
                Archived
              </button>
            </div>

            {activeTab === "active" ? (
              <div className="space-y-2">
                {activeSessions.length === 0 ? (
                  <p className="text-xs text-gray-500">No active chats yet.</p>
                ) : (
                  activeSessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between rounded-lg bg-white px-2 py-1.5"
                    >
                      <span className="text-xs text-gray-700">{session.title}</span>
                      <button
                        className="text-xs text-green-700 font-medium"
                        onClick={() => alert(`Continuing chat: ${session.title}`)}
                      >
                        Continue
                      </button>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="space-y-2">
                {archivedSessions.length === 0 ? (
                  <p className="text-xs text-gray-500">No archived chats found.</p>
                ) : (
                  archivedSessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between rounded-lg bg-white px-2 py-1.5"
                    >
                      <span className="text-xs text-gray-700">{session.title}</span>
                      <button
                        className="text-xs text-green-700 font-medium"
                        onClick={() => restoreSession(session.id)}
                      >
                        Restore
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <button
            className="btn-primary w-full mt-4"

            onClick={() => alert("Starting a new chat session...")}
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
