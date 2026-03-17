import { useState, useMemo } from "react";

const faqs = [
  {
    question: "How does the AI work?",
    answer:
      "Our AI uses advanced language models to understand and respond to your queries in real-time, providing accurate and helpful information.",
    category: "General",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, we prioritize your privacy. All conversations are encrypted and we never use your personal data to train public models without consent.",
    category: "Security",
  },
  {
    question: "Can I use it for free?",
    answer:
      "We offer a generous free tier for all users. For higher limits and premium features, we have Pro and Enterprise plans.",
    category: "Billing",
  },
  {
    question: "How do I export my chats?",
    answer:
      "You can export your chat history in PDF, Markdown, or JSON formats from the settings menu under the Data Management section.",
    category: "Usage",
  },
  {
    question: "Which models are available?",
    answer:
      "We support a range of models including Gemini 1.5, GPT-4, and Claude 3, depending on your subscription level.",
    category: "Technical",
  },
];

const categoryColors = {
  General:   "bg-indigo-500/10 text-indigo-400",
  Security:  "bg-green-500/10 text-green-400",
  Billing:   "bg-yellow-500/10 text-yellow-400",
  Usage:     "bg-blue-500/10 text-blue-400",
  Technical: "bg-purple-500/10 text-purple-400",
};

function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return faqs;
    return faqs.filter(
      (f) =>
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q)
    );
  }, [search]);

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
            Everything you need to know about our AI assistant, billing, and security.
          </p>
        </div>

       
        <div className="relative mb-8">
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-sm" />
          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-200 placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/30 transition-all"
          />
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
                      ? "pb-5 max-h-40 opacity-100"
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
            Can't find the answer you're looking for? Chat with our team.
          </p>
          <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-500 transition-all">
            Get in touch
          </button>
        </div>
      </div>
    </div>
  );
}

export default Faq;