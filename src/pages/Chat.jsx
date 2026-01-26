import {useState} from "react";
import Chatbar from "../components/Chatbar";
import Chats from "../components/Chats";
import History from "../layout/History";

function Chat() {
  const [message, setMessage]=useState('');
  return (
    <div className="flex h-full">
     
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 overflow-auto">
          <Chats />
        </div>
        <Chatbar 
        message={message}
        setMessage={setMessage}
        />
      </div>

      
      <div className="w-60 border-l border-gray-700 overflow-auto">
        <History />
      </div>
    </div>
  );
}

export default Chat;
