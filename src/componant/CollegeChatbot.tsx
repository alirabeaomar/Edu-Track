"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  sender: "bot" | "user";
  text: string;
}

export default function CollegeChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "أهلاً بك! 🎓 أنا مستشارك الأكاديمي الذكي.\nأخبرني: ما هي شعبتك في الثانوية (علمي علوم/رياضة/أدبي)، مجموعك المتوقع، وما هي المجالات التي تحبها؟",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // التمرير التلقائي لأسفل المحادثة عند إضافة رسائل جديدة
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

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
      setMessages((prev) => [...prev, { sender: "bot", text: data.text }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "عذراً، تعذر الاتصال بالخادم حالياً. حاول مرة أخرى." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-blue-100 overflow-hidden my-10">
      {/* رأس الشات */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white p-5 flex items-center gap-4">
        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-2xl backdrop-blur-sm border border-white/20">
          🤖
        </div>
        <div>
          <h3 className="font-extrabold text-lg sm:text-xl">مستشارك الأكاديمي الذكي</h3>
          <p className="text-xs text-blue-200">مدعوم بالذكاء الاصطناعي لمساعدتك في تحديد الكلية المناسبة</p>
        </div>
      </div>

      {/* منطقة المحادثة */}
      <div className="h-[420px] p-5 overflow-y-auto space-y-4 bg-slate-50/60 custom-scrollbar">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] p-4 rounded-2xl text-sm sm:text-base leading-relaxed whitespace-pre-line shadow-sm ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-white text-gray-800 border border-blue-100 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* جاري التفكير */}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl rounded-bl-none text-sm text-blue-600 border border-blue-100 shadow-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-ping"></span>
              جاري تحليل بياناتك واقتراح الأنسب لك...
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* صندوق الإدخال */}
      <form onSubmit={handleSend} className="p-4 bg-white border-t border-blue-100 flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="مثال: جايب 82% علمي رياضة، وبحب التكنولوجيا والبرمجة..."
          className="flex-1 p-3.5 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-800"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-3.5 rounded-xl font-bold transition duration-200 text-sm shadow-md disabled:bg-gray-300"
        >
          إرسال
        </button>
      </form>
    </div>
  );
}