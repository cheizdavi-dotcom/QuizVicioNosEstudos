export type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "O que mais te impede de ter constância?",
    options: [
      "Começo animado, mas perco o ritmo facilmente.",
      "A ansiedade de ter que fazer perfeito me paralisa.",
      "A distração com coisas aleatórias (celular, pensamentos).",
      "Sinto que a tarefa é grande demais e acabo adiando.",
    ],
  },
  {
    id: 2,
    question: "Quando você tenta focar, qual comportamento aparece?",
    options: [
      "Pensamentos acelerados sobre outras tarefas.",
      "Um cansaço súbito, como se a energia acabasse.",
      "A necessidade de organizar tudo antes de começar.",
      "O impulso de checar o celular 'só por um minuto'.",
    ],
  },
  {
    id: 3,
    question: "Qual frase descreve melhor seu estado mental atual?",
    options: [
      "“Minha mente está sempre a mil por hora.”",
      "“Sei o que fazer, mas meu corpo parece cansado.”",
      "“Começo várias coisas, mas termino poucas.”",
      "“Me sinto esgotado só de pensar no que preciso fazer.”",
    ],
  },
  {
    id: 4,
    question: "Sua principal dificuldade com a produtividade é:",
    options: [
      "A sobrecarga de ter muitas ideias e não saber por onde começar.",
      "A falta de energia para manter o ritmo por horas.",
      "A perda de foco com qualquer interrupção.",
      "O medo de não entregar um resultado bom o suficiente.",
    ],
  },
  {
    id: 5,
    question: "O que você mais deseja para sua vida profissional?",
    options: [
      "Ter mais foco para terminar o que começo.",
      "Sentir menos ansiedade e mais controle.",
      "Ter mais energia e disposição no dia a dia.",
      "Avançar na carreira sem sentir que estou sempre travado.",
    ],
  },
];
