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
      <div className="flex items-end gap-3 rounded-2xl border border-gray-200 bg-white p-2 pl-4 shadow-lg shadow-indigo-500/5 transition-all duration-300 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-100/50">

        <textarea
          ref={textareaRef}
          rows={1}
          placeholder="Message AI Assistant..."
          onInput={autoResize}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className="max-h-40 flex-1 resize-none bg-transparent py-2 text-[15px] text-gray-800 placeholder-gray-400 outline-none"
        />

        <button
          onClick={handleSend}
          disabled={disabled}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white transition-all duration-200 hover:bg-indigo-700 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
        >
          <i className="fa-solid fa-arrow-up" />
        </button>

      </div>
      <p className="mt-2 text-center text-[11px] text-gray-400">
        AI may produce inaccurate info. Check important details.
      </p>
    </div>
  );
}

export default Chatbar;
