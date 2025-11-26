'use client';

import { useState } from 'react';
import Image from 'next/image';
import Quiz from '@/components/quiz';
import QuizResult from '@/components/quiz-result';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit } from 'lucide-react';
import AnalyzingScreen from '@/components/analyzing-screen';

export type ResultProfile = {
  title: string;
  diagnosis: string[];
  ponteParaSolucao: string;
  cta: string;
};

const resultProfiles: Record<string, ResultProfile> = {
  "O Disperso": {
    title: "Seu padrão cerebral é o do Foco Desregulado",
    diagnosis: [
        "**Insight:** Seu problema não é falta de disciplina, mas sim um cérebro treinado para buscar recompensas rápidas. Por isso, tarefas que exigem esforço sustentado parecem chatas e difíceis de começar.",
        "Seu foco é constantemente “roubado” por pequenas explosões de dopamina (celular, notificações, vídeos curtos), criando um ciclo de distração e culpa.",
        "O Método Viciado em Estudar reajusta seu sistema dopaminérgico, ensinando seu cérebro a encontrar recompensa na própria execução. Isso torna a disciplina mais leve e o foco, automático."
    ],
    ponteParaSolucao: "",
    cta: "Quero Destravar Meu Foco",
  },
  "O Ansioso Acumulador": {
    title: "Seu padrão cerebral é o do Foco Ansioso",
    diagnosis: [
        "**Insight:** Sua mente não trava por fraqueza, mas por excesso de alerta. A necessidade de que tudo seja 'perfeito' te impede de começar, criando um bloqueio onde o medo de errar é maior que a vontade de avançar.",
        "Você acumula tarefas, pensa em mil cenários e tenta fazer tudo ao mesmo tempo. O resultado é uma aceleração mental que leva à sobrecarga e, ironicamente, à paralisia.",
        "O Método Viciado em Estudar aplica um protocolo de desaceleração que acalma o sistema nervoso, organiza a mente e direciona sua energia para uma única tarefa por vez, restaurando a clareza e a execução."
    ],
    ponteParaSolucao: "",
    cta: "Quero Destravar Meu Foco",
  },
  "O Exausto Mental": {
    title: "Seu padrão cerebral é o da Exaustão Neural",
    diagnosis: [
        "**Insight:** Sua mente não está preguiçosa; ela está sem combustível. Sua 'bateria' mental está constantemente baixa, fazendo com que qualquer tarefa que exija concentração pareça monumental.",
        "A procrastinação, nesse caso, é um sintoma de exaustão. Seu cérebro está tentando economizar energia e, por isso, evita atividades que demandam esforço cognitivo, mesmo que você saiba que são importantes.",
        "O Método Viciado em Estudar foi desenhado para recuperar sua energia mental com um sistema de 'rotina leve', que reativa seus neurotransmissores de foco e disposição, permitindo que você retome o controle sem depender de 'força de vontade'."
    ],
    ponteParaSolucao: "",
    cta: "Quero Destravar Meu Foco",
  },
  "O Travado Perfeccionista": {
    title: "Seu padrão cerebral é o do Foco Perfeccionista",
    diagnosis: [
        "**Insight:** Você tem clareza sobre o que precisa ser feito, mas a necessidade de que tudo seja 'perfeito' te impede de começar. Esse padrão cria um bloqueio onde o medo de errar é maior que a vontade de avançar.",
        "Seu cérebro enxerga a tarefa como um grande desafio intimidador, em vez de uma série de pequenos passos. Isso leva ao adiamento constante, disfarçado de 'preparação'.",
        "O Método Viciado em Estudar utiliza gatilhos comportamentais para quebrar o ciclo do perfeccionismo. Ele te ajuda a focar na consistência em vez da perfeição, tornando o progresso diário inevitável."
    ],
    ponteParaSolucao: "",
    cta: "Quero Destravar Meu Foco",
  },
};


export default function Home() {
  const [quizState, setQuizState] = useState<'idle' | 'in-progress' | 'analyzing' | 'completed'>('idle');
  const [result, setResult] = useState<ResultProfile | null>(null);

  const handleStartQuiz = () => {
    setResult(null);
    setQuizState('in-progress');
  };

  const handleQuizCompletion = (answerIndexes: number[]) => {
    const counts: Record<string, number> = {
      "O Disperso": 0,
      "O Ansioso Acumulador": 0,
      "O Exausto Mental": 0,
      "O Travado Perfeccionista": 0,
    };

    const answerToProfileMap = [
      ["O Disperso", "O Travado Perfeccionista", "O Disperso", "O Travado Perfeccionista"], // Q1
      ["O Ansioso Acumulador", "O Exausto Mental", "O Travado Perfeccionista", "O Disperso"], // Q2
      ["O Travado Perfeccionista", "O Disperso", "O Ansioso Acumulador", "O Exausto Mental"], // Q3
      ["O Ansioso Acumulador", "O Exausto Mental", "O Disperso", "O Travado Perfeccionista"], // Q4
      ["O Disperso", "O Ansioso Acumulador", "O Exausto Mental", "O Travado Perfeccionista"], // Q5
    ];

    answerIndexes.forEach((answerIndex, questionIndex) => {
      const profile = answerToProfileMap[questionIndex][answerIndex];
      if (profile) {
        counts[profile]++;
      }
    });

    let maxCount = 0;
    let finalProfileKey = "O Disperso"; // Default profile

    for (const profile in counts) {
      if (counts[profile] > maxCount) {
        maxCount = counts[profile];
        finalProfileKey = profile;
      }
    }
    
    setResult(resultProfiles[finalProfileKey]);
    setQuizState('analyzing');

    setTimeout(() => {
        setQuizState('completed');
    }, 2500);
  };

  const handleRestart = () => {
    setQuizState('idle');
  };

  const renderContent = () => {
    switch (quizState) {
      case 'in-progress':
        return <Quiz onComplete={handleQuizCompletion} />;
      case 'analyzing':
        return <AnalyzingScreen />;
      case 'completed':
        return result && <QuizResult result={result} onRestart={handleRestart} />;
      case 'idle':
      default:
        return (
          <Card className="w-full max-w-2xl text-center shadow-2xl shadow-primary/20 animate-fade-in overflow-hidden rounded-lg">
            <Image 
              src="https://imgur.com/3sF4aiS.png"
              alt="Cérebro iluminado representando padrões de foco"
              width={1200}
              height={630}
              className="w-full h-auto object-cover"
              data-ai-hint="futuristic brain neon"
            />
            <CardHeader className="p-6">
              <div className="mx-auto bg-primary/10 p-3 rounded-full mb-4 border border-primary/20 shadow-lg shadow-primary/20">
                 <BrainCircuit className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl font-extrabold sm:text-3xl">Descubra o Padrão Cerebral que Rouba seu Foco</CardTitle>
              <CardDescription className="text-sm text-muted-foreground pt-2 leading-relaxed max-w-prose mx-auto sm:text-base">
                Sua falta de disciplina pode ser um padrão mental invisível. Descubra qual é o seu em menos de 60 segundos.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <Button size="lg" onClick={handleStartQuiz} className="w-full font-bold sm:w-auto sm:px-12">
                Iniciar Meu Diagnóstico
              </Button>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      {renderContent()}
    </main>
  );
}
