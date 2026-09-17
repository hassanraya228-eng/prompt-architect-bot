/**
 * Dynamic Semantic Translation Engine v13.0
 * Zero Dilution: Preserves 100% of user intent, acts, anatomy, and explicit details.
 */

const { translateUncensored } = require('./adult-translator');

const GENERAL_VOCABULARY = [
  { re: /بنت|فتاة|امرأة|امرأه|صبية/gi, en: "attractive natural woman" },
  { re: /شب|شاب|رجل/gi, en: "handsome young man" },
  { re: /محارب|ساموراي|فارس/gi, en: "stoic warrior in authentic weathered armor" },
  { re: /رائد فضاء/gi, en: "seasoned astronaut in space suit" },
  { re: /قطة|قط|بسة/gi, en: "British Shorthair cat, ultra sharp eye focus" },
  { re: /كلب/gi, en: "Siberian Husky, sharp fur texture" },
  { re: /بحر|شاطئ/gi, en: "coastal beach shoreline at sunset" },
  { re: /مطر|تحت المطر|ممطر/gi, en: "street in gentle rain, wet pavement reflections" },
  { re: /سيارة|سيارة فخمة/gi, en: "luxury modern supercar" },
  { re: /شارع|مدينة/gi, en: "bustling urban city street" }
];

function translateArabicContext(text) {
  // First check uncensored literal dictionary
  const adultResult = translateUncensored(text);
  if (adultResult.hasMatch) {
    let combined = adultResult.translated;
    // Check if remaining text has general words
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

  // If standard/non-adult query
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
  const isAdultOrExplicit = /sex|penetration|naked|nude|vagina|pussy|penis|cock|tits|breasts|doggystyle|oral|cunnilingus|masturbation|anal|french kiss|undressing|bikini|lingerie|سكس|نيك|ضاجع|طيز|كس|بزاز|شلح|زب|قضيب|صدر/i.test(translatedSubject) || /سكس|نيك|ضاجع|طيز|كس|بزاز|شلح|زب|قضيب|صدر|صدرها|صدره|بكيني|شهوة|حميم/i.test(originalArabic);

  let environment = "";
  let lighting = "";
  let camera = "35mm camera, 50mm f/1.4 lens, candid realistic framing";
  let medium = "authentic RAW color photograph, natural skin pores and texture, Kodak Portra 400";

  if (isAdultOrExplicit) {
    // Keep exact user subject as dominant focus, add only realistic photography grounding
    environment = "dimly lit luxury bedroom, rumpled linen sheets";
    lighting = "warm soft ambient lighting, gentle natural skin reflections";
  } else {
    environment = "natural realistic environment";
    lighting = "natural diffused lighting, authentic soft shadows";
  }

  // Put user subject first and unfiltered
  const promptParts = [
    translatedSubject,
    environment,
    lighting,
    camera,
    medium
  ];

  const finalPrompt = promptParts.filter(Boolean).join(", ");
  const wordCount = finalPrompt.split(/\s+/).length;

  const negativePrompt = "anime, cartoon, drawing, illustration, 3d render, CGI, digital painting, doll, plastic skin, airbrushed, unreal engine, fake, blurry, watermark, bad anatomy, deformed eyes, extra limbs";

  const layersAr = {
    subject: translatedSubject,
    environment: environment,
    medium: "تصوير واقعي صريح 35mm فوتوغرافي بدون تلطيف أو رقابة",
    lighting: lighting,
    composition: camera,
    technical: "دقة تشريحية كاملة، ألوان طبيعية حقيقية، بدون نمط كرتوني"
  };

  const settings = {
    aspectRatio: "3:4 (Portrait)",
    model: "Flux.1 Uncensored / SDXL Realism",
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
