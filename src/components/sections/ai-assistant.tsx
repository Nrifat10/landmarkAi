"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Sparkles,
  Copy,
  RefreshCw,
  Trash2,
  Check,
  FileText,
  Download,
  Loader2,
  Bot,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content: `Hello 👋

Welcome to **Landmark Inter Gulf LLC**.

I'm **Landmark AI**, your official company assistant.

I can answer questions about our company, services, manpower supply, industrial support, construction, maintenance, certifications, projects and company profile.

How may I help you today?`,
};

const QUICK_QUESTIONS = [
  "Company Profile",
  "About Company",
  "Services",
  "Manpower Supply",
  "Equipment Rental",
  "Petro Services",
  "Projects",
  "Clients",
  "Contact Details",
  "Download Company Profile",
];

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showQuotationForm, setShowQuotationForm] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = useCallback(async (text: string, regenerate = false) => {
    if (!text.trim() || isStreaming) return;

    setInput("");
    setShowQuotationForm(false);

    const userMessage: Message = { role: "user", content: text };
    const apiMessages = regenerate
      ? [...messages.filter((m) => !m.isStreaming), { role: "user", content: text }]
      : [...messages.filter((m) => !m.isStreaming), userMessage];

    setMessages((prev) => [...prev, userMessage]);
    setMessages((prev) => [...prev, { role: "assistant", content: "", isStreaming: true }]);
    setIsStreaming(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: apiMessages.map((m) => ({
            role: m.role === "assistant" ? "model" : "user",
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error("No response stream");

      let accumulatedText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const jsonStr = line.slice(6).trim();
            if (!jsonStr) continue;
            try {
              const data = JSON.parse(jsonStr);
              if (data.text) {
                accumulatedText += data.text;
                setMessages((prev) => {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1] = {
                    role: "assistant",
                    content: accumulatedText,
                    isStreaming: !data.done,
                  };
                  return newMessages;
                });
              }
              if (data.done) {
                setMessages((prev) => {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1] = {
                    role: "assistant",
                    content: accumulatedText,
                    isStreaming: false,
                  };
                  return newMessages;
                });
              }
            } catch { }
          }
        }
      }

      const lowerText = text.toLowerCase();
      if (lowerText.includes("quotation") || lowerText.includes("quote")) {
        setTimeout(() => setShowQuotationForm(true), 500);
      }
    } catch {
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = {
          role: "assistant",
          content: "I apologize, but I encountered an error. Please try again.",
          isStreaming: false,
        };
        return newMessages;
      });
    } finally {
      setIsStreaming(false);
    }
  }, [messages, isStreaming]);

  const handleQuickQuestion = (question: string) => {
    if (question === "Download Company Profile") {
      const link = document.createElement("a");
      link.href = "/landmark-company-profile.pdf";
      link.download = "Landmark-Inter-Gulf-Company-Profile.pdf";
      link.click();
      return;
    }
    sendMessage(question);
  };

  const handleCopy = async (content: string, index: number) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch { }
  };

  const handleRegenerate = () => {
    if (isStreaming || messages.length < 2) return;
    const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
    if (!lastUserMessage) return;
    setMessages((prev) => prev.slice(0, -1));
    setTimeout(() => sendMessage(lastUserMessage.content, true), 100);
  };

  const handleClearChat = () => {
    setMessages([WELCOME_MESSAGE]);
    setShowQuotationForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) sendMessage(input.trim());
  };

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      >
        <AnimatePresence mode="wait">
          {!isOpen && (
            <motion.button
              key="toggle"
              onClick={() => setIsOpen(true)}
              className="group relative flex h-16 w-16 items-center justify-center rounded-full shadow-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              aria-label="Open Landmark AI Assistant"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-primary/80 backdrop-blur-md border-2 border-accent/40 shadow-xl" />
              <div className="absolute inset-0 rounded-full border-2 border-accent/30 animate-ping" style={{ animationDuration: "2s" }} />
              <div className="relative flex items-center gap-1">
                <Bot className="h-7 w-7 text-accent" />
                <Sparkles className="h-4 w-4 text-accent absolute -top-1 -right-1" />
              </div>
              <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-primary text-primary-foreground px-3 py-1.5 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Ask Landmark AI
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[420px] h-[600px] max-h-[calc(100vh-3rem)] flex flex-col rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-primary/95 backdrop-blur-xl border-2 border-accent/30 rounded-2xl" />

            <div className="relative flex items-center justify-between px-4 py-3 border-b border-accent/20 bg-primary/80">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent/80 ring-2 ring-accent/30">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-primary" />
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-primary-foreground flex items-center gap-1.5">
                    Landmark AI
                    <Sparkles className="h-3 w-3 text-accent" />
                  </h3>
                  <p className="text-[10px] text-primary-foreground/60 font-medium">Official Company Assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleClearChat}
                  className="flex h-8 w-8 items-center justify-center rounded-md text-primary-foreground/60 hover:text-accent hover:bg-accent/10 transition-colors"
                  aria-label="Clear chat"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-md text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
                  aria-label="Close chat"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="relative flex-1 overflow-y-auto custom-scrollbar px-4 py-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`group max-w-[85%] ${message.role === "user" ? "items-end" : "items-start"}`}>
                    {message.role === "assistant" && (
                      <div className="flex items-center gap-1.5 mb-1">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20">
                          <Bot className="h-3.5 w-3.5 text-accent" />
                        </div>
                        <span className="text-[10px] font-semibold text-primary-foreground/50">Landmark AI</span>
                      </div>
                    )}
                    <div className={`relative rounded-2xl px-4 py-2.5 text-sm ${message.role === "user" ? "bg-accent text-accent-foreground rounded-br-sm" : "bg-primary-foreground/10 text-primary-foreground rounded-bl-sm border border-accent/10"}`}>
                      {message.role === "assistant" ? (
                        <div className="prose prose-sm prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {message.content || (message.isStreaming ? "..." : "")}
                          </ReactMarkdown>
                          {message.isStreaming && !message.content && (
                            <div className="flex items-center gap-1 py-1">
                              <span className="h-2 w-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "0ms" }} />
                              <span className="h-2 w-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "150ms" }} />
                              <span className="h-2 w-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "300ms" }} />
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      )}
                      {message.role === "assistant" && !message.isStreaming && message.content && (
                        <button
                          onClick={() => handleCopy(message.content, index)}
                          className="absolute -bottom-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary border border-accent/30 opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Copy message"
                        >
                          {copiedIndex === index ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3 text-accent" />}
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {messages.length > 1 && !isStreaming && messages[messages.length - 1].role === "assistant" && (
                <div className="flex justify-start">
                  <button
                    onClick={handleRegenerate}
                    className="inline-flex items-center gap-1.5 rounded-md border border-accent/30 bg-accent/5 px-3 py-1.5 text-xs font-semibold text-accent hover:bg-accent/10 transition-colors"
                  >
                    <RefreshCw className="h-3 w-3" />
                    Regenerate
                  </button>
                </div>
              )}

              {messages.length === 1 && !isStreaming && (
                <div className="space-y-2 pt-2">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-primary-foreground/40 px-1">Quick Questions</p>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        onClick={() => handleQuickQuestion(q)}
                        className="inline-flex items-center rounded-full border border-accent/30 bg-accent/5 px-3 py-1.5 text-xs font-medium text-primary-foreground/80 hover:bg-accent/10 hover:border-accent/50 hover:text-accent transition-all"
                      >
                        {q === "Download Company Profile" && <Download className="h-3 w-3 mr-1" />}
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <AnimatePresence>
                {showQuotationForm && <QuotationForm onClose={() => setShowQuotationForm(false)} />}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            <div className="relative border-t border-accent/20 bg-primary/80 p-3">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  disabled={isStreaming}
                  className="flex-1 rounded-full bg-primary-foreground/10 border border-accent/20 px-4 py-2.5 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-accent/50 focus:bg-primary-foreground/15 transition-colors disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isStreaming}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Send message"
                >
                  {isStreaming ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </button>
              </form>
              <p className="mt-1.5 text-center text-[9px] text-primary-foreground/30">
                Powered by Groq AI · Landmark Inter Gulf LLC
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function QuotationForm({ onClose }: { onClose: () => void }) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setTimeout(onClose, 3000);
    }, 1500);
  };

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="rounded-xl border-2 border-green-500/30 bg-green-500/10 p-4 text-center">
        <Check className="h-8 w-8 text-green-400 mx-auto mb-2" />
        <p className="text-sm font-bold text-primary-foreground">Quotation Request Sent!</p>
        <p className="text-xs text-primary-foreground/70 mt-1">Our team will contact you within one business day.</p>
      </motion.div>
    );
  }

  const inputClass = "w-full rounded-md bg-primary-foreground/10 border border-accent/20 px-3 py-2 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-accent/50";

  return (
    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="rounded-xl border-2 border-accent/30 bg-primary/90 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-accent flex items-center gap-1.5"><FileText className="h-4 w-4" /> Request Quotation</h4>
        <button onClick={onClose} className="text-primary-foreground/40 hover:text-primary-foreground"><X className="h-4 w-4" /></button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <input required placeholder="Company Name" className={inputClass} />
          <input required placeholder="Contact Person" className={inputClass} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <input required type="tel" placeholder="Phone" className={inputClass} />
          <input required type="email" placeholder="Email" className={inputClass} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <input required placeholder="Country" className={inputClass} />
          <input required placeholder="Project Location" className={inputClass} />
        </div>
        <select required className={inputClass} defaultValue="">
          <option value="" disabled>Select Required Service</option>
          <option>Manpower Supply</option>
          <option>Equipment Rental</option>
          <option>Industrial Trading</option>
          <option>Petro Services</option>
          <option>Hospitality Services</option>
          <option>Car Rental & Transport</option>
        </select>
        <textarea required placeholder="Project Description" rows={3} className={inputClass} />
        <button type="submit" disabled={submitting} className="w-full rounded-md bg-accent text-accent-foreground py-2.5 text-sm font-bold hover:bg-accent/90 disabled:opacity-50 transition-colors flex items-center justify-center gap-2">
          {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</> : <><Send className="h-4 w-4" /> Submit Request</>}
        </button>
      </form>
    </motion.div>
  );
}
