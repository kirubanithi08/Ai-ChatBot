import { useState } from "react";
import { createPortal } from "react-dom";
import { useChat } from "../hooks/useChat";
import Chatbar from "../components/chat/Chatbar";
import Chats from "../components/chat/Chats";
import History from "../components/layout/History";

function Chat() {
  const { messages, loading, streaming, sendMessage, stopStream } = useChat();
  const [historyOpen, setHistoryOpen] = useState(false);

  return (
    <div className="flex h-full bg-[#111111] overflow-hidden">

     
      <div className="flex flex-col flex-1 min-w-0">

        
        <div className="hidden md:flex px-4 py-3 border-b border-white/5 bg-[#111111] items-center shrink-0">
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
              </div>
            ) : (
              <Chats messages={messages} loading={loading} streaming={streaming} />
            )}
          </div>
        </div>

       
        <div className="px-4 pb-4 pt-2 shrink-0">
          <div className="max-w-2xl mx-auto">
            <Chatbar
              onSend={sendMessage}
              onStop={stopStream}
              disabled={loading}
              streaming={streaming}
            />
          </div>
        </div>
      </div>

      
      <History mobileOpen={historyOpen} onClose={() => setHistoryOpen(false)} />
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