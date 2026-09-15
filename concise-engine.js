/**
 * Advanced Pure English Architectural Engine v3.0
 * Specialized for Flux.1, Midjourney v6.1, and SDXL
 * 
 * Rules:
 * 1. 100% Pure Natural English in final prompts (zero Arabic leaks, fully translated).
 * 2. Zero Spam/Filler Tokens (NO "creamy creamy bokeh", "micro-textures", "follicle strands", "16-bit RAW", "8k ray tracing").
 * 3. Mood, Emotion & Romantic Authenticity: Emphasize cinematic atmosphere, tender expressions, warm lighting, intimacy.
 * 4. Character Consistency & Facial Anchor: Explicit descriptors maintaining persistent identity across scenes.
 * 5. Tight, cohesive prompt length (strictly under 50-60 effective words).
 */

// Comprehensive Arabic to descriptive English translation & semantic dictionary
const ARABIC_TRANSLATION_MAP = [
  // Intimate / Romantic concepts
  { pattern: /مشهد حميم(ي)?|حميمي|حميمية|لقاء رومانسي|رومانسي(ة)?/i, en: "tender intimate romantic moment between two lovers", mood: "romantic" },
  { pattern: /امرأه في مشهد حمي(ي)?مي|امرأة في مشهد حميمي|بنت في مشهد حميمي/i, en: "cinematic intimate portrait of an alluring woman in a romantic atmospheric bedroom setting", mood: "romantic" },
  { pattern: /امرأة|امرأه|سيدة|فتاة|بنت/i, en: "a beautiful woman with natural features and expressive gaze", mood: "portrait" },
  { pattern: /رجل|شاب/i, en: "a handsome man with subtle emotional presence", mood: "portrait" },
  { pattern: /زوجين|عشاق|حبيبين/i, en: "an affectionate couple embracing gently", mood: "romantic" },
  { pattern: /عناق|حضن/i, en: "tender embrace with quiet warmth", mood: "romantic" },
  { pattern: /قبلة|بوسة/i, en: "gentle tender kiss filled with emotion", mood: "romantic" },
  
  // Specific animals & short tokens
  { pattern: /قطة|قط|بسة/i, en: "an elegant British Shorthair cat with radiant amber eyes", mood: "animal" },
  { pattern: /كلب/i, en: "a noble Siberian Husky with keen intelligent eyes", mood: "animal" },
  { pattern: /قهوة|فنجان قهوة|كوب قهوة/i, en: "an artisanal ceramic espresso cup with delicate rosetta latte art and rising steam ribbons", mood: "still_life" },
  { pattern: /سايبربانك/i, en: "a cybernetic operative in weathered tactical gear and illuminated accents", mood: "cyberpunk" },
  { pattern: /رائد فضاء/i, en: "a lone astronaut exploring uncharted extraterrestrial terrain", mood: "sci_fi" },
  { pattern: /المريخ/i, en: "sweeping red Martian desert dunes with a distant twin moon sky", mood: "sci_fi" },
  { pattern: /تنين/i, en: "a majestic ancient obsidian dragon perched with smoldering embers", mood: "fantasy" },
  { pattern: /قلعة/i, en: "a monumental gothic stone citadel rising through morning mist", mood: "fantasy" },
  { pattern: /فيلا|بيت عصري|منزل حديث/i, en: "a minimalist architectural villa with cantilevered concrete and warm floor-to-ceiling glass", mood: "architecture" },
  { pattern: /ساموراي/i, en: "a stoic ronin samurai in weathered indigo robes with folded steel katana", mood: "historical" },
  { pattern: /مطر|تحت المطر|ممطر/i, en: "in a quiet rain shower with soft liquid reflections", mood: "rain" },
  { pattern: /غروب|وقت الغروب/i, en: "during golden hour with warm amber backlight", mood: "golden_hour" },
  { pattern: /شاطئ|بحر/i, en: "by the serene coastal shoreline with gentle ocean mist", mood: "coastal" }
];

function translateArabicToEnglish(arabicText) {
  let cleaned = arabicText.trim();
  
  // Direct matching against comprehensive semantic map
  for (const item of ARABIC_TRANSLATION_MAP) {
    if (item.pattern.test(cleaned)) {
      return { english: item.en, mood: item.mood };
    }
  }

  // Common word-by-word fallback translations
  const wordMap = {
    'جميلة': 'beautiful',
    'شخصية': 'consistent character',
    'واقعية': 'photorealistic',
    'سينمائي': 'cinematic',
    'حب': 'love and romance',
    'حزن': 'melancholic mood',
    'فرح': 'radiant smile',
    'غرفة': 'cozy bedroom',
    'ليل': 'nighttime ambiance',
    'شارع': 'city street',
    'سيارة': 'vintage luxury car',
    'ورود': 'delicate flower bouquet',
    'ألوان': 'rich warm tones'
  };

  let translatedWords = [];
  for (const [ar, en] of Object.entries(wordMap)) {
    if (cleaned.includes(ar)) {
      translatedWords.push(en);
    }
  }

  if (translatedWords.length > 0) {
    return { english: translatedWords.join(", "), mood: "general" };
  }

  // If input is mostly English already
  if (/^[a-zA-Z0-9\s,.'"-]+$/.test(cleaned)) {
    return { english: cleaned, mood: "general" };
  }

  // Fallback high-fidelity subject
  return { english: "atmospheric cinematic portrait with authentic emotional expression and lifelike features", mood: "portrait" };
}

/**
 * Builds cohesive, concise (under 50-60 words) prompt without filler spam tokens
 */
function buildConcisePrompt(subjectEn, mood, userText) {
  const isRomantic = mood === 'romantic' || /intimate|romantic|embrace|bedroom|lovers/i.test(subjectEn) || /حميم|حب|رومانسي/i.test(userText);
  const isPortrait = mood === 'portrait' || isRomantic;
  const isCyberpunk = mood === 'cyberpunk' || /cyber|neon/i.test(subjectEn);
  const isFantasy = mood === 'fantasy' || /dragon|castle|magic/i.test(subjectEn);
  const isSciFi = mood === 'sci_fi' || /astronaut|space|mars/i.test(subjectEn);
  const isArchitecture = mood === 'architecture' || /villa|building|interior/i.test(subjectEn);
  const isAnimal = mood === 'animal' || /cat|dog/i.test(subjectEn);

  let sceneEnvironment = "";
  let cinematicLighting = "";
  let cameraFraming = "";
  let mediumAtmosphere = "";

  if (isRomantic) {
    // Priority: Mood, warmth, character expression, authentic intimacy
    sceneEnvironment = "warm dimly lit bedroom, softly rumpled linen sheets";
    cinematicLighting = "golden candlelight glow, soft evening window twilight, gentle shadow falloff";
    cameraFraming = "intimate 50mm f/1.4 medium close-up, eye-level candid angle";
    mediumAtmosphere = "cinematic 35mm film still, Kodak Vision3 tone, authentic emotional intimacy";
  } else if (isPortrait) {
    sceneEnvironment = "minimalist studio with soft neutral linen background";
    cinematicLighting = "gentle directional window daylight, soft key rim light";
    cameraFraming = "flattering 85mm portrait lens, eye-level candid framing";
    mediumAtmosphere = "editorial fashion photograph, natural skin tones, relaxed expression";
  } else if (isCyberpunk) {
    sceneEnvironment = "rain-soaked Tokyo back-alley, reflections of neon signage in wet puddles";
    cinematicLighting = "cyan and amber atmospheric ambient lighting, soft diffused glow";
    cameraFraming = "cinematic 35mm wide shot, low-angle perspective";
    mediumAtmosphere = "hyperrealistic film still, authentic tactile textures";
  } else if (isFantasy) {
    sceneEnvironment = "ancient pine valley shrouded in morning mountain mist";
    cinematicLighting = "ethereal golden hour sunbeams, atmospheric haze";
    cameraFraming = "grand environmental wide shot, rule of thirds";
    mediumAtmosphere = "masterwork cinematic oil painting aesthetic, rich dramatic tones";
  } else if (isSciFi) {
    sceneEnvironment = "vast red Martian canyon under an expansive starry cosmic sky";
    cinematicLighting = "stark low-sun rim light, deep planetary contrast";
    cameraFraming = "cinematic 24mm anamorphic wide vista";
    mediumAtmosphere = "IMAX 70mm scientific cinematography, crisp realistic textures";
  } else if (isArchitecture) {
    sceneEnvironment = "secluded hillside overlooking tranquil water and pine trees";
    cinematicLighting = "natural diffused morning daylight, clean linear shadows";
    cameraFraming = "balanced eye-level two-point perspective, tilt-shift framing";
    mediumAtmosphere = "Architectural Digest photography, authentic concrete and wood grain";
  } else if (isAnimal) {
    sceneEnvironment = "cozy sunlit living room with natural wooden floor";
    cinematicLighting = "soft golden morning sunlight filtering through sheer curtains";
    cameraFraming = "intimate eye-level pet portrait, shallow depth of field";
    mediumAtmosphere = "documentary 50mm photograph, natural coat textures, expressive eyes";
  } else {
    sceneEnvironment = "atmospheric environment with natural spatial depth";
    cinematicLighting = "natural golden hour lighting with balanced soft shadows";
    cameraFraming = "cinematic 35mm eye-level framing";
    mediumAtmosphere = "candid documentary film still, natural palette";
  }

  // Combine into a clean, comma-separated English prompt without repetition
  const promptTokens = [
    subjectEn,
    sceneEnvironment,
    cinematicLighting,
    cameraFraming,
    mediumAtmosphere
  ].filter(Boolean);

  let finalPrompt = promptTokens.join(", ");
  
  // Word count limiter to guarantee under 50-60 words
  const words = finalPrompt.split(/\s+/);
  if (words.length > 55) {
    finalPrompt = words.slice(0, 52).join(" ") + ", photorealistic cinematic still";
  }

  // Calibrated Clean Negative Prompt (No generic junk, targeted at anatomy and distortions)
  let negativePrompt = "deformed anatomy, mutated hands, missing fingers, extra limbs, asymmetrical eyes, cartoon, 3d render, oversaturated, blurry, airbrushed plastic skin, watermark, text";
  if (isRomantic) {
    negativePrompt = "awkward pose, unnatural stiff posture, bad anatomy, deformed face, crossed eyes, plastic mannequin skin, harsh flash lighting, blurry, watermark, text";
  }

  // Recommended Settings tailored for Flux & SDXL
  const settings = {
    aspectRatio: isRomantic ? "4:5 (Portrait) or 16:9 (Cinematic)" : (isArchitecture || isFantasy || isSciFi ? "16:9 (Landscape)" : "4:5 (Portrait)"),
    model: "Flux.1 [Dev] / Midjourney v6.1",
    cfgScale: isRomantic ? "3.0 - 3.5 (Flux) / 6.0 (SDXL)" : "3.5 (Flux) / 7.0 (SDXL)",
    steps: "30-35 steps",
    consistencyTip: "للحفاظ على نفس الشخصية بين الصور: استخدم نفس وصف الوجه والشعر بدقة (مثل: 'slender brunette woman with shoulder-length wavy hair and hazel eyes') أو استعمل خاصية Image-to-Image (img2img) أو Inpainting."
  };

  // Arabic Breakdown representation
  const layersAr = {
    subject: isRomantic ? "امرأة جذابة في لقطة رومانسية حميمية بتعابير وجه طبيعية هادئة ودافئة" : "الموضوع الأساسي مصاغ بملامح طبيعية واضحة بدون حشو كلمات",
    environment: sceneEnvironment,
    medium: mediumAtmosphere,
    lighting: cinematicLighting,
    composition: cameraFraming,
    technical: "ألوان سينمائية متوازنة، واقعية عضوية ملموسة، خالٍ من رموز الحشو التالفة"
  };

  return {
    finalPrompt,
    negativePrompt,
    settings,
    layersAr,
    wordCount: finalPrompt.split(/\s+/).length
  };
}

module.exports = {
  translateArabicToEnglish,
  buildConcisePrompt
};
