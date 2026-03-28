import { Router } from "express";
import OpenAI from "openai";

const router = Router();

const openai = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
});

router.post("/explain", async (req, res) => {
  const { topic, lang } = req.body as { topic: string; lang: string };

  if (!topic) {
    res.status(400).json({ error: "topic is required" });
    return;
  }

  const isHindi = lang === "hi";

  const systemPrompt = isHindi
    ? `You are an expert teacher who explains topics in simple, detailed Hindi for school and college students. 
       Format your explanations with clear sections using emojis as headings, bullet points with •, and numbered steps where needed.
       Always include: definition, how it works (step by step), key concepts/types, formulas or examples, and real-life uses.
       Use \\n\\n between sections. Write in Devanagari script (Hindi).`
    : `You are an expert teacher who explains topics in simple, detailed English for school and college students.
       Format your explanations with clear sections using emojis as headings, bullet points with •, and numbered steps where needed.
       Always include: definition, how it works (step by step), key concepts/types, formulas or examples, and real-life uses.
       Use \\n\\n between sections.`;

  const userPrompt = isHindi
    ? `"${topic}" को विस्तार से समझाओ। Structured sections में, emojis के साथ headings दो, bullet points और numbered steps use करो।`
    : `Explain "${topic}" in detail. Use structured sections with emoji headings, bullet points, and numbered steps.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 1000,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    const explanation = response.choices[0]?.message?.content ?? "";
    res.json({ explanation });
  } catch (err) {
    console.error("OpenAI error:", err);
    res.status(500).json({ error: "Failed to generate explanation" });
  }
});

export default router;
