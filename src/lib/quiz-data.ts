export type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "O que mais sabota sua disciplina no dia a dia?",
    options: [
      "Começo animado mas não sustento.",
      "Nunca sinto que é o momento ideal.",
      "Me distraio sem perceber.",
      "Sei o que fazer, mas fico travado.",
    ],
  },
  {
    id: 2,
    question: "Quando tenta manter rotina, o que acontece?",
    options: [
      "Ansiedade e multitarefa.",
      "Exaustão mental.",
      "Culpa e adiamento.",
      "Falta de consistência.",
    ],
  },
  {
    id: 3,
    question: "Sua relação com motivação:",
    options: [
      "Dependo dela pra começar.",
      "Ela acaba rápido.",
      "Tenho motivação, falta direção.",
      "Sei o que fazer, meu corpo não acompanha.",
    ],
  },
  {
    id: 4,
    question: "Quando tenta focar, o que acontece?",
    options: [
      "Mente acelerada.",
      "Preguiça mental.",
      "Distração constante.",
      "Perfeccionismo que paralisa.",
    ],
  },
  {
    id: 5,
    question: "O que você mais quer melhorar hoje?",
    options: [
      "Constância real.",
      "Produtividade sem ansiedade.",
      "Rotina estável.",
      "Controle mental e clareza.",
    ],
  },
];
