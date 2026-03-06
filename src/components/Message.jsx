import React from "react";

function Message({ role, content }) {
  const isUser = role === "user";

  return (
    <div className={`w-full flex ${isUser ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}>

      <div
        className={`
          max-w-[80%] px-5 py-3.5 shadow-sm transition-all duration-200
          ${isUser
            ? "bg-indigo-600 text-white rounded-[24px] rounded-br-[4px]"
            : "bg-white border border-gray-100 text-gray-800 rounded-[24px] rounded-bl-[4px]"
          }
        `}
      >
        <div className="text-[15px] leading-relaxed whitespace-pre-wrap">
          {content}
        </div>
      </div>

    </div>
  );
}

export default Message;
