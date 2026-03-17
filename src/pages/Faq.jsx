import { useState, useMemo } from "react";

const faqs = [
  
  {
    category: "General",
    question: "How does the AI work?",
    answer:
      "The app uses Google Gemini as the underlying language model. Your message is sent to the backend, which forwards it to the Gemini API and streams the response back word by word using Server-Sent Events (SSE).",
  },
  {
    category: "General",
    question: "Is my data secure?",
    answer:
      "Yes. All communication between the frontend and backend is over HTTPS. Passwords are hashed using BCrypt and never stored in plain text. Authentication is handled via signed JWT tokens with a short expiry.",
  },
  {
    category: "General",
    question: "Can I use it without an account?",
    answer:
      "Yes. Guest users can send up to 5 free messages without registering. After that, you will be prompted to sign in. Creating an account also unlocks chat history that persists across devices.",
  },
  {
    category: "General",
    question: "How do I export my chats?",
    answer:
      "Chat export is not available yet but is planned for a future release. It will support PDF, Markdown, and JSON formats from the settings menu.",
  },

  
  {
    category: "Project",
    question: "How was this project built?",
    answer:
      "The project is split into two parts. The frontend is a React single-page application built with Vite and styled with Tailwind CSS. The backend is a Spring Boot REST API that handles authentication, chat sessions, and streams AI responses using Server-Sent Events. Both are deployed separately — the frontend on Vercel and the backend on Render.",
  },
  {
    category: "Project",
    question: "Why did you choose Spring Boot for the backend?",
    answer:
      "Spring Boot provides a production-ready foundation with built-in support for security, dependency injection, JPA, and reactive streams. Spring Security made it straightforward to implement JWT-based authentication, and Spring WebFlux's reactive support works well with streaming responses from the Gemini API.",
  },
  {
    category: "Project",
    question: "Why React and Vite for the frontend?",
    answer:
      "React was chosen for its component model and ecosystem. Vite was used instead of Create React App because it offers significantly faster cold starts and hot module replacement during development, making the development experience much smoother.",
  },
  {
    category: "Project",
    question: "How does the streaming work?",
    answer:
      "When you send a message, the frontend opens a fetch request to the /api/chat/stream endpoint with Accept: text/event-stream. The Spring Boot backend creates an SseEmitter, calls the Gemini streaming API, and pushes each text chunk as a named SSE event. The frontend reads the stream chunk by chunk and appends each piece to the message in real time, giving the word-by-word typing effect.",
  },
  {
    category: "Project",
    question: "How is chat history stored?",
    answer:
      "Each conversation belongs to a ChatSession. Messages are stored in a ChatMessage table in PostgreSQL, hosted on Supabase. When a session is first created, the backend generates a short title for it using a separate Gemini call. History is only saved for authenticated users — guest messages are streamed but not persisted.",
  },

  
  {
    category: "Tech Stack",
    question: "What is the full frontend tech stack?",
    answer:
      "React 18, React Router v6, Tailwind CSS, Axios, ReactMarkdown with rehype-highlight for markdown and code rendering, jwt-decode for parsing JWT tokens, Font Awesome for icons, and Vite as the build tool. The app is deployed on Vercel.",
  },
  {
    category: "Tech Stack",
    question: "What is the full backend tech stack?",
    answer:
      "Spring Boot 3, Spring Security with JWT (jjwt) for authentication, Spring WebFlux for reactive streaming, Google Gemini API for AI responses, Hibernate and Spring Data JPA for database access, PostgreSQL hosted on Supabase, Lombok to reduce boilerplate, Swagger and OpenAPI for API documentation, and Maven as the build tool. The backend is deployed on Render.",
  },
  {
    category: "Tech Stack",
    question: "Why PostgreSQL and Supabase?",
    answer:
      "PostgreSQL is a robust, production-grade relational database that handles relational data like users, sessions, and messages well. Supabase provides a managed PostgreSQL instance with a generous free tier, making it easy to get started without managing infrastructure.",
  },
  {
    category: "Tech Stack",
    question: "Why Render for the backend?",
    answer:
      "Render supports deploying Spring Boot JARs directly with minimal configuration. It also provides free tier hosting for web services, automatic deployments from GitHub, and environment variable management — all of which made it a straightforward choice for deploying the backend.",
  },

  
  {
    category: "Technical",
    question: "How does authentication work?",
    answer:
      "On login, the backend validates the credentials, then signs a JWT token using a secret key and returns it to the frontend. The frontend stores the token in localStorage and sends it in the Authorization header as a Bearer token on every subsequent request. Spring Security intercepts each request, validates the token, and sets the authentication context.",
  },
  {
    category: "Technical",
    question: "How is the Gemini API integrated?",
    answer:
      "The backend uses the Google Gemini Java SDK to send the conversation history and receive a streaming response. The stream is a reactive Flux of text chunks. Each chunk is forwarded immediately to the frontend via the SseEmitter, so the user sees the response as it is generated rather than waiting for the full reply.",
  },
  {
    category: "Technical",
    question: "Which Gemini model is used?",
    answer:
      "The app uses Gemini 1.5 Flash by default, which offers a good balance of speed and quality for conversational use cases.",
  },
];

const categoryColors = {
  General:   "bg-indigo-500/10 text-indigo-400",
  Project:   "bg-green-500/10 text-green-400",
  "Tech Stack": "bg-yellow-500/10 text-yellow-400",
  Technical: "bg-purple-500/10 text-purple-400",
};

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [search, setSearch]           = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...new Set(faqs.map((f) => f.category))];

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return faqs.filter((f) => {
      const matchesSearch =
        !q ||
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q);
      const matchesCategory =
        activeCategory === "All" || f.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <div className="h-full overflow-y-auto bg-[#111111]">
      <div className="max-w-2xl mx-auto px-4 py-10">

       
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
            Support Center
          </span>
          <h1 className="text-3xl font-bold text-white mt-3 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-500 mt-3 text-sm leading-relaxed">
            Everything about how AiChat works, how it was built, and the tech behind it.
          </p>
        </div>

       
        <div className="relative mb-5">
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-sm" />
          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setActiveIndex(null); }}
            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-200 placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/30 transition-all"
          />
        </div>

        
        <div className="flex items-center gap-2 mb-8 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setActiveIndex(null); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-indigo-600 text-white"
                  : "bg-white/5 text-gray-500 hover:bg-white/10 hover:text-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        
        <div className="space-y-2">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-gray-600">
              <i className="fa-solid fa-magnifying-glass text-2xl mb-3 block" />
              <p className="text-sm">No results found for "{search}"</p>
            </div>
          ) : (
            filtered.map((faq, idx) => (
              <div
                key={idx}
                className={`border rounded-xl overflow-hidden transition-all duration-200 ${
                  activeIndex === idx
                    ? "border-indigo-500/30 bg-indigo-500/5"
                    : "border-white/5 bg-white/[0.02] hover:border-white/10"
                }`}
              >
                <button
                  onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                        categoryColors[faq.category] ?? "bg-white/10 text-gray-400"
                      }`}
                    >
                      {faq.category}
                    </span>
                    <span className="text-sm font-medium text-gray-300 truncate">
                      {faq.question}
                    </span>
                  </div>
                  <i
                    className={`fa-solid fa-chevron-down text-gray-600 text-xs shrink-0 transition-transform duration-200 ${
                      activeIndex === idx ? "rotate-180 text-indigo-400" : ""
                    }`}
                  />
                </button>

                <div
                  className={`px-5 transition-all duration-200 ease-in-out ${
                    activeIndex === idx
                      ? "pb-5 max-h-60 opacity-100"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

       
        <div className="mt-12 p-7 bg-indigo-600/10 border border-indigo-500/20 rounded-2xl text-center">
          <h3 className="text-base font-bold text-white mb-1">Still have questions?</h3>
          <p className="text-gray-500 text-sm mb-5">
            Can't find the answer you're looking for? Feel free to reach out.
          </p>
          <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-500 transition-all">
            Get in touch
          </button>
        </div>

      </div>
    </div>
  );
}