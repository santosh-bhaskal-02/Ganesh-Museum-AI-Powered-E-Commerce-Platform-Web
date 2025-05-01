import React, { useState } from "react";
import axios from "axios";
import { MessageCircle, X, Send } from "lucide-react";
import Cookies from "js-cookie";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I can help with idol booking, orders, delivery, and custom requests.",
    },
  ]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const userId = Cookies.get("userId");
      const response = await axios.post(`${apiUrl}/api/ai/chat`, {
        messages: nextMessages.slice(-8),
        userId,
      });

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.data.reply || "I couldn't generate a reply." },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            error?.response?.data?.message ||
            "Sorry, the assistant is unavailable right now.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[1000]">
      {open && (
        <div className="mb-3 w-[92vw] max-w-sm overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-white">
            <div>
              <p className="text-sm font-semibold">Ganesh Assistant</p>
              <p className="text-xs text-blue-100">Booking support and quick help</p>
            </div>
            <button onClick={() => setOpen(false)} className="rounded-full p-1 hover:bg-white/10">
              <X size={18} />
            </button>
          </div>

          <div className="max-h-80 space-y-3 overflow-y-auto p-4 bg-gradient-to-b from-white to-blue-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-sm ${message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 border border-blue-100"
                    }`}>
                  {message.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl border border-blue-100 bg-white px-3 py-2 text-sm text-gray-500">
                  Typing...
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-blue-100 bg-white p-3">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
                placeholder="Ask about orders, delivery, custom idols..."
                className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm outline-none focus:border-blue-500"
              />
              <button
                onClick={handleSend}
                disabled={loading}
                className="rounded-xl bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:opacity-50">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-2xl transition-transform duration-200 hover:scale-105 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300/60"
      >
        <span className="absolute -inset-1 rounded-full border border-blue-400/40 opacity-70 animate-pulse" />
        <MessageCircle size={22} className="relative z-10" />
        <span className="sr-only">{open ? "Close chat" : "Open chat"}</span>
      </button>
    </div>
  );
}

export default ChatbotWidget;
