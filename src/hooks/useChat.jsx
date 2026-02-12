import { useState } from "react";
import api from "../api/axios";

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

   
    const userMsg = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await api.post("/chat", {
        message: text,
        sessionId, 
      });

      const data = res.data;

      
      if (data.sessionId) {
        setSessionId(data.sessionId);
      }

      
      const aiMsg = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.aiResponse ?? "No response received.",
      };

      setMessages((prev) => [...prev, aiMsg]);

    } catch (error) {
      
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "⚠️ Failed to get response. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    loading,
    sendMessage,
  };
}
