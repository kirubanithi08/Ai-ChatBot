import Message from "./Message";

function Chats({ messages, loading }) {
  return (
    <div className="flex flex-col gap-3 p-4">
      {messages.map((msg) => (
        <Message
          key={msg.id}
          role={msg.role}
          content={msg.content}
        />
      ))}

      {loading && (
        <Message role="assistant" content="Typing..." />
      )}
    </div>
  );
}

export default Chats;
