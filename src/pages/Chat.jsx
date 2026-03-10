import { useChat } from "../hooks/useChat";
import Chatbar from "../components/Chatbar";
import Chats from "../components/Chats";
import History from "../components/layout/History";

function Chat() {
  const { messages, loading, sendMessage } = useChat();

  return (
    <div className="flex h-full rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white">

      
      <div className="flex flex-col flex-1 bg-gradient-to-b from-gray-50/50 to-white">

        
        <div className="px-6 py-4 border-b border-gray-100 bg-white/50 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
              <i className="fa-solid fa-robot text-indigo-600"></i>
            </div>

            <div>
              <h2 className="text-sm font-bold text-gray-800 tracking-tight">
                AI Assistant
              </h2>
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">
                Powered by Gemini
              </p>
            </div>
          </div>
        </div>

        
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto h-full px-4">

            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 bg-white border border-gray-100 shadow-sm rounded-2xl flex items-center justify-center mb-6 text-2xl">
                  <i className="fa-solid fa-robot text-gray-800"></i>
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  How can I help you today?
                </h3>

                <p className="text-gray-500 max-w-sm text-sm">
                  Ask me anything, I'm here to assist you with your tasks.
                </p>
              </div>
            ) : (
              <Chats messages={messages} loading={loading} />
            )}

          </div>
        </div>

       
        <div className="bg-white px-4 pb-4">
          <div className="max-w-3xl mx-auto">
            <Chatbar onSend={sendMessage} disabled={loading} />
          </div>
        </div>

      </div>

      
      <div className="w-64 border-l border-gray-200 bg-gray-50">
        <History />
      </div>

    </div>
  );
}

export default Chat;