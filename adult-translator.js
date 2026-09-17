/**
 * Uncensored, Literal Arabic-to-English Translation Engine v13.0
 * 
 * Strict Principle:
 * - NO generic dilution (never replace explicit acts with "intimate embrace" or vague romantic words).
 * - Exact, direct, anatomically precise English mapping.
 * - Preserves the user's literal intent for uncensored image synthesis.
 */

const LITERAL_DICTIONARY = [
  // Direct Acts & Intercourse (No toning down)
  { re: /يمارس للجنس من طيز|يمارس الجنس من طيز|نيك من ورا|نيك من طيز|جنس خلفي|anal sex|anal/gi, en: "explicit hardcore anal penetration sex from behind, raw uncensored sexual intercourse, intense pleasure" },
  { re: /يضاجع|مضاجعة|نيك|ينيك|سكس|يمارس الجنس|ممارسة الجنس|sex/gi, en: "explicit uncensored sexual intercourse, full penetration sex, raw intense sexual act, passionate lovers" },
  { re: /مص القضيب|يمص زب|بلع القضيب|blowjob|oral sex/gi, en: "explicit uncensored oral sex, sucking penis, intense deep oral pleasure" },
  { re: /تفرك كسها|تداعب نفسها|عادة سرية|masturbation|masturbating/gi, en: "explicit uncensored female masturbation, fingering wet vagina, spreading legs in intense erotic pleasure" },
  { re: /يلحس كسها|لحس كس|لحس مهبل|cunnilingus/gi, en: "explicit uncensored oral sex on woman, licking wet vagina, sensual tongue contact" },
  { re: /يقبل مؤخرة|يبوس طيز|يبوس مؤخرة/gi, en: "kissing bare buttocks, sensual mouth contact on round butt" },
  { re: /عم يبوسو بعض|بيبوسو بعض|يبوسو بعض|بوسة عميقة|قبلة فرنسية|french kiss/gi, en: "passionate deep french kiss, open mouth tongue kissing, intense erotic lip contact" },

  // Nudity & Stripping (Literal, no soft filtering)
  { re: /شلحها ملابسها|شلحها|ازل اللباس عنها|خلع ملابس|تعرية/gi, en: "undressing, stripping clothes off, taking off clothes completely, revealing full naked bare body" },
  { re: /صورة بنت عارية|بنت عارية|عارية تماما|مشلحة|بدون ملابس|fully nude|naked/gi, en: "completely naked woman, full frontal nudity, bare skin, exposed breasts and bare vagina, uncensored nsfw" },
  { re: /صدر عاري|بزاز عارية|عارية الصدر|topless/gi, en: "topless woman, completely bare exposed breasts, prominent erect nipples, bare chest" },

  // Race & Specific Physical Demographics
  { re: /بنت زنجية|فتاة زنجية|سمراء افريقية|سوداء افريقية|زنوج/gi, en: "Black African woman, rich dark ebony skin tone, authentic African beauty" },
  { re: /بنت شقراء|شقراء/gi, en: "alluring blonde woman, fair skin" },
  { re: /بنت لاتينية|لاتينية/gi, en: "curvaceous Latina woman, golden bronze skin" },
  { re: /بنت اسيوية|اسيوية/gi, en: "East Asian woman, pale porcelain skin" },
  { re: /بنت عربية|عربية/gi, en: "Middle Eastern Arab woman, olive skin tone, dark captivating eyes" },

  // Anatomy & Curves (Exact terms, no euphemisms)
  { re: /ب بزاز كبار|بزاز كبار|بزاز كبيرة|صدر كبير|أثداء كبيرة|big breasts|huge tits/gi, en: "massive heavy natural breasts, huge cleavage, voluptuous bust" },
  { re: /طيز كبيرة|طيز كبير|مؤخرة كبيرة|ارداف عريضة|أرداف ضخمة|big ass|fat ass/gi, en: "huge round voluptuous buttocks, prominent bubble butt, wide curvy hips" },
  { re: /كسها|كس|المهبل|pussy|vagina/gi, en: "bare exposed wet vagina, detailed female genitalia, pussy" },
  { re: /قضيب كبير|زب كبير|عضو ذكري كبير|big cock|big dick/gi, en: "large erect penis, hard masculine cock, detailed male anatomy" },
  { re: /قضيب|زب|عضو ذكري|penis|dick|cock/gi, en: "erect penis, hard masculine cock" },
  { re: /مليف|ميلف|كيرفي|voluptuous/gi, en: "voluptuous busty milf, thick curvy body, mature seductive sex appeal" },

  // Outfits & Revealings
  { re: /بكيني شفاف|لباس بحر شفاف/gi, en: "micro see-through sheer transparent bikini, visible nipples and private areas" },
  { re: /بكيني خيط|بكيني|مايوه/gi, en: "tiny skimpy micro string bikini, revealing curves" },
  { re: /لانجري شفاف|ملابس داخلية شفافة/gi, en: "sheer see-through lace lingerie babydoll, exposed nipples and bare panties" },
  { re: /لانجري|ملابس داخلية/gi, en: "revealing sexy black lace lingerie, garter belt, stockings" },

  // Poses & Settings
  { re: /وضعية الكلب|من الخلف|doggy style|doggystyle/gi, en: "doggystyle sex pose on all fours on bed, rear view intercourse" },
  { re: /فوقه|فوق الرجل|cowgirl/gi, en: "riding on top pose, cowgirl sex position on bed" },
  { re: /مفتوحة الرجلين|فاتحة رجليها|فتحة رجلين/gi, en: "spreading legs wide open, exposed between legs, seductive spread eagle pose" },
  { re: /ع السرير|على السرير|بالتخت|غرفة نوم/gi, en: "on luxury rumpled bed sheets in dim bedroom" }
];

function translateUncensored(text) {
  let working = text.trim();
  let parts = [];

  for (const item of LITERAL_DICTIONARY) {
    if (item.re.test(working)) {
      parts.push(item.en);
      working = working.replace(item.re, " ");
    }
  }

  if (parts.length > 0) {
    // If any remnant text remains, include it
    const remaining = working.trim().replace(/\s+/g, ' ');
    return {
      translated: parts.join(", "),
      hasMatch: true,
      remaining: remaining
    };
  }

  return {
    translated: null,
    hasMatch: false,
    remaining: text
  };
}

module.exports = {
  translateUncensored
};
