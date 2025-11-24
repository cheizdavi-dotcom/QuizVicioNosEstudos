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
    diagnosis: "Você estuda… mas não mantém o ritmo. Não é falta de esforço — é falta de método.\nSeu cérebro está condicionado a buscar alívio rápido, não foco profundo.\nÉ por isso que técnicas comuns não funcionaram para você.\nAntes de estudar, você precisa ativar os gatilhos neurológicos que desbloqueiam foco automático.\nQuando isso ativa, estudar deixa de ser pesado — vira natural.",
    cta: "Quero ativar meu foco em 7 minutos (Acesso Imediato)",
  },
  "Estudante Inconstante": {
    title: "O Estudante Inconstante",
    diagnosis: "Você estuda… mas não mantém o ritmo. Não é falta de esforço — é falta de método.\nSeu cérebro está condicionado a buscar alívio rápido, não foco profundo.\nÉ por isso que técnicas comuns não funcionaram para você.\nAntes de estudar, você precisa ativar os gatilhos neurológicos que desbloqueiam foco automático.\nQuando isso ativa, estudar deixa de ser pesado — vira natural.",
    cta: "Quero ativar meu foco em 7 minutos (Acesso Imediato)",
  },
  "Focado, mas Bloqueado": {
    title: "Focado, mas Bloqueado",
    diagnosis: "Você estuda… mas não mantém o ritmo. Não é falta de esforço — é falta de método.\nSeu cérebro está condicionado a buscar alívio rápido, não foco profundo.\nÉ por isso que técnicas comuns não funcionaram para você.\nAntes de estudar, você precisa ativar os gatilhos neurológicos que desbloqueiam foco automático.\nQuando isso ativa, estudar deixa de ser pesado — vira natural.",
    cta: "Quero ativar meu foco em 7 minutos (Acesso Imediato)",
  },
  "Quase Viciado em Estudar": {
    title: "Quase Viciado em Estudar",
    diagnosis: "Você estuda… mas não mantém o ritmo. Não é falta de esforço — é falta de método.\nSeu cérebro está condicionado a buscar alívio rápido, não foco profundo.\nÉ por isso que técnicas comuns não funcionaram para você.\nAntes de estudar, você precisa ativar os gatiligos neurológicos que desbloqueiam foco automático.\nQuando isso ativa, estudar deixa de ser pesado — vira natural.",
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
