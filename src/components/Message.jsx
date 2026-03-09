import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function Message({ role, content }) {
  const isUser = role === "user";

  const CodeBlock = ({ children }) => {
    const [copied, setCopied] = useState(false);

    const copyCode = () => {
      navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className="relative my-2">
        <button
          onClick={copyCode}
          className="absolute top-2 right-2 text-xs bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-600"
        >
          {copied ? "Copied" : "Copy"}
        </button>

        <pre className="rounded-lg overflow-x-auto p-3 bg-[#0d1117] text-sm">
          <code>{children}</code>
        </pre>
      </div>
    );
  };

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
              code({ inline, children }) {
                return inline ? (
                  <code className="bg-gray-100 px-1 rounded text-pink-600">
                    {children}
                  </code>
                ) : (
                  <CodeBlock>{String(children)}</CodeBlock>
                );
              },
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