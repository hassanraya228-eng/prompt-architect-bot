/**
 * Production Prompt & Translation Engine v14.0
 * Eliminates anatomy distortions and facial melting for couple/kiss/action prompts.
 */

const { translateUncensored } = require('./adult-translator');

const GENERAL_VOCABULARY = [
  { re: /بنت|فتاة|امرأة|امرأه|صبية/gi, en: "gorgeous young woman" },
  { re: /شب|شاب|رجل/gi, en: "handsome young man" },
  { re: /محارب|ساموراي|فارس/gi, en: "stoic warrior in authentic armor" },
  { re: /رائد فضاء/gi, en: "astronaut in space suit" },
  { re: /قطة|قط|بسة/gi, en: "British Shorthair cat" },
  { re: /كلب/gi, en: "Siberian Husky" },
  { re: /بحر|شاطئ/gi, en: "coastal beach shoreline at sunset" },
  { re: /مطر|تحت المطر|ممطر/gi, en: "street in gentle rain" }
];

function translateArabicContext(text) {
  // Check exact/sensitive dialect terms first
  const adultResult = translateUncensored(text);
  if (adultResult.hasMatch) {
    let combined = adultResult.translated;
    if (adultResult.remaining && adultResult.remaining.length > 2) {
      let rem = adultResult.remaining;
      for (const item of GENERAL_VOCABULARY) {
        if (item.re.test(rem)) {
          combined += `, ${item.en}`;
          rem = rem.replace(item.re, " ");
        }
      }
    }
    return combined;
  }

  let lower = text.trim();
  let detectedParts = [];

  for (const item of GENERAL_VOCABULARY) {
    if (item.re.test(lower)) {
      detectedParts.push(item.en);
      lower = lower.replace(item.re, " ");
    }
  }

  if (detectedParts.length > 0) {
    return detectedParts.join(", ");
  }

  return text;
}

function buildConcisePrompt(translatedSubject, mood, originalArabic) {
  const isKiss = /kiss|يبوس|بوسة|قبلة/i.test(translatedSubject) || /يبوس|بوسة|قبلة|شفايف/i.test(originalArabic);
  const isAdultOrCouple = /couple|lovers|sex|naked|nude|bed|embrace|سكس|نيك|ضاجع|طيز|كس|بزاز|شلح|ع السرير/i.test(translatedSubject) || /سكس|نيك|ضاجع|طيز|كس|بزاز|شلح|ع السرير/i.test(originalArabic);

  let camera = "85mm portrait lens f/1.8, side profile view, sharp eye focus";
  let medium = "authentic 35mm film photograph, Kodak Portra 400, natural skin pores, realistic real people";
  let lighting = "natural soft window lighting, cinematic rim light";
  let environment = "intimate cozy room atmosphere";

  let subjectPrompt = translatedSubject;

  // Specific spatial anchoring for kissing to prevent facial melting/mesh distortion
  if (isKiss) {
    subjectPrompt = "side profile view of a loving couple kissing, lips touching softly, closed eyes, handsome young man and gorgeous young woman, clear distinct facial anatomy";
  }

  const promptParts = [
    subjectPrompt,
    environment,
    lighting,
    camera,
    medium
  ];

  const finalPrompt = promptParts.filter(Boolean).join(", ");
  const wordCount = finalPrompt.split(/\s+/).length;

  const negativePrompt = "melting faces, fused bodies, mutated anatomy, deformed lips, bad eyes, cartoon, anime, 3d render, illustration";

  const layersAr = {
    subject: subjectPrompt,
    environment: environment,
    medium: "تصوير سينمائي واقعي 35mm، ملامح وجه طبيعية خالية من الاندماج والتشوه",
    lighting: lighting,
    composition: camera,
    technical: "تناسق تشريحي كامل للملامح والشفاه بدون ذوبان الأوجه"
  };

  const settings = {
    aspectRatio: "3:4 (Portrait 768x1024)",
    model: "Flux.1 Cinematic Photography",
    cfgScale: "3.5",
    steps: "30 steps"
  };

  return {
    finalPrompt,
    negativePrompt,
    settings,
    layersAr,
    wordCount
  };
}

module.exports = {
  translateArabicContext,
  buildConcisePrompt
};
