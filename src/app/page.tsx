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
    title: "Seu sabotador invisível é: O Disperso",
    diagnosis: [
        "Sua disciplina não é fraca — seu **sistema de foco** está desregulado. Você depende de picos de dopamina para agir, e por isso tarefas que não geram recompensa imediata parecem impossíveis de começar ou sustentar.",
        "Seu cérebro foi treinado para buscar **distração**, tornando o foco profundo uma tarefa exaustiva. Isso cria um ciclo de procrastinação e culpa.",
    ],
    ponteParaSolucao: "O **Método Viciado em Estudar** reajusta seu sistema dopaminérgico, ensinando seu cérebro a encontrar recompensa na própria execução. Isso torna a disciplina mais leve e o foco, automático.",
    cta: "Quero Destravar Meu Foco",
  },
  "O Ansioso Acumulador": {
    title: "Seu sabotador invisível é: O Ansioso Acumulador",
    diagnosis: [
        "Sua mente está em modo de **'hiper-vigilância'**. Você acumula tarefas, pensa em mil cenários e tenta fazer tudo ao mesmo tempo. O resultado é uma aceleração mental que leva à sobrecarga e, ironicamente, à paralisia.",
        "Esse estado de alerta constante drena sua energia **antes mesmo de você começar** a tarefa principal, fazendo com que a produtividade se torne um caos.",
    ],
    ponteParaSolucao: "Para resolver isso, o **Método Viciado em Estudar** aplica um protocolo de desaceleração que acalma o sistema nervoso, organiza a mente e direciona sua energia para uma única tarefa por vez, restaurando a clareza e a execução.",
    cta: "Quero Destravar Meu Foco",
  },
  "O Exausto Mental": {
    title: "Seu sabotador invisível é: O Exausto Mental",
    diagnosis: [
        "Seu problema não é falta de vontade, mas sim **fadiga neural**. Sua 'bateria' mental está constantemente baixa, fazendo com que qualquer tarefa pareça monumental. A procrastinação, nesse caso, é um sintoma de exaustão.",
        "Seu cérebro está tentando **economizar energia**, e por isso evita atividades que demandam esforço cognitivo sustentado, mesmo que você saiba que são importantes.",
    ],
    ponteParaSolucao: "O **Método Viciado em Estudar** foi desenhado para recuperar sua energia mental com um sistema de 'rotina leve'. Ele reativa seus neurotransmissores de foco e disposição, permitindo que você retome o controle sem precisar de 'força de vontade'.",
    cta: "Quero Destravar Meu Foco",
  },
  "O Travado Perfeccionista": {
    title: "Seu sabotador invisível é: O Travado Perfeccionista",
    diagnosis: [
        "Você tem clareza sobre o que precisa ser feito, mas a necessidade de que tudo seja **'perfeito'** te impede de começar. Esse padrão cria um bloqueio onde o medo de errar é maior que a vontade de avançar.",
        "Seu cérebro enxerga a tarefa como um **grande desafio intimidador**, em vez de uma série de pequenos passos. Isso leva ao adiamento constante, disfarçado de 'preparação'.",
    ],
    ponteParaSolucao: "O **Método Viciado em Estudar** utiliza gatilhos comportamentais para quebrar o ciclo do perfeccionismo. Ele te ajuda a focar na **consistência leve** em vez da perfeição, tornando o progresso diário inevitável.",
    cta: "Quero Destravar Meu Foco",
  },
};


export default function Home() {
  const [quizState, setQuizState] = useState<'idle' | 'in-progress' | 'analyzing' | 'completed'>('idle');
  const [resultKey, setResultKey] = useState<string | null>(null);

  const handleStartQuiz = () => {
    setResultKey(null);
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
      ["O Disperso", "O Travado Perfeccionista", "O Disperso", "O Ansioso Acumulador"], // Q1
      ["O Ansioso Acumulador", "O Exausto Mental", "O Disperso", "O Disperso"], // Q2
      ["O Disperso", "O Exausto Mental", "O Ansioso Acumulador", "O Exausto Mental"], // Q3
      ["O Ansioso Acumulador", "O Exausto Mental", "O Disperso", "O Travado Perfeccionista"], // Q4
      ["O Travado Perfeccionista", "O Ansioso Acumulador", "O Exausto Mental", "O Ansioso Acumulador"], // Q5
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
    
    setResultKey(finalProfileKey);
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
        return resultKey && <QuizResult result={resultProfiles[resultKey]} resultKey={resultKey} onRestart={handleRestart} />;
      case 'idle':
      default:
        return (
          <Card className="w-full max-w-2xl text-center shadow-2xl shadow-primary/20 animate-fade-in overflow-hidden rounded-lg border-primary/20">
            <Image 
              src="https://i.imgur.com/3sF4aiS.png"
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
              <CardTitle className="text-2xl sm:text-3xl font-extrabold text-primary">Descubra o Padrão Cerebral Que Está Travando Seu Foco</CardTitle>
              <CardDescription className="text-sm text-muted-foreground pt-2 leading-relaxed max-w-prose mx-auto sm:text-base">
                90% das pessoas perdem o foco por padrões invisíveis no cérebro — descubra qual está segurando você em menos de 60 segundos.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <Button size="lg" onClick={handleStartQuiz} className="w-full font-bold sm:w-auto sm:px-12">
                Descobrir Meu Sabotador →
              </Button>
               <p className="text-xs text-muted-foreground mt-3">
                Baseado em 42.000 diagnósticos realizados.
              </p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.05)_0%,transparent_70%)]">
      {renderContent()}
    </main>
  );
}
