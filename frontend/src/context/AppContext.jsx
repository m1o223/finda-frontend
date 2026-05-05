import { createContext, useContext, useState, useEffect } from "react";

// Translation keys used across the app
const translations = {
  en: {
    profile: "Profile", theme: "Theme", light: "Light", dark: "Dark",
    chatColor: "Chat Color", appColor: "App Color", language: "Language",
    email: "Email", changeEmail: "Change Email", logout: "Logout",
    back: "Back", appearance: "Appearance", actions: "Actions",
    howCanIHelp: "How can I help you today?", askAnything: "Ask anything...",
    askMeAnything: "Ask me anything — I'm here to assist.", newChat: "New Chat",
    chat: "Chat", reminders: "Reminders", learning: "Learning", history: "History",
    myReminders: "My Reminders", create: "Create", searchReminders: "Search reminders...",
    createReminder: "Create Reminder", editReminder: "Edit Reminder",
    title: "Title", description: "Description", date: "Date", time: "Time",
    cancel: "Cancel", save: "Save", edit: "Edit", delete: "Delete",
    noReminders: "No reminders yet", noMatch: "No reminders match your search",
    createFirst: "Create your first reminder",
    getStarted: "Start", features: "Features",
    aiAssistant: "AI Assistant for Everyday Life",
    heroTitle: "Your AI assistant for learning, chatting, and staying organized",
    heroDesc: "Finda brings the power of AI to your fingertips. Chat, learn, set reminders, and get things done smarter and faster.",
    noCreditCard: "No credit card required",
    everythingYouNeed: "Everything you need in one place",
    powerfulFeatures: "Powerful features to simplify your day-to-day life.",
    aiChat: "AI Chat", aiChatDesc: "Talk with AI naturally and get instant, context-aware support whenever you need it.",
    aiLearning: "AI Learning", aiLearningDesc: "Watch and learn with AI-powered content tailored to your pace and interests.",
    smartReminders: "Smart Reminders", smartRemindersDesc: "Organize your tasks and reminders effortlessly and never miss what matters.",
    howItWorks: "How it works", threeSteps: "Get started in just 3 simple steps.",
    signUp: "Sign up", signUpDesc: "Create your account in seconds.",
    chooseFeature: "Choose a feature", chooseFeatureDesc: "Pick what you need: chat, learn, or reminders.",
    startUsingAI: "Start using AI", startUsingAIDesc: "Let AI help you get things done smarter.",
    startToday: "Start using Finda today", startTodayDesc: "Your AI assistant for a smarter and more productive life.",
    startNow: "Start Now",
    createAccount: "Create account", joinFinda: "Join Finda and start your journey",
    fullName: "Full name", password: "Password",
    atLeast8: "At least 8 characters", includeNumber: "Include a number", includeUppercase: "Include an uppercase letter",
    orContinueWith: "or continue with", comingSoon: "Coming soon",
    alreadyHaveAccount: "Already have an account?", signIn: "Sign in",
    welcomeBack: "Welcome back", signInToAccount: "Sign in to your account",
    rememberMe: "Remember me", forgotPassword: "Forgot password?",
    dontHaveAccount: "Don't have an account?", createOne: "Create one",
    selectLanguage: "Select Language", searchLanguages: "Search languages...",
    noLanguagesFound: "No languages found",
  },
  ar: {
    profile: "الملف الشخصي", theme: "المظهر", light: "فاتح", dark: "داكن",
    chatColor: "لون المحادثة", appColor: "لون التطبيق", language: "اللغة",
    email: "البريد الإلكتروني", changeEmail: "تغيير البريد", logout: "تسجيل الخروج",
    back: "رجوع", appearance: "المظهر", actions: "الإجراءات",
    howCanIHelp: "كيف يمكنني مساعدتك اليوم؟", askAnything: "اسأل أي شيء...",
    askMeAnything: "اسألني أي شيء — أنا هنا للمساعدة.", newChat: "محادثة جديدة",
    chat: "محادثة", reminders: "تذكيرات", learning: "تعلم", history: "السجل",
    myReminders: "تذكيراتي", create: "إنشاء", searchReminders: "البحث في التذكيرات...",
    createReminder: "إنشاء تذكير", editReminder: "تعديل تذكير",
    title: "العنوان", description: "الوصف", date: "التاريخ", time: "الوقت",
    cancel: "إلغاء", save: "حفظ", edit: "تعديل", delete: "حذف",
    noReminders: "لا توجد تذكيرات بعد", noMatch: "لا توجد نتائج مطابقة",
    createFirst: "أنشئ تذكيرك الأول",
    getStarted: "ابدأ", features: "المميزات",
    aiAssistant: "مساعد ذكي للحياة اليومية",
    heroTitle: "مساعدك الذكي للتعلم والمحادثة والتنظيم",
    heroDesc: "فيندا يضع قوة الذكاء الاصطناعي بين يديك. تحدث، تعلم، ونظم مهامك بذكاء.",
    noCreditCard: "لا حاجة لبطاقة ائتمان",
    everythingYouNeed: "كل ما تحتاجه في مكان واحد",
    powerfulFeatures: "ميزات قوية لتبسيط حياتك اليومية.",
    aiChat: "محادثة ذكية", aiChatDesc: "تحدث مع الذكاء الاصطناعي بشكل طبيعي واحصل على دعم فوري.",
    aiLearning: "تعلم ذكي", aiLearningDesc: "شاهد وتعلم محتوى مخصص لوتيرتك واهتماماتك.",
    smartReminders: "تذكيرات ذكية", smartRemindersDesc: "نظم مهامك وتذكيراتك بسهولة ولا تفوت شيئاً.",
    howItWorks: "كيف يعمل", threeSteps: "ابدأ في 3 خطوات بسيطة.",
    signUp: "سجل", signUpDesc: "أنشئ حسابك في ثوانٍ.",
    chooseFeature: "اختر ميزة", chooseFeatureDesc: "اختر ما تحتاجه: محادثة، تعلم، أو تذكيرات.",
    startUsingAI: "ابدأ باستخدام الذكاء", startUsingAIDesc: "دع الذكاء الاصطناعي يساعدك.",
    startToday: "ابدأ استخدام فيندا اليوم", startTodayDesc: "مساعدك الذكي لحياة أكثر إنتاجية.",
    startNow: "ابدأ الآن",
    createAccount: "إنشاء حساب", joinFinda: "انضم إلى فيندا وابدأ رحلتك",
    fullName: "الاسم الكامل", password: "كلمة المرور",
    atLeast8: "8 أحرف على الأقل", includeNumber: "يحتوي على رقم", includeUppercase: "يحتوي على حرف كبير",
    orContinueWith: "أو تابع باستخدام", comingSoon: "قريباً",
    alreadyHaveAccount: "لديك حساب؟", signIn: "تسجيل الدخول",
    welcomeBack: "مرحباً بعودتك", signInToAccount: "سجل دخول إلى حسابك",
    rememberMe: "تذكرني", forgotPassword: "نسيت كلمة المرور؟",
    dontHaveAccount: "ليس لديك حساب؟", createOne: "أنشئ واحداً",
    selectLanguage: "اختر اللغة", searchLanguages: "ابحث عن لغة...",
    noLanguagesFound: "لم يتم العثور على لغات",
  },
  sv: {
    profile: "Profil", theme: "Tema", light: "Ljust", dark: "Mörkt",
    chatColor: "Chattfärg", appColor: "Appfärg", language: "Språk",
    email: "E-post", changeEmail: "Ändra e-post", logout: "Logga ut",
    back: "Tillbaka", appearance: "Utseende", actions: "Åtgärder",
    howCanIHelp: "Hur kan jag hjälpa dig idag?", askAnything: "Fråga vad som helst...",
    askMeAnything: "Fråga mig vad som helst — jag finns här.", newChat: "Ny chatt",
    chat: "Chatt", reminders: "Påminnelser", learning: "Lärande", history: "Historik",
    myReminders: "Mina påminnelser", create: "Skapa", searchReminders: "Sök påminnelser...",
    createReminder: "Skapa påminnelse", editReminder: "Redigera påminnelse",
    title: "Titel", description: "Beskrivning", date: "Datum", time: "Tid",
    cancel: "Avbryt", save: "Spara", edit: "Redigera", delete: "Radera",
    noReminders: "Inga påminnelser än", noMatch: "Inga påminnelser matchar",
    createFirst: "Skapa din första påminnelse",
    getStarted: "Börja", features: "Funktioner",
    aiAssistant: "AI-assistent för vardagen",
    heroTitle: "Din AI-assistent för lärande, chatt och organisation",
    heroDesc: "Finda ger dig AI-kraft. Chatta, lär dig och bli mer produktiv.",
    noCreditCard: "Inget kreditkort krävs",
    everythingYouNeed: "Allt du behöver på ett ställe",
    powerfulFeatures: "Kraftfulla funktioner för att förenkla din vardag.",
    aiChat: "AI-chatt", aiChatDesc: "Prata med AI naturligt och få omedelbar support.",
    aiLearning: "AI-lärande", aiLearningDesc: "Titta och lär med AI-drivet innehåll.",
    smartReminders: "Smarta påminnelser", smartRemindersDesc: "Organisera dina uppgifter och missa aldrig det viktigaste.",
    howItWorks: "Så fungerar det", threeSteps: "Kom igång i bara 3 steg.",
    signUp: "Registrera dig", signUpDesc: "Skapa ditt konto på sekunder.",
    chooseFeature: "Välj en funktion", chooseFeatureDesc: "Välj det du behöver.",
    startUsingAI: "Börja använda AI", startUsingAIDesc: "Låt AI hjälpa dig.",
    startToday: "Börja använda Finda idag", startTodayDesc: "Din AI-assistent för ett smartare liv.",
    startNow: "Börja nu",
    createAccount: "Skapa konto", joinFinda: "Gå med i Finda",
    fullName: "Fullständigt namn", password: "Lösenord",
    atLeast8: "Minst 8 tecken", includeNumber: "Innehåller en siffra", includeUppercase: "Innehåller en stor bokstav",
    orContinueWith: "eller fortsätt med", comingSoon: "Kommer snart",
    alreadyHaveAccount: "Har du redan ett konto?", signIn: "Logga in",
    welcomeBack: "Välkommen tillbaka", signInToAccount: "Logga in på ditt konto",
    rememberMe: "Kom ihåg mig", forgotPassword: "Glömt lösenord?",
    dontHaveAccount: "Har du inget konto?", createOne: "Skapa ett",
    selectLanguage: "Välj språk", searchLanguages: "Sök språk...",
    noLanguagesFound: "Inga språk hittades",
  },
  so: {
    profile: "Bogga", theme: "Muuqaalka", light: "Iftiinle", dark: "Madow",
    chatColor: "Midabka Chat", appColor: "Midabka App", language: "Luqadda",
    email: "Iimaylka", changeEmail: "Beddel iimaylka", logout: "Ka bax",
    back: "Dib u noqo", appearance: "Muuqaalka", actions: "Tallaabooyin",
    howCanIHelp: "Sideen kugu caawin karaa maanta?", askAnything: "Wax kasta weydii...",
    askMeAnything: "I weydii — waan halkan u joogaa inaan ku caawiyo.", newChat: "Sheeko cusub",
    chat: "Sheeko", reminders: "Xasuusiyeyaal", learning: "Waxbarasho", history: "Taariikhda",
    myReminders: "Xasuusiyeyaalka", create: "Samee", searchReminders: "Raadi xasuusiye...",
    createReminder: "Samee xasuusiye", editReminder: "Wax ka beddel",
    title: "Cinwaanka", description: "Faahfaahin", date: "Taariikhda", time: "Waqtiga",
    cancel: "Jooji", save: "Kaydi", edit: "Wax ka beddel", delete: "Tirtir",
    noReminders: "Wali xasuusiye ma jiro", noMatch: "Natiijo la heli maayo",
    createFirst: "Samee midkaaga ugu horreeya",
    getStarted: "Bilow", features: "Astaamaha",
    selectLanguage: "Dooro luqadda", searchLanguages: "Raadi luqad...",
    noLanguagesFound: "Luqad la ma helin",
  },
  fr: {
    profile: "Profil", theme: "Thème", light: "Clair", dark: "Sombre",
    chatColor: "Couleur du chat", appColor: "Couleur de l'app", language: "Langue",
    email: "E-mail", changeEmail: "Changer l'e-mail", logout: "Déconnexion",
    back: "Retour", appearance: "Apparence", actions: "Actions",
    howCanIHelp: "Comment puis-je vous aider aujourd'hui?", askAnything: "Demandez n'importe quoi...",
    askMeAnything: "Demandez-moi — je suis là pour vous aider.", newChat: "Nouvelle conversation",
    chat: "Chat", reminders: "Rappels", learning: "Apprentissage", history: "Historique",
    myReminders: "Mes rappels", create: "Créer", searchReminders: "Rechercher des rappels...",
    createReminder: "Créer un rappel", editReminder: "Modifier le rappel",
    title: "Titre", description: "Description", date: "Date", time: "Heure",
    cancel: "Annuler", save: "Enregistrer", edit: "Modifier", delete: "Supprimer",
    noReminders: "Aucun rappel", noMatch: "Aucun rappel ne correspond",
    createFirst: "Créez votre premier rappel",
    getStarted: "Commencer", features: "Fonctionnalités",
    selectLanguage: "Choisir la langue", searchLanguages: "Rechercher une langue...",
    noLanguagesFound: "Aucune langue trouvée",
  },
  es: {
    profile: "Perfil", theme: "Tema", light: "Claro", dark: "Oscuro",
    chatColor: "Color del chat", appColor: "Color de la app", language: "Idioma",
    email: "Correo", changeEmail: "Cambiar correo", logout: "Cerrar sesión",
    back: "Volver", appearance: "Apariencia", actions: "Acciones",
    howCanIHelp: "¿Cómo puedo ayudarte hoy?", askAnything: "Pregunta lo que quieras...",
    askMeAnything: "Pregúntame — estoy aquí para ayudar.", newChat: "Nueva conversación",
    chat: "Chat", reminders: "Recordatorios", learning: "Aprendizaje", history: "Historial",
    myReminders: "Mis recordatorios", create: "Crear", searchReminders: "Buscar recordatorios...",
    createReminder: "Crear recordatorio", editReminder: "Editar recordatorio",
    title: "Título", description: "Descripción", date: "Fecha", time: "Hora",
    cancel: "Cancelar", save: "Guardar", edit: "Editar", delete: "Eliminar",
    noReminders: "Sin recordatorios", noMatch: "No hay coincidencias",
    createFirst: "Crea tu primer recordatorio",
    getStarted: "Empezar", features: "Características",
    selectLanguage: "Seleccionar idioma", searchLanguages: "Buscar idioma...",
    noLanguagesFound: "No se encontraron idiomas",
  },
  de: {
    profile: "Profil", theme: "Design", light: "Hell", dark: "Dunkel",
    chatColor: "Chat-Farbe", appColor: "App-Farbe", language: "Sprache",
    email: "E-Mail", changeEmail: "E-Mail ändern", logout: "Abmelden",
    back: "Zurück", appearance: "Erscheinungsbild", actions: "Aktionen",
    howCanIHelp: "Wie kann ich dir heute helfen?", askAnything: "Frag mich alles...",
    askMeAnything: "Frag mich — ich bin hier um zu helfen.", newChat: "Neuer Chat",
    chat: "Chat", reminders: "Erinnerungen", learning: "Lernen", history: "Verlauf",
    myReminders: "Meine Erinnerungen", create: "Erstellen", searchReminders: "Erinnerungen suchen...",
    createReminder: "Erinnerung erstellen", editReminder: "Erinnerung bearbeiten",
    title: "Titel", description: "Beschreibung", date: "Datum", time: "Uhrzeit",
    cancel: "Abbrechen", save: "Speichern", edit: "Bearbeiten", delete: "Löschen",
    noReminders: "Keine Erinnerungen", noMatch: "Keine Treffer",
    createFirst: "Erstelle deine erste Erinnerung",
    getStarted: "Starten", features: "Funktionen",
    selectLanguage: "Sprache auswählen", searchLanguages: "Sprache suchen...",
    noLanguagesFound: "Keine Sprachen gefunden",
  },
  tr: {
    profile: "Profil", theme: "Tema", light: "Açık", dark: "Koyu",
    chatColor: "Sohbet Rengi", appColor: "Uygulama Rengi", language: "Dil",
    email: "E-posta", changeEmail: "E-posta değiştir", logout: "Çıkış yap",
    back: "Geri", appearance: "Görünüm", actions: "İşlemler",
    howCanIHelp: "Bugün sana nasıl yardımcı olabilirim?", askAnything: "Her şeyi sor...",
    askMeAnything: "Bana sor — yardım etmek için buradayım.", newChat: "Yeni sohbet",
    chat: "Sohbet", reminders: "Hatırlatıcılar", learning: "Öğrenme", history: "Geçmiş",
    myReminders: "Hatırlatıcılarım", create: "Oluştur", searchReminders: "Hatırlatıcı ara...",
    getStarted: "Başla", features: "Özellikler",
    selectLanguage: "Dil seç", searchLanguages: "Dil ara...",
    noLanguagesFound: "Dil bulunamadı",
  },
  zh: {
    profile: "个人资料", theme: "主题", light: "浅色", dark: "深色",
    chatColor: "聊天颜色", appColor: "应用颜色", language: "语言",
    email: "邮箱", changeEmail: "更改邮箱", logout: "退出登录",
    back: "返回", appearance: "外观", actions: "操作",
    howCanIHelp: "今天我能帮你什么？", askAnything: "问我任何问题...",
    askMeAnything: "问我任何事 — 我在这里帮助你。", newChat: "新对话",
    chat: "聊天", reminders: "提醒", learning: "学习", history: "历史",
    myReminders: "我的提醒", create: "创建", searchReminders: "搜索提醒...",
    getStarted: "开始", features: "功能",
    selectLanguage: "选择语言", searchLanguages: "搜索语言...",
    noLanguagesFound: "未找到语言",
  },
  hi: {
    profile: "प्रोफ़ाइल", theme: "थीम", light: "हल्का", dark: "गहरा",
    chatColor: "चैट रंग", appColor: "ऐप रंग", language: "भाषा",
    email: "ईमेल", changeEmail: "ईमेल बदलें", logout: "लॉग आउट",
    back: "वापस", appearance: "दिखावट", actions: "कार्य",
    howCanIHelp: "आज मैं आपकी कैसे मदद कर सकता हूँ?", askAnything: "कुछ भी पूछें...",
    askMeAnything: "मुझसे कुछ भी पूछें — मैं यहाँ मदद के लिए हूँ।", newChat: "नई चैट",
    chat: "चैट", reminders: "रिमाइंडर", learning: "सीखना", history: "इतिहास",
    myReminders: "मेरे रिमाइंडर", create: "बनाएं", searchReminders: "रिमाइंडर खोजें...",
    getStarted: "शुरू करें", features: "सुविधाएँ",
    selectLanguage: "भाषा चुनें", searchLanguages: "भाषा खोजें...",
    noLanguagesFound: "कोई भाषा नहीं मिली",
  },
  am: {
    profile: "መገለጫ", theme: "ገጽታ", light: "ብርሃን", dark: "ጨለማ",
    chatColor: "የውይይት ቀለም", appColor: "የመተግበሪያ ቀለም", language: "ቋንቋ",
    email: "ኢሜይል", changeEmail: "ኢሜይል ቀይር", logout: "ውጣ",
    back: "ተመለስ", appearance: "ገጽታ", actions: "ድርጊቶች",
    howCanIHelp: "ዛሬ እንዴት ልረዳህ?", askAnything: "ማንኛውንም ጠይቅ...",
    askMeAnything: "ጠይቀኝ — እዚህ ለመርዳት ነኝ።", newChat: "አዲስ ውይይት",
    chat: "ውይይት", reminders: "ማስታወሻዎች", learning: "ትምህርት", history: "ታሪክ",
    myReminders: "ማስታወሻዎቼ", create: "ፍጠር", searchReminders: "ማስታወሻ ፈልግ...",
    getStarted: "ጀምር", features: "ባህሪያት",
    selectLanguage: "ቋንቋ ምረጥ", searchLanguages: "ቋንቋ ፈልግ...",
    noLanguagesFound: "ቋንቋ አልተገኘም",
  },
};

const defaultPrefs = { theme: "light", chatColor: "#193B68", accentColor: "#193B68", language: "en" };

function loadPrefs() {
  try {
    const stored = localStorage.getItem("finda_prefs");
    return stored ? { ...defaultPrefs, ...JSON.parse(stored) } : defaultPrefs;
  } catch { return defaultPrefs; }
}

const AppContext = createContext();

export function AppProvider({ children }) {
  const [prefs, setPrefs] = useState(loadPrefs);

  useEffect(() => {
    localStorage.setItem("finda_prefs", JSON.stringify(prefs));
  }, [prefs]);

  // Translation function with English fallback
  const t = (key) => {
    const lang = prefs.language;
    if (translations[lang] && translations[lang][key]) return translations[lang][key];
    return translations.en[key] || key;
  };

  const rtlLangs = ["ar", "he", "fa", "ur", "ps", "sd", "ku"];
  const isRTL = rtlLangs.includes(prefs.language);

  // Check if current language has translations
  const hasTranslations = !!translations[prefs.language];

  const updatePref = (key, value) => {
    setPrefs((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <AppContext.Provider value={{ prefs, updatePref, t, isRTL, hasTranslations }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
