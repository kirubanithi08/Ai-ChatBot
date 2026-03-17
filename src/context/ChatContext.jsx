import { createContext, useContext, useState, useCallback, useRef } from "react";
import { getUserChats, getUserChatsById } from "../api/chatApi";
import { BASE_URL } from "../api/axios";
import { useAuth } from "../auth/AuthContext";

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [messages, setMessages]   = useState([]);
  const [loading, setLoading]     = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [chats, setChats]         = useState([]);

  const abortRef = useRef(null);

  const { user } = useAuth();

 
  const fetchChats = useCallback(async () => {
    try {
      const data = await getUserChats();
      setChats(data);
    } catch (err) {
      console.error("Failed to fetch chats:", err);
    }
  }, []);

  const loadChat = useCallback(async (id) => {
    try {
      setLoading(true);
      setSessionId(id);
      const history = await getUserChatsById(id);
      setMessages(
        history.map((msg) => ({
          id:        msg.id ?? crypto.randomUUID(),
          sender:    msg.sender ?? (msg.role === "user" ? "USER" : "AI"),
          content:   typeof (msg.message ?? msg.content) === "string"
                       ? (msg.message ?? msg.content)
                       : JSON.stringify(msg.message ?? msg.content, null, 2),
          createdAt: msg.createdAt ?? new Date().toISOString(),
        }))
      );
    } catch (err) {
      console.error("Failed to load chat history:", err);
    } finally {
      setLoading(false);
    }
  }, []);

 
  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || streaming) return;

    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        sender: "USER",
        content: text,
        createdAt: new Date().toISOString(),
      },
    ]);

    const aiId = crypto.randomUUID();
    setMessages((prev) => [
      ...prev,
      { id: aiId, sender: "AI", content: "", createdAt: new Date().toISOString() },
    ]);

    setStreaming(true);
    setLoading(true);

    abortRef.current = new AbortController();
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${BASE_URL}/api/chat/stream`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "text/event-stream",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ message: text, sessionId }),
        signal: abortRef.current.signal,
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split("\n\n");

        buffer = events.pop() ?? "";

        for (const event of events) {
          if (!event.trim()) continue;

          let eventName = "message";
          let eventData = "";

          for (const line of event.split("\n")) {
            if (line.startsWith("event:")) {
              eventName = line.slice(6).trim();
            } else if (line.startsWith("data:")) {
              eventData += line.slice(5).trimStart();
            }
          }

          if (!eventData) continue;

          if (eventName === "session") {
            setSessionId(Number(eventData));

          } else if (eventName === "message") {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === aiId
                  ? { ...m, content: m.content + eventData }
                  : m
              )
            );

          } else if (eventName === "error") {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === aiId
                  ? { ...m, content: `⚠️ ${eventData}` }
                  : m
              )
            );

          } else if (eventName === "done") {
            
            if (user) fetchChats();
          }
        }
      }

    } catch (err) {
      if (err.name === "AbortError") return;
      console.error("Stream error:", err);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === aiId
            ? { ...m, content: "⚠️ Failed to get a response. Please try again." }
            : m
        )
      );
    } finally {
      setStreaming(false);
      setLoading(false);
      abortRef.current = null;
    }
  }, [sessionId, streaming, fetchChats, user]);


  const stopStream = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const resetChat = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
    setSessionId(null);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        messages,
        loading,
        streaming,
        sessionId,
        chats,
        fetchChats,
        sendMessage,
        stopStream,
        resetChat,
        loadChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChatContext = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChatContext must be used within a ChatProvider");
  return ctx;
};