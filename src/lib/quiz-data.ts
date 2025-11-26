export type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "O que mais te impede de começar uma tarefa importante?",
    options: [
      "A sensação de que nunca é o momento perfeito para iniciar.",
      "A ansiedade ou o medo de não fazer um bom trabalho.",
      "Uma preguiça ou cansaço que surge do nada.",
      "A vontade de checar o celular ou fazer outra coisa antes.",
    ],
  },
  {
    id: 2,
    question: "Quando você se distrai, qual é a causa mais comum?",
    options: [
      "Pensamentos sobre outras tarefas que preciso fazer.",
      "Cansaço mental que aparece rápido e me faz parar.",
      "O impulso de buscar algo mais interessante na internet.",
      "A necessidade de que tudo esteja perfeito, o que me trava.",
    ],
  },
  {
    id: 3,
    question: "Qual frase descreve melhor seu estado mental atual?",
    options: [
      "“Minha mente parece acelerada e sobrecarregada.”",
      "“Sei o que fazer, mas meu corpo parece sem energia.”",
      "“Começo várias coisas, mas termino poucas.”",
      "“Eu adio tarefas importantes sem um motivo claro.”",
    ],
  },
  {
    id: 4,
    question: "Como você se sente ao final de um dia que não foi produtivo?",
    options: [
      "Frustrado, porque sei que poderia ter feito mais.",
      "Ansioso, com a sensação de que as tarefas estão se acumulando.",
      "Esgotado, mesmo sem ter feito muito esforço.",
      "Culpado, por ter me rendido às distrações novamente.",
    ],
  },
  {
    id: 5,
    question: "O que você mais deseja para sua rotina?",
    options: [
      "Ter mais foco para terminar o que começo.",
      "Sentir menos ansiedade e mais controle sobre minhas tarefas.",
      "Ter mais energia e disposição durante o dia.",
      "Avançar nos meus objetivos sem sentir que estou sempre travado.",
    ],
  },
];
