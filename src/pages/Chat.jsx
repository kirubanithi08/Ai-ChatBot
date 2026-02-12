import { useChat } from "../hooks/useChat";
import Chatbar from "../components/Chatbar";
import Chats from "../components/Chats";
import History from "../layout/History";

function Chat() {
  const { messages, loading, sendMessage } = useChat();

  return (
    <div className="flex h-full rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white">
      
      
      <div className="flex flex-col flex-1 bg-gradient-to-b from-gray-50 to-white">

  <div className="px-4 py-3 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-700 tracking-wide">
         gemini
        </h2>
      </div>

       
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="max-w-3xl mx-auto">
            <Chats messages={messages} loading={loading} />
          </div>
        </div>

       
        <div className="border-t border-gray-200 bg-white px-4 py-3">
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
