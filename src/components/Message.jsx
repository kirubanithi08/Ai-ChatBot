import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function Message({ role, content }) {
  const isUser = role === "user";

  return (
    <div className={`w-full flex ${isUser ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}>

      <div
        className={`
          max-w-[85%] px-5 py-3 shadow-sm transition-all duration-200
          ${isUser
            ? "bg-gradient-to-tr from-indigo-600 to-violet-500 text-white rounded-[22px] rounded-br-[4px] shadow-indigo-100"
            : "bg-white border border-gray-100 text-gray-800 rounded-[22px] rounded-bl-[4px] shadow-gray-50"
          }
        `}
      >
        <div className="text-[15px] leading-[1.6] font-medium prose prose-sm max-w-none">
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={atomDark}
                    language={match[1]}
                    PreTag="div"
                    className="rounded-lg my-2"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className={`${className} bg-gray-100 px-1 rounded text-pink-600`} {...props}>
                    {children}
                  </code>
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

