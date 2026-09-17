/**
 * Uncensored & Precise Adult/Romantic Semantic Translation Engine
 * Converts explicit/intimate Arabic keywords directly to accurate photographic & art tokens
 * without censorship and without returning generic/random templates.
 */

const ADULT_VOCABULARY = [
  // Explicit & Sexual Actions
  { re: /يضاجع|مضاجعة|نيك|ينيك|سكس|يمارس الجنس|جنس/gi, en: "passionate erotic lovemaking between a man and a woman in an intimate bedroom, romantic sensual atmosphere" },
  { re: /يقبل مؤخرة|يبوس طيز|يبوس مؤخرة/gi, en: "sensual erotic shot of a man intimately kissing a woman's curved lower back and hips, provocative sensual pose" },
  { re: /مؤخرة|طيز/gi, en: "sensual curvy hips and lower back" },
  { re: /وضعيه سكسيه|وضعية سكسية|وضع مثير/gi, en: "provocative intimate lovers pose, sensual body curves, passionate physical touch" },
  { re: /مليف|ميلف|milf/gi, en: "gorgeous mature voluptuous woman with seductive confident aura" },

  // Lingerie, Bikini & Clothing
  { re: /بلباس بكيني|بكيني|مايوه/gi, en: "wearing a tiny stylish bikini highlighting a toned curvaceous physique" },
  { re: /ملابس داخلية|لانجري/gi, en: "dressed in sheer delicate lace lingerie, sensual luxury boudoir style" },
  { re: /عارية|مشلحة|بدون ملابس/gi, en: "tasteful artistic nude silhouette, elegant erotic shadows, soft skin lighting" },

  // Couples & Intimacy
  { re: /بنتين ع سرير|بنتين على السرير|فتاتين على السرير/gi, en: "two gorgeous alluring women lying together on a luxury silk bed in stylish matching bikinis, sensual relaxed pose" },
  { re: /بنت وشب ع السرير|شب وبنت ع السرير/gi, en: "attractive young couple lying together intimately on rumpled bed sheets, close tender embrace" },
  { re: /عم يبوسو بعض|بيبوسو بعض|يبوسو بعض|بوسة|قبلة/gi, en: "passionate deep kiss between a handsome young man and an alluring woman, tender lip touch" },
  { re: /بنت فاتنه الجمال|بنت فاتنة الجمال|بنت جميلة جدا/gi, en: "hyper-attractive stunning woman with flawless radiant face, seductive gaze, glamorous natural beauty" }
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
