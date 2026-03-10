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
      <div className="flex items-end gap-3 rounded-2xl border border-gray-200 bg-white p-2.5 pr-3 shadow-md transition-all duration-300 focus-within:border-gray-300">

        <textarea
          ref={textareaRef}
          rows={1}
          placeholder="Ask..."
          onInput={autoResize}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className="max-h-52 flex-1 resize-none bg-transparent py-2.5 px-3 text-[15px] text-gray-800 placeholder-gray-500 outline-none"
        />

        <button
          onClick={handleSend}
          disabled={disabled}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2f2f2f] text-white transition-all duration-200 hover:bg-[#1a1a1a] active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-300"
        >
          <i className="fa-solid fa-arrow-up text-lg" />
        </button>

      </div>
      <p className="mt-3 text-center text-[12px] text-gray-500">
        ChatGPT can make mistakes. Check important info.
      </p>
    </div>
  );
}

export default Chatbar;
