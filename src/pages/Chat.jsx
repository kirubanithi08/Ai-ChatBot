import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useChat } from "../hooks/useChat";
import { useAuth } from "../auth/AuthContext";
import Chatbar from "../components/chat/Chatbar";
import Chats from "../components/chat/Chats";
import History from "../components/layout/History";
import Modal from "../components/ui/Model";
import Login from "./Login";
import Signup from "./Signup";

const GUEST_LIMIT = 5;
const STORAGE_KEY = "guest_msg_count";

function Chat() {
  const { messages, loading, streaming, sendMessage, stopStream } = useChat();
  const { user } = useAuth();

  const [historyOpen, setHistoryOpen] = useState(false);
  const [loginModal, setLoginModal]   = useState(false);
  const [authTab, setAuthTab]         = useState("login");
  const [guestCount, setGuestCount]   = useState(() => {
    return parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
  });

  
  useEffect(() => {
    if (user) {
      localStorage.removeItem(STORAGE_KEY);
      setGuestCount(0);
    }
  }, [user]);

  const guestRemaining = Math.max(0, GUEST_LIMIT - guestCount);
  const isGuest        = !user;
  const guestLimitHit  = isGuest && guestCount >= GUEST_LIMIT;

  const handleSend = (text) => {
    
    if (user) {
      sendMessage(text);
      return;
    }

    
    if (guestCount >= GUEST_LIMIT) {
      setAuthTab("login");
      setLoginModal(true);
      return;
    }

    
    const next = guestCount + 1;
    setGuestCount(next);
    localStorage.setItem(STORAGE_KEY, next);
    sendMessage(text);
  };

  const openAuthModal = (tab = "login") => {
    setAuthTab(tab);
    setLoginModal(true);
  };

  return (
    <div className="flex h-full bg-[#111111] overflow-hidden">

      
      <div className="flex flex-col flex-1 min-w-0">

        
        <div className="hidden md:flex px-4 py-3 border-b border-white/5 bg-[#111111] items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-600/20 flex items-center justify-center">
              <i className="fa-solid fa-robot text-indigo-400 text-sm" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-200">AI Assistant</h2>
              <p className="text-[10px] text-gray-600 uppercase tracking-widest font-medium">
                Powered by Gemini
              </p>
            </div>
          </div>

          
          {isGuest && !guestLimitHit && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5">
              <span className="text-xs text-gray-500">
                <span className="text-gray-300 font-semibold">{guestRemaining}</span>
                {" "}free {guestRemaining === 1 ? "message" : "messages"} left
              </span>
            </div>
          )}
        </div>

       
        <MobileHistoryPortal onOpen={() => setHistoryOpen(true)} />

        
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto h-full px-4">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-5 animate-robot-bounce">
                  <i className="fa-solid fa-robot text-gray-400 text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-200 mb-2">
                  How can I help you today?
                </h3>
                <p className="text-gray-600 max-w-xs text-sm leading-relaxed">
                  Ask me anything — I'm here to assist you.
                </p>
                {isGuest && (
                  <p className="mt-3 text-xs text-gray-600">
                    {GUEST_LIMIT} free messages available.{" "}
                    <button
                      onClick={() => openAuthModal("signup")}
                      className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors"
                    >
                      Sign up
                    </button>
                    {" "}for unlimited access.
                  </p>
                )}
              </div>
            ) : (
              <Chats messages={messages} loading={loading} streaming={streaming} />
            )}
          </div>
        </div>

        
        <div className="px-4 pb-4 pt-2 shrink-0">
          <div className="max-w-2xl mx-auto">
            
            {guestLimitHit && (
              <div className="mb-3 flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-indigo-600/10 border border-indigo-500/20">
                <p className="text-sm text-gray-400">
                  You've used all{" "}
                  <span className="text-white font-semibold">{GUEST_LIMIT} free messages</span>.
                  Sign in to continue.
                </p>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => openAuthModal("login")}
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-all"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => openAuthModal("signup")}
                    className="px-3 py-1.5 text-xs font-semibold text-gray-300 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            )}

            <Chatbar
              onSend={handleSend}
              onStop={stopStream}
              disabled={loading}
              streaming={streaming}
              guestRemaining={isGuest ? guestRemaining : null}
              guestLimitHit={guestLimitHit}
            />
          </div>
        </div>
      </div>

     
      <History mobileOpen={historyOpen} onClose={() => setHistoryOpen(false)} />

      
      <Modal open={loginModal} onClose={() => setLoginModal(false)}>
        {authTab === "login" ? (
          <>
            <Login onSuccess={() => setLoginModal(false)} />
            <p className="mt-4 text-center text-xs text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => setAuthTab("signup")}
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Sign up free
              </button>
            </p>
          </>
        ) : (
          <>
            <Signup onSuccess={() => setLoginModal(false)} />
            <p className="mt-4 text-center text-xs text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => setAuthTab("login")}
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Sign in
              </button>
            </p>
          </>
        )}
      </Modal>
    </div>
  );
}

function MobileHistoryPortal({ onOpen }) {
  const target = document.getElementById("mobile-topbar-right");
  if (!target) return null;
  return createPortal(
    <button
      onClick={onOpen}
      className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all"
      title="Chat history"
    >
      <i className="fa-solid fa-clock-rotate-left text-sm" />
    </button>,
    target
  );
}

export default Chat;