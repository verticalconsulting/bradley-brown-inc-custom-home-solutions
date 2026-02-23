import React, { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { MessageCircle, X, Send, ChevronDown, Phone } from "lucide-react";

const WHATSAPP_NUMBER = "16012345678"; // Update with real number

export default function VisitorChatWidget() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("intro"); // intro | chat
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [input, setInput] = useState("");
  const [session, setSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [sending, setSending] = useState(false);
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef(null);
  const pollRef = useRef(null);

  // Poll for new messages
  useEffect(() => {
    if (!session) return;
    pollRef.current = setInterval(async () => {
      const updated = await base44.entities.ChatSession.filter({ id: session.id });
      if (updated && updated[0]) {
        const s = updated[0];
        setMessages(s.messages || []);
        if (!open) {
          const agentMsgs = (s.messages || []).filter(m => m.role === "agent").length;
          const prevAgent = (messages || []).filter(m => m.role === "agent").length;
          if (agentMsgs > prevAgent) setUnread(u => u + (agentMsgs - prevAgent));
        }
        if (s.transferred_to_whatsapp) {
          clearInterval(pollRef.current);
        }
        setSession(s);
      }
    }, 3000);
    return () => clearInterval(pollRef.current);
  }, [session, open]);

  useEffect(() => {
    if (open) setUnread(0);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const startChat = async () => {
    if (!name.trim()) return;
    const s = await base44.entities.ChatSession.create({
      visitor_name: name,
      visitor_email: email,
      status: "waiting",
      messages: [{ role: "visitor", text: `Hi! I'm ${name}.`, timestamp: new Date().toISOString() }],
      page_url: window.location.href,
    });
    setSession(s);
    setMessages(s.messages || []);
    setStep("chat");
  };

  const sendMessage = async () => {
    if (!input.trim() || !session) return;
    setSending(true);
    const newMsg = { role: "visitor", text: input.trim(), timestamp: new Date().toISOString() };
    const updated = [...messages, newMsg];
    setMessages(updated);
    setInput("");
    await base44.entities.ChatSession.update(session.id, { messages: updated, status: "active" });
    setSending(false);
  };

  const transferToWhatsApp = async () => {
    const chatText = messages.map(m => `${m.role === "visitor" ? name : "Agent"}: ${m.text}`).join("\n");
    const waText = encodeURIComponent(`Hi! I was just chatting with Bradley Brown Inc. support.\n\nChat history:\n${chatText}`);
    if (session) {
      await base44.entities.ChatSession.update(session.id, { status: "transferred", transferred_to_whatsapp: true });
    }
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`, "_blank");
  };

  const transferred = session?.transferred_to_whatsapp;

  return (
    <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-[60] flex flex-col items-end gap-3">
      {open && (
        <div className="w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden" style={{ maxHeight: "500px" }}>
          {/* Header */}
          <div className="bg-[#003D82] text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <div className="font-semibold text-sm">Bradley Brown Inc.</div>
                <div className="text-xs text-blue-200">Live Support</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white transition-colors">
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          {step === "intro" ? (
            <div className="p-5 flex flex-col gap-4 flex-1">
              <p className="text-sm text-gray-600">👋 Hi there! Chat with our team or continue on WhatsApp.</p>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Your Name *</label>
                <input
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003D82]/30"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Enter your name"
                  onKeyDown={e => e.key === "Enter" && startChat()}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Email (optional)</label>
                <input
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003D82]/30"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  onKeyDown={e => e.key === "Enter" && startChat()}
                />
              </div>
              <button
                onClick={startChat}
                className="w-full bg-[#003D82] hover:bg-[#002855] text-white py-2.5 rounded-lg text-sm font-semibold transition-colors"
              >
                Start Chat
              </button>
              <button
                onClick={transferToWhatsApp}
                className="w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4" /> Continue on WhatsApp
              </button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: 0 }}>
                {messages.length === 0 && (
                  <p className="text-xs text-gray-400 text-center">An agent will be with you shortly...</p>
                )}
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "visitor" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[75%] rounded-xl px-3 py-2 text-sm ${
                      msg.role === "visitor"
                        ? "bg-[#003D82] text-white rounded-br-sm"
                        : "bg-gray-100 text-gray-800 rounded-bl-sm"
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {transferred && (
                  <p className="text-xs text-center text-green-600 bg-green-50 rounded-lg p-2">
                    Chat transferred to WhatsApp ✓
                  </p>
                )}
                <div ref={bottomRef} />
              </div>

              {!transferred && (
                <>
                  <div className="px-3 pb-1">
                    <button
                      onClick={transferToWhatsApp}
                      className="w-full text-xs bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] py-1.5 rounded-lg font-medium flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" /> Transfer to WhatsApp
                    </button>
                  </div>
                  <div className="p-3 border-t border-gray-100 flex gap-2 flex-shrink-0">
                    <input
                      className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003D82]/30"
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      placeholder="Type a message..."
                      onKeyDown={e => e.key === "Enter" && sendMessage()}
                    />
                    <button
                      onClick={sendMessage}
                      disabled={sending || !input.trim()}
                      className="bg-[#003D82] disabled:opacity-40 text-white p-2 rounded-lg transition-colors hover:bg-[#002855]"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-14 h-14 bg-[#003D82] hover:bg-[#002855] text-white rounded-full shadow-xl flex items-center justify-center transition-all"
        aria-label="Open chat"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
            {unread}
          </span>
        )}
      </button>
    </div>
  );
}