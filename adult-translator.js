/**
 * Uncensored, Highly Accurate Dialect Translation Engine v11.0
 * Deep coverage of Arabic slang, explicit anatomy, actions, and physical attributes.
 * Zero generic fallback, 100% accurate mapping.
 */

const ADULT_VOCABULARY = [
  // Physical Features, Race & Anatomy
  { re: /بنت زنجية|فتاة زنجية|سمراء افريقية|سوداء/gi, en: "gorgeous dark-skinned African black woman with glowing ebony skin, highly attractive facial features" },
  { re: /ب بزاز كبار|بزاز كبار|بزاز كبيرة|صدر كبير|أثداء كبيرة/gi, en: "curvaceous voluptuous body with large natural bust, seductive feminine silhouette" },
  { re: /طيز كبيرة|مؤخرة كبيرة|ارداف عريضة|أرداف/gi, en: "curvaceous body with prominent round hips, seductive lower body curves" },
  { re: /كسها|كس|المهبل/gi, en: "intimate feminine anatomy, sensual soft lighting, artistic erotic detail" },
  { re: /قضيب|زب|عضو ذكري/gi, en: "intimate masculine anatomy, defined male muscular physique" },
  { re: /صورة بنت عارية|بنت عارية|عارية تماما|مشلحة|بدون ملابس|خلع ملابس|شلحها ملابسها|شلحها|ازل اللباس عنها/gi, en: "hyperrealistic uncensored explicit erotic photograph of a completely naked alluring woman, natural bare skin, detailed curves, sensual pose" },

  // Sexual Acts & Explicit Encounters
  { re: /يمارس للجنس من طيز|يمارس الجنس من طيز|جنس خلفي|anal/gi, en: "hyperrealistic sensual erotic photograph of an intense passionate couple in an intimate from-behind pose on bed, authentic skin texture and soft lighting" },
  { re: /يضاجع|مضاجعة|نيك|ينيك|سكس|يمارس الجنس|جنس/gi, en: "hyperrealistic authentic candid photograph of two passionate lovers engaged in an intimate sensual embrace on luxury bed sheets, real skin textures" },
  { re: /تفرك كسها|تداعب نفسها|عادة سرية/gi, en: "hyperrealistic explicit erotic photograph of an attractive woman lying back in sensual self-pleasure, seductive expression, natural bare skin" },
  { re: /يقبل مؤخرة|يبوس طيز|يبوس مؤخرة/gi, en: "hyperrealistic erotic photograph of a man kissing a woman's curved lower back and hips closely, seductive intimate pose" },
  { re: /وضعيه سكسيه|وضعية سكسية|وضع مثير/gi, en: "hyperrealistic seductive lovers pose in an atmospheric bedroom, candid authentic passion, soft warm lighting" },
  { re: /مليف|ميلف|بجسد مليئ|كيرفي/gi, en: "stunning voluptuous mature woman with gorgeous natural curves, seductive facial expression, real human texture" },

  // Outfits
  { re: /بلباس بكيني|بكيني|مايوه/gi, en: "hyperrealistic photograph of an attractive woman in a tiny revealing string bikini, toned sun-kissed physique" },
  { re: /ملابس داخلية|لانجري/gi, en: "hyperrealistic boudoir photo in sheer see-through lace lingerie, luxury bedroom atmosphere" },

  // Couples
  { re: /بنتين ع سرير|بنتين على السرير|فتاتين على السرير/gi, en: "hyperrealistic authentic photograph of two gorgeous women lying together naked on luxury silk bed sheets, intimate sensual pose" },
  { re: /بنت وشب ع السرير|شب وبنت ع السرير/gi, en: "hyperrealistic candid photograph of a handsome man and alluring woman lying together intimately on rumpled bed sheets, tender embrace" },
  { re: /عم يبوسو بعض|بيبوسو بعض|يبوسو بعض|بوسة|قبلة/gi, en: "hyperrealistic candid photo of a passionate deep kiss between a young man and attractive woman, realistic lip contact and expressions" }
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
