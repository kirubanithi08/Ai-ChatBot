import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function Message({ role, content }) {
  const isUser = role === "user";

  function CodeBlock({ inline, className, children }) {
    const [copied, setCopied] = useState(false);

    const code = String(children).replace(/\n$/, "");
    const language = className?.replace("language-", "") || "text";

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Copy failed", err);
      }
    };

    if (inline) {
      return (
        <code className="bg-gray-100 px-1.5 py-0.5 rounded text-pink-600 text-sm">
          {children}
        </code>
      );
    }

    return (
      <div className="relative my-3 rounded-lg overflow-hidden border border-gray-700">

        <div className="flex justify-between items-center bg-[#1e1e1e] px-3 py-1.5 text-xs text-gray-400">
          <span className="uppercase tracking-wider">{language}</span>
          <button
            onClick={handleCopy}
            className="p-1 rounded hover:bg-gray-600 transition-colors flex items-center justify-center"
          >
            {copied ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                stroke="#4ade80"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                stroke="#9ca3af"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            )}
          </button>
        </div>


        <pre className="overflow-x-auto p-4 bg-[#0d1117] text-sm rounded-b-lg">
          <code className={className}>{code}</code>
        </pre>
      </div>
    );
  }

  return (
    <div
      className={`w-full flex ${isUser ? "justify-end" : "justify-start"
        } animate-in fade-in slide-in-from-bottom-2 duration-300`}
    >
      <div
        className={`
          max-w-[85%] px-5 py-3 shadow-sm transition-all duration-200
          ${isUser
            ? "bg-gradient-to-tr from-indigo-600 to-violet-500 text-white rounded-[22px] rounded-br-[4px]"
            : "bg-white border border-gray-100 text-gray-800 rounded-[22px] rounded-bl-[4px]"
          }
        `}
      >
        <div className="text-[15px] leading-[1.6] font-medium prose prose-sm max-w-none">
          <ReactMarkdown
            rehypePlugins={[rehypeHighlight]}
            components={{
              code: CodeBlock,
              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
              ul: ({ children }) => <ul className="list-disc ml-4 mb-2">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal ml-4 mb-2">{children}</ol>,
              li: ({ children }) => <li className="mb-1">{children}</li>,
              h1: ({ children }) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
              h2: ({ children }) => <h2 className="text-base font-bold mb-2">{children}</h2>,
              h3: ({ children }) => <h3 className="text-sm font-bold mb-1">{children}</h3>,
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default Message;