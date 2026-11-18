import { cvPath, pagePath, type Language } from "@/lib/portfolio";
import { sections, walkCopy } from "@/lib/sections";
import { Header, Footer, Icon, JsonLd } from "./Portfolio";
import "./field-notes.css";

const lab = {
  en: {
    intro: "Try the same order in two languages. Watch where the first item starts, where the total sits, and how the order reference reads.",
    demo: "A bilingual order card", legend: "Card language", sample: "Example order",
    notes: "What changes in the interface",
    items: [
      ["Reading order", "The Arabic card starts at the right edge. The English card starts at the left. The item, quantity and total keep their sequence in both languages."],
      ["Mixed text", "The order reference includes a Latin letter and digits. Isolating it keeps its characters together inside the Arabic sentence."],
      ["Space for the translation", "The summary can grow vertically when a label needs more room. Its text and dividers align with the start of the chosen language."],
    ],
    more: "See the MenuPilot interfaces",
  },
  ar: {
    intro: "جرّب الطلب نفسه بلغتين. راقب نقطة بداية اسم الصنف، ومكان المجموع، وطريقة قراءة مرجع الطلب.",
    demo: "بطاقة طلب بلغتين", legend: "لغة البطاقة", sample: "طلب توضيحي",
    notes: "ما الذي يتغيّر في الواجهة؟",
    items: [
      ["ترتيب القراءة", "تبدأ البطاقة العربية من اليمين والإنجليزية من اليسار. يبقى تسلسل الصنف والكمية والمجموع واضحًا في اللغتين."],
      ["مزج الحروف بالأرقام", "يتكوّن مرجع الطلب من حرف لاتيني وأرقام. عزل اتجاهه يُبقي رموزه معًا حين يظهر داخل النص العربي."],
      ["مساحة للترجمة", "تتمدد البطاقة عموديًا عندما يحتاج العنوان إلى مساحة أكبر. تصطف النصوص والفواصل مع بداية السطر في اللغة المختارة."],
    ],
    more: "شاهد واجهات MenuPilot",
  },
};

function OrderCard({ language }: { language: Language }) {
  const ar = language === "ar";
  return <div className={"receipt receipt-" + language} lang={language} dir={ar ? "rtl" : "ltr"}>
    <span className="receipt-ref">{ar ? "مرجع الطلب" : "Order reference"} <bdi dir="ltr">#A-104</bdi></span>
    <h3>{ar ? "ملخّص الطلب" : "Order summary"}</h3>
    <dl>
      <div><dt>{ar ? "الصنف" : "Item"}</dt><dd>{ar ? "مناقيش زعتر" : "Za’atar flatbread"}</dd></div>
      <div><dt>{ar ? "الكمية" : "Quantity"}</dt><dd>{ar ? "٢" : "2"}</dd></div>
      <div><dt>{ar ? "المجموع" : "Total"}</dt><dd><bdi>{ar ? "١٨٫٠٠ ₪" : "₪18.00"}</bdi></dd></div>
    </dl>
  </div>;
}

function InterfaceLab({ lang }: { lang: Language }) {
  const t = lab[lang];
  return <div className="field-grid">
    <section className="lab-preview" aria-labelledby="lab-demo">
      <h2 id="lab-demo">{t.demo}</h2>
      <fieldset className="lab-switch"><legend>{t.legend}</legend>
        {(["ar", "en"] as const).map(option => <label key={option}>
          <input type="radio" name="receipt-language" id={"receipt-" + option} defaultChecked={lang === option} />
          <span lang={option}>{option === "ar" ? "العربية" : "English"}</span>
        </label>)}
      </fieldset>
      <div className="demo-mat"><OrderCard language="ar" /><OrderCard language="en" /></div>
      <small>{t.sample}</small>
    </section>
    <section className="lab-notes"><h2>{t.notes}</h2><dl>{t.items.map(([title, body]) => <div key={title}><dt>{title}</dt><dd>{body}</dd></div>)}</dl>
      <a className="field-link" href={pagePath(lang, "menupilot")}>{t.more}<Icon name="forward" /></a>
    </section>
  </div>;
}

const experience = {
  en: {
    intro: "My route into frontend development runs through software engineering studies, practical training and work on a bilingual restaurant product.",
    list: "Roles and learning", evidence: "Explore MenuPilot", cv: "Download my CV", pdf: "English PDF",
    entries: [
      ["Frontend team lead", "MenuPilot", "I lead frontend work on the guest and staff interfaces. A guest browses the menu on a phone, while the restaurant team follows orders from a dashboard."],
      ["Software engineering student", "Al-Azhar University, Gaza", "Alongside my university studies, I explore how interfaces work in practice through projects in food service, education and study tools."],
      ["Frontend development training", "120-hour course", "After my frontend foundations course, I continued learning React and Next.js and applying them in responsive web interfaces."],
    ],
  },
  ar: {
    intro: "بدأ مساري من دراسة هندسة البرمجيات والتدريب العملي، وصولًا إلى قيادة فريق يبني واجهات مطاعم بالعربية والإنجليزية.",
    list: "العمل والتعلّم", evidence: "تصفّح مشروع MenuPilot", cv: "تنزيل سيرتي الذاتية", pdf: "PDF بالإنجليزية",
    entries: [
      ["قائد فريق الواجهات الأمامية", "MenuPilot", "أقود تطوير واجهات الضيوف والموظفين. يتصفّح الضيف القائمة عبر هاتفه، بينما يتابع فريق المطعم الطلبات من لوحة التحكم."],
      ["طالب هندسة برمجيات", "جامعة الأزهر، غزة", "إلى جانب الدراسة الجامعية أطبّق ما أتعلّمه في مشاريع تتناول طلب الطعام والتعليم وأدوات الدراسة."],
      ["تدريب في تطوير الواجهات", "دورة مدتها ١٢٠ ساعة", "بعد دورة أساسيات الواجهات الأمامية، تابعت تعلّم React وNext.js وتطبيقهما في واجهات تتكيّف مع أحجام الشاشات المختلفة."],
    ],
  },
};

function Experience({ lang }: { lang: Language }) {
  const t = experience[lang];
  return <div className="field-grid background-grid">
    <section aria-labelledby="experience-list"><h2 id="experience-list">{t.list}</h2>
      <ol className="experience-list">{t.entries.map(([role, place, detail], index) => <li key={role}>
        <p className="overline">{place}</p><h3>{role}</h3><p>{detail}</p>
        {index === 0 && <a className="field-link" href={pagePath(lang, "menupilot")}>{t.evidence}<Icon name="forward" /></a>}
      </li>)}</ol>
    </section>
    <aside className="cv-sheet">
      <img src="/media/ahmed.webp" alt={lang === "ar" ? "أحمد الكحلوت" : "Ahmed Kahlout"} width="720" height="720" />
      <a href={cvPath} download className="button"><Icon name="download" />{t.cv}</a><small>{t.pdf}</small>
    </aside>
  </div>;
}

export function FieldNotes({ lang, id }: { lang: Language; id: "process" | "experience" }) {
  const section = sections[id][lang];
  return <><Header lang={lang} slug={id} /><main className="wrap field-page" id="content" tabIndex={-1}>
    <a className="map-return" href={pagePath(lang, "explore")}><Icon name="map" />{walkCopy[lang].back}</a>
    <div className="field-head"><p className="overline rule-label">{section.label}</p><h1>{section.name}</h1><p>{id === "process" ? lab[lang].intro : experience[lang].intro}</p></div>
    {id === "process" ? <InterfaceLab lang={lang} /> : <Experience lang={lang} />}
  </main><Footer lang={lang} /><JsonLd lang={lang} slug={id} /></>;
}
