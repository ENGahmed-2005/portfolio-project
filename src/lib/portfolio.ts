export type Language = "en" | "ar";
export const email = "ahmedkahlout258@gmail.com";
export const profiles = {
  GitHub: "https://github.com/ENGahmed-2005",
  LinkedIn: "https://www.linkedin.com/in/ahmed-alkahlout/",
};
export const cvPath = "/media/ahmed-kahlout-cv.pdf";
export const projectSlugs = ["menupilot", "khotwa", "rukza"] as const;
export type ProjectSlug = (typeof projectSlugs)[number];
export const sectionSlugs = ["explore", "process", "experience"] as const;
export type SectionSlug = (typeof sectionSlugs)[number];
export type PageSlug = ProjectSlug | SectionSlug;

export function pagePath(lang: Language, slug?: PageSlug) {
  const base = lang === "ar" ? "/ar/" : "/";
  if (!slug) return base;
  return base + (isProjectSlug(slug) ? "work/" : "") + slug + "/";
}

export function otherLanguage(lang: Language): Language {
  return lang === "en" ? "ar" : "en";
}

export function isProjectSlug(value: string): value is ProjectSlug {
  return projectSlugs.some((slug) => slug === value);
}

export const copy = {
  en: {
    name: "Ahmed Kahlout", role: "Frontend developer", place: "Gaza, Palestine",
    skip: "Skip to content", nav: "Main navigation", work: "Work", about: "About", contact: "Contact",
    switchLabel: "عرض هذه الصفحة بالعربية", heroOne: "Ahmed", heroTwo: "Kahlout.",
    intro: "I build Arabic and English interfaces with React and Next.js. From Gaza, I lead frontend work on MenuPilot and design for the way people read and navigate on a phone.",
    cv: "Download CV", cvDetail: "English PDF",
    workKicker: "Project index", workTitle: "Selected work", all: "All projects",
    filters: ["Web apps", "Education", "Productivity"], filterLabel: "Filter projects by field",
    openProject: "View project", aboutKicker: "About me", aboutTitle: "Building from Gaza.",
    aboutBody: "I study software engineering at Al-Azhar University in Gaza. On MenuPilot, I lead frontend work on the screens that connect a restaurant’s guests and staff.",
    aboutEnd: "I enjoy the practical details of interface work, from getting an Arabic layout to read naturally to making a form usable on a small screen.",
    skills: "Tools I work with", journey: "Education & experience",
    milestones: [["Al-Azhar University, Gaza", "Software engineering student"], ["MenuPilot", "Frontend team lead"], ["Frontend training", "120 hours of frontend development training"]],
    contactKicker: "Get in touch", contactTitle: "Let’s work together.",
    contactBody: "For frontend roles, freelance work, or a conversation about a project, email me directly.",
    top: "Back to top", back: "All projects", roleLabel: "My role", techLabel: "Tools & methods",
    context: "The brief", decision: "Interface decisions", screens: "Inside the project",
    next: "Next project", imageOpen: "Open full image", profileLinks: "Find me online",
    title: "Ahmed Kahlout | Frontend Developer in Gaza",
    description: "Explore Ahmed Kahlout’s React and Next.js frontend portfolio from Gaza, with project walkthroughs of MenuPilot, Khotwa and Rukza, interface screenshots, and his CV.",
  },
  ar: {
    name: "أحمد الكحلوت", role: "مطوّر واجهات أمامية", place: "غزة، فلسطين",
    skip: "انتقل إلى المحتوى", nav: "التنقل الرئيسي", work: "أعمالي", about: "عنّي", contact: "تواصل",
    switchLabel: "Read this page in English", heroOne: "أحمد", heroTwo: "الكحلوت.",
    intro: "أبني واجهات ويب بالعربية والإنجليزية باستخدام React وNext.js. من غزة أقود تطوير واجهات MenuPilot، وأهتم بأن تبقى القراءة والتنقّل واضحَين على الهاتف.",
    cv: "تنزيل السيرة الذاتية", cvDetail: "PDF بالإنجليزية",
    workKicker: "فهرس المشاريع", workTitle: "أعمال مختارة", all: "كل المشاريع",
    filters: ["تطبيقات الويب", "التعليم", "الإنتاجية"], filterLabel: "تصفية المشاريع حسب المجال",
    openProject: "عرض المشروع", aboutKicker: "عنّي", aboutTitle: "أطوّر من غزة.",
    aboutBody: "أدرس هندسة البرمجيات في جامعة الأزهر بغزة. أقود تطوير الواجهات الأمامية في MenuPilot، حيث نعمل على الشاشات التي تربط ضيوف المطعم بطاقمه.",
    aboutEnd: "أستمتع بتفاصيل الواجهات الصغيرة، مثل ترتيب عناصر الصفحة بما يلائم القراءة بالعربية، وتسهيل تعبئة نموذج على شاشة هاتف.",
    skills: "أدوات أستخدمها", journey: "الدراسة والخبرة",
    milestones: [["جامعة الأزهر، غزة", "طالب هندسة برمجيات"], ["MenuPilot", "قائد فريق الواجهات الأمامية"], ["تدريب الواجهات الأمامية", "أتممت ١٢٠ ساعة تدريب في تطوير الواجهات"]],
    contactKicker: "للتواصل", contactTitle: "لنعمل معًا.",
    contactBody: "لفرصة عمل في تطوير الواجهات، أو مشروع مستقل، أو سؤال عن أحد أعمالي، راسلني مباشرة.",
    top: "إلى أعلى الصفحة", back: "كل المشاريع", roleLabel: "دوري", techLabel: "الأدوات والأساليب",
    context: "فكرة المشروع", decision: "قرارات الواجهة", screens: "من داخل المشروع",
    next: "المشروع التالي", imageOpen: "فتح الصورة كاملة", profileLinks: "حساباتي المهنية",
    title: "أحمد الكحلوت | مطوّر واجهات أمامية من غزة",
    description: "تعرّف إلى أعمال أحمد الكحلوت في تطوير واجهات React وNext.js من غزة. تصفّح مشاريع MenuPilot وخطوة ورُكزة، وشاهد صور الواجهات وحمّل سيرته الذاتية.",
  },
};

interface ProjectText {
  name: string;
  field: string;
  summary: string;
  role: string;
  brief: string;
  decision: string;
  alt: [string, string];
  caption: [string, string];
}

interface Project {
  tools: string[];
  images: [string, string];
  size: [[number, number], [number, number]];
  en: ProjectText;
  ar: ProjectText;
}

export const projects: Record<ProjectSlug, Project> = {
  menupilot: {
    tools: ["React", "REST APIs", "RTL"],
    images: ["menupilot-dashboard.webp", "menupilot-menu.webp"], size: [[1600, 1000], [560, 1212]],
    en: {
      name: "MenuPilot", field: "Restaurant operations",
      summary: "A QR menu for guests and an Arabic dashboard for the team preparing their orders.",
      role: "Frontend team lead",
      brief: "A guest at a table needs to browse and order from a phone. The staff looking after that table need a wider view of the restaurant. I lead frontend work across these two sides of MenuPilot.",
      decision: "The guest menu puts categories, prices and ordering controls together on a narrow screen. The staff dashboard uses a persistent right-hand navigation and groups order information so the team can scan it quickly.",
      alt: ["Arabic restaurant dashboard with order cards and right-hand navigation", "Mobile restaurant menu showing dishes, prices and category tabs"],
      caption: ["The staff dashboard brings restaurant activity into one view.", "The guest menu is designed to be opened at the table."],
    },
    ar: {
      name: "MenuPilot", field: "إدارة المطاعم",
      summary: "قائمة طعام عبر رمز QR للضيوف، ولوحة تحكم عربية للفريق الذي يتابع طلباتهم.",
      role: "قائد فريق الواجهات الأمامية",
      brief: "يحتاج الضيف إلى تصفّح القائمة والطلب من هاتفه، ويحتاج الطاقم إلى متابعة ما يجري في المطعم. أقود تطوير الواجهات التي تربط هاتين التجربتين في MenuPilot.",
      decision: "تجمع قائمة الضيف الأصناف والأسعار وأدوات الطلب في مساحة تناسب الهاتف. وفي لوحة الموظفين وضعنا التنقّل على اليمين وجمعنا معلومات الطلبات في بطاقات يسهل مسحها بصريًا.",
      alt: ["لوحة مطعم بالعربية تحتوي على بطاقات الطلبات وقائمة تنقّل يمينية", "قائمة مطعم على الهاتف تعرض الأطباق والأسعار وتبويبات الأصناف"],
      caption: ["تجمع لوحة الموظفين نشاط المطعم في شاشة واحدة.", "يفتح الضيف القائمة من هاتفه على الطاولة."],
    },
  },
  khotwa: {
    tools: ["Flutter", "Dart", "RTL"],
    images: ["khotwa-home.webp", "khotwa-login.webp"], size: [[516, 1117], [516, 1117]],
    en: {
      name: "Khotwa", field: "Education · Prototype",
      summary: "An Arabic prototype for specialists assessing learning needs and planning individual support.",
      role: "Product and interface development",
      brief: "Khotwa explores how an education specialist can go from an Arabic or mathematics assessment to an individual learning plan, then return to see progress. The prototype uses sample data.",
      decision: "The Arabic entry screens introduce the assessment and follow-up flow on a phone. Short labels and wide tap targets keep the steps readable as the specialist moves between tasks.",
      alt: ["Arabic Khotwa welcome screen introducing learning assessment on a phone", "Arabic sign-in screen in the Khotwa educational prototype"],
      caption: ["The welcome screen introduces the Arabic assessment workflow.", "The prototype’s sign-in screen keeps the form in a single column."],
    },
    ar: {
      name: "خطوة", field: "التعليم · نموذج أولي",
      summary: "نموذج عربي يساعد الأخصائي على تقييم احتياجات التعلّم وإعداد خطة تعليمية فردية.",
      role: "تطوير المنتج والواجهات",
      brief: "يستكشف «خطوة» كيف ينتقل الأخصائي من تقييم الطالب في اللغة العربية أو الرياضيات إلى إعداد خطة تعليمية فردية ثم مراجعة التقدّم. يستخدم النموذج بيانات تجريبية.",
      decision: "تعرّف شاشات الدخول الأخصائي بمسار التقييم والمتابعة من الهاتف. استخدمت عبارات قصيرة ومساحات لمس واسعة حتى تبقى الخطوات واضحة عند الانتقال بين المهام.",
      alt: ["شاشة الترحيب العربية في خطوة وتعرض مدخلًا إلى تقييم التعلّم", "شاشة تسجيل الدخول بالعربية في نموذج خطوة التعليمي"],
      caption: ["تعرّف شاشة الترحيب الأخصائي بمسار التقييم بالعربية.", "يجمع نموذج تسجيل الدخول حقوله في عمود واحد على الهاتف."],
    },
  },
  rukza: {
    tools: ["React", "TypeScript", "Chrome extension"],
    images: ["rukza-study.webp", "rukza-popup.webp"], size: [[1120, 630], [360, 800]],
    en: {
      name: "Rukza", field: "Study tools · In development",
      summary: "A bilingual study workspace and a browser extension for planning focus sessions and returning to a task.",
      role: "Product and frontend development",
      brief: "A student can begin with a clear goal and still get distracted. Rukza explores how a study workspace and a Chrome extension can help someone set up a session and find their way back to it.",
      decision: "The study workspace puts the session controls and next action in view. A separate popup design explores how to guide someone back to their task after an interruption.",
      alt: ["Arabic Rukza study workspace with session controls on a dark background", "English interface prototype for the Rukza browser popup"],
      caption: ["The Arabic study workspace in dark mode.", "A design simulation of the browser popup."],
    },
    ar: {
      name: "رُكزة", field: "أدوات دراسة · قيد التطوير",
      summary: "مساحة دراسة بالعربية والإنجليزية وإضافة للمتصفح تساعدان على تنظيم جلسات التركيز والعودة إلى المهمة.",
      role: "تطوير المنتج والواجهات الأمامية",
      brief: "قد يبدأ الطالب بهدف واضح ثم يتشتّت أثناء الدراسة. يستكشف «رُكزة» كيف تساعده مساحة دراسة وإضافة لمتصفح Chrome على إعداد جلسته والرجوع إليها بعد الانقطاع.",
      decision: "تجمع مساحة الدراسة أدوات الجلسة والخطوة التالية في مكان واحد. وفي تصميم منفصل للنافذة المصغّرة، جرّبت كيفية إرشاد الطالب للعودة إلى مهمته بعد التشتّت.",
      alt: ["مساحة الدراسة العربية في رُكزة مع أدوات الجلسة على خلفية داكنة", "نموذج بالإنجليزية لتصميم نافذة إضافة رُكزة في المتصفح"],
      caption: ["مساحة الدراسة العربية مع تفعيل المظهر الداكن.", "محاكاة تصميمية للنافذة المصغّرة في المتصفح."],
    },
  },
};
