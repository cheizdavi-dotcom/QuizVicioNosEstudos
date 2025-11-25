export type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Qual é seu principal obstáculo para manter disciplina no dia a dia?",
    options: [
      "A sensação de estar sempre devendo, o que me paralisa.",
      "Sei o que preciso fazer, mas começo tarde ou nem começo.",
      "Consigo começar, mas não mantenho por muito tempo.",
      "Tenho energia, mas minha mente se dispersa facilmente.",
    ],
  },
  {
    id: 2,
    question: "Como você reage quando precisa iniciar uma tarefa importante?",
    options: [
      "Eu travo — penso demais e começo de menos.",
      "Fico ansioso e acabo indo para o celular.",
      "Sinto cansaço ou preguiça, mesmo sem motivo.",
      "Tento fazer várias coisas ao mesmo tempo e me embolo.",
    ],
  },
  {
    id: 3,
    question: "O que mais atrapalha sua clareza mental?",
    options: [
      "A autocobrança e o pensamento acelerado.",
      "A necessidade de alívio rápido (celular, vídeos, estímulos).",
      "A falta de energia mental; tudo parece pesado.",
      "A sobrecarga de tarefas e a dificuldade de priorizar.",
    ],
  },
  {
    id: 4,
    question: "Nos últimos meses, sua disciplina parece…",
    options: [
      "Travada: sei o caminho, mas não avanço.",
      "Instável: dias bons e dias péssimos.",
      "Baixa: minha mente parece esgotada.",
      "Caótica: faço muito, mas nada realmente importante.",
    ],
  },
  {
    id: 5,
    question: "Quando pensa no seu futuro, o que mais te frustra?",
    options: [
      "Sentir que poderia estar muito mais à frente.",
      "Saber que tenho potencial, mas minha mente sabota.",
      "Sentir que não tenho energia para manter constância.",
      "Fazer mil coisas e não ver progresso real.",
    ],
  },
];
