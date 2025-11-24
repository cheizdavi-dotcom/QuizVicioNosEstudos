'use client';

import { useState } from 'react';
import Quiz from '@/components/quiz';
import QuizResult from '@/components/quiz-result';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit } from 'lucide-react';

export type ResultProfile = {
  title: string;
  diagnosis: string;
  cta: string;
};

const resultProfiles: Record<string, ResultProfile> = {
  "Procrastinador Crônico": {
    title: "O Procrastinador Crônico",
    diagnosis: "Você caiu no ciclo mais comum entre estudantes: quer estudar, se enrola, deixa pra depois e sente culpa. Seu cérebro só está condicionado a buscar alívio rápido, não foco. O bom é que esse é o perfil que mais destrava com o Método Viciado em Estudar, porque ele ativa gatilhos neurológicos que fazem o foco surgir quase automaticamente.",
    cta: "Quero ativar meu foco em 7 minutos 🔓",
  },
  "Estudante Inconstante": {
    title: "O Estudante Inconstante",
    diagnosis: "Você estuda… mas não mantém o ritmo. Não é falta de esforço — é falta de método. Seu cérebro tenta, mas não encontrou um fluxo simples que torne estudar leve e automático. O Método Viciado em Estudar foi criado exatamente para transformar pessoas como você em máquinas de constância.",
    cta: "Quero ativar meu foco em 7 minutos 🔓",
  },
  "Focado, porém Bloqueado": {
    title: "Focado, mas Bloqueado",
    diagnosis: "Você sabe estudar, mas algo emocional te trava: cansaço, ansiedade, autocobrança ou frustração. Você está muito perto de virar a chave — falta apenas um ajuste mental para manter o foco ligado todos os dias. O Método Viciado em Estudar dá exatamente essa estabilidade.",
    cta: "Quero ativar meu foco em 7 minutos 🔓",
  },
  "Quase Viciado em Estudar": {
    title: "Quase Viciado em Estudar",
    diagnosis: "Você já está próximo do seu auge. Seu cérebro responde bem ao estudo, falta só uma estrutura que mantenha seu ritmo sempre alto, sem oscilações. O Método Viciado em Estudar é ideal para elevar alguém como você ao estado de foco automático.",
    cta: "Quero ativar meu foco em 7 minutos 🔓",
  },
};

export default function Home() {
  const [quizState, setQuizState] = useState<'idle' | 'in-progress' | 'completed'>('idle');
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
      profileKey = "Focado, porém Bloqueado";
    } else { // 18-20
      profileKey = "Quase Viciado em Estudar";
    }

    setResult(resultProfiles[profileKey]);
    setQuizState('completed');
  };

  const handleRestart = () => {
    setQuizState('idle');
  };

  const renderContent = () => {
    switch (quizState) {
      case 'in-progress':
        return <Quiz onComplete={handleQuizCompletion} />;
      case 'completed':
        return result && <QuizResult result={result} onRestart={handleRestart} />;
      case 'idle':
      default:
        return (
          <Card className="w-full max-w-2xl text-center shadow-2xl shadow-primary/20 animate-fade-in">
            <CardHeader className="p-8 md:p-12">
              <div className="mx-auto bg-primary/10 p-4 rounded-full mb-6 border border-primary/20 shadow-lg shadow-primary/20">
                 <BrainCircuit className="w-12 h-12 text-primary" />
              </div>
              <CardTitle className="text-3xl md:text-4xl font-extrabold">Descubra Seu Perfil de Estudante</CardTitle>
              <CardDescription className="text-muted-foreground text-lg pt-4">
                90% dos estudantes caem em um dos 4 perfis que travam o foco. Descubra o seu em menos de 60 segundos.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 md:p-12 pt-0">
              <Button size="lg" onClick={handleStartQuiz} className="w-full text-lg font-bold">
                Descobrir meu Perfil de Foco
              </Button>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-12 bg-background">
      {renderContent()}
    </main>
  );
}
