function Message({ role, content }) {
  const isUser = role === "user";

  return (
    <div className={`w-full flex ${isUser ? "justify-end" : "justify-start"}`}>
      
      <div
        className={`
          max-w-[70%] px-4 py-3 rounded-2xl text-sm leading-relaxed
          shadow-sm transition-all duration-200
          ${
            isUser
              ? "bg-indigo-600 text-white rounded-br-md"
              : "bg-white border border-gray-200 text-gray-800 rounded-bl-md"
          }
        `}
      >
        {content}
      </div>

    </div>
  );
}

export default Message;
