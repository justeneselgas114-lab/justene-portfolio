"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { Bot, X, Send } from "lucide-react";
import { chat, type ChatMessage } from "@/app/actions/chat";
import { cn } from "@/lib/utils";

const SUGGESTIONS = [
  "What services does Justene offer?",
  "How much does a project cost?",
  "Is Justene available now?",
  "Show me past projects",
];

const GREETING: ChatMessage = {
  role: "assistant",
  content:
    "Hi! I'm Justene's AI assistant. Ask me about his services, past projects, availability, or how to get in touch.",
};

export function AgentButton() {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [pending, startTransition] = useTransition();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, pending]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || pending) return;
    const userMsg: ChatMessage = { role: "user", content: trimmed };
    const nextHistory = [...history, userMsg];
    setHistory(nextHistory);
    setInput("");

    startTransition(async () => {
      const result = await chat(nextHistory.slice(0, -1), trimmed);
      if (result.ok) {
        setHistory((h) => [...h, { role: "assistant", content: result.reply }]);
      } else {
        setHistory((h) => [
          ...h,
          { role: "assistant", content: result.error },
        ]);
      }
    });
  }

  return (
    <>
      {/* Floating button — pill with icon + label when closed, round X when open */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat with Justene's AI assistant"}
        className={cn(
          "fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[60] flex items-center bg-accent text-bg shadow-lg shadow-accent/30 transition-all hover:scale-[1.03] hover:bg-accent-hover",
          open
            ? "h-14 w-14 rounded-full justify-center"
            : "h-14 w-14 sm:w-auto sm:pl-4 sm:pr-5 rounded-full justify-center sm:gap-2.5 group"
        )}
      >
        {open ? (
          <X size={22} />
        ) : (
          <>
            <span className="relative flex">
              <Bot size={22} />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-accent" />
            </span>
            <span className="hidden sm:inline font-sans text-sm font-medium whitespace-nowrap">Ask my AI</span>
          </>
        )}
      </button>
      {/* Tooltip label that pulses on first load to draw attention */}
      {!open && (
        <span
          aria-hidden="true"
          className="fixed bottom-[5.5rem] right-6 z-[59] hidden lg:block font-mono text-[10px] text-fg-subtle bg-bg-elevated border border-border rounded-md px-2 py-1 shadow-sm animate-pulse pointer-events-none"
        >
          ↓ ask anything
        </span>
      )}

      {/* Chat panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Chat with Justene's AI assistant"
          className="fixed bottom-24 right-6 z-[60] w-[calc(100vw-3rem)] sm:w-96 h-[32rem] max-h-[calc(100vh-8rem)] rounded-2xl border border-border bg-bg-elevated shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="px-4 py-3 border-b border-border bg-bg flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-accent/10 flex items-center justify-center">
              <Bot size={18} className="text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-serif text-sm text-fg font-medium leading-tight">Justene&apos;s AI Assistant</p>
              <p className="font-mono text-[10px] text-fg-subtle leading-tight mt-0.5 flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                online · powered by Claude
              </p>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {history.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed font-sans",
                  m.role === "user"
                    ? "ml-auto bg-accent text-bg"
                    : "mr-auto bg-bg text-fg border border-border"
                )}
              >
                {m.content}
              </div>
            ))}
            {pending && (
              <div className="mr-auto rounded-xl px-3 py-2 bg-bg border border-border">
                <span className="inline-flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-fg-subtle animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-fg-subtle animate-bounce" style={{ animationDelay: "0.15s" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-fg-subtle animate-bounce" style={{ animationDelay: "0.3s" }} />
                </span>
              </div>
            )}

            {history.length === 1 && (
              <div className="pt-2 space-y-1.5">
                <p className="font-mono text-[10px] text-fg-subtle px-1">Suggested questions:</p>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    disabled={pending}
                    className="block w-full text-left text-xs text-fg-muted px-3 py-2 rounded-lg border border-border hover:border-accent/40 hover:bg-bg transition-colors disabled:opacity-50"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="border-t border-border p-3 bg-bg flex items-center gap-2"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={pending}
              placeholder="Ask about services, pricing, projects..."
              className="flex-1 bg-bg-elevated border border-border rounded-lg px-3 py-2 text-sm font-sans text-fg placeholder-fg-subtle focus:outline-none focus:ring-2 focus:ring-ring focus:border-accent"
            />
            <button
              type="submit"
              disabled={pending || !input.trim()}
              aria-label="Send message"
              className="h-9 w-9 rounded-lg bg-accent text-bg flex items-center justify-center hover:bg-accent-hover transition-colors disabled:opacity-40 disabled:pointer-events-none"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
