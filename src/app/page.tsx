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
  pontoCritico: string;
  acaoAcreditavel: string;
  solucaoAcreditavel: string;
  ponteParaSolucao: string;
  cta: string;
};

const resultProfiles: Record<string, ResultProfile> = {
  "Dopaminérgico Desregulado": {
    title: "Seu padrão cerebral é: Dopaminérgico Desregulado",
    diagnosis: [
      "Você não é preguiçoso — seu cérebro apenas busca alívio imediato antes de buscar profundidade. Por isso você até começa, mas se distrai rápido, perde o ritmo e sente culpa depois.",
      "Seu foco é roubado por pequenas explosões de dopamina (celular, notificações, vídeos curtos), que deixam tarefas longas mais difíceis do que deveriam ser.",
      "Esse padrão cria:",
      "• foco fragmentado",
      "• procrastinação recorrente",
      "• sensação de “sei o que preciso fazer, mas não faço”"
    ],
    pontoCritico: "",
    acaoAcreditavel: "",
    ponteParaSolucao: "Para destravar esse padrão, você precisa ensinar seu cérebro a gerar dopamina de forma estável, e não em picos. É exatamente isso que o Método Viciado em Estudar faz — reorganizando seus gatilhos de foco em poucos dias.",
    solucaoAcreditavel: "",
    cta: "Quero Destravar Meu Padrão",
  },
  "Ansioso Vigilante": {
    title: "Seu padrão cerebral é: Ansioso Vigilante",
    diagnosis: [
      "Sua mente não trava porque é fraca — ela trava porque está em alerta demais.",
      "Você pensa antes de agir, se cobra antes de começar, e revisa mentalmente cada passo antes mesmo de dar o primeiro. Isso drena sua energia e bloqueia seu foco.",
      "Sintomas desse padrão:",
      "• medo de errar antes de tentar",
      "• dificuldade em iniciar tarefas",
      "• autocobrança excessiva",
      "• sensação de que “nunca está bom o suficiente”"
    ],
    pontoCritico: "",
    acaoAcreditavel: "",
    ponteParaSolucao: "Para voltar ao modo foco, você precisa tirar seu cérebro do modo ameaça. O Método Viciado em Estudar faz isso reorganizando seu sistema de atenção para que a ação volte a ser leve, fluida e natural.",
    solucaoAcreditavel: "",
    cta: "Quero Destravar Meu Padrão",
  },
  "Exaustão Neural": {
    title: "Seu padrão cerebral é: Exaustão Neural",
    diagnosis: [
      "Seu foco não desapareceu — ele só está sem combustível.",
      "Sua mente vem acumulando fadiga mental por dias, meses ou até anos. Isso gera preguiça, falta de clareza e dificuldade em manter constância, mesmo quando você quer melhorar.",
      "Sintomas comuns:",
      "• sensação de cansaço mesmo após descanso",
      "• falta de motivação",
      "• foco pesado, arrastado",
      "• dificuldade em manter uma rotina"
    ],
    pontoCritico: "",
    acaoAcreditavel: "",
    ponteParaSolucao: "Você não precisa de força de vontade — precisa reativar seu sistema de energia mental. O Método Viciado em Estudar faz isso em microciclos de 7 minutos, que reconstroem sua energia neural e destravam seu foco.",
    solucaoAcreditavel: "",
cta: "Quero Destravar Meu Padrão",
  },
  "Sobrecarga Multitarefa": {
    title: "Seu padrão cerebral é: Sobrecarga Multitarefa",
    diagnosis: [
      "Seu cérebro não está lento — ele está sobrecarregado.",
      "Você vive tentando fazer muitas coisas ao mesmo tempo, e isso fragmenta seu foco, aumenta o cortisol e faz sua produtividade despencar.",
      "Sintomas desse padrão:",
      "• mente acelerada",
      "• listas enormes e pouco resultado",
      "• sensação de caos e desorganização",
      "• foco que não se fixa em nada por muito tempo"
    ],
    pontoCritico: "",
    acaoAcreditavel: "",
    ponteParaSolucao: "O Método Viciado em Estudar reduz até 80% da dispersão em poucos dias, ensinando seu cérebro a entrar em foco profundo e priorizar o que realmente importa.",
    solucaoAcreditavel: "",
    cta: "Quero Destravar Meu Padrão",
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
    const totalScore = answerIndexes.reduce((sum, index) => sum + (index + 1), 0);
    
    let profileKey: string;
    if (totalScore >= 5 && totalScore <= 7) {
      profileKey = "Ansioso Vigilante";
    } else if (totalScore >= 8 && totalScore <= 11) {
      profileKey = "Dopaminérgico Desregulado";
    } else if (totalScore >= 12 && totalScore <= 15) {
      profileKey = "Exaustão Neural";
    } else { // 16-20
      profileKey = "Sobrecarga Multitarefa";
    }

    setResult(resultProfiles[profileKey]);
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
              <CardTitle className="text-2xl font-extrabold sm:text-3xl">Descubra o Padrão Cerebral Que Está Travando Seu Foco</CardTitle>
              <CardDescription className="text-sm text-muted-foreground pt-2 leading-relaxed max-w-prose mx-auto sm:text-base">
                90% das pessoas perdem o foco por padrões invisíveis no cérebro — descubra qual está segurando você em menos de 60 segundos.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <Button size="lg" onClick={handleStartQuiz} className="w-full font-bold sm:w-auto sm:px-12">
                Iniciar Meu Diagnóstico
              </Button>
               <p className="text-xs text-muted-foreground mt-3">+ de 42.000 diagnósticos realizados.</p>
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
