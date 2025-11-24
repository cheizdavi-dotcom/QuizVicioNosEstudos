export type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Como você descreveria sua rotina de estudos hoje?",
    options: [
      "Quase não estudo — sempre deixo pra depois.",
      "Estudo às vezes, mas sem constância.",
      "Estudo com frequência, mas perco o foco fácil.",
      "Tenho uma rotina, mas quero melhorar ainda mais.",
    ],
  },
  {
    id: 2,
    question: "O que mais te atrapalha quando tenta estudar?",
    options: [
      "O celular e redes sociais.",
      "A falta de motivação.",
      "A dificuldade de manter foco.",
      "A ansiedade que aparece sempre que começo.",
    ],
  },
  {
    id: 3,
    question: "Depois de procrastinar, como você costuma se sentir?",
    options: [
      "Frustrado, com culpa.",
      "Irritado por não ter feito o mínimo.",
      "Desanimado e com sensação de fracasso.",
      "Normal — já até me acostumei.",
    ],
  },
  {
    id: 4,
    question: "O que faria diferença REAL no seu estudo hoje?",
    options: [
      "Ter um método simples pra focar rápido.",
      "Conseguir estudar sem distrações.",
      "Me sentir motivado de verdade.",
      "Aprender a gostar de estudar novamente.",
    ],
  },
  {
    id: 5,
    question: "Quão útil seria um método simples e prático para ativar foco imediato no seu dia?",
    options: [
      "Mudaria completamente minha vida.",
      "Ajudaria MUITO no meu foco.",
      "Seria bom, mas não sei por onde começar.",
      "Sempre quis ter algo assim.",
    ],
  },
];
