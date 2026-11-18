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
    name: "Ahmed Kahlout", role: "React & Next.js frontend developer", place: "Gaza, Palestine",
    skip: "Skip to content", nav: "Main navigation", work: "Work", about: "About", contact: "Contact",
    switchLabel: "عرض هذه الصفحة بالعربية", heroOne: "Ahmed", heroTwo: "Kahlout.",
    intro: "I build Arabic and English interfaces with React and Next.js, with a focus on responsive dashboards, landing pages, and clear product experiences. From Gaza, I lead frontend work on MenuPilot and design for the way people read and navigate on a phone.",
    profileKicker: "Profile snapshot", profileTitle: "Frontend development for bilingual products.",
    profileSummary: "Ahmed Kahlout is a React and Next.js frontend developer from Palestine who builds responsive dashboards, landing pages, and Arabic/English interfaces. His work includes restaurant operations, education, and study productivity products.",
    servicesTitle: "What I do",
    services: [["React & Next.js", "Responsive product interfaces"], ["Dashboards", "Clear data and workflow screens"], ["Landing pages", "Focused, mobile-first marketing pages"], ["Arabic / English UI", "RTL-aware bilingual experiences"]],
    cv: "Download CV", cvDetail: "English PDF",
    workKicker: "Project index", workTitle: "Selected work", all: "All projects",
    filters: ["Web apps", "Education", "Productivity"], filterLabel: "Filter projects by field",
    openProject: "View project", aboutKicker: "About me", aboutTitle: "Building from Gaza.",
    aboutBody: "I study software engineering at Al-Azhar University in Gaza. I build responsive web interfaces with React and Next.js, especially dashboards, landing pages, and product flows. On MenuPilot, I lead frontend work on the screens that connect a restaurant’s guests and staff.",
    aboutEnd: "I enjoy the practical details of interface work, from getting an Arabic layout to read naturally to making a form usable on a small screen.",
    skills: "Tools I work with", journey: "Education & experience",
    milestones: [["Al-Azhar University, Gaza", "Software engineering student"], ["MenuPilot", "Frontend team lead"], ["Frontend training", "120 hours of frontend development training"]],
    contactKicker: "Get in touch", contactTitle: "Let’s work together.",
    contactBody: "For frontend roles, freelance work, dashboards, landing pages, or a conversation about a product interface, email me directly.",
    top: "Back to top", back: "All projects", roleLabel: "My role", techLabel: "Tools & methods",
    context: "The brief", decision: "Interface decisions", screens: "Inside the project",
    next: "Next project", imageOpen: "Open full image", profileLinks: "Find me online",
    title: "Ahmed Kahlout | React & Next.js Frontend Developer",
    description: "Frontend developer Ahmed Kahlout builds React and Next.js dashboards, landing pages, and responsive bilingual interfaces. Explore MenuPilot, Khotwa, Rukza, project case studies, and his CV.",
  },
  ar: {
    name: "أحمد الكحلوت", role: "مطوّر واجهات React وNext.js", place: "غزة، فلسطين",
    skip: "انتقل إلى المحتوى", nav: "التنقل الرئيسي", work: "أعمالي", about: "عنّي", contact: "تواصل",
    switchLabel: "Read this page in English", heroOne: "أحمد", heroTwo: "الكحلوت.",
    intro: "أبني واجهات ويب بالعربية والإنجليزية باستخدام React وNext.js، مع تركيز على لوحات التحكم وصفحات الهبوط وتجارب المنتجات المتجاوبة. من غزة أقود تطوير واجهات MenuPilot، وأهتم بأن تبقى القراءة والتنقّل واضحَين على الهاتف.",
    profileKicker: "نبذة مهنية", profileTitle: "تطوير واجهات لمنتجات ثنائية اللغة.",
    profileSummary: "أحمد الكحلوت مطوّر واجهات أمامية من فلسطين متخصص في React وNext.js، ويبني لوحات تحكم وصفحات هبوط وواجهات عربية وإنجليزية متجاوبة. تشمل أعماله منتجات للمطاعم والتعليم وأدوات الدراسة والإنتاجية.",
    servicesTitle: "ما الذي أعمل عليه؟",
    services: [["React وNext.js", "واجهات منتجات متجاوبة"], ["لوحات التحكم", "شاشات واضحة للبيانات وسير العمل"], ["صفحات الهبوط", "صفحات تسويقية مركزة ومهيأة للهاتف"], ["واجهات عربية وإنجليزية", "تجارب ثنائية اللغة تراعي RTL"]],
    cv: "تنزيل السيرة الذاتية", cvDetail: "PDF بالإنجليزية",
    workKicker: "فهرس المشاريع", workTitle: "أعمال مختارة", all: "كل المشاريع",
    filters: ["تطبيقات الويب", "التعليم", "الإنتاجية"], filterLabel: "تصفية المشاريع حسب المجال",
    openProject: "عرض المشروع", aboutKicker: "عنّي", aboutTitle: "أطوّر من غزة.",
    aboutBody: "أدرس هندسة البرمجيات في جامعة الأزهر بغزة. أبني واجهات متجاوبة باستخدام React وNext.js، وخصوصًا لوحات التحكم وصفحات الهبوط وتدفقات المنتجات. أقود تطوير الواجهات الأمامية في MenuPilot، حيث نعمل على الشاشات التي تربط ضيوف المطعم بطاقمه.",
    aboutEnd: "أستمتع بتفاصيل الواجهات الصغيرة، مثل ترتيب عناصر الصفحة بما يلائم القراءة بالعربية، وتسهيل تعبئة نموذج على شاشة هاتف.",
    skills: "أدوات أستخدمها", journey: "الدراسة والخبرة",
    milestones: [["جامعة الأزهر، غزة", "طالب هندسة برمجيات"], ["MenuPilot", "قائد فريق الواجهات الأمامية"], ["تدريب الواجهات الأمامية", "أتممت ١٢٠ ساعة تدريب في تطوير الواجهات"]],
    contactKicker: "للتواصل", contactTitle: "لنعمل معًا.",
    contactBody: "لفرصة عمل في تطوير الواجهات، أو مشروع مستقل، أو لوحة تحكم، أو صفحة هبوط، أو سؤال عن أحد أعمالي، راسلني مباشرة.",
    top: "إلى أعلى الصفحة", back: "كل المشاريع", roleLabel: "دوري", techLabel: "الأدوات والأساليب",
    context: "فكرة المشروع", decision: "قرارات الواجهة", screens: "من داخل المشروع",
    next: "المشروع التالي", imageOpen: "فتح الصورة كاملة", profileLinks: "حساباتي المهنية",
    title: "أحمد الكحلوت | مطوّر واجهات React وNext.js",
    description: "أحمد الكحلوت مطوّر واجهات يبني لوحات تحكم وصفحات هبوط وواجهات ثنائية اللغة باستخدام React وNext.js. تصفّح MenuPilot وخطوة ورُكزة ودراسات الحالة والسيرة الذاتية.",
  },
};

interface ProjectText {
  name: string;
  field: string;
  summary: string;
  role: string;
  brief: string;
  decision: string;
  facts: [string, string][];
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
      summary: "A React restaurant experience with a QR menu for guests and an Arabic dashboard for the team preparing their orders.",
      role: "Frontend team lead",
      brief: "A guest at a table needs to browse and order from a phone. The staff looking after that table need a wider view of the restaurant. I lead frontend work across these two sides of MenuPilot.",
      decision: "The guest menu puts categories, prices and ordering controls together on a narrow screen. The staff dashboard uses a persistent right-hand navigation and groups order information so the team can scan it quickly.",
      facts: [["Project type", "Restaurant web application"], ["My role", "Frontend team lead"], ["Frontend", "React"], ["Focus", "QR menu, ordering flow, staff dashboard, RTL interfaces"]],
      alt: ["Arabic restaurant dashboard with order cards and right-hand navigation", "Mobile restaurant menu showing dishes, prices and category tabs"],
      caption: ["The staff dashboard brings restaurant activity into one view.", "The guest menu is designed to be opened at the table."],
    },
    ar: {
      name: "MenuPilot", field: "إدارة المطاعم",
      summary: "تجربة مطاعم مبنية بـ React تجمع قائمة طعام عبر رمز QR للضيوف ولوحة تحكم عربية للفريق الذي يتابع طلباتهم.",
      role: "قائد فريق الواجهات الأمامية",
      brief: "يحتاج الضيف إلى تصفّح القائمة والطلب من هاتفه، ويحتاج الطاقم إلى متابعة ما يجري في المطعم. أقود تطوير الواجهات التي تربط هاتين التجربتين في MenuPilot.",
      decision: "تجمع قائمة الضيف الأصناف والأسعار وأدوات الطلب في مساحة تناسب الهاتف. وفي لوحة الموظفين وضعنا التنقّل على اليمين وجمعنا معلومات الطلبات في بطاقات يسهل مسحها بصريًا.",
      facts: [["نوع المشروع", "تطبيق ويب للمطاعم"], ["دوري", "قائد فريق الواجهات الأمامية"], ["الواجهة الأمامية", "React"], ["التركيز", "قائمة QR، تدفق الطلب، لوحة الموظفين، وواجهات RTL"]],
      alt: ["لوحة مطعم بالعربية تحتوي على بطاقات الطلبات وقائمة تنقّل يمينية", "قائمة مطعم على الهاتف تعرض الأطباق والأسعار وتبويبات الأصناف"],
      caption: ["تجمع لوحة الموظفين نشاط المطعم في شاشة واحدة.", "يفتح الضيف القائمة من هاتفه على الطاولة."],
    },
  },
  khotwa: {
    tools: ["Flutter", "Dart", "RTL"],
    images: ["khotwa-home.webp", "khotwa-login.webp"], size: [[516, 1117], [516, 1117]],
    en: {
      name: "Khotwa", field: "Education · Prototype",
      summary: "An Arabic educational app prototype for specialists assessing learning needs and planning individual support.",
      role: "Product and interface development",
      brief: "Khotwa explores how an education specialist can go from an Arabic or mathematics assessment to an individual learning plan, then return to see progress. The prototype uses sample data.",
      decision: "The Arabic entry screens introduce the assessment and follow-up flow on a phone. Short labels and wide tap targets keep the steps readable as the specialist moves between tasks.",
      facts: [["Project type", "Educational app prototype"], ["My role", "Product and interface development"], ["Technology", "Flutter and Dart"], ["Focus", "Academic assessment, individual support planning, Arabic mobile workflows"]],
      alt: ["Arabic Khotwa welcome screen introducing learning assessment on a phone", "Arabic sign-in screen in the Khotwa educational prototype"],
      caption: ["The welcome screen introduces the Arabic assessment workflow.", "The prototype’s sign-in screen keeps the form in a single column."],
    },
    ar: {
      name: "خطوة", field: "التعليم · نموذج أولي",
      summary: "نموذج أولي لتطبيق تعليمي عربي يساعد الأخصائي على تقييم احتياجات التعلّم وإعداد خطة تعليمية فردية.",
      role: "تطوير المنتج والواجهات",
      brief: "يستكشف «خطوة» كيف ينتقل الأخصائي من تقييم الطالب في اللغة العربية أو الرياضيات إلى إعداد خطة تعليمية فردية ثم مراجعة التقدّم. يستخدم النموذج بيانات تجريبية.",
      decision: "تعرّف شاشات الدخول الأخصائي بمسار التقييم والمتابعة من الهاتف. استخدمت عبارات قصيرة ومساحات لمس واسعة حتى تبقى الخطوات واضحة عند الانتقال بين المهام.",
      facts: [["نوع المشروع", "نموذج أولي لتطبيق تعليمي"], ["دوري", "تطوير المنتج والواجهات"], ["التقنية", "Flutter وDart"], ["التركيز", "التقييم الأكاديمي، خطط الدعم الفردية، وتدفقات عربية للهاتف"]],
      alt: ["شاشة الترحيب العربية في خطوة وتعرض مدخلًا إلى تقييم التعلّم", "شاشة تسجيل الدخول بالعربية في نموذج خطوة التعليمي"],
      caption: ["تعرّف شاشة الترحيب الأخصائي بمسار التقييم بالعربية.", "يجمع نموذج تسجيل الدخول حقوله في عمود واحد على الهاتف."],
    },
  },
  rukza: {
    tools: ["React", "TypeScript", "Chrome extension"],
    images: ["rukza-study.webp", "rukza-popup.webp"], size: [[1120, 630], [360, 800]],
    en: {
      name: "Rukza", field: "Study tools · In development",
      summary: "A React and TypeScript productivity tool with a bilingual study workspace and browser extension for focus sessions.",
      role: "Product and frontend development",
      brief: "A student can begin with a clear goal and still get distracted. Rukza explores how a study workspace and a Chrome extension can help someone set up a session and find their way back to it.",
      decision: "The study workspace puts the session controls and next action in view. A separate popup design explores how to guide someone back to their task after an interruption.",
      facts: [["Project type", "Study productivity tool"], ["My role", "Product and frontend development"], ["Technology", "React and TypeScript"], ["Focus", "Focus sessions, bilingual study workspace, Chrome extension"]],
      alt: ["Arabic Rukza study workspace with session controls on a dark background", "English interface prototype for the Rukza browser popup"],
      caption: ["The Arabic study workspace in dark mode.", "A design simulation of the browser popup."],
    },
    ar: {
      name: "رُكزة", field: "أدوات دراسة · قيد التطوير",
      summary: "أداة إنتاجية مبنية بـ React وTypeScript تجمع مساحة دراسة ثنائية اللغة وإضافة للمتصفح لتنظيم جلسات التركيز.",
      role: "تطوير المنتج والواجهات الأمامية",
      brief: "قد يبدأ الطالب بهدف واضح ثم يتشتّت أثناء الدراسة. يستكشف «رُكزة» كيف تساعده مساحة دراسة وإضافة لمتصفح Chrome على إعداد جلسته والرجوع إليها بعد الانقطاع.",
      decision: "تجمع مساحة الدراسة أدوات الجلسة والخطوة التالية في مكان واحد. وفي تصميم منفصل للنافذة المصغّرة، جرّبت كيفية إرشاد الطالب للعودة إلى مهمته بعد التشتّت.",
      facts: [["نوع المشروع", "أداة دراسة وإنتاجية"], ["دوري", "تطوير المنتج والواجهات الأمامية"], ["التقنية", "React وTypeScript"], ["التركيز", "جلسات التركيز، مساحة دراسة ثنائية اللغة، وإضافة Chrome"]],
      alt: ["مساحة الدراسة العربية في رُكزة مع أدوات الجلسة على خلفية داكنة", "نموذج بالإنجليزية لتصميم نافذة إضافة رُكزة في المتصفح"],
      caption: ["مساحة الدراسة العربية مع تفعيل المظهر الداكن.", "محاكاة تصميمية للنافذة المصغّرة في المتصفح."],
    },
  },
};
