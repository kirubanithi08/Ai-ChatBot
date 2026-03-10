import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function Message({ sender, content }) {
  const isUser = sender === "USER";

  function CodeBlock({ inline, className, children }) {
    const [copied, setCopied] = useState(false);

    const language = className?.replace("language-", "") || "text";

    const handleCopy = async () => {
      try {
        const text = children?.[0] || "";
        await navigator.clipboard.writeText(text);
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
      <div className="relative my-4 rounded-lg overflow-hidden border border-gray-700">


        <div className="flex justify-between items-center bg-[#1e1e1e] px-3 py-1.5 text-xs text-gray-400">
          <span className="uppercase tracking-wider">{language}</span>

          <button
            onClick={handleCopy}
            className="px-2 py-0.5 rounded hover:bg-gray-600 transition-colors text-xs"
          >
            {copied ? "Copied ✓" : "Copy"}
          </button>
        </div>


        <pre className="overflow-x-auto p-4 bg-[#0d1117] text-sm">
          <code className={className}>
            {children}
          </code>
        </pre>

      </div>
    );
  }

  const MarkdownContent = (
    <div className="text-[15px] leading-[1.7] font-medium prose prose-sm prose-invert max-w-none">
      <ReactMarkdown
        rehypePlugins={[rehypeHighlight]}
        components={{
          code: CodeBlock,
          p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
          ul: ({ children }) => <ul className="list-disc ml-5 mb-3">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal ml-5 mb-3">{children}</ol>,
          li: ({ children }) => <li className="mb-1">{children}</li>,
          h1: ({ children }) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
          h2: ({ children }) => <h2 className="text-base font-bold mb-2">{children}</h2>,
          h3: ({ children }) => <h3 className="text-sm font-bold mb-1">{children}</h3>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );

  if (isUser) {
    return (
      <div className="w-full flex justify-end">
        <div className="max-w-[80%] px-4 py-2.5 bg-[#f4f4f4] text-[#171717] rounded-2xl rounded-br-sm shadow-sm">
          {MarkdownContent}
        </div>
      </div>
    );
  }


  return (
    <div className="w-full px-2">
      {MarkdownContent}
    </div>
  );
}

export default Message;