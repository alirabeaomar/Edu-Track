import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body.messages;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ text: "البيانات المرسلة غير صحيحة." }, { status: 400 });
    }

    // ضع مفتاحك هنا أو في .env.local
    const apiKey = process.env.GEMINI_API_KEY || "ضع_مفتاحك_هنا_مباشرة";

    if (!apiKey || apiKey.includes("ضع_مفتاحك")) {
      return NextResponse.json(
        { text: "خطأ: لم يتم ضبط مفتاح Gemini API بشكل صحيح." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const systemInstruction = `
      أنت مرشد أكاديمي ومستشار قبول جامعي ذكي للطلاب في مصر.
      مهمتك مساعدة الطالب في تحديد الكلية والجامعة المناسبة لشغفه ومجموعه وشعبته بأسلوب ودود ومجشع.
      اقترح من 2 إلى 4 كليات مناسبة مع توضيح السبب ومجالات العمل، واجعل الإجابة في نقاط واضحة ومنسقة.
    `;

const model = genAI.getGenerativeModel({
  model: "gemini-3.8-flash", // <-- النموذج المحدث والمدعوم حالياً
  systemInstruction: systemInstruction,
});
    // 1. تحويل الرسائل للنسق الذي يطلبه Gemini
    let chatHistory = messages.map((m: { sender: string; text: string }) => ({
      role: m.sender === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    // 2. حل المشكلة: التأكد تماماً أن أول رسالة في التاريخ هي دور 'user'
    // إذا كانت أول رسالة مرسلة بواسطة الـ model (مثل ترحيب البوت الافتراضي)، نقوم بحذفها من التاريخ
    while (chatHistory.length > 0 && chatHistory[0].role === "model") {
      chatHistory.shift();
    }

    // 3. أخذ آخر رسالة للمستخدم لإرسالها كرسالة حالية
    const lastMessage = chatHistory.pop();
    
    if (!lastMessage || lastMessage.role !== "user") {
      return NextResponse.json({ text: "عذراً، يجب أن تبدأ المحادثة برسالة من المستخدم." }, { status: 400 });
    }

    const chat = model.startChat({ history: chatHistory });
    const result = await chat.sendMessage(lastMessage.parts[0].text);
    const responseText = result.response.text();

    return NextResponse.json({ text: responseText });
  } catch (error: any) {
    console.error("Chat API Detailed Error:", error);
    return NextResponse.json(
      { text: `عذراً، حدث خطأ في الخادم: ${error.message || "خطأ غير معروف"}` },
      { status: 500 }
    );
  }
}


