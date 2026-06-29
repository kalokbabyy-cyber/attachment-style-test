export type LocaleCode = "en" | "zh" | "es" | "pt" | "fr" | "de" | "ja" | "ko";

export const LOCALES: Array<{ code: LocaleCode; label: string; short: string }> = [
  { code: "en", label: "English", short: "EN" },
  { code: "zh", label: "中文", short: "中文" },
  { code: "es", label: "Español", short: "ES" },
  { code: "pt", label: "Português", short: "PT" },
  { code: "fr", label: "Français", short: "FR" },
  { code: "de", label: "Deutsch", short: "DE" },
  { code: "ja", label: "日本語", short: "日本語" },
  { code: "ko", label: "한국어", short: "한국어" }
];

export const DEFAULT_LOCALE: LocaleCode = "en";
export const LOCALE_STORAGE_KEY = "aiAttachmentLocale";

type CopyShape = {
  brand: string;
  heroTitle: string;
  heroSubtitle: string;
  heroBadge: string;
  cta: string;
  proof: string;
  benefits: string[];
  previewTitle: string;
  previewItems: string[];
  language: string;
  question: string;
  creating: string;
  loading: string[];
  resultLabel: string;
  shortSummary: string;
  retake: string;
  unlockTitle: string;
  unlockButton: string;
  checkingOut: string;
  demoNote: string;
  reportLoadingTitle: string;
  reportLoadingText: string;
  backToResult: string;
  reportUnavailable: string;
  unlocked: string;
};

export const copy = {
  en: {
    brand: "AI Attachment Test",
    heroTitle: "Discover Your Attachment Style",
    heroSubtitle:
      "Take a 2-minute AI-powered relationship test and reveal the hidden emotional patterns behind the way you love.",
    heroBadge: "Built for TikTok heartbreak detectives",
    cta: "Start Free Test",
    proof: "Private. Fast. No therapy homework.",
    benefits: ["5 questions", "2 minutes", "AI-generated report", "Personalized relationship insights"],
    previewTitle: "Your dating pattern, but make it painfully accurate.",
    previewItems: ["Texting triggers", "Green flags you ignore", "Dating blind spots", "What to say instead"],
    language: "Language",
    question: "Question",
    creating: "Creating your result",
    loading: [
      "Analyzing your emotional patterns...",
      "Reading your attachment signals...",
      "Checking if your phone is the problem...",
      "Generating your AI report..."
    ],
    resultLabel: "Your attachment style is:",
    shortSummary: "Short summary:",
    retake: "Retake test",
    unlockTitle: "Unlock your full AI report to see:",
    unlockButton: "Unlock Full Report - $4.99",
    checkingOut: "Opening secure checkout...",
    demoNote: "Local demo mode skips real payment when Stripe keys are missing.",
    reportLoadingTitle: "Generating your AI report",
    reportLoadingText: "Reading your answers and turning your patterns into a personalized relationship report.",
    backToResult: "Back to Result",
    reportUnavailable: "Report unavailable",
    unlocked: "Unlocked"
  },
  zh: {
    brand: "AI 依恋测试",
    heroTitle: "发现你的依恋模式",
    heroSubtitle: "用 2 分钟完成 AI 情感测试，看清你在亲密关系里的隐藏模式。",
    heroBadge: "给 TikTok 恋爱侦探准备的",
    cta: "开始免费测试",
    proof: "私密、快速、不做心理诊断。",
    benefits: ["5 道题", "2 分钟", "AI 生成报告", "个性化恋爱洞察"],
    previewTitle: "你的恋爱模式，精准到有点冒犯。",
    previewItems: ["消息焦虑", "你忽略的绿旗", "约会盲点", "下一句该怎么说"],
    language: "语言",
    question: "问题",
    creating: "正在生成结果",
    loading: ["分析你的情绪模式...", "读取你的依恋信号...", "检查是不是手机害的...", "生成 AI 报告..."],
    resultLabel: "你的依恋模式是：",
    shortSummary: "简短总结：",
    retake: "重新测试",
    unlockTitle: "解锁完整 AI 报告，你会看到：",
    unlockButton: "解锁完整报告 - $4.99",
    checkingOut: "正在打开安全付款...",
    demoNote: "本地演示模式：未配置 Stripe 时会跳过真实付款。",
    reportLoadingTitle: "正在生成 AI 报告",
    reportLoadingText: "正在读取你的答案，并生成个性化关系报告。",
    backToResult: "返回结果",
    reportUnavailable: "报告暂不可用",
    unlocked: "已解锁"
  },
  es: {
    brand: "AI Attachment Test",
    heroTitle: "Descubre tu estilo de apego",
    heroSubtitle: "Haz un test de 2 minutos con IA y revela tus patrones emocionales al amar.",
    heroBadge: "Para detectives del amor en TikTok",
    cta: "Empezar test gratis",
    proof: "Privado. Rápido. Sin diagnóstico.",
    benefits: ["5 preguntas", "2 minutos", "Informe con IA", "Ideas personalizadas"],
    previewTitle: "Tu patrón amoroso, pero incómodamente preciso.",
    previewItems: ["Disparadores de mensajes", "Green flags que ignoras", "Puntos ciegos", "Qué decir mejor"],
    language: "Idioma",
    question: "Pregunta",
    creating: "Creando tu resultado",
    loading: ["Analizando patrones emocionales...", "Leyendo señales de apego...", "Revisando si tu teléfono es el problema...", "Generando informe IA..."],
    resultLabel: "Tu estilo de apego es:",
    shortSummary: "Resumen corto:",
    retake: "Repetir test",
    unlockTitle: "Desbloquea tu informe completo para ver:",
    unlockButton: "Desbloquear informe - $4.99",
    checkingOut: "Abriendo pago seguro...",
    demoNote: "Modo demo local sin pago real si faltan claves Stripe.",
    reportLoadingTitle: "Generando tu informe IA",
    reportLoadingText: "Leyendo tus respuestas para crear un informe personalizado.",
    backToResult: "Volver al resultado",
    reportUnavailable: "Informe no disponible",
    unlocked: "Desbloqueado"
  },
  pt: {
    brand: "AI Attachment Test",
    heroTitle: "Descubra seu estilo de apego",
    heroSubtitle: "Faça um teste com IA em 2 minutos e revele seus padrões emocionais no amor.",
    heroBadge: "Para detetives amorosos do TikTok",
    cta: "Começar teste grátis",
    proof: "Privado. Rápido. Sem diagnóstico.",
    benefits: ["5 perguntas", "2 minutos", "Relatório com IA", "Insights personalizados"],
    previewTitle: "Seu padrão amoroso, só que preciso demais.",
    previewItems: ["Gatilhos em mensagens", "Green flags ignoradas", "Pontos cegos", "O que dizer"],
    language: "Idioma",
    question: "Pergunta",
    creating: "Criando seu resultado",
    loading: ["Analisando padrões emocionais...", "Lendo sinais de apego...", "Checando se o celular é o vilão...", "Gerando relatório IA..."],
    resultLabel: "Seu estilo de apego é:",
    shortSummary: "Resumo curto:",
    retake: "Refazer teste",
    unlockTitle: "Desbloqueie o relatório completo para ver:",
    unlockButton: "Desbloquear relatório - $4.99",
    checkingOut: "Abrindo checkout seguro...",
    demoNote: "Modo demo local sem pagamento real se Stripe não estiver configurado.",
    reportLoadingTitle: "Gerando seu relatório IA",
    reportLoadingText: "Lendo suas respostas e criando um relatório personalizado.",
    backToResult: "Voltar ao resultado",
    reportUnavailable: "Relatório indisponível",
    unlocked: "Desbloqueado"
  },
  fr: {
    brand: "AI Attachment Test",
    heroTitle: "Découvrez votre style d'attachement",
    heroSubtitle: "Un test IA de 2 minutes pour révéler vos schémas émotionnels en amour.",
    heroBadge: "Pour les détectives amoureux de TikTok",
    cta: "Commencer le test gratuit",
    proof: "Privé. Rapide. Sans diagnostic.",
    benefits: ["5 questions", "2 minutes", "Rapport IA", "Insights personnalisés"],
    previewTitle: "Votre schéma amoureux, presque trop précis.",
    previewItems: ["Déclencheurs par message", "Green flags ignorés", "Angles morts", "Que dire à la place"],
    language: "Langue",
    question: "Question",
    creating: "Création du résultat",
    loading: ["Analyse des schémas émotionnels...", "Lecture des signaux d'attachement...", "Vérification du téléphone suspect...", "Génération du rapport IA..."],
    resultLabel: "Votre style d'attachement est :",
    shortSummary: "Résumé court :",
    retake: "Refaire le test",
    unlockTitle: "Débloquez le rapport complet pour voir :",
    unlockButton: "Débloquer le rapport - $4.99",
    checkingOut: "Ouverture du paiement sécurisé...",
    demoNote: "Mode démo local sans paiement réel si Stripe manque.",
    reportLoadingTitle: "Génération du rapport IA",
    reportLoadingText: "Lecture de vos réponses pour créer un rapport personnalisé.",
    backToResult: "Retour au résultat",
    reportUnavailable: "Rapport indisponible",
    unlocked: "Débloqué"
  },
  de: {
    brand: "AI Attachment Test",
    heroTitle: "Entdecke deinen Bindungsstil",
    heroSubtitle: "Mache einen 2-Minuten-KI-Test und erkenne deine emotionalen Muster in der Liebe.",
    heroBadge: "Für TikTok-Dating-Detektive",
    cta: "Kostenlosen Test starten",
    proof: "Privat. Schnell. Keine Diagnose.",
    benefits: ["5 Fragen", "2 Minuten", "KI-Bericht", "Personalisierte Insights"],
    previewTitle: "Dein Dating-Muster, unangenehm treffend.",
    previewItems: ["Texting-Trigger", "Übersehene Green Flags", "Dating-Blindspots", "Bessere Sätze"],
    language: "Sprache",
    question: "Frage",
    creating: "Ergebnis wird erstellt",
    loading: ["Emotionale Muster werden analysiert...", "Bindungssignale werden gelesen...", "Prüfe, ob dein Handy das Problem ist...", "KI-Bericht wird erstellt..."],
    resultLabel: "Dein Bindungsstil ist:",
    shortSummary: "Kurzfassung:",
    retake: "Test wiederholen",
    unlockTitle: "Schalte deinen vollständigen KI-Bericht frei:",
    unlockButton: "Bericht freischalten - $4.99",
    checkingOut: "Sicherer Checkout wird geöffnet...",
    demoNote: "Lokaler Demo-Modus ohne echte Zahlung, wenn Stripe fehlt.",
    reportLoadingTitle: "KI-Bericht wird erstellt",
    reportLoadingText: "Deine Antworten werden in einen persönlichen Bericht verwandelt.",
    backToResult: "Zurück zum Ergebnis",
    reportUnavailable: "Bericht nicht verfügbar",
    unlocked: "Freigeschaltet"
  },
  ja: {
    brand: "AI Attachment Test",
    heroTitle: "あなたの愛着スタイルを発見",
    heroSubtitle: "2分のAI恋愛テストで、恋愛中の隠れた感情パターンを見つけます。",
    heroBadge: "TikTok恋愛探偵向け",
    cta: "無料テストを始める",
    proof: "非公開。すぐ終わる。診断ではありません。",
    benefits: ["5問", "2分", "AIレポート", "個別恋愛インサイト"],
    previewTitle: "あなたの恋愛パターン、刺さるくらい正確。",
    previewItems: ["返信への不安", "見逃すグリーンフラッグ", "恋愛の盲点", "言い換え例"],
    language: "言語",
    question: "質問",
    creating: "結果を作成中",
    loading: ["感情パターンを分析中...", "愛着サインを読み取り中...", "スマホが原因か確認中...", "AIレポートを生成中..."],
    resultLabel: "あなたの愛着スタイル：",
    shortSummary: "短いまとめ：",
    retake: "もう一度テスト",
    unlockTitle: "完全版AIレポートで見られる内容：",
    unlockButton: "完全版を解放 - $4.99",
    checkingOut: "安全な決済を開いています...",
    demoNote: "Stripe未設定時はローカルデモ決済になります。",
    reportLoadingTitle: "AIレポートを生成中",
    reportLoadingText: "回答を読み取り、個別レポートに変換しています。",
    backToResult: "結果に戻る",
    reportUnavailable: "レポートを表示できません",
    unlocked: "解放済み"
  },
  ko: {
    brand: "AI Attachment Test",
    heroTitle: "나의 애착 유형 찾기",
    heroSubtitle: "2분 AI 연애 테스트로 사랑할 때 드러나는 감정 패턴을 확인하세요.",
    heroBadge: "틱톡 연애 탐정용",
    cta: "무료 테스트 시작",
    proof: "비공개. 빠름. 진단 아님.",
    benefits: ["5문항", "2분", "AI 리포트", "맞춤 연애 인사이트"],
    previewTitle: "내 연애 패턴, 너무 정확해서 살짝 아픔.",
    previewItems: ["답장 트리거", "놓치는 그린 플래그", "연애 블라인드스팟", "이렇게 말하기"],
    language: "언어",
    question: "질문",
    creating: "결과 생성 중",
    loading: ["감정 패턴 분석 중...", "애착 신호 읽는 중...", "휴대폰이 문제인지 확인 중...", "AI 리포트 생성 중..."],
    resultLabel: "당신의 애착 유형은:",
    shortSummary: "짧은 요약:",
    retake: "다시 테스트",
    unlockTitle: "전체 AI 리포트에서 볼 수 있는 것:",
    unlockButton: "전체 리포트 열기 - $4.99",
    checkingOut: "안전 결제창 여는 중...",
    demoNote: "Stripe 키가 없으면 로컬 데모 결제로 진행됩니다.",
    reportLoadingTitle: "AI 리포트 생성 중",
    reportLoadingText: "답변을 읽고 맞춤형 관계 리포트를 만들고 있습니다.",
    backToResult: "결과로 돌아가기",
    reportUnavailable: "리포트 사용 불가",
    unlocked: "잠금 해제"
  }
} satisfies Record<LocaleCode, CopyShape>;

export function normalizeLocale(value?: string | null): LocaleCode {
  const language = value?.toLowerCase().split("-")[0];
  return LOCALES.some((locale) => locale.code === language) ? (language as LocaleCode) : DEFAULT_LOCALE;
}
