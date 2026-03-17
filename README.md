<div align="center">

# AiChat

**A modern, full-stack AI chatbot powered by Gemini — built with React + Spring Boot**

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring-Boot-6DB33F?style=flat-square&logo=springboot&logoColor=white)
![Gemini](https://img.shields.io/badge/Powered%20by-Gemini-4285F4?style=flat-square&logo=google&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-white?style=flat-square)

</div>

---

## Features

- Real-time streaming — word-by-word SSE response streaming from Gemini
- Chat history — persistent sessions saved per user, accessible across devices
- JWT authentication — secure login & registration with token-based auth
- Markdown rendering — full markdown + syntax-highlighted code blocks with copy button
- Mobile responsive — collapsible sidebar drawer, slide-over history panel
- Dark theme — clean black/gray UI with indigo accents throughout
- Stop generation — abort streaming mid-response at any time
- Session management — continue existing conversations or start fresh

---

## Tech Stack

### Frontend

| Tech | Purpose |
|------|---------|
| React 18 | UI framework |
| React Router v6 | Client-side routing |
| Tailwind CSS | Styling |
| ReactMarkdown + rehype-highlight | Markdown & code rendering |
| Axios | HTTP client |
| jwt-decode | JWT parsing |

### Backend

| Tech | Purpose |
|------|---------|
| Spring Boot | REST API & SSE streaming |
| Spring Security + JWT | Authentication |
| Google Gemini API | AI language model |
| PostgreSQL / MySQL | Persistent storage |

---

## Project Structure

```
src/
├── api/
│   ├── axios.js              # Axios instance + interceptors
│   ├── auth.js               # Login & register API calls
│   └── chatApi.js            # Chat session & message API calls
│
├── auth/
│   └── AuthContext.jsx       # Global auth state (user, login, logout)
│
├── context/
│   └── ChatContext.jsx       # Chat state, SSE streaming, session management
│
├── hooks/
│   └── useChat.js            # Thin wrapper around ChatContext
│
├── components/
│   ├── ui/
│   │   ├── Modal.jsx         # Reusable dark modal
│   │   └── Input.jsx         # Styled form input
│   ├── chat/
│   │   ├── Chatbar.jsx       # Message input with auto-resize & stop button
│   │   ├── Chats.jsx         # Message list with auto-scroll
│   │   └── Message.jsx       # User & AI message bubbles + markdown
│   └── layout/
│       ├── Sidebar.jsx       # Collapsible left sidebar + auth
│       └── History.jsx       # Right panel / mobile drawer for chat history
│
└── pages/
    ├── Chat.jsx              # Main chat page
    ├── Login.jsx             # Login page (modal)
    ├── Signup.jsx            # Register page (modal)
    ├── Faq.jsx               # FAQ with search & accordion
    └── Settings.jsx          # Settings placeholder
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Backend running (see backend repo)

### Installation

```bash
# Clone the repository
git clone https://github.com/kirubanithi08/Ai-ChatBot
cd aichat

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### Environment Variables

Create a `.env` file in the root:

```env
VITE_API_BASE_URL=https://your-backend-url.com
```

> The base URL is also configurable in `src/api/axios.js` via the `BASE_URL` constant.

### Run Locally

```bash
npm run dev
```

Visit `https://ai-chat-bot-phi-three.vercel.app/`

### Build for Production

```bash
npm run build
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/login` | Login, returns JWT token |
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/chat/stream` | SSE streaming chat response |
| `GET` | `/api/chat/sessions` | Get all chat sessions for user |
| `GET` | `/api/chat/:id/messages` | Get messages for a session |

### SSE Event Types

The `/api/chat/stream` endpoint emits the following Server-Sent Events:

```
event: session   → session ID (for continuing the conversation)
event: message   → streamed text chunk
event: error     → error message from backend
event: done      → stream complete, history saved
```

---

## Screenshots

> Add your screenshots here

| Chat | History | Mobile |
|------|---------|--------|
| ![chat]() | ![history]() | ![mobile]() |

---

## Contributing

Contributions are welcome. Please open an issue first to discuss what you would like to change.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">
  <sub>Built with React & Spring Boot</sub>
</div>