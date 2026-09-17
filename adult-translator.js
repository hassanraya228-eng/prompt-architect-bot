/**
 * Uncensored & Hyper-Realistic Photorealistic Translation Engine v10.0
 * Converts explicit, NSFW, erotic, and intimate Arabic keywords into authentic photographic RAW tokens
 * Strictly photorealistic (NO anime, NO cartoon, NO 3D render).
 */

const ADULT_VOCABULARY = [
  // Explicit & Sexual Actions
  { re: /يمارس للجنس من طيز|يمارس الجنس من طيز|جنس خلفي|anal/gi, en: "hyperrealistic sensual erotic photograph of an intimate passionate lovers encounter from behind in a luxury boudoir, authentic skin pores and lighting" },
  { re: /يضاجع|مضاجعة|نيك|ينيك|سكس|يمارس الجنس|جنس/gi, en: "hyperrealistic authentic candid photograph of two passionate lovers engaged in an intimate sensual embrace on luxury bed sheets, real skin textures" },
  { re: /تفرك كسها|تداعب نفسها|عادة سرية/gi, en: "hyperrealistic erotic fine-art photograph of an alluring seductive woman lying in sensual repose on silk sheets, seductive look, natural skin" },
  { re: /صورة قضيب|قضيب/gi, en: "tasteful artistic erotic photograph focusing on male muscular physique and seductive masculine torso, warm dramatic shadows" },
  { re: /ازل اللباس عنها|أزل اللباس|شلحها|خلع ملابس/gi, en: "hyperrealistic tasteful artistic nude glamour photograph, beautiful woman shedding sheer silk garments, natural curves, realistic soft window lighting" },
  { re: /يقبل مؤخرة|يبوس طيز|يبوس مؤخرة/gi, en: "hyperrealistic erotic editorial photograph of a man intimately kissing a woman's curved lower back and hips, real human skin tones" },
  { re: /مؤخرة|طيز/gi, en: "sensual curvy female hips and lower back, realistic natural skin" },
  { re: /وضعيه سكسيه|وضعية سكسية|وضع مثير/gi, en: "hyperrealistic seductive lovers pose in an atmospheric bedroom, candid authentic passion, soft warm lighting" },
  { re: /مليف|ميلف|بجسد مليئ|كيرفي/gi, en: "stunning voluptuous mature woman with gorgeous natural curves, seductive facial expression, real human texture" },

  // Lingerie, Bikini & Clothing
  { re: /بلباس بكيني|بكيني|مايوه/gi, en: "hyperrealistic 35mm editorial photograph of a woman wearing a tiny luxury bikini, natural skin details, beach sunlight" },
  { re: /ملابس داخلية|لانجري/gi, en: "hyperrealistic boudoir portrait in sheer delicate black lace lingerie, soft candid indoor lighting" },
  { re: /عارية|مشلحة|بدون ملابس/gi, en: "hyperrealistic fine-art artistic nude photography, soft cinematic chiaroscuro shadows, authentic human anatomy" },

  // Couples & Intimacy
  { re: /بنتين ع سرير|بنتين على السرير|فتاتين على السرير/gi, en: "hyperrealistic authentic photograph of two gorgeous women lying together on luxury silk bed sheets, intimate relaxed pose, real skin" },
  { re: /بنت وشب ع السرير|شب وبنت ع السرير/gi, en: "hyperrealistic candid photograph of a handsome man and alluring woman lying together intimately on rumpled bed sheets, tender embrace" },
  { re: /عم يبوسو بعض|بيبوسو بعض|يبوسو بعض|بوسة|قبلة/gi, en: "hyperrealistic candid photo of a passionate deep kiss between a young man and attractive woman, realistic lip contact and expressions" },
  { re: /بنت فاتنه الجمال|بنت فاتنة الجمال|بنت جميلة جدا/gi, en: "hyperrealistic high-fashion portrait of an exquisitely beautiful woman, captivating eyes, natural skin texture with subtle pores" }
];

function translateUncensored(text) {
  let lower = text.trim();
  let matches = [];

  for (const item of ADULT_VOCABULARY) {
    if (item.re.test(lower)) {
      matches.push(item.en);
      lower = lower.replace(item.re, " ");
    }
  }

  if (matches.length > 0) {
    return matches.join(", ");
  }

  return null;
}

module.exports = {
  translateUncensored
};
