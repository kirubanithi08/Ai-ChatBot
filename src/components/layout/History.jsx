import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { useChatContext } from "../../context/ChatContext";
import Modal from "../ui/Model";
import Login from "../../pages/Login";

function History({ mobileOpen, onClose }) {
  const { user } = useAuth();
  const { chats, loadChat, fetchChats } = useChatContext();
  const [authModal, setAuthModal] = useState(false);

  useEffect(() => {
    if (user) fetchChats();
  }, [user, fetchChats]);

  const handleLoadChat = (id) => {
    loadChat(id);
    onClose?.();
  };

  const content = (
    <div className="h-full flex flex-col bg-[#0f0f0f]">

      <div className="px-4 py-4 border-b border-white/5 flex items-center justify-between shrink-0">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest">History</h2>
        <button
          onClick={onClose}
          className="md:hidden w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all"
        >
          <i className="fa-solid fa-xmark text-sm" />
        </button>
      </div>

     
      <div className="relative flex-1 min-h-0">
        <div
          className="h-full overflow-y-auto p-3 space-y-0.5"
          style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.06) transparent" }}
        >
          {!user ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 pt-12">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-4">
                <i className="fa-solid fa-lock text-gray-600 text-lg" />
              </div>
              <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                Sign in to keep your chat history across devices
              </p>
              <button
                onClick={() => setAuthModal(true)}
                className="w-full py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-500 transition-all"
              >
                Sign In
              </button>
            </div>
          ) : chats.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center p-6 pt-12 opacity-40">
              <i className="fa-solid fa-clock-rotate-left text-2xl mb-3 text-gray-500" />
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">No history yet</p>
            </div>
          ) : (
            <>
              {chats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => handleLoadChat(chat.id)}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:bg-white/5 hover:text-gray-200 transition-all flex items-center gap-2.5 group"
                >
                  <i className="fa-regular fa-message text-gray-600 group-hover:text-indigo-400 transition-colors shrink-0 text-xs" />
                  <span className="truncate">{chat.title || "New Chat"}</span>
                </button>
              ))}
             
              <div className="h-8" />
            </>
          )}
        </div>

        
        {user && chats.length > 0 && (
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#0f0f0f] to-transparent" />
        )}
      </div>

      <Modal open={authModal} onClose={() => setAuthModal(false)}>
        <Login onSuccess={() => setAuthModal(false)} />
      </Modal>
    </div>
  );

  return (
    <>
      
      <div className="hidden md:flex w-56 border-l border-white/5 flex-col">
        {content}
      </div>

      
      <>
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={onClose}
          />
        )}
        <div className={`
          fixed top-0 right-0 h-full w-72 z-50
          md:hidden shadow-2xl
          transition-transform duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "translate-x-full"}
        `}>
          {content}
        </div>
      </>
    </>
  );
}

export default History;