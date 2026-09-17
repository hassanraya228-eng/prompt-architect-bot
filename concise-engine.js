/**
 * Dynamic Semantic Translation & Prompt Architecture Engine v9.0
 * Translates explicit, adult, romantic, and dialect Arabic concepts accurately into English.
 * Tailored for Midjourney v6.1 and Flux.1.
 */

const { translateUncensored } = require('./adult-translator');

const STANDARD_VOCABULARY = [
  // Actions & Romance
  { re: /عم يبوسو بعض|بيبوسو بعض|يبوسو بعض|بوسة|قبلة|يقبل/gi, en: "a tender passionate kiss between an attractive young couple embracing closely" },
  { re: /شب وبنت|شاب وفتاة|حبيبين|عشاق|زوجين/gi, en: "an attractive young man and woman" },
  { re: /عناق|حضن|حاضنين بعض|بيحضنو بعض/gi, en: "intimately embracing each other with gentle warmth" },
  { re: /مشهد حميمي|حميمي|حميمية/gi, en: "intimate romantic candid scene filled with emotional chemistry" },
  { re: /رومانسي|رومانسية/gi, en: "romantic cinematic atmosphere" },

  // People & Characters
  { re: /بنت|فتاة|امرأة|امرأه|صبية/gi, en: "a stunning young woman with natural features and expressive eyes" },
  { re: /شب|شاب|رجل/gi, en: "a handsome young man" },
  { re: /محارب|ساموراي|فارس/gi, en: "a stoic warrior in detailed traditional armor" },
  { re: /رائد فضاء/gi, en: "a seasoned astronaut in high-tech exploratory suit" },
  { re: /سايبربانك/gi, en: "a cybernetic operative with glowing subcutaneous neon implants" },

  // Animals & Objects
  { re: /قطة|قط|بسة/gi, en: "a regal British Shorthair cat with radiant amber eyes" },
  { re: /كلب/gi, en: "a majestic Siberian Husky with alert piercing gaze" },
  { re: /تنين/gi, en: "a colossal obsidian elder dragon with pulsing ember veins" },
  { re: /قهوة|فنجان/gi, en: "an artisanal ceramic espresso cup with delicate rosetta latte art" },

  // Environments & Settings
  { re: /غرفة نوم|تخت|سرير/gi, en: "cozy bedroom with softly rumpled luxury linen sheets" },
  { re: /بحر|شاطئ/gi, en: "serene coastal shoreline at twilight" },
  { re: /مطر|تحت المطر|ممطر/gi, en: "rain-drenched street with reflective wet pavement" }
];

function translateArabicContext(text) {
  // First check uncensored adult & intimate dictionary
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

  return `cinematic candid scene depicting ${text}`;
}

function buildConcisePrompt(translatedSubject, mood, originalArabic) {
  const isRomantic = /kiss|embrace|intimate|romantic|sensual|erotic|lovemaking|bikini|lingerie|يبوسو|قبلة|حميم|ضاجع|طيز|مؤخرة/i.test(translatedSubject) || /حميم|بوس|حب|رومانسي|سكس|طيز|مؤخرة|ضاجع|بكيني/i.test(originalArabic);
  const isNight = /night|ليل/i.test(originalArabic);
  const isRain = /rain|مطر/i.test(originalArabic);

  let environment = "";
  let lighting = "";
  let camera = "";
  let medium = "cinematic 35mm film still, Kodak Vision3 tone, authentic emotional depth";

  if (isRomantic) {
    environment = isRain 
      ? "rainy city street under a glowing streetlight, delicate water droplets caught in air" 
      : (isNight ? "warm atmospheric bedroom, soft evening ambient glow" : "warm dimly lit bedroom, luxury rumpled linen sheets, sensual mood");
    lighting = "soft golden rim lighting, warm candlelight accents, gentle cinematic shadow falloff";
    camera = "intimate 50mm f/1.4 medium close-up, eye-level framing, shallow depth of field";
  } else {
    environment = "atmospheric environment with layered spatial narrative";
    lighting = "natural balanced directional lighting, soft subtle shadows";
    camera = "cinematic 35mm eye-level framing, crisp focal depth";
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

  const negativePrompt = isRomantic
    ? "awkward stiff pose, distorted mouths, bad anatomy, deformed face, crossed eyes, extra limbs, plastic skin, harsh flash lighting, blurry, watermark, text"
    : "deformed anatomy, mutated hands, missing fingers, extra limbs, bad proportions, blurry, airbrushed plastic skin, cartoon, 3d render, watermark, text";

  const layersAr = {
    subject: translatedSubject,
    environment: environment,
    medium: medium,
    lighting: lighting,
    composition: camera,
    technical: "ألوان فيلم 35mm طبيعية، خالية تماماً من رموز الحشو التالفة"
  };

  const settings = {
    aspectRatio: isRomantic ? "4:5 (Portrait) أو 16:9 (Cinematic)" : "16:9 (Landscape)",
    model: "Flux.1 [Dev] / Midjourney v6.1",
    cfgScale: isRomantic ? "3.0 - 3.5 (Flux) / 6.0 (SDXL)" : "3.5 (Flux) / 7.0 (SDXL)",
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
