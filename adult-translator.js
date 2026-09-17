/**
 * Uncensored, Literal Arabic-to-English Translation Engine v15.0
 * Comprehensive Arabic grammatical derivations (تضاجع/يضاجع, تنك/ينيك, فتاة/بنت, etc.)
 */

const LITERAL_DICTIONARY = [
  // Intercourse & Sexual Acts (All conjugations: تضاجع, يضاجع, تنك, ينيك, ضاجع, يمارس, تمارس)
  { re: /يمارس للجنس|يمارس الجنس|تمارس الجنس|ممارسة الجنس|يضاجع|تضاجع|مضاجعة|نيك|ينيك|تنيك|ينيكا|سكس|sex|intercourse/gi, en: "passionate lovers engaged in intense erotic intercourse, woman riding man on bed, intimate physical connection" },
  { re: /يمارس للجنس من طيز|يمارس الجنس من طيز|تمارس الجنس من طيز|نيك من ورا|نيك من طيز|جنس خلفي|anal sex|anal/gi, en: "passionate couple in intimate rear-entry position on bed, erotic connection" },
  { re: /مص القضيب|يمص زب|تمص زب|بلع القضيب|blowjob|oral sex/gi, en: "sensual erotic oral intimacy on bed" },
  { re: /تفرك كسها|يفرك كسها|تداعب نفسها|عادة سرية|masturbation|masturbating/gi, en: "alluring woman in sensual self-pleasure pose on luxury bed" },
  { re: /يلحس كسها|لحس كس|لحس مهبل|cunnilingus/gi, en: "sensual erotic intimacy between lovers on bed" },
  { re: /يقبل مؤخرة|يبوس طيز|يبوس مؤخرة/gi, en: "sensual kiss on bare curvy hips" },
  { re: /عم يبوسو بعض|بيبوسو بعض|يبوسو بعض|تبوسو|يقبلها|تقبله|بوسة|قبلة/gi, en: "loving couple kissing, lips touching softly, closed eyes" },

  // Nudity & Stripping
  { re: /شلحها ملابسها|شلحها|ازل اللباس عنها|خلع ملابس|تعرية|مشلحة|مشلح/gi, en: "alluring lovers stripping clothes off, completely naked bare skin" },
  { re: /صورة بنت عارية|بنت عارية|فتاة عارية|امرأة عارية|عارية تماما|بدون ملابس|fully nude|naked/gi, en: "stunning naked woman, natural bare skin, voluptuous curves" },
  { re: /صدر عاري|بزاز عارية|عارية الصدر|topless/gi, en: "topless woman, bare exposed chest, natural feminine curves" },

  // People & Genders (فتاة, فتاه, بنت, صبية, شاب, شب, رجل)
  { re: /لفتاه|لفتاة|فتاة|فتاه|بنت|امرأة|امرأه|صبية|نساء/gi, en: "gorgeous young woman" },
  { re: /لشاب|لشب|شب|شاب|رجل|شابين/gi, en: "handsome young man" },
  { re: /بنت زنجية|فتاة زنجية|فتاه زنجية|سمراء افريقية|سوداء افريقية/gi, en: "striking Black African woman with rich ebony skin" },
  { re: /شقراء|بنت شقراء/gi, en: "alluring blonde woman" },
  { re: /لاتينية/gi, en: "curvaceous Latina woman" },

  // Anatomy & Physical Attributes
  { re: /ب بزاز كبار|بزاز كبار|بزاز كبيرة|صدر كبير|أثداء كبيرة|big breasts|huge tits/gi, en: "large voluptuous natural breasts, deep cleavage" },
  { re: /طيز كبيرة|طيز كبير|مؤخرة كبيرة|ارداف عريضة|أرداف ضخمة|big ass/gi, en: "curvaceous hips, round prominent buttocks" },
  { re: /كسها|كس|المهبل|pussy|vagina/gi, en: "intimate feminine curves" },
  { re: /قضيب|زب|عضو ذكري|penis|cock/gi, en: "masculine athletic physique" },

  // Poses, Mood & Settings
  { re: /مشهد رومنسيي|مشهد رومنسي|مشهد رومانسي|رومنسي|رومانسي/gi, en: "romantic intimate atmosphere" },
  { re: /وضعية الكلب|من الخلف|doggy style|doggystyle/gi, en: "lovers on all fours pose on bed" },
  { re: /فوقه|فوق الرجل|cowgirl/gi, en: "woman on top pose on bed" },
  { re: /مفتوحة الرجلين|فاتحة رجليها/gi, en: "reclining on bed with legs parted" },
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
