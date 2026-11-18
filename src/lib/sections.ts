import { isProjectSlug, projects, type Language, type ProjectSlug } from "./portfolio";

export const sections = {
  explore: {
    en: { name: "Portfolio walk", label: "Interactive map", description: "Walk through Ahmed Kahlout’s illustrated portfolio. Collect five stamps and open his projects, interface lab and experience page along the way." },
    ar: { name: "جولة في أعمالي", label: "خريطة تفاعلية", description: "تجوّل في خريطة أعمال أحمد الكحلوت. اجمع خمسة أختام وافتح من محطاتها صفحات المشاريع ومختبر الواجهات والخبرة." },
  },
  process: {
    en: { name: "Interface lab", label: "Design & implementation", description: "Switch an order card between Arabic and English and explore the layout, reading order and number-formatting decisions behind a bilingual interface." },
    ar: { name: "مختبر الواجهات", label: "التصميم والتنفيذ", description: "جرّب بطاقة طلب بالعربية والإنجليزية، واكتشف كيف يتغيّر ترتيب عناصرها واتجاه القراءة وعرض الأرقام عند بناء واجهة ثنائية اللغة." },
  },
  experience: {
    en: { name: "Experience & education", label: "Background", description: "Read about Ahmed Kahlout’s frontend leadership on MenuPilot, software engineering studies in Gaza and training in frontend development." },
    ar: { name: "الخبرة والدراسة", label: "مساري المهني", description: "تعرّف إلى دور أحمد الكحلوت في قيادة فريق واجهات MenuPilot، ودراسته لهندسة البرمجيات في غزة، وتدريبه في تطوير الواجهات الأمامية." },
  },
};

export type StopId = ProjectSlug | "process" | "experience";
// Positions are intersections on the walking map, in grid units.
export const stops: { id: StopId; column: number; row: number }[] = [
  { id: "menupilot", column: 2, row: 3 },
  { id: "khotwa", column: 6, row: 3 },
  { id: "rukza", column: 10, row: 3 },
  { id: "process", column: 2, row: 7 },
  { id: "experience", column: 10, row: 7 },
];
export function stopName(lang: Language, id: StopId) {
  return isProjectSlug(id) ? projects[id][lang].name : sections[id][lang].name;
}
export const walkCopy = {
  en: {
    nav: "Map", play: "Play the studio tour", back: "Return to the map",
    intro: "Tap a building or use the arrow keys to collect its stamp. Once you arrive, select it again to open its page.",
    board: "Walking map", help: "Tap a building to walk there, or focus the map and use the arrow keys. Press Enter at a stop to open its page.",
    basic: "Select a building or a destination to open its page.", pad: "Movement controls",
    up: "Move up", left: "Move left", down: "Move down", right: "Move right",
    passport: "Your stamp book", directory: "Open a destination", progress: "Stamps collected",
    idle: "You’re in the square.", transit: "On the street", at: "You’re at", open: "Open this page",
    complete: "All five stamps collected!", restart: "Start a new walk", checked: "Stamp collected",
    blocked: "Follow the streets to the next crossing.", restored: "Walk restarted.",
    mapShort: ["MenuPilot", "Khotwa", "Rukza", "Interface lab", "Experience"],
  },
  ar: {
    nav: "الخريطة", play: "ابدأ الجولة التفاعلية", back: "العودة إلى الخريطة",
    intro: "اضغط على مبنى أو تحرّك بالأسهم لتجمع ختمه. عند الوصول، اضغط المبنى مرة أخرى لفتح صفحته.",
    board: "خريطة الجولة", help: "اضغط على مبنى لتمشي إليه، أو ضع التركيز على الخريطة واستخدم مفاتيح الأسهم. اضغط Enter عند المحطة لفتح صفحتها.",
    basic: "اختر مبنى أو رابطًا من قائمة المحطات لفتح صفحته.", pad: "أزرار الحركة",
    up: "تحرّك للأعلى", left: "تحرّك لليسار", down: "تحرّك للأسفل", right: "تحرّك لليمين",
    passport: "دفتر أختامك", directory: "افتح إحدى المحطات", progress: "الأختام المجموعة",
    idle: "أنت في الساحة.", transit: "أنت في الطريق", at: "وصلت إلى", open: "افتح صفحة المحطة",
    complete: "اكتملت الأختام الخمسة!", restart: "ابدأ جولة جديدة", checked: "جُمِع الختم",
    blocked: "اتبع الشارع حتى أقرب تقاطع.", restored: "بدأت جولة جديدة.",
    mapShort: ["MenuPilot", "خطوة", "رُكزة", "مختبر الواجهات", "الخبرة"],
  },
};
