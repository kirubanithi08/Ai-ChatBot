import api from "./axios";
export const getUserChats = async () => {
    const res = await api.get("/chat/sessions");
    return res.data;
};

export const getUserChatsById = async () => {
    const res = await api.get("/{sessionId}/messages");
    return res.data;
};