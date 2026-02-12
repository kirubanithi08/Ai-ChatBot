function History() {
  
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

      
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {chats.map((chat) => (
          <button
            key={chat.id}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-white hover:shadow-sm transition"
          >
            {chat.title}
          </button>
        ))}
      </div>

    </div>
  );
}

export default History;
