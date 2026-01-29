function Message({ role, content }) {
  const isUser = role === "user";

  return (
    <div
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm leading-relaxed
        ${
          isUser
            ? "bg-indigo-600 text-white rounded-br-sm"
            : "bg-gray-700 text-white rounded-bl-sm"
        }`}
      >
        {content}
      </div>
    </div>
  );
}

export default Message;
