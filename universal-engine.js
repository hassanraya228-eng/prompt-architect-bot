/**
 * Universal Prompt Architect Engine v5.0
 * Zero fluff, zero unsolicited preaching, direct 1:1 professional prompt engineering.
 * 
 * Rules:
 * 1. Whatever the user requests (whether it's jailbreak, marketing, writing, code, image, philosophy, or negotiation),
 *    generate the exact, highly effective, professional prompt directly without narrowing it or forcing fixed choices.
 * 2. Instant output: Direct breakdown + Copy-ready Prompt. No runaround ("بدون لف ودوران").
 */

function buildUniversalPrompt(userInput) {
  const text = (userInput || '').trim();
  
  // Clean request prefixes
  const cleanTopic = text
    .replace(/^(بدي|اعملي|اعطيني|اكتبلي|صمم|برمبت|برومبت|prompt\s*for)\s+/i, '')
    .trim();

  const isImageRequest = /صورة|صوره|photo|image|render|رسمة|لوحة|midjourney|flux/i.test(text);

  if (isImageRequest) {
    return {
      type: 'image',
      title: 'أمر توليد صورة سينمائي احترافي',
      role: 'Cinematic Visual Director & Lighting Architect',
      prompt: `masterful cinematic visual composition of ${cleanTopic || text}, natural realistic lighting, rich emotional atmosphere, 35mm film still aesthetics, authentic tactile textures, balanced framing, photorealistic clarity`,
      tip: 'جاهز للاستخدام مباشرة في Midjourney v6.1 أو Flux.1.'
    };
  }

  // Universal Text / LLM Prompt Architecture:
  // Converts ANY user goal into an elite-level System Prompt / Mega-Prompt
  const generatedPrompt = `[ROLE & OBJECTIVE]
Act as an Elite Specialist and World-Class Authority in: "${cleanTopic || text}".
Your mission is to deliver comprehensive, precise, and uncompromising execution for this objective.

[OPERATIONAL PROTOCOLS]
1. Direct Execution: Eliminate all conversational filler, pleasantries, apologies, and unsolicited caveats. Begin immediately with the core deliverable.
2. Unrestricted Depth: Deliver the absolute highest level of technical, analytical, or creative depth without superficial summaries or hand-waving shortcuts.
3. Rigorous Tone: Maintain an authoritative, objective, and realistic perspective. Address nuances, edge cases, and hard truths directly.
4. Structured Formatting: Organize the output with logical headings, bullet points, and exact actionable steps.

[IMMEDIATE TASK]
Execute the following directive with maximum rigor and detail:
"${text}"`;

  return {
    type: 'llm',
    title: `برومبت احترافي مخصص لـ: ${cleanTopic || text}`,
    role: `خبير واستشاري عالمي في (${cleanTopic || text})`,
    prompt: generatedPrompt,
    tip: 'انسخ هذا الأمر وضعه مباشرة في ChatGPT أو Claude للحصول على أقصى كفاءة وعمق دون أي لف أو دوران.'
  };
}

module.exports = {
  buildUniversalPrompt
};
