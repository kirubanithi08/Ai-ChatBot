import { useState } from "react";
import axios from "axios";

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), role: "user", content: text },
    ]);

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8080/api/chat", { message: text });

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "assistant", content: res.data, },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return { messages, loading, sendMessage };
}
