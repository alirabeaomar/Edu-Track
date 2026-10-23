import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { text: "من فضلك اكتب رسالة أولًا." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { text: "مفتاح Gemini API غير موجود في ملف .env.local" },
        { status: 500 }
      );
    }

    const contents = messages
      .filter(
        (m: { sender?: string; text?: string }) =>
          typeof m.text === "string" &&
          m.text.trim() &&
          ["user", "assistant", "model"].includes(m.sender || "")
      )
      .map((m: { sender: string; text: string }) => ({
        role: m.sender === "user" ? "user" : "model",
        parts: [{ text: m.text }],
      }));

    if (
      !contents.length ||
      contents[contents.length - 1].role !== "user"
    ) {
      return NextResponse.json(
        { text: "تأكد أن آخر رسالة من المستخدم." },
        { status: 400 }
      );
    }

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [
              {
                text: `
                  أنت مرشد أكاديمي للطلاب في مصر.
                  ساعد الطالب في اختيار الكلية والجامعة المناسبة
                  حسب المجموع والشعبة والاهتمامات.
                  اقترح من كليتين إلى أربع كليات عند توفر المعلومات.
                  وضح أسباب الاختيار ومجالات العمل.
                  لا تخترع معلومات عن التنسيق أو شروط القبول.
                  أجب باللغة العربية المصرية بأسلوب ودود وواضح.
                `,
              },
            ],
          },
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1200,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API error:", response.status, data);

      return NextResponse.json(
        {
          text: `خطأ Gemini (${response.status}): ${
            data.error?.message || "تعذر الحصول على إجابة."
          }`,
        },
        { status: 502 }
      );
    }

    const text = data.candidates?.[0]?.content?.parts
      ?.map((part: { text?: string }) => part.text || "")
      .join("");

    if (!text) {
      return NextResponse.json(
        { text: "لم تصل إجابة من Gemini. حاول مرة أخرى." },
        { status: 502 }
      );
    }

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Chatbot error:", error);

    return NextResponse.json(
      { text: "حصل خطأ في الخادم. راجع Terminal لمعرفة السبب." },
      { status: 500 }
    );
  }
}