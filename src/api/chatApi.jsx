import api from "./axios";


export const getUserChats = async () => {
    const res = await api.get("/chat/sessions");
    return res;
};

export const getUserChatsById = async (sessionId) => {
    const res = await api.get(`/chat/${sessionId}/messages`);
    return res;
};
