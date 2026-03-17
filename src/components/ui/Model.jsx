export default function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-[#111111] border border-white/10 rounded-2xl shadow-2xl w-full max-w-sm p-6 relative animate-in fade-in slide-in-from-bottom-4 duration-200">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all"
          >
            <i className="fa-solid fa-xmark text-sm" />
          </button>
          {children}
        </div>
      </div>
    </>
  );
}