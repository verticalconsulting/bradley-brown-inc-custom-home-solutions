import React, { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { MessageCircle, X, Send, ChevronDown, Phone, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

const WHATSAPP_NUMBER = "16019541306";

export default function VisitorChatWidget() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("intro"); // intro | chat
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [sending, setSending] = useState(false);
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open) setUnread(0);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (!conversation) return;
    const unsubscribe = base44.agents.subscribeToConversation(conversation.id, (data) => {
      setMessages(data.messages || []);
      if (!open) {
        const agentMsgs = (data.messages || []).filter(m => m.role === "assistant").length;
        const prevAgent = messages.filter(m => m.role === "assistant").length;
        if (agentMsgs > prevAgent) setUnread(u => u + (agentMsgs - prevAgent));
      }
    });
    return () => unsubscribe();
  }, [conversation?.id, open]);

  const startChat = async () => {
    if (!name.trim()) return;
    setSending(true);
    const conv = await base44.agents.createConversation({
      agent_name: "home_advisor",
      metadata: { name, email, page_url: window.location.href },
    });
    setConversation(conv);
    setMessages(conv.messages || []);
    setStep("chat");

    // Send greeting message
    const updated = await base44.agents.addMessage(conv, {
      role: "user",
      content: `Hi! I'm ${name}. I have some questions about home building and renovations.`,
    });
    setMessages(updated.messages || []);
    setSending(false);
  };

  const sendMessage = async () => {
    if (!input.trim() || !conversation || sending) return;
    setSending(true);
    const text = input.trim();
    setInput("");
    // Optimistically add user message
    setMessages(prev => [...prev, { role: "user", content: text }]);
    const updated = await base44.agents.addMessage(conversation, {
      role: "user",
      content: text,
    });
    setMessages(updated.messages || []);
    setSending(false);
  };

  const goToWhatsApp = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}`, "_blank");
  };

  const visibleMessages = messages.filter(m => m.role === "user" || m.role === "assistant");

  return (
    <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-[60] flex flex-col items-end gap-3">
      {open && (
        <div className="w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden" style={{ maxHeight: "520px" }}>
          {/* Header */}
          <div className="bg-[#1E2D3D] text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-sky-400/30 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-sky-300" />
              </div>
              <div>
                <div className="font-semibold text-sm">Bradley Brown AI Assistant</div>
                <div className="text-xs text-sky-300">Instant answers · Cost estimates</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white transition-colors">
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          {step === "intro" ? (
            <div className="p-5 flex flex-col gap-4 flex-1">
              <p className="text-sm text-gray-600">👋 Hi there! Ask our AI assistant anything about home building, renovations, or cost estimates.</p>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Your Name *</label>
                <input
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400/30"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Enter your name"
                  onKeyDown={e => e.key === "Enter" && startChat()}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Email (optional)</label>
                <input
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400/30"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  onKeyDown={e => e.key === "Enter" && startChat()}
                />
              </div>
              <button
                onClick={startChat}
                disabled={!name.trim() || sending}
                className="w-full bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-white py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                {sending ? "Starting..." : "Chat with AI Assistant"}
              </button>
              <a
                href={base44.agents.getWhatsAppConnectURL("home_advisor")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4" /> Chat with AI on WhatsApp
              </a>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: 0 }}>
                {visibleMessages.length === 0 && (
                  <p className="text-xs text-gray-400 text-center">Starting conversation...</p>
                )}
                {visibleMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.role === "assistant" && (
                      <div className="w-6 h-6 bg-sky-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                        <Sparkles className="w-3 h-3 text-sky-500" />
                      </div>
                    )}
                    <div className={`max-w-[75%] rounded-xl px-3 py-2 text-sm ${
                      msg.role === "user"
                        ? "bg-[#1E2D3D] text-white rounded-br-sm"
                        : "bg-gray-100 text-gray-800 rounded-bl-sm"
                    }`}>
                      {msg.role === "assistant" ? (
                        <ReactMarkdown className="prose prose-sm max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 text-gray-800">
                          {msg.content}
                        </ReactMarkdown>
                      ) : (
                        <p>{msg.content}</p>
                      )}
                    </div>
                  </div>
                ))}
                {sending && visibleMessages[visibleMessages.length - 1]?.role === "user" && (
                  <div className="flex justify-start">
                    <div className="w-6 h-6 bg-sky-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                      <Sparkles className="w-3 h-3 text-sky-500" />
                    </div>
                    <div className="bg-gray-100 rounded-xl px-4 py-2.5">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              <div className="px-3 pb-1">
                <button
                  onClick={goToWhatsApp}
                  className="w-full text-xs bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] py-1.5 rounded-lg font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" /> Talk to a person on WhatsApp
                </button>
              </div>
              <div className="p-3 border-t border-gray-100 flex gap-2 flex-shrink-0">
                <input
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400/30"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask about costs, process, timelines..."
                  onKeyDown={e => e.key === "Enter" && sendMessage()}
                  disabled={sending}
                />
                <button
                  onClick={sendMessage}
                  disabled={sending || !input.trim()}
                  className="bg-sky-500 disabled:opacity-40 text-white p-2 rounded-lg transition-colors hover:bg-sky-600"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-14 h-14 bg-[#1E2D3D] hover:bg-sky-600 text-white rounded-full shadow-xl flex items-center justify-center transition-all relative"
        aria-label="Open chat"
      >
        {open ? <X className="w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
            {unread}
          </span>
        )}
      </button>
    </div>
  );
}