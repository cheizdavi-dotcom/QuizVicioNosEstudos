'use client';

import { useState } from 'react';
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
    title: "O Procrastinador Crônico",
    diagnosis: "Você caiu no ciclo mais comum entre estudantes: quer estudar, se enrola, deixa pra depois e sente culpa.\nSeu cérebro só está condicionado a buscar alívio rápido, não foco.\nO bom é que esse é o perfil que mais destrava com o Método Viciado em Estudar, porque ele ativa gatilhos neurológicos que fazem o foco surgir quase automaticamente.",
    cta: "Destravar meu foco agora",
  },
  "Estudante Inconstante": {
    title: "O Estudante Inconstante",
    diagnosis: "Você estuda… mas não mantém o ritmo. Não é falta de esforço — é falta de método.\nSeu cérebro tenta, mas não encontrou um fluxo simples que torne estudar leve e automático.\nO Método Viciado em Estudar foi criado exatamente para transformar pessoas como você em máquinas de constância.",
    cta: "Entrar no modo constante",
  },
  "Focado, mas Bloqueado": {
    title: "Focado, mas Bloqueado",
    diagnosis: "Você sabe estudar, mas algo emocional te trava: cansaço, ansiedade, autocobrança ou frustração.\nVocê está muito perto de virar a chave — falta apenas um ajuste mental para manter o foco ligado todos os dias.\nO Método Viciado em Estudar dá exatamente essa estabilidade.",
    cta: "Ativar meu potencial máximo",
  },
  "Quase Viciado em Estudar": {
    title: "Quase Viciado em Estudar",
    diagnosis: "Você já está próximo do seu auge. Seu cérebro responde bem ao estudo, falta só uma estrutura que mantenha seu ritmo sempre alto, sem oscilações.\nO Método Viciado em Estudar é ideal para elevar alguém como você ao estado de foco automático.",
    cta: "Virar 100% Viciado em Estudar",
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
          <Card className="w-full max-w-2xl text-center shadow-2xl shadow-primary/20 animate-fade-in">
            <CardHeader className="p-6 sm:p-8 md:p-12">
              <div className="mx-auto bg-primary/10 p-3 sm:p-4 rounded-full mb-4 sm:mb-6 border border-primary/20 shadow-lg shadow-primary/20">
                 <BrainCircuit className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
              </div>
              <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-extrabold">Descubra Seu Perfil de Estudante</CardTitle>
              <CardDescription className="text-base sm:text-lg text-muted-foreground pt-4 leading-relaxed">
                90% dos estudantes travam o foco por padrões ocultos no cérebro — descubra em qual deles você caiu em menos de 60 segundos.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 sm:p-8 md:p-12 pt-0">
              <Button size="lg" onClick={handleStartQuiz} className="w-full text-base sm:text-lg font-bold">
                Começar Meu Diagnóstico Agora
              </Button>
               <p className="text-xs sm:text-sm text-muted-foreground mt-4">Leva menos de 1 minuto.</p>
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
