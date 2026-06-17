"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { X, Send, RotateCcw, Minimize2, Maximize2, Bot } from "lucide-react";
import { fetchCollegeContext } from "@/lib/supabase";

// ============================================================
// 🔑 YOUR GROQ API KEY
// ============================================================
const GROQ_API_KEY = process.env.GROQ_API_KEY // 👈 paste your Groq key here

// Fallback context if MongoDB fails
const FALLBACK_CONTEXT = `You are Campus Buddy AI for United University, Prayagraj (UU Prayagraj).
UU Prayagraj is a State Private University established in 2021.
Campus size is 250 acres.
Contact: Toll Free: 1800-121-8797, Helpline: 6390166660, 6389209921
Website: https://uniteduniversity.edu.in/`;

type Role = "user" | "bot";

interface Message {
  id: string;
  role: Role;
  text: string;
  time: string;
}

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

const QUICK_QUESTIONS = [
  { icon: "🎓", label: "Admission process" },
  { icon: "💼", label: "Placement stats" },
  { icon: "📚", label: "Courses offered" },
  { icon: "🏠", label: "Hostel facilities" },
  { icon: "📞", label: "Contact info" },
  { icon: "🎪", label: "Campus events" },
];

function getTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function CampusBuddyChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [collegeContext, setCollegeContext] = useState("");
  const [contextLoaded, setContextLoaded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // Fetch college data from Supabase on mount
  useEffect(() => {
    fetchCollegeContext()
      .then(ctx => {
        setCollegeContext(ctx || FALLBACK_CONTEXT);
        setContextLoaded(true);
      })
      .catch(() => {
        setCollegeContext(FALLBACK_CONTEXT);
        setContextLoaded(true);
      });
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, isMinimized]);

  // Welcome message on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: "welcome",
        role: "bot",
        text: "👋 Hello! I'm **Campus Buddy AI**, your smart assistant for United University, Prayagraj (UU Prayagraj)!\n\nI can help you with admissions, courses, placements, events, hostel info, and much more. What would you like to know? 🎓",
        time: getTime(),
      }]);
    }
  }, [isOpen]);

  const sendMessage = useCallback(async (text?: string) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;

    setInput("");
    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      text: userText,
      time: getTime(),
    };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    const newHistory: ChatMessage[] = [
      ...chatHistory,
      { role: "user", content: userText }
    ];

    try {
      const systemPrompt = `You are Campus Buddy AI, a smart and friendly virtual assistant for United University, Prayagraj (UU Prayagraj).

Here is the official UU Prayagraj college data:

${collegeContext || FALLBACK_CONTEXT}

INSTRUCTIONS:
- Answer questions using the college data above
- Be friendly, enthusiastic and concise (2-4 sentences)
- For missing info (fees, timetable, results), direct to admissions office or https://uniteduniversity.edu.in/
- Always respond in the same language the user writes in`;

      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            { role: "system", content: systemPrompt },
            ...newHistory
          ],
          max_tokens: 500,
          temperature: 0.75,
        })
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error.message);

      const reply = data.choices?.[0]?.message?.content
        || "I'm having trouble responding right now. Please try again!";

      setChatHistory([...newHistory, { role: "assistant", content: reply }]);
      setMessages(prev => [...prev, {
        id: `b-${Date.now()}`,
        role: "bot",
        text: reply,
        time: getTime(),
      }]);

    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "";
      const isKeyError = msg.includes("401") || msg.includes("403") || msg.includes("api_key");
      setMessages(prev => [...prev, {
        id: `e-${Date.now()}`,
        role: "bot",
        text: isKeyError
          ? "⚠️ Groq API key invalid! Get your free key at console.groq.com"
          : "😔 Something went wrong. Please try again!",
        time: getTime(),
      }]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, chatHistory, collegeContext]);

  const handleReset = () => {
    setMessages([{
      id: "reset",
      role: "bot",
      text: "✨ Chat cleared! I'm ready to help you again. What would you like to know about UU Prayagraj? 🎓",
      time: getTime(),
    }]);
    setChatHistory([]);
  };

  const handleToggle = () => {
    setIsOpen(prev => !prev);
    setIsMinimized(false);
  };

  const renderText = (text: string) => {
    return text.split('\n').map((line, i) => {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <span key={i}>
          {parts.map((part, j) =>
            j % 2 === 1 ? <strong key={j}>{part}</strong> : part
          )}
          {i < text.split('\n').length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <>
      <style>{`
        @keyframes cb-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-8px) rotate(1deg); }
          75% { transform: translateY(-4px) rotate(-1deg); }
        }
        @keyframes cb-glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(59,130,246,0.5), 0 0 40px rgba(139,92,246,0.3); }
          50% { box-shadow: 0 0 30px rgba(59,130,246,0.8), 0 0 60px rgba(139,92,246,0.5); }
        }
        @keyframes cb-ring-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes cb-ring-spin-reverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        @keyframes cb-chat-open {
          from { opacity: 0; transform: scale(0.92) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes cb-dot-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
        @keyframes cb-badge-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.15); opacity: 0.8; }
        }
        .cb-float { animation: cb-float 4s ease-in-out infinite; }
        .cb-glow { animation: cb-glow-pulse 2.5s ease-in-out infinite; }
        .cb-ring-1 { animation: cb-ring-spin 8s linear infinite; }
        .cb-ring-2 { animation: cb-ring-spin-reverse 5s linear infinite; }
        .cb-chat-open { animation: cb-chat-open 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .cb-dot-1 { animation: cb-dot-bounce 1.4s ease-in-out infinite 0ms; }
        .cb-dot-2 { animation: cb-dot-bounce 1.4s ease-in-out infinite 200ms; }
        .cb-dot-3 { animation: cb-dot-bounce 1.4s ease-in-out infinite 400ms; }
        .cb-badge { animation: cb-badge-pulse 2s ease-in-out infinite; }
        .cb-scrollbar::-webkit-scrollbar { width: 4px; }
        .cb-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .cb-scrollbar::-webkit-scrollbar-thumb { background: #0c2340; border-radius: 4px; }
        .cb-glass {
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
        }
        .cb-msg-user { background: linear-gradient(135deg, #0c2340 0%, #1a3a6b 100%); border-radius: 18px 18px 4px 18px; }
        .cb-msg-bot { background: rgba(255,255,255,0.95); border: 1px solid rgba(12,35,64,0.08); border-radius: 18px 18px 18px 4px; box-shadow: 0 2px 12px rgba(0,0,0,0.06); }
        .cb-input-wrap:focus-within { border-color: #0c2340; box-shadow: 0 0 0 3px rgba(12,35,64,0.1); }
        .cb-send-btn:not(:disabled):hover { transform: scale(1.05); box-shadow: 0 4px 15px rgba(169,29,34,0.4); }
        .cb-quick-btn:hover { background: #0c2340 !important; color: white !important; transform: translateY(-1px); }
        .cb-avatar-wrap:hover .cb-float { animation-play-state: paused; }
      `}</style>

      <div style={{ position: "fixed", top: "20px", right: "20px", zIndex: 99999, display: "flex", flexDirection: "column", alignItems: "flex-end", fontFamily: "'Geist Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}>

        {/* CHAT WINDOW */}
        {isOpen && (
          <div ref={chatWindowRef} className="cb-chat-open cb-glass"
            style={{ width: "clamp(300px, 90vw, 380px)", height: isMinimized ? "auto" : "560px", borderRadius: "20px", overflow: "hidden", display: "flex", flexDirection: "column", marginBottom: "16px", border: "1px solid rgba(12,35,64,0.12)", boxShadow: "0 24px 80px rgba(0,0,0,0.18), 0 8px 32px rgba(12,35,64,0.12)" }}>

            {/* Header */}
            <div style={{ background: "linear-gradient(135deg, #0c2340 0%, #1a3a6b 60%, #0c2340 100%)", padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", overflow: "hidden", flexShrink: 0 }}>
              <div style={{ position: "absolute", top: "-20px", right: "40px", width: "80px", height: "80px", background: "rgba(212,175,55,0.08)", borderRadius: "50%", filter: "blur(20px)" }} />
              <div style={{ display: "flex", alignItems: "center", gap: "10px", position: "relative", zIndex: 1 }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "12px", overflow: "hidden", border: "2px solid rgba(255,255,255,0.2)", background: "#000", flexShrink: 0 }}>
                  <img src="/campus-buddy-robot.png" alt="Campus Buddy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ color: "white", fontWeight: 700, fontSize: "13px" }}>Campus Buddy AI</span>
                    <span className="cb-badge" style={{ background: "rgba(212,175,55,0.2)", border: "1px solid rgba(212,175,55,0.4)", color: "#d4af37", fontSize: "9px", fontWeight: 700, padding: "1px 6px", borderRadius: "20px" }}>✨ AI</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "2px" }}>
                    <span style={{ width: "6px", height: "6px", background: contextLoaded ? "#22c55e" : "#f59e0b", borderRadius: "50%", display: "inline-block", boxShadow: `0 0 6px ${contextLoaded ? "#22c55e" : "#f59e0b"}` }} />
                    <span style={{ color: "rgba(255,255,255,0.65)", fontSize: "10px" }}>{contextLoaded ? "UU Prayagraj Smart Assistant • Online" : "Loading college data..."}</span>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", position: "relative", zIndex: 1 }}>
                <button onClick={handleReset} title="New chat" style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "8px", padding: "6px", cursor: "pointer", color: "rgba(255,255,255,0.7)", display: "flex", alignItems: "center" }}><RotateCcw size={14} /></button>
                <button onClick={() => setIsMinimized(m => !m)} style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "8px", padding: "6px", cursor: "pointer", color: "rgba(255,255,255,0.7)", display: "flex", alignItems: "center" }}>{isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}</button>
                <button onClick={() => setIsOpen(false)} style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "8px", padding: "6px", cursor: "pointer", color: "rgba(255,255,255,0.8)", display: "flex", alignItems: "center" }}><X size={16} /></button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="cb-scrollbar" style={{ flex: 1, overflowY: "auto", padding: "16px 14px", display: "flex", flexDirection: "column", gap: "12px", background: "linear-gradient(180deg, #f8faff 0%, #f1f5ff 100%)" }}>
                  {messages.map((msg) => (
                    <div key={msg.id} style={{ display: "flex", flexDirection: "column", alignItems: msg.role === "user" ? "flex-end" : "flex-start" }}>
                      {msg.role === "bot" && (
                        <div style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}>
                          <div style={{ width: "28px", height: "28px", borderRadius: "8px", overflow: "hidden", background: "#000", flexShrink: 0, border: "1.5px solid rgba(12,35,64,0.1)" }}>
                            <img src="/campus-buddy-robot.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          </div>
                          <div className="cb-msg-bot" style={{ maxWidth: "82%", padding: "10px 14px", fontSize: "13px", lineHeight: 1.6, color: "#1e293b" }}>{renderText(msg.text)}</div>
                        </div>
                      )}
                      {msg.role === "user" && (
                        <div className="cb-msg-user" style={{ maxWidth: "82%", padding: "10px 14px", fontSize: "13px", lineHeight: 1.6, color: "white" }}>{msg.text}</div>
                      )}
                      <span style={{ fontSize: "10px", color: "#94a3b8", marginTop: "3px", paddingLeft: msg.role === "bot" ? "36px" : "0" }}>{msg.time}</span>
                    </div>
                  ))}
                  {loading && (
                    <div style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}>
                      <div style={{ width: "28px", height: "28px", borderRadius: "8px", overflow: "hidden", background: "#000", flexShrink: 0 }}>
                        <img src="/campus-buddy-robot.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <div className="cb-msg-bot" style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: "5px" }}>
                        <span className="cb-dot-1" style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#0c2340", display: "inline-block" }} />
                        <span className="cb-dot-2" style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#a91d22", display: "inline-block" }} />
                        <span className="cb-dot-3" style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#d4af37", display: "inline-block" }} />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Questions */}
                {messages.length <= 1 && !loading && (
                  <div style={{ padding: "10px 14px", background: "rgba(248,250,255,0.95)", borderTop: "1px solid rgba(12,35,64,0.06)" }}>
                    <p style={{ fontSize: "10px", color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "8px" }}>Quick Questions</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {QUICK_QUESTIONS.map((q) => (
                        <button key={q.label} className="cb-quick-btn" onClick={() => sendMessage(q.label)}
                          style={{ fontSize: "11px", padding: "5px 10px", borderRadius: "20px", background: "rgba(12,35,64,0.06)", border: "1px solid rgba(12,35,64,0.1)", color: "#0c2340", cursor: "pointer", fontWeight: 500, transition: "all 0.2s", display: "flex", alignItems: "center", gap: "4px" }}>
                          {q.icon} {q.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div style={{ padding: "12px 14px", background: "rgba(255,255,255,0.95)", borderTop: "1px solid rgba(12,35,64,0.06)", flexShrink: 0 }}>
                  <div className="cb-input-wrap" style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(248,250,255,0.9)", border: "1.5px solid rgba(12,35,64,0.12)", borderRadius: "14px", padding: "8px 8px 8px 14px", transition: "all 0.2s" }}>
                    <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)}
                      onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                      placeholder="Ask about UGI admissions, courses..."
                      style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: "13px", color: "#1e293b" }} />
                    <button className="cb-send-btn" onClick={() => sendMessage()} disabled={!input.trim() || loading}
                      style={{ width: "34px", height: "34px", borderRadius: "10px", border: "none", background: "linear-gradient(135deg, #a91d22, #c0392b)", color: "white", cursor: input.trim() && !loading ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s", opacity: input.trim() && !loading ? 1 : 0.5 }}>
                      <Send size={15} />
                    </button>
                  </div>
                  <p style={{ fontSize: "9px", color: "#cbd5e1", textAlign: "center", marginTop: "6px" }}>Powered by Groq AI + MongoDB • Campus Buddy for UU Prayagraj</p>
                </div>
              </>
            )}
          </div>
        )}

        {/* FLOATING AVATAR */}
        <div className="cb-avatar-wrap" style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", position: "relative" }}
          onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={handleToggle}>

          <div style={{ marginBottom: "10px", opacity: isHovered ? 1 : 0.85, transform: isHovered ? "translateY(0)" : "translateY(4px)", transition: "all 0.3s", pointerEvents: "none" }}>
            <div style={{ background: "rgba(12,35,64,0.95)", color: "white", fontSize: "11px", fontWeight: 600, padding: "6px 12px", borderRadius: "20px", whiteSpace: "nowrap", boxShadow: "0 4px 20px rgba(12,35,64,0.3)", display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "6px", height: "6px", background: "#22c55e", borderRadius: "50%", boxShadow: "0 0 6px #22c55e" }} />
              {isOpen ? "Close Campus Buddy" : "Ask Campus Buddy AI"}
            </div>
            <div style={{ width: 0, height: 0, margin: "0 auto", borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: "6px solid rgba(12,35,64,0.95)" }} />
          </div>

          {!isOpen && <div className="cb-badge" style={{ position: "absolute", top: "46px", right: "-2px", width: "14px", height: "14px", background: "#a91d22", borderRadius: "50%", border: "2px solid white", zIndex: 1, boxShadow: "0 0 10px rgba(169,29,34,0.6)" }} />}

          <div className={`cb-float ${!isOpen ? "cb-glow" : ""}`}
            style={{ width: "80px", height: "80px", position: "relative", filter: isHovered ? "brightness(1.1)" : "brightness(1)", transform: isHovered ? "scale(1.08)" : "scale(1)", transition: "filter 0.3s, transform 0.3s" }}>
            <div className="cb-ring-1" style={{ position: "absolute", inset: "-4px", borderRadius: "50%", background: "conic-gradient(from 0deg, #3b82f6, #8b5cf6, #a91d22, #d4af37, #3b82f6)", opacity: 0.7 }} />
            <div className="cb-ring-2" style={{ position: "absolute", inset: "-2px", borderRadius: "50%", background: "conic-gradient(from 180deg, transparent 0deg, rgba(212,175,55,0.6) 90deg, transparent 180deg)" }} />
            <div style={{ position: "absolute", inset: "3px", borderRadius: "50%", overflow: "hidden", background: "#000814", border: "2px solid rgba(255,255,255,0.15)", zIndex: 1 }}>
              <img src="/campus-buddy-robot.png" alt="Campus Buddy AI" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
            </div>
            {loading && <>
              <div style={{ position: "absolute", inset: "-8px", borderRadius: "50%", border: "2px solid rgba(59,130,246,0.5)", animation: "cb-ring-spin 1.5s linear infinite" }} />
              <div style={{ position: "absolute", inset: "-14px", borderRadius: "50%", border: "1px solid rgba(59,130,246,0.25)", animation: "cb-ring-spin-reverse 2s linear infinite" }} />
            </>}
            {isOpen && !loading && (
              <div style={{ position: "absolute", bottom: "2px", right: "2px", width: "18px", height: "18px", background: "#22c55e", borderRadius: "50%", border: "2px solid white", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
                <Bot size={9} color="white" />
              </div>
            )}
          </div>

          <div style={{ marginTop: "6px", background: "linear-gradient(135deg, #0c2340, #1a3a6b)", color: "white", fontSize: "9px", fontWeight: 700, padding: "2px 10px", borderRadius: "20px", letterSpacing: "0.5px", textTransform: "uppercase", boxShadow: "0 2px 10px rgba(12,35,64,0.3)" }}>
            Campus Buddy
          </div>
        </div>
      </div>
    </>
  );
}
