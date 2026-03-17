import { useRef } from "react";

function Chatbar({ onSend, onStop, disabled, streaming, guestRemaining, guestLimitHit }) {
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
    const value = textareaRef.current?.value.trim();
    if (!value || disabled) return;
    onSend?.(value);
    if (!guestLimitHit) {
      textareaRef.current.value = "";
      textareaRef.current.style.height = "auto";
    }
  };

  const placeholder = guestLimitHit
    ? "Sign in to continue chatting..."
    : guestRemaining !== null
      ? `Ask anything... (${guestRemaining} free ${guestRemaining === 1 ? "message" : "messages"} left)`
      : "Ask anything...";

  return (
    <div className="relative">
      <div className={`flex items-end gap-2 rounded-2xl border bg-[#1a1a1a] p-2 pr-2.5 shadow-xl transition-all duration-200
        ${guestLimitHit
          ? "border-white/5 opacity-60 pointer-events-none"
          : "border-white/10 focus-within:border-indigo-500/40"
        }`}
      >
        <textarea
          ref={textareaRef}
          rows={1}
          placeholder={placeholder}
          onInput={autoResize}
          onKeyDown={handleKeyDown}
          disabled={streaming || guestLimitHit}
          className="max-h-40 flex-1 resize-none bg-transparent py-2.5 px-3 text-[15px] text-gray-100 placeholder-gray-600 outline-none disabled:opacity-50 leading-relaxed"
        />

        {streaming ? (
          <button
            onClick={onStop}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 transition-all duration-200 hover:bg-red-500/30 active:scale-95"
            title="Stop generating"
          >
            <i className="fa-solid fa-stop text-xs" />
          </button>
        ) : (
          <button
            onClick={handleSend}
            disabled={disabled || guestLimitHit}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white transition-all duration-200 hover:bg-indigo-500 active:scale-95 disabled:cursor-not-allowed disabled:bg-white/5 disabled:text-gray-600"
          >
            <i className={`fa-solid ${guestLimitHit ? "fa-lock" : "fa-arrow-up"} text-sm`} />
          </button>
        )}
      </div>

      <p className="mt-2.5 text-center text-[11px] text-gray-600">
        AI can make mistakes. Verify important information.
      </p>
    </div>
  );
}

export default Chatbar;