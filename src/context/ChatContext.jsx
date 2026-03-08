import { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "../api/axios";
import { getUserChats, getUserChatsById } from "../api/chat";

const ChatContext = createContext();

export function ChatProvider({ children }) {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sessionId, setSessionId] = useState(null);
    const [chats, setChats] = useState([]);

    const fetchChats = useCallback(async () => {
        try {
            const data = await getUserChats();
            setChats(data);
        } catch (err) {
            console.error("Failed to fetch chats:", err);
        }
    }, []);

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
            const isNewSession = !sessionId;
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

            // If it was a new session, refresh the chat list to show the new conversation
            if (isNewSession) {
                fetchChats();
            }
        } catch (error) {
            console.error("Chat Error:", error);
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

    const resetChat = () => {
        setMessages([]);
        setSessionId(null);
    };

    const loadChat = useCallback(async (id) => {
        try {
            setLoading(true);
            setSessionId(id);
            const history = await getUserChatsById(id);

            // Map API response to our message format if needed
            const mappedMessages = history.map(msg => ({
                id: msg.id || crypto.randomUUID(),
                role: msg.role === 'user' ? 'user' : 'assistant',
                content: msg.message || msg.content
            }));

            setMessages(mappedMessages);
        } catch (error) {
            console.error("Failed to load chat history:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <ChatContext.Provider
            value={{
                messages,
                loading,
                sessionId,
                chats,
                fetchChats,
                sendMessage,
                resetChat,
                loadChat,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
}


export const useChatContext = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error("useChatContext must be used within a ChatProvider");
    }
    return context;
};

