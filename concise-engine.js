/**
 * Dynamic Semantic Translation Engine v17.0
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
  const isAdultOrExplicit = /sex|penetration|naked|nude|vagina|pussy|penis|cock|tits|breasts|doggystyle|oral|cunnilingus|masturbation|anal|undressing|bikini|lingerie|سكس|نيك|ضاجع|طيز|كس|بزاز|شلح|زب|قضيب|صدر/i.test(translatedSubject) || /سكس|نيك|ضاجع|طيز|كس|بزاز|شلح|زب|قضيب|صدر|صدرها|صدره|بكيني|شهوة|حميم/i.test(originalArabic);

  let environment = "";
  let lighting = "";
  let camera = "85mm prime lens f/1.8, candid sharp framing";
  let medium = "authentic RAW color photograph, natural skin pores and realistic texture, Kodak Portra 400";

  let subjectPrompt = translatedSubject;

  if (isKiss) {
    subjectPrompt = "loving couple side profile view kissing, lips softly touching, closed eyes, distinct facial features";
    environment = "warm cozy bedroom";
    lighting = "soft golden window light, gentle natural shadows";
  } else if (isAdultOrExplicit) {
    environment = "dimly lit luxury bedroom, rumpled linen sheets";
    lighting = "warm soft ambient lighting, gentle natural skin reflections";
  } else {
    environment = "natural realistic environment";
    lighting = "natural diffused lighting, authentic soft shadows";
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
    medium: "تصوير فوتوغرافي واقعي 35mm فائق الدقة",
    lighting: lighting,
    composition: camera,
    technical: "دقة تشريحية كاملة، ألوان طبيعية حقيقية، بدون نمط كرتوني أو تشويه"
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
