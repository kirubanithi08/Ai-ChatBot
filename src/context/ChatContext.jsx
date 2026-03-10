import { createContext, useContext, useState, useCallback } from "react";
import api from "../api/axios";
import { getUserChats, getUserChatsById } from "../api/chatApi";

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
            sender: "USER",
            content: text,
            createdAt: new Date().toISOString(),
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
                sender: "AI",
                content:
                    typeof data.aiResponse === "string"
                        ? data.aiResponse
                        : JSON.stringify(data.aiResponse, null, 2),
                createdAt: new Date().toISOString(),
            };

            setMessages((prev) => [...prev, aiMsg]);

            if (isNewSession) {
                fetchChats();
            }

        } catch (error) {
            console.error("Chat Error:", error);

            setMessages((prev) => [
                ...prev,
                {
                    id: crypto.randomUUID(),
                    sender: "AI",
                    content: "⚠️ Failed to get response. Please try again.",
                    createdAt: new Date().toISOString(),
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

            const mappedMessages = history.map((msg) => ({
                id: msg.id || crypto.randomUUID(),
                sender: msg.sender || (msg.role === "user" ? "USER" : "AI"),
                content:
                    typeof (msg.message || msg.content) === "string"
                        ? (msg.message || msg.content)
                        : JSON.stringify(msg.message || msg.content, null, 2),
                createdAt: msg.createdAt || new Date().toISOString(),
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