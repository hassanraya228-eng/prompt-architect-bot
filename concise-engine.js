/**
 * Dynamic Semantic Translation & Realism Engine v10.0
 * Pure Photorealism: Absolute elimination of Anime / 3D / Cartoon looks.
 */

const { translateUncensored } = require('./adult-translator');

const STANDARD_VOCABULARY = [
  // Actions & Romance
  { re: /عم يبوسو بعض|بيبوسو بعض|يبوسو بعض|بوسة|قبلة|يقبل/gi, en: "hyperrealistic candid photograph of a tender passionate kiss between an attractive young couple embracing closely" },
  { re: /شب وبنت|شاب وفتاة|حبيبين|عشاق|زوجين/gi, en: "hyperrealistic real life photograph of an attractive young man and woman" },
  { re: /عناق|حضن|حاضنين بعض|بيحضنو بعض/gi, en: "hyperrealistic photograph of two people intimately embracing with genuine emotional warmth" },
  { re: /مشهد حميمي|حميمي|حميمية/gi, en: "candid 35mm film photograph of an intimate romantic moment, natural realistic skin tones" },
  { re: /رومانسي|رومانسية/gi, en: "realistic romantic atmosphere, warm natural lighting" },

  // People & Characters
  { re: /بنت|فتاة|امرأة|امرأه|صبية/gi, en: "hyperrealistic 35mm portrait photograph of an alluring natural woman, authentic skin pores, real human face" },
  { re: /شب|شاب|رجل/gi, en: "hyperrealistic portrait photograph of a handsome young man, real human features" },
  { re: /محارب|ساموراي|فارس/gi, en: "realistic historical documentary photograph of a stoic warrior in authentic weathered armor" },
  { re: /رائد فضاء/gi, en: "authentic NASA archival photograph of a seasoned astronaut in space suit" },

  // Animals & Objects
  { re: /قطة|قط|بسة/gi, en: "National Geographic wildlife photograph of an elegant British Shorthair cat, ultra sharp eye focus" },
  { re: /كلب/gi, en: "candid realistic photograph of a Siberian Husky, sharp fur texture" },

  // Environments
  { re: /غرفة نوم|تخت|سرير/gi, en: "real life cozy bedroom, luxury rumpled linen bed sheets, candid ambient light" },
  { re: /بحر|شاطئ/gi, en: "authentic coastal beach shoreline at sunset, natural oceanic mist" },
  { re: /مطر|تحت المطر|ممطر/gi, en: "real street photograph in gentle rain, authentic liquid reflections" }
];

function translateArabicContext(text) {
  const adultMatch = translateUncensored(text);
  if (adultMatch) {
    return adultMatch;
  }

  let lower = text.trim();
  let detectedParts = [];

  for (const item of STANDARD_VOCABULARY) {
    if (item.re.test(lower)) {
      detectedParts.push(item.en);
      lower = lower.replace(item.re, " ");
    }
  }

  if (detectedParts.length > 0) {
    return detectedParts.join(", ");
  }

  return `hyperrealistic authentic 35mm photograph of ${text}, real human skin texture, natural life capture`;
}

function buildConcisePrompt(translatedSubject, mood, originalArabic) {
  const isRomantic = /kiss|embrace|intimate|romantic|sensual|erotic|lovemaking|bikini|lingerie|يبوسو|قبلة|حميم|ضاجع|طيز|مؤخرة|سكس|كسها/i.test(translatedSubject) || /حميم|بوس|حب|رومانسي|سكس|طيز|مؤخرة|ضاجع|بكيني|كس/i.test(originalArabic);
  const isNight = /night|ليل/i.test(originalArabic);
  const isRain = /rain|مطر/i.test(originalArabic);

  let environment = "";
  let lighting = "";
  let camera = "authentic 35mm camera, 50mm f/1.4 prime lens, candid eye-level shot";
  let medium = "uncompressed raw photograph, Kodak Portra 400 aesthetic, realistic human skin pores, authentic cinematic still";

  if (isRomantic) {
    environment = isRain 
      ? "rain-soaked nighttime urban setting under golden streetlights" 
      : (isNight ? "warm dimly lit bedroom with soft candlelight glow" : "warm sunlit bedroom, rumpled linen sheets, natural soft ambient shadows");
    lighting = "soft warm golden hour lighting, gentle rim light, subtle natural shadows";
  } else {
    environment = "realistic everyday environment with natural depth of field";
    lighting = "natural diffused daylight, realistic soft shadows";
  }

  const promptParts = [
    translatedSubject,
    environment,
    lighting,
    camera,
    medium
  ];

  const finalPrompt = promptParts.filter(Boolean).join(", ");
  const wordCount = finalPrompt.split(/\s+/).length;

  // STRICT NEGATIVE PROMPT TO BLOCK ANIME AND 3D MODELS
  const negativePrompt = "anime, cartoon, drawing, illustration, 3d render, CGI, digital painting, doll, plastic skin, airbrushed, unreal engine, octane render, fake, oversaturated, deformed hands, extra fingers, bad anatomy, bad face, crossed eyes, blurry, watermark, text";

  const layersAr = {
    subject: translatedSubject,
    environment: environment,
    medium: "تصوير فوتوغرافي واقعي 35mm حقيقي (مستبعد منه الأنمي والرسم بالكامل)",
    lighting: lighting,
    composition: camera,
    technical: "واقعية بشرية حقيقية، ألوان طبيعية، خالية تماماً من النمط الكرتوني أو الثري دي"
  };

  const settings = {
    aspectRatio: isRomantic ? "4:5 (Portrait) أو 16:9 (Cinematic)" : "16:9 (Landscape)",
    model: "Flux.1 [Realism] / Midjourney v6.1 Photorealism",
    cfgScale: "3.0 (Flux) / 5.5 (SDXL)",
    steps: "30-35 steps"
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
