import { useAuth } from "../../auth/AuthContext";
import { Link } from "react-router-dom";

function History() {
  const { user } = useAuth();


  const chats = [
    { id: 1, title: "React error debugging" },
    { id: 2, title: "Design modern chat UI" },
    { id: 3, title: "Fix API integration" },
    { id: 4, title: "Tailwind layout issues" },
  ];

  return (
    <div className="h-full flex flex-col bg-gray-50">


      <div className="px-4 py-3 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-700 tracking-wide">
          Conversations
        </h2>
      </div>


      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {!user ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-4">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <i className="fa-solid fa-lock text-gray-400"></i>
            </div>
            <p className="text-sm text-gray-500 mb-4">Please login to see your history</p>
            <Link
              to="/login"
              className="w-full py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
            >
              Login
            </Link>
          </div>
        ) : (
          <>
            {chats.map((chat) => (
              <button
                key={chat.id}
                className="w-full text-left px-3 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-100 transition-all flex items-center gap-2 group"
              >
                <i className="fa-regular fa-message text-gray-400 group-hover:text-indigo-500 transition-colors"></i>
                <span className="truncate">{chat.title}</span>
              </button>
            ))}
          </>
        )}
      </div>

    </div>
  );
}

export default History;
