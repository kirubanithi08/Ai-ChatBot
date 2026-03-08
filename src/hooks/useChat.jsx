import { useState } from "react";
import api from "../api/axios";

import { useChatContext } from "../context/ChatContext";

export function useChat() {
  const context = useChatContext();
  return {
    ...context
  };
}
