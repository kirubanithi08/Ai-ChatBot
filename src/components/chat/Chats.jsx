import { useEffect, useRef } from "react";
import Message from "./Message";

function Chats({ messages, loading, streaming }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const lastMsg = messages.at(-1);
  const awaitingFirstChunk =
    (loading || streaming) &&
    lastMsg?.sender === "AI" &&
    lastMsg?.content === "";

  return (
    <div className="flex flex-col gap-5 py-6">
      {messages.map((msg, index) => {
        const isLastMsg = msg === lastMsg;
        const isStreaming = streaming && isLastMsg;

        return (
          <Message
            key={msg.id ?? index}
            sender={msg.sender}
            content={msg.content}
            streaming={isStreaming}
            streamingDone={!streaming && isLastMsg}
          />
        );
      })}

      {awaitingFirstChunk && (
        <div className="flex items-center gap-1.5 px-2 py-1">
          <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0ms]" />
          <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:150ms]" />
          <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:300ms]" />
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}

export default Chats;