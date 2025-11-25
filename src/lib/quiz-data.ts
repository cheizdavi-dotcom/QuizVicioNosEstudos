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
      "Dificuldade em começar, mesmo sabendo que a tarefa é importante.",
      "Consigo começar, mas não mantenho — perco o ritmo com facilidade.",
      "Tenho energia, mas minha mente dispersa rápido com qualquer estímulo.",
    ],
  },
  {
    id: 2,
    question: "Quando você tenta focar, qual comportamento aparece primeiro?",
    options: [
      "Pego o celular 'por reflexo', sem perceber.",
      "Começo a organizar tudo… mas não começo a tarefa.",
      "Bate um cansaço repentino, como se meu corpo desligasse.",
      "Começo várias coisas ao mesmo tempo e não termino nenhuma.",
    ],
  },
  {
    id: 3,
    question: "Qual dessas frases descreve melhor seu padrão?",
    options: [
      "“Eu sei o que tenho que fazer, mas me saboto sem motivo claro.”",
      "“Demoro horas para engrenar, mas quando engreno, vou bem.”",
      "“Eu perco energia mental muito rápido.”",
      "“Tenho muitas ideias, mas pouca execução.”",
    ],
  },
  {
    id: 4,
    question: "Quando você define um plano ou rotina de trabalho…",
    options: [
      "Fico ansioso(a) e já acho que não vou dar conta.",
      "Planejo demais e começo tarde.",
      "Começo animado, mas desisto no meio.",
      "Me sobrecarrego tentando fazer tudo ao mesmo tempo.",
    ],
  },
  {
    id: 5,
    question: "Quando realmente precisa de foco profundo, o que acontece?",
    options: [
      "Pensamentos aceleram e me deixam travado(a).",
      "Minha mente busca outras tarefas 'mais agradáveis'.",
      "Meu corpo parece pesado, como se eu estivesse drenado.",
      "Minha atenção 'pula' entre várias coisas.",
    ],
  },
];
