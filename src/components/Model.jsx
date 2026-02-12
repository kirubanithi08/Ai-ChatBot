export default function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg w-[24rem] p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-black"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
          {children}
        </div>
      </div>
    </>
  );
}
