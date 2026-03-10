import { useEffect, useRef } from "react";
import Message from "./Message";

function Chats({ messages, loading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="flex flex-col gap-4 py-6">

      {messages.map((msg, index) => (
        <Message
          key={msg.id || index}
          sender={msg.sender}
          content={msg.content}
        />
      ))}

     
      {loading && (
        <div className="flex items-center gap-1 px-4">
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.15s]"></span>
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.3s]"></span>
          </div>
        </div>
      )}

      <div ref={bottomRef} />

    </div>
  );
}

export default Chats;