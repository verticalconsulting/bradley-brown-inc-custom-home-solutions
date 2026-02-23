import React, { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { MessageCircle, Send, Phone, RefreshCw, CheckCircle, X } from "lucide-react";

const WHATSAPP_NUMBER = "16012345678";

export default function AgentChat() {
  const [sessions, setSessions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef(null);
  const pollRef = useRef(null);

  const fetchSessions = async () => {
    const data = await base44.entities.ChatSession.list("-updated_date", 50);
    setSessions(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchSessions();
    pollRef.current = setInterval(fetchSessions, 4000);
    return () => clearInterval(pollRef.current);
  }, []);

  // Keep selected session in sync
  useEffect(() => {
    if (selected) {
      const updated = sessions.find(s => s.id === selected.id);
      if (updated) setSelected(updated);
    }
  }, [sessions]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selected?.messages]);

  const sendReply = async () => {
    if (!input.trim() || !selected) return;
    const newMsg = { role: "agent", text: input.trim(), timestamp: new Date().toISOString() };
    const updated = [...(selected.messages || []), newMsg];
    setInput("");
    await base44.entities.ChatSession.update(selected.id, { messages: updated, status: "active" });
    await fetchSessions();
  };

  const closeSession = async (id) => {
    await base44.entities.ChatSession.update(id, { status: "closed" });
    if (selected?.id === id) setSelected(null);
    fetchSessions();
  };

  const transferToWhatsApp = async (session) => {
    const chatText = (session.messages || [])
      .map(m => `${m.role === "visitor" ? session.visitor_name : "Agent"}: ${m.text}`)
      .join("\n");
    const waText = encodeURIComponent(`Chat with ${session.visitor_name}:\n\n${chatText}`);
    await base44.entities.ChatSession.update(session.id, { status: "transferred", transferred_to_whatsapp: true });
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`, "_blank");
    fetchSessions();
  };

  const statusColor = {
    waiting: "bg-yellow-400",
    active: "bg-green-400",
    closed: "bg-gray-400",
    transferred: "bg-blue-400",
  };

  const activeSessions = sessions.filter(s => s.status !== "closed");
  const closedSessions = sessions.filter(s => s.status === "closed");

  return (
    <div className="min-h-screen bg-[#F3F4F6] pt-20">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[#003D82] rounded-xl flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#1E2D3D]">Live Chat — Agent Dashboard</h1>
            <p className="text-sm text-gray-500">{activeSessions.length} active conversation{activeSessions.length !== 1 ? "s" : ""}</p>
          </div>
          <button onClick={fetchSessions} className="ml-auto p-2 text-gray-400 hover:text-[#003D82] transition-colors" title="Refresh">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-180px)]">
          {/* Sessions list */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-y-auto">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-semibold text-sm text-gray-700">Conversations</h2>
            </div>
            {loading && <p className="text-sm text-gray-400 text-center py-8">Loading...</p>}
            {!loading && sessions.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-8">No conversations yet</p>
            )}
            {[...activeSessions, ...closedSessions].map(s => {
              const lastMsg = (s.messages || []).slice(-1)[0];
              const unreadAgent = (s.messages || []).filter(m => m.role === "visitor").length;
              return (
                <button
                  key={s.id}
                  onClick={() => setSelected(s)}
                  className={`w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors ${selected?.id === s.id ? "bg-blue-50" : ""}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${statusColor[s.status] || "bg-gray-400"}`} />
                    <span className="font-medium text-sm text-[#1E2D3D] truncate">{s.visitor_name}</span>
                    <span className="ml-auto text-xs text-gray-400 capitalize">{s.status}</span>
                  </div>
                  {lastMsg && (
                    <p className="text-xs text-gray-500 truncate pl-4">{lastMsg.text}</p>
                  )}
                  {s.visitor_email && (
                    <p className="text-xs text-gray-400 pl-4 truncate">{s.visitor_email}</p>
                  )}
                </button>
              );
            })}
          </div>

          {/* Chat area */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
            {!selected ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <MessageCircle className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">Select a conversation to start replying</p>
                </div>
              </div>
            ) : (
              <>
                {/* Chat header */}
                <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3 flex-shrink-0">
                  <div className="w-9 h-9 bg-[#003D82]/10 rounded-full flex items-center justify-center">
                    <span className="text-[#003D82] font-bold text-sm">{selected.visitor_name[0]?.toUpperCase()}</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-[#1E2D3D] text-sm">{selected.visitor_name}</div>
                    {selected.visitor_email && <div className="text-xs text-gray-400">{selected.visitor_email}</div>}
                    {selected.page_url && <div className="text-xs text-gray-400 truncate">Page: {selected.page_url}</div>}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => transferToWhatsApp(selected)}
                      className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" /> WhatsApp
                    </button>
                    {selected.status !== "closed" && (
                      <button
                        onClick={() => closeSession(selected.id)}
                        className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                      >
                        <X className="w-3.5 h-3.5" /> Close
                      </button>
                    )}
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-5 space-y-3">
                  {(selected.messages || []).map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === "agent" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[70%] rounded-xl px-4 py-2.5 text-sm ${
                        msg.role === "agent"
                          ? "bg-[#003D82] text-white rounded-br-sm"
                          : "bg-gray-100 text-gray-800 rounded-bl-sm"
                      }`}>
                        <p>{msg.text}</p>
                        <p className={`text-xs mt-1 ${msg.role === "agent" ? "text-blue-200" : "text-gray-400"}`}>
                          {msg.role === "agent" ? "You" : selected.visitor_name} · {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}
                        </p>
                      </div>
                    </div>
                  ))}
                  {selected.transferred_to_whatsapp && (
                    <div className="flex justify-center">
                      <span className="text-xs bg-green-50 text-green-700 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5" /> Transferred to WhatsApp
                      </span>
                    </div>
                  )}
                  <div ref={bottomRef} />
                </div>

                {/* Reply input */}
                {selected.status !== "closed" && !selected.transferred_to_whatsapp && (
                  <div className="p-4 border-t border-gray-100 flex gap-2 flex-shrink-0">
                    <input
                      className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003D82]/30"
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      placeholder={`Reply to ${selected.visitor_name}...`}
                      onKeyDown={e => e.key === "Enter" && sendReply()}
                    />
                    <button
                      onClick={sendReply}
                      disabled={!input.trim()}
                      className="bg-[#003D82] disabled:opacity-40 text-white px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-[#002855] transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}