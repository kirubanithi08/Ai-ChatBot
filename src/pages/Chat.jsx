
import { useChat } from "../hooks/useChat";
import Chatbar from "../components/Chatbar";
import Chats from "../components/Chats";
import History from "../layout/History";

function Chat() {

  const { messages, loading, sendMessage } = useChat();
  return (
   
    <div className="flex h-full rounded-xl overflow-hidden border border-gray-700">

     
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 overflow-auto">
          <Chats messages={messages} loading={loading} />
        </div>
        <Chatbar onSend={sendMessage} />
      </div>

      
      <div className="w-60 border-l border-gray-700 overflow-auto">
        <History />
      </div>
    </div>
  );
}

export default Chat;
