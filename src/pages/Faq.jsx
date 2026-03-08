import React, { useState } from "react";

function Faq() {
  const faqs = [
    {
      question: "How does the AI work?",
      answer: "Our AI uses advanced language models to understand and respond to your queries in real-time, providing accurate and helpful information.",
      category: "General"
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we prioritize your privacy. All your conversations are encrypted and we never use your personal data to train our public models without consent.",
      category: "Security"
    },
    {
      question: "Can I use it for free?",
      answer: "We offer a generous free tier for all users. For power users needing higher limits and premium features, we have Pro and Enterprise plans.",
      category: "Billing"
    },
    {
      question: "How do I export my chats?",
      answer: "You can export your chat history in PDF, Markdown, or JSON formats from the settings menu under the Data Management section.",
      category: "Usage"
    },
    {
      question: "Which models are available?",
      answer: "We support a range of models including Gemini 1.5, GPT-4, and Claude 3, depending on your subscription level.",
      category: "Technical"
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-16">
          <span className="text-indigo-600 font-bold text-sm tracking-widest uppercase">Support Center</span>
          <h1 className="text-4xl font-bold text-gray-900 mt-4 tracking-tight">Frequently Asked Questions</h1>
          <p className="text-gray-500 mt-4 text-lg">Everything you need to know about our AI assistant, billing, and security.</p>
        </header>

        <div className="relative mb-12">
          <i className="fa-solid fa-magnifying-glass absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <input
            type="text"
            placeholder="Search for answers..."
            className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-gray-800"
          />
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 ${activeIndex === idx ? 'bg-indigo-50/30 border-indigo-100 shadow-sm' : 'bg-white hover:border-gray-200'}`}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                className="w-full px-6 py-5 text-left flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-indigo-500 bg-indigo-50 px-2 py-1 rounded-md">{faq.category}</span>
                  <span className="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">{faq.question}</span>
                </div>
                <i className={`fa-solid fa-chevron-down text-gray-300 transition-transform duration-300 ${activeIndex === idx ? 'rotate-180 text-indigo-500' : ''}`}></i>
              </button>
              <div
                className={`px-6 transition-all duration-300 ease-in-out ${activeIndex === idx ? 'pb-6 max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
              >
                <p className="text-gray-600 leading-relaxed text-[15px]">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <footer className="mt-20 p-8 bg-indigo-600 rounded-3xl text-center text-white">
          <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
          <p className="text-indigo-100 mb-6 text-sm">Can't find the answer you're looking for? Please chat with our friendly team.</p>
          <button className="px-8 py-3 bg-white text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-colors shadow-lg">
            Get in touch
          </button>
        </footer>
      </div>
    </div>
  );
}

export default Faq;
