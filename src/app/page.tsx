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
  diagnosis: string;
  cta: string;
};

const resultProfiles: Record<string, ResultProfile> = {
  "Procrastinador Crônico": {
    title: "Procrastinador Crônico",
    diagnosis: "Você caiu no ciclo mais comum entre estudantes: quer estudar, se enrola, deixa pra depois e sente culpa.\nSeu cérebro só está condicionado a buscar alívio rápido, não foco.\nO bom é que esse é o perfil que mais destrava com o Método Viciado em Estudar, porque ele ativa gatilhos neurológicos que fazem o foco surgir quase automaticamente.",
    cta: "Quero ativar meu foco em 7 minutos (Acesso Imediato)",
  },
  "Estudante Inconstante": {
    title: "Estudante Inconstante",
    diagnosis: "Você estuda… mas não mantém o ritmo. Não é falta de esforço — é falta de método.\nSeu cérebro tenta, mas ainda não encontrou um fluxo simples que torne estudar leve e automático.\nO Método Viciado em Estudar foi criado exatamente para transformar pessoas como você em máquinas de constância.",
    cta: "Quero ativar meu foco em 7 minutos (Acesso Imediato)",
  },
  "Focado, mas Bloqueado": {
    title: "Focado, mas Bloqueado",
    diagnosis: "Você sabe estudar, mas algo emocional te trava: cansaço, ansiedade, autocobrança ou frustração.\nVocê está muito perto de virar a chave — falta apenas um ajuste mental para manter o foco ligado todos os dias.\nO Método Viciado em Estudar dá exatamente essa estabilidade.",
    cta: "Quero ativar meu foco em 7 minutos (Acesso Imediato)",
  },
  "Quase Viciado em Estudar": {
    title: "Quase Viciado em Estudar",
    diagnosis: "Você já está próximo do seu auge. Seu cérebro responde bem ao estudo, falta só uma estrutura que mantenha seu ritmo sempre alto, sem oscilações.\nO Método Viciado em Estudar é ideal para elevar alguém como você ao estado de foco automático.",
    cta: "Quero ativar meu foco em 7 minutos (Acesso Imediato)",
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
    if (totalScore >= 5 && totalScore <= 9) {
      profileKey = "Procrastinador Crônico";
    } else if (totalScore >= 10 && totalScore <= 13) {
      profileKey = "Estudante Inconstante";
    } else if (totalScore >= 14 && totalScore <= 17) {
      profileKey = "Focado, mas Bloqueado";
    } else { // 18-20
      profileKey = "Quase Viciado em Estudar";
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
          <Card className="w-full max-w-2xl text-center shadow-2xl shadow-primary/20 animate-fade-in sm:overflow-hidden sm:rounded-lg">
            <Image 
              src="https://picsum.photos/seed/futurebrain/1200/630"
              alt="Cérebro iluminado representando padrões de foco"
              width={1200}
              height={630}
              className="w-full h-auto object-cover"
              data-ai-hint="futuristic brain neon"
            />
            <CardHeader className="p-6 sm:p-8">
              <div className="mx-auto bg-primary/10 p-3 rounded-full mb-4 border border-primary/20 shadow-lg shadow-primary/20">
                 <BrainCircuit className="w-8 h-8 sm:w-12 sm:h-12 text-primary" />
              </div>
              <CardTitle className="text-2xl sm:text-3xl font-extrabold">Descubra o Padrão Cerebral Que Está Travando Seu Foco</CardTitle>
              <CardDescription className="text-base text-muted-foreground pt-2 leading-relaxed max-w-prose mx-auto">
                90% das pessoas perdem o foco por padrões invisíveis no cérebro — descubra o seu em menos de 60 segundos.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <Button size="lg" onClick={handleStartQuiz} className="w-full text-base font-bold sm:w-auto sm:px-12">
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
