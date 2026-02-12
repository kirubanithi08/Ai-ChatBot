import React, { useRef } from "react";

function Chatbar({ onSend, disabled }) {
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
    if (!value || disabled) return;

    onSend?.(value);
    textareaRef.current.value = "";
    textareaRef.current.style.height = "auto";
  };

  return (
    <div className="relative">
      <div className="flex items-end gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100">

       
        <textarea
          ref={textareaRef}
          rows={1}
          placeholder="Message AI Assistant..."
          onInput={autoResize}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className="max-h-40 flex-1 resize-none bg-transparent text-gray-800 placeholder-gray-400 outline-none"
        />

       
        <button
          onClick={handleSend}
          disabled={disabled}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          <i className="fa-solid fa-arrow-up" />
        </button>

      </div>
    </div>
  );
}

export default Chatbar;
