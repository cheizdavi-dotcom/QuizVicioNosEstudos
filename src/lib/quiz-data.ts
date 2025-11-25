export type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Qual o seu principal obstáculo para manter a disciplina no dia a dia?",
    options: [
      "A sensação de estar sempre devendo, o que me paralisa.",
      "A dificuldade em começar tarefas, mesmo sabendo que são importantes.",
      "A luta para manter a constância; começo bem, mas não sustento.",
      "Sinto que tenho potencial, mas a energia mental não acompanha.",
    ],
  },
  {
    id: 2,
    question: "O que mais rouba sua atenção quando você precisa se concentrar em uma tarefa importante?",
    options: [
      "Pensamentos acelerados sobre outras pendências e preocupações.",
      "A necessidade de checar notificações ou buscar algo rápido na internet.",
      "Cansaço mental; a mente parece simplesmente 'desligar'.",
      "Interrupções externas que quebram completamente meu fluxo de trabalho.",
    ],
  },
  {
    id: 3,
    question: "Quando você procrastina uma tarefa, qual é o sentimento predominante depois?",
    options: [
      "Ansiedade e culpa, por ter acumulado mais uma pendência.",
      "Frustração, por não ter tido a disciplina para começar.",
      "Alívio momentâneo, seguido de um peso ainda maior depois.",
      "Indiferença; já virou um hábito difícil de quebrar.",
    ],
  },
  {
    id: 4,
    question: "Se você pudesse resolver um único problema para destravar sua produtividade, qual seria?",
    options: [
      "Ter mais clareza e foco para executar uma tarefa do início ao fim.",
      "Encontrar uma fonte de motivação que não desapareça no meio do caminho.",
      "Controlar a ansiedade que surge antes de tarefas desafiadoras.",
      "Ter mais energia mental para aguentar o dia sem me sentir esgotado.",
    ],
  },
  {
    id: 5,
    question: "Como você se sente ao final de um dia de trabalho em que não conseguiu ser produtivo?",
    options: [
      "Esgotado mentalmente, como se tivesse corrido uma maratona sem sair do lugar.",
      "Irritado comigo mesmo pela falta de disciplina.",
      "Desapontado, questionando minha capacidade de atingir meus objetivos.",
      "Apático, com a sensação de que o dia seguinte será igual.",
    ],
  },
];
