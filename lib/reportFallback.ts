import {
  STYLE_LABELS,
  STYLE_PLAYBOOKS,
  STYLE_SUMMARIES,
  getStyleLabel,
  getStylePlaybook,
  getStyleSummary,
  type AttachmentStyle
} from "@/lib/quiz";

const sections = [
  "Your Attachment Style",
  "Why You Love This Way",
  "Your Emotional Triggers",
  "Your Dating Blind Spots",
  "How Others Experience You",
  "What You Need in Love",
  "Personalized Healing Plan",
  "Communication Advice",
  "Compatibility Insights",
  "Daily Affirmation"
];

const sectionsZh = [
  "你的依恋模式",
  "你为什么这样爱",
  "你的情绪触发点",
  "你的恋爱盲点",
  "别人如何感受到你",
  "你在爱里真正需要什么",
  "个性化修正计划",
  "沟通建议",
  "适配关系洞察",
  "每日肯定句"
];

export function createFallbackReport(style: AttachmentStyle, locale?: string | null) {
  const label = getStyleLabel(style, locale);
  const summary = getStyleSummary(style, locale);
  const playbook = getStylePlaybook(style, locale);
  const activeSections = locale === "zh" ? sectionsZh : sections;

  return {
    title: locale === "zh" ? "你的 AI 依恋报告" : "Your AI Attachment Report",
    styleLabel: label,
    sections: activeSections.map((title, index) => ({
      title,
      body:
        index === 0
          ? `${label}: ${summary}`
          : locale === "zh" ? buildBodyZh(title, label, playbook) : buildBody(title, label, playbook)
    }))
  };
}

function buildBody(title: string, label: string, playbook: (typeof STYLE_PLAYBOOKS)[AttachmentStyle]) {
  const copy: Record<string, string> = {
    "Why You Love This Way":
      `Your ${label.toLowerCase()} pattern may be your nervous system's way of trying to stay emotionally safe while still seeking connection. The vibe: ${playbook.vibe}.`,
    "Your Emotional Triggers":
      `Slow replies, vague plans, sudden distance, or unclear communication may feel bigger than the moment itself. ${playbook.roast}`,
    "Your Dating Blind Spots":
      "You may sometimes read uncertainty as proof, move too quickly, or protect yourself before you know what the other person truly means.",
    "How Others Experience You":
      "People may experience you as emotionally intense, thoughtful, guarded, or deeply sensitive depending on how safe the relationship feels.",
    "What You Need in Love":
      "You need consistency, clear communication, emotional honesty, and a relationship pace that lets trust build naturally.",
    "Personalized Healing Plan":
      playbook.repairPlan.map((item, index) => `${index + 1}. ${item}`).join("\n"),
    "Communication Advice":
      `Try this: "${playbook.textScript}"`,
    "Compatibility Insights":
      "You may feel best with someone emotionally available, steady under conflict, and willing to talk instead of disappearing.",
    "Daily Affirmation":
      "I can want closeness without losing myself. I can move slowly and still be loved."
  };

  return copy[title] || "This section is personalized around your answers and relationship patterns.";
}

function buildBodyZh(title: string, label: string, playbook: (typeof STYLE_PLAYBOOKS)[AttachmentStyle]) {
  const copy: Record<string, string> = {
    "你为什么这样爱": `你的${label}模式，可能是你在亲密关系里保护自己的一种方式。它不是“有病”，更像是一套自动运行的安全系统。你的当前恋爱气质：${playbook.vibe}。`,
    "你的情绪触发点": `不回消息、计划含糊、突然冷淡、语气变化，都可能让你瞬间进入脑内小剧场。${playbook.roast}`,
    "你的恋爱盲点": "你可能会把不确定当成证据，把暧昧当成命运，把情绪波动误读成强烈吸引。真正要看的不是那一刻有多上头，而是对方是否持续稳定。",
    "别人如何感受到你": "别人可能会感受到你很敏感、很真诚，也可能在你情绪切换时感到困惑。你不是难搞，只是需要更清晰、更稳定的关系节奏。",
    "你在爱里真正需要什么": "你需要稳定回应、清楚表达、情绪诚实，以及一个不会让你每天猜谜的人。真正适合你的关系，应该让你更像自己，而不是更像侦探。",
    "个性化修正计划": playbook.repairPlan.map((item, index) => `${index + 1}. ${item}`).join("\n"),
    "沟通建议": `可以这样说：“${playbook.textScript}”`,
    "适配关系洞察": "你更适合情绪稳定、愿意沟通、行动和语言一致的人。远离只会制造强烈化学反应、但无法提供基本清晰度的人。",
    "每日肯定句": "我可以渴望亲密，也可以不失去自己。我可以慢慢来，也依然值得被爱。"
  };

  return copy[title] || "这一部分会根据你的答案，给出更贴近你的关系洞察和行动建议。";
}
