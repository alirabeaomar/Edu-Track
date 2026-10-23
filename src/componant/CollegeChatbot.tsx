"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  sender: "bot" | "user";
  text: string;
}

export default function CollegeChatbot() {
  const [isOpen, setIsOpen] = useState(false); // حالة فتح وإغلاق الشات
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "أهلاً بك! 🎓 أنا مستشارك الأكاديمي الذكي.\nأخبرني: ما هي شعبتك في الثانوية ومجموعك؟",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length > 1) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput("");

    const newMessages: Message[] = [...messages, { sender: "user", text: userMsg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.text || "فشل الاتصال");

      setMessages((prev) => [...prev, { sender: "bot", text: data.text }]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: `عذراً، حدث خطأ: ${err.message || "غير معروف"}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 font-sans" dir="rtl">
      {/* نافذة الشات (تظهر فقط عندما isOpen تكون true) */}
      {isOpen && (
        <div className="absolute bottom-16 left-0 w-[90vw] sm:w-[380px] h-[500px] bg-white rounded-3xl shadow-2xl border border-blue-100 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* هيدر الشات */}
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-xl">🤖</div>
              <div>
                <h3 className="font-bold text-sm">مستشارك الأكاديمي</h3>
                <p className="text-[10px] text-blue-200">متواجد لمساعدتك في تنسيق الكليات</p>
              </div>
            </div>
            {/* زر الإغلاق */}
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 w-8 h-8 rounded-full flex items-center justify-center transition text-sm"
            >
              ✕
            </button>
          </div>

          {/* محتوى الرسائل */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/60 text-sm">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-line shadow-sm ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 border border-blue-100 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl text-xs text-blue-600 border border-blue-100 shadow-sm flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></span>
                  <span>جاري كتابة الرد...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* إدخال الرسالة */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-blue-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="اكتب رسالتك هنا..."
              className="flex-1 p-2.5 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2.5 rounded-xl font-bold transition text-xs sm:text-sm disabled:opacity-50"
            >
              إرسال
            </button>
          </form>
        </div>
      )}

      {/* الزر الدائري العائم في أسفل الشاشة */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-full shadow-2xl flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110 focus:outline-none group relative"
        title="تحدث مع المستشار الأكاديمي"
      >
        {isOpen ? "✕" : "🤖"}
        {/* وميض تنبيهي جمالي */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full animate-pulse"></span>
        )}
      </button>
    </div>
  );
}
