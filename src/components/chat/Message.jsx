import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";


function CodeBlock({ inline, className, children }) {
  const [copied, setCopied] = useState(false);
  const language = className?.replace("language-", "") || "text";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        Array.isArray(children) ? children.join("") : String(children ?? "")
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  if (inline) {
    return (
      <code className="bg-white/10 text-indigo-300 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    );
  }

  return (
    <div className="relative my-4 rounded-xl overflow-hidden border border-white/10">
      <div className="flex justify-between items-center bg-[#1a1a1a] px-4 py-2 text-xs text-gray-400">
        <span className="uppercase tracking-wider font-medium">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-white/10 transition-colors text-xs"
        >
          {copied ? (
            <>
              <i className="fa-solid fa-check text-green-400" />
              <span className="text-green-400">Copied</span>
            </>
          ) : (
            <>
              <i className="fa-regular fa-copy" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 bg-[#0d1117] text-sm m-0">
        <code className={className}>{children}</code>
      </pre>
    </div>
  );
}


function MarkdownText({ content }) {
  return (
    <div className="prose prose-sm max-w-none
      prose-p:text-gray-200 prose-p:mb-3
      prose-headings:text-white prose-headings:font-bold
      prose-ul:list-disc prose-ul:ml-5 prose-ul:mb-3
      prose-ol:list-decimal prose-ol:ml-5 prose-ol:mb-3
      prose-li:mb-1 prose-li:text-gray-200
      prose-strong:text-white
      prose-code:text-indigo-300 prose-code:bg-white/10
      prose-pre:p-0 prose-pre:bg-transparent prose-pre:m-0">
      <ReactMarkdown
        rehypePlugins={[rehypeHighlight]}
        components={{
          code:   CodeBlock,
          p:      ({ children }) => <p className="mb-3 last:mb-0 text-gray-200">{children}</p>,
          ul:     ({ children }) => <ul className="list-disc ml-5 mb-3">{children}</ul>,
          ol:     ({ children }) => <ol className="list-decimal ml-5 mb-3">{children}</ol>,
          li:     ({ children }) => <li className="mb-1 text-gray-200">{children}</li>,
          h1:     ({ children }) => <h1 className="text-lg font-bold mb-2 text-white">{children}</h1>,
          h2:     ({ children }) => <h2 className="text-base font-bold mb-2 text-white">{children}</h2>,
          h3:     ({ children }) => <h3 className="text-sm font-bold mb-1 text-white">{children}</h3>,
          strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

// ─── Message ──────────────────────────────────────────────────────────────────

function Message({ sender, content, streaming, streamingDone }) {
  const isUser = sender === "USER";

  const [renderMarkdown, setRenderMarkdown] = useState(!streaming);

  useEffect(() => {
    if (streamingDone || (!streaming && renderMarkdown === false)) {
      setRenderMarkdown(true);
    }
  }, [streaming, streamingDone]);

  if (isUser) {
    return (
      <div className="w-full flex justify-end">
        <div className="max-w-[80%] px-4 py-2.5 bg-[#2a2a2a] text-gray-100 rounded-2xl rounded-br-sm text-[15px] leading-[1.7] border border-white/5">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-1 text-[15px] leading-[1.7]">
      {!renderMarkdown ? (
        <div className="text-gray-200 whitespace-pre-wrap">
          {content}
          <span className="inline-block w-[2px] h-[1em] bg-indigo-400 ml-0.5 align-middle animate-pulse" />
        </div>
      ) : (
        <MarkdownText content={content} />
      )}
    </div>
  );
}

export default Message;