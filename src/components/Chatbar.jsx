import React, { useRef } from "react";

function Chatbar({ onSend }) {
  const textareaRef = useRef(null);

  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    const value = textareaRef.current.value.trim();
    if (!value) return;

    onSend?.(value);
    textareaRef.current.value = "";
    textareaRef.current.style.height = "auto";
  };

  return (
    <div className="sticky bottom-0 bg-gradient-to-t from-gray-900 via-gray-900/90 to-transparent p-4">
      <div className="mx-auto flex max-w-3xl items-end gap-3 rounded-2xl bg-gray-800 px-4 py-3 shadow-lg">
        <textarea
          ref={textareaRef}
          rows={1}
          placeholder="Message AiChatBot..."
          onInput={autoResize}
          onKeyDown={handleKeyDown}
          className="max-h-40 flex-1 resize-none bg-transparent text-white
                     placeholder-gray-400 outline-none"
        />

        <button
          onClick={handleSend}
          className="flex h-10 w-10 items-center justify-center rounded-full
                     bg-indigo-600 text-white transition hover:bg-indigo-500
                     disabled:opacity-50"
        >
          <i className="fa-solid fa-arrow-up" />
        </button>
      </div>
    </div>
  );
}

export default Chatbar;
