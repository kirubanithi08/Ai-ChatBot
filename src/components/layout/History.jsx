import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { useChatContext } from "../../context/ChatContext";
import Modal from "../Model";
import Login from "../../pages/Login";

function History() {
  const { user } = useAuth();
  const { chats, loadChat, fetchChats } = useChatContext();

  const [authModal, setAuthModal] = useState(null);

  useEffect(() => {
    if (user) {
      fetchChats();
    }
  }, [user, fetchChats]);

  return (
    <div className="h-full flex flex-col bg-gray-50/50">

      <div className="px-5 py-4 border-b border-gray-100 bg-white/50 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-800 uppercase tracking-widest">
            History
          </h2>
          <span className="bg-indigo-50 text-indigo-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
            {chats.length}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
        {!user ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6">
            <div className="w-14 h-14 bg-white shadow-sm rounded-2xl flex items-center justify-center mb-4 text-gray-300">
              <i className="fa-solid fa-lock text-xl"></i>
            </div>

            <p className="text-sm text-gray-500 mb-6 font-medium">
              Sign in to keep your chat history across devices
            </p>

            <button
              onClick={() => setAuthModal("login")}
              className="w-full py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200"
            >
              Log In
            </button>
          </div>
        ) : chats.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 opacity-40">
            <i className="fa-solid fa-ghost text-3xl mb-3 text-gray-300"></i>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">
              No history yet
            </p>
          </div>
        ) : (
          chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => loadChat(chat.id)}
              className="w-full text-left px-3 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-100 transition-all flex items-center gap-2 group"
            >
              <i className="fa-regular fa-message text-gray-400 group-hover:text-indigo-500 transition-colors"></i>
              <span className="truncate">{chat.title || "New Chat"}</span>
            </button>
          ))
        )}
      </div>

      
      <Modal open={!!authModal} onClose={() => setAuthModal(null)}>
        {authModal === "login" && (
          <Login onSuccess={() => setAuthModal(null)} />
        )}
      </Modal>
    </div>
  );
}

export default History;