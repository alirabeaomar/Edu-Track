import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body.messages;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ text: "البيانات المرسلة غير صحيحة." }, { status: 400 });
    }

    const apiKey = "AQ.Ab8RN6LJKm72CHwpZPwzA70bp7VmaFk0ImdvM1RhG94jsmGdBw";

    const genAI = new GoogleGenerativeAI(apiKey);

    const systemInstruction = `
      أنت مرشد أكاديمي ومستشار قبول جامعي ذكي للطلاب في مصر.
      مهمتك مساعدة الطالب في تحديد الكلية والجامعة المناسبة لشغفه ومجموعه وشعبته بأسلوب ودود ومجشع.
      اقترح من 2 إلى 4 كليات مناسبة مع توضيح السبب ومجالات العمل، واجعل الإجابة في نقاط واضحة ومنسقة.
    `;

    const model = genAI.getGenerativeModel({
      model: "gemini-3.8-flash",
      systemInstruction: systemInstruction,
    });

    // تحويل الرسائل للنسق الذي يطلبه Gemini
    let chatHistory = messages.map((m: { sender: string; text: string }) => ({
      role: m.sender === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    // التأكد تماماً أن أول رسالة في التاريخ هي دور 'user'
    while (chatHistory.length > 0 && chatHistory[0].role === "model") {
      chatHistory.shift();
    }

    // أخذ آخر رسالة للمستخدم لإرسالها كرسالة حالية
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