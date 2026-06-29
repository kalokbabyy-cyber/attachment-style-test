export type AttachmentStyle = "anxious" | "avoidant" | "secure" | "fearfulAvoidant";

export type QuizOption = {
  id: "A" | "B" | "C" | "D";
  text: string;
  style: AttachmentStyle;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: QuizOption[];
};

export type QuizAnswer = {
  questionId: string;
  optionId: QuizOption["id"];
  optionText: string;
  style: AttachmentStyle;
};

export type StoredQuizResult = {
  style: AttachmentStyle;
  answers: QuizAnswer[];
  createdAt: string;
  locale?: string;
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    prompt: "When someone you like doesn't reply, you usually:",
    options: [
      { id: "A", text: "Feel anxious and check your phone often", style: "anxious" },
      { id: "B", text: "Assume they are busy and stay calm", style: "secure" },
      { id: "C", text: "Pull away before they can reject you", style: "avoidant" },
      { id: "D", text: "Send another message to get reassurance", style: "anxious" }
    ]
  },
  {
    id: "q2",
    prompt: "In relationships, you often:",
    options: [
      { id: "A", text: "Need frequent reassurance", style: "anxious" },
      { id: "B", text: "Feel comfortable with closeness and space", style: "secure" },
      { id: "C", text: "Avoid depending on others", style: "avoidant" },
      { id: "D", text: "Fear being abandoned", style: "fearfulAvoidant" }
    ]
  },
  {
    id: "q3",
    prompt: "When conflict happens, you:",
    options: [
      { id: "A", text: "Try to fix it immediately", style: "anxious" },
      { id: "B", text: "Communicate calmly", style: "secure" },
      { id: "C", text: "Shut down emotionally", style: "avoidant" },
      { id: "D", text: "Overthink everything they said", style: "fearfulAvoidant" }
    ]
  },
  {
    id: "q4",
    prompt: "Your biggest dating pattern is:",
    options: [
      { id: "A", text: "Loving too intensely too soon", style: "anxious" },
      { id: "B", text: "Choosing emotionally unavailable people", style: "fearfulAvoidant" },
      { id: "C", text: "Keeping emotional distance", style: "avoidant" },
      { id: "D", text: "Feeling secure with the right person", style: "secure" }
    ]
  },
  {
    id: "q5",
    prompt: "Deep down, you fear:",
    options: [
      { id: "A", text: "Being left", style: "anxious" },
      { id: "B", text: "Losing independence", style: "avoidant" },
      { id: "C", text: "Not being enough", style: "fearfulAvoidant" },
      { id: "D", text: "Being misunderstood", style: "fearfulAvoidant" }
    ]
  }
];

export const QUIZ_QUESTIONS_ZH: QuizQuestion[] = [
  {
    id: "q1",
    prompt: "喜欢的人不回消息时，你通常会：",
    options: [
      { id: "A", text: "开始焦虑，频繁看手机", style: "anxious" },
      { id: "B", text: "觉得对方可能在忙，保持冷静", style: "secure" },
      { id: "C", text: "先冷下来，避免自己被拒绝", style: "avoidant" },
      { id: "D", text: "再发一条消息，想确认对方态度", style: "anxious" }
    ]
  },
  {
    id: "q2",
    prompt: "在亲密关系里，你经常会：",
    options: [
      { id: "A", text: "需要对方经常给安全感", style: "anxious" },
      { id: "B", text: "既能亲近，也能给彼此空间", style: "secure" },
      { id: "C", text: "不太想依赖别人", style: "avoidant" },
      { id: "D", text: "害怕被抛下或被突然冷落", style: "fearfulAvoidant" }
    ]
  },
  {
    id: "q3",
    prompt: "发生冲突时，你更容易：",
    options: [
      { id: "A", text: "立刻想把问题解决掉", style: "anxious" },
      { id: "B", text: "比较平静地沟通", style: "secure" },
      { id: "C", text: "情绪关机，不想继续说", style: "avoidant" },
      { id: "D", text: "反复琢磨对方每句话是什么意思", style: "fearfulAvoidant" }
    ]
  },
  {
    id: "q4",
    prompt: "你最常见的恋爱模式是：",
    options: [
      { id: "A", text: "很快投入，爱得太用力", style: "anxious" },
      { id: "B", text: "总被情绪不可得的人吸引", style: "fearfulAvoidant" },
      { id: "C", text: "习惯保持情感距离", style: "avoidant" },
      { id: "D", text: "遇到合适的人时会比较稳定", style: "secure" }
    ]
  },
  {
    id: "q5",
    prompt: "你内心最怕的是：",
    options: [
      { id: "A", text: "被离开", style: "anxious" },
      { id: "B", text: "失去独立性", style: "avoidant" },
      { id: "C", text: "自己不够好", style: "fearfulAvoidant" },
      { id: "D", text: "被误解", style: "fearfulAvoidant" }
    ]
  }
];

export const STYLE_LABELS: Record<AttachmentStyle, string> = {
  anxious: "Anxious Attachment",
  avoidant: "Avoidant Attachment",
  secure: "Secure Attachment",
  fearfulAvoidant: "Fearful Avoidant Attachment"
};

export const STYLE_LABELS_ZH: Record<AttachmentStyle, string> = {
  anxious: "焦虑型依恋",
  avoidant: "回避型依恋",
  secure: "安全型依恋",
  fearfulAvoidant: "恐惧回避型依恋"
};

export const STYLE_SUMMARIES: Record<AttachmentStyle, string> = {
  anxious:
    "You may deeply crave emotional closeness, but uncertainty can easily trigger overthinking and fear of rejection.",
  avoidant:
    "You may value independence and emotional control, but closeness can sometimes feel like pressure before it feels safe.",
  secure:
    "You tend to feel comfortable with closeness and space, and you are more likely to communicate needs directly.",
  fearfulAvoidant:
    "You may want deep love while also feeling afraid of being hurt, which can create a push-pull pattern in dating."
};

export const STYLE_SUMMARIES_ZH: Record<AttachmentStyle, string> = {
  anxious: "你很渴望亲密和确定感，但一点不确定就容易触发过度解读、焦虑和害怕被拒绝。",
  avoidant: "你重视独立和情绪掌控，但亲密有时会让你感觉被要求、被侵入，甚至想先撤退。",
  secure: "你通常能在亲密和空间之间保持平衡，也更容易直接表达需求和边界。",
  fearfulAvoidant: "你想要很深的爱，但又害怕受伤，所以关系里可能出现靠近又退后、想要又害怕的拉扯。"
};

export const STYLE_PLAYBOOKS: Record<
  AttachmentStyle,
  {
    vibe: string;
    roast: string;
    quickWins: string[];
    repairPlan: string[];
    textScript: string;
  }
> = {
  anxious: {
    vibe: "The overthinker with main-character feelings",
    roast: "Your phone battery deserves compensation for the emotional labor.",
    quickWins: [
      "Wait 20 minutes before sending the second message.",
      "Ask for clarity instead of auditioning for detective mode.",
      "Choose consistency over chemistry that feels like a cliffhanger."
    ],
    repairPlan: [
      "Practice naming the trigger: 'I feel uncertain, not unsafe.'",
      "Build a self-soothing list before the next dating spiral.",
      "Date people whose actions reduce confusion, not people who turn you into a notification analyst."
    ],
    textScript: "I like talking to you. When plans are vague, I start filling in blanks. Can we be clearer about what we both want?"
  },
  avoidant: {
    vibe: "The independent icon with a locked VIP section",
    roast: "You call it peace, but sometimes it is just emotional airplane mode.",
    quickWins: [
      "Say you need space before disappearing.",
      "Share one honest feeling before switching topics.",
      "Let closeness be data, not danger."
    ],
    repairPlan: [
      "Notice when independence becomes a wall instead of a boundary.",
      "Use micro-vulnerability: one honest sentence is enough to start.",
      "Choose partners who respect space but still invite emotional presence."
    ],
    textScript: "I care about this. I need a little time to process, but I am not leaving the conversation."
  },
  secure: {
    vibe: "The calm one who does not need chaos to feel chemistry",
    roast: "You are the plot twist: emotionally available and still interesting.",
    quickWins: [
      "Keep communicating needs early.",
      "Do not over-function for people who avoid basic effort.",
      "Use your steadiness as a standard, not a rescue mission."
    ],
    repairPlan: [
      "Protect your calm by watching patterns, not promises.",
      "Stay open without becoming the relationship manager.",
      "Choose reciprocity: effort should not feel like a group project with one person."
    ],
    textScript: "I like when things are direct and mutual. I am interested, and I also pay attention to consistency."
  },
  fearfulAvoidant: {
    vibe: "The push-pull poet with premium emotional complexity",
    roast: "You want love and a fire exit. Honestly, iconic but exhausting.",
    quickWins: [
      "Pause before switching from clingy to cold.",
      "Ask: 'Am I reacting to this person or an old pattern?'",
      "Do not test people with silence when you actually need reassurance."
    ],
    repairPlan: [
      "Track your nervous system shifts: pursue, panic, withdraw, repeat.",
      "Use direct requests instead of emotional tests.",
      "Move slowly with people who are steady enough for trust to catch up."
    ],
    textScript: "Part of me wants closeness and part of me gets scared. I am working on saying that directly instead of pulling away."
  }
};

export const STYLE_PLAYBOOKS_ZH: typeof STYLE_PLAYBOOKS = {
  anxious: {
    vibe: "高敏感恋爱脑，但不是没救版",
    roast: "你的手机电池应该申请情绪劳动补贴。",
    quickWins: [
      "想发第二条消息前，先等 20 分钟。",
      "不要开侦探模式，直接问清楚。",
      "选择让你稳定的人，不要选择让你每天像追剧等更新的人。"
    ],
    repairPlan: [
      "先给情绪命名：我现在是不确定，不是一定不安全。",
      "准备一个自我安抚清单，别把全部安全感外包给对方。",
      "观察对方是否持续稳定，而不是只看某一刻的甜。"
    ],
    textScript: "我挺在意这段互动的。计划不清楚时，我容易自己脑补。我们可以把期待说清楚一点吗？"
  },
  avoidant: {
    vibe: "独立人设很稳，但心门像 VIP 包厢",
    roast: "你说那是清净，有时候其实是情绪飞行模式。",
    quickWins: [
      "想要空间时先说，不要直接消失。",
      "在转移话题前，先说一句真实感受。",
      "把亲近当信息，不要自动当危险。"
    ],
    repairPlan: [
      "分清楚：这是健康边界，还是把人挡在墙外。",
      "练习微量脆弱，一句真话就够开始。",
      "找能尊重空间、也能稳定沟通的人。"
    ],
    textScript: "我在意这件事。我需要一点时间整理，但我不是要逃避这段对话。"
  },
  secure: {
    vibe: "稳定不是无聊，是不用靠剧情反转证明爱情",
    roast: "你才是反套路：情绪稳定，还真的有吸引力。",
    quickWins: [
      "继续早点表达需求。",
      "不要替低投入的人过度努力。",
      "把稳定当标准，不要把它拿去拯救混乱。"
    ],
    repairPlan: [
      "看行动模式，不只听承诺。",
      "保持开放，但别变成关系项目经理。",
      "选择双向奔赴，不要一个人做小组作业。"
    ],
    textScript: "我喜欢直接、稳定、互相有回应的关系。我有兴趣，也会看一致性。"
  },
  fearfulAvoidant: {
    vibe: "又想靠近又想逃跑，情感复杂度付费版",
    roast: "你想要爱，也想要紧急出口。说实话，很有戏，但很累。",
    quickWins: [
      "从黏人切到冷漠前，先暂停一下。",
      "问自己：我是在回应这个人，还是在回应旧模式？",
      "需要安全感就说，不要用沉默测试别人。"
    ],
    repairPlan: [
      "记录自己的循环：追、慌、退、后悔。",
      "用直接请求代替情绪测试。",
      "放慢速度，选择稳定到能让信任跟上的人。"
    ],
    textScript: "我有一部分很想靠近，也有一部分会害怕。我在练习直接说出来，而不是突然退开。"
  }
};

export const STORAGE_KEY = "aiAttachmentTestResult";

export function getQuizQuestions(locale?: string | null) {
  return locale === "zh" ? QUIZ_QUESTIONS_ZH : QUIZ_QUESTIONS;
}

export function getStyleLabel(style: AttachmentStyle, locale?: string | null) {
  return locale === "zh" ? STYLE_LABELS_ZH[style] : STYLE_LABELS[style];
}

export function getStyleSummary(style: AttachmentStyle, locale?: string | null) {
  return locale === "zh" ? STYLE_SUMMARIES_ZH[style] : STYLE_SUMMARIES[style];
}

export function getStylePlaybook(style: AttachmentStyle, locale?: string | null) {
  return locale === "zh" ? STYLE_PLAYBOOKS_ZH[style] : STYLE_PLAYBOOKS[style];
}

export function calculateAttachmentStyle(answers: QuizAnswer[]): AttachmentStyle {
  const scores: Record<AttachmentStyle, number> = {
    anxious: 0,
    avoidant: 0,
    secure: 0,
    fearfulAvoidant: 0
  };

  for (const answer of answers) {
    scores[answer.style] += 1;
  }

  const priority: AttachmentStyle[] = ["fearfulAvoidant", "anxious", "avoidant", "secure"];
  return priority.reduce((winner, style) => (scores[style] > scores[winner] ? style : winner), "secure");
}

export function formatAnswersForPrompt(answers: QuizAnswer[]) {
  return answers
    .map((answer, index) => `${index + 1}. ${answer.optionText} (${STYLE_LABELS[answer.style]})`)
    .join("\n");
}

export function serializeAnswerCodes(answers: QuizAnswer[]) {
  return answers.map((answer) => `${answer.questionId}:${answer.optionId}`).join("|");
}

export function answersFromCodes(answerCodes?: string | null): QuizAnswer[] {
  if (!answerCodes) return [];

  return answerCodes
    .split("|")
    .map((entry) => {
      const [questionId, optionId] = entry.split(":");
      const question = QUIZ_QUESTIONS.find((item) => item.id === questionId);
      const option = question?.options.find((item) => item.id === optionId);

      if (!question || !option) return null;

      return {
        questionId,
        optionId: option.id,
        optionText: option.text,
        style: option.style
      };
    })
    .filter((answer): answer is QuizAnswer => Boolean(answer));
}
