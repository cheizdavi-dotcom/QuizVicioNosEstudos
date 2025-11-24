'use client';

import { useState } from 'react';
import { generatePersonalizedQuizResult, PersonalizedQuizResultOutput } from '@/ai/flows/generate-personalized-quiz-result';
import Quiz from '@/components/quiz';
import QuizResult from '@/components/quiz-result';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const [quizState, setQuizState] = useState<'idle' | 'in-progress' | 'loading' | 'completed'>('idle');
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<PersonalizedQuizResultOutput | null>(null);
  const { toast } = useToast();

  const handleStartQuiz = () => {
    setAnswers([]);
    setResult(null);
    setQuizState('in-progress');
  };

  const handleQuizCompletion = async (finalAnswers: string[]) => {
    setAnswers(finalAnswers);
    setQuizState('loading');
    try {
      const quizResult = await generatePersonalizedQuizResult({ answers: finalAnswers });
      setResult(quizResult);
      setQuizState('completed');
    } catch (error) {
      console.error("Error generating quiz result:", error);
      toast({
        title: "Erro ao gerar resultado",
        description: "Houve um problema ao analisar suas respostas. Por favor, tente novamente.",
        variant: "destructive",
      });
      setQuizState('idle');
    }
  };

  const handleRestart = () => {
    setQuizState('idle');
  };

  const renderContent = () => {
    switch (quizState) {
      case 'in-progress':
        return <Quiz onComplete={handleQuizCompletion} />;
      case 'loading':
        return (
          <div className="flex flex-col items-center justify-center text-center p-8 min-h-[30rem]">
            <Loader2 className="w-16 h-16 animate-spin text-primary" />
            <p className="text-primary mt-6 text-xl font-semibold">Analisando suas respostas...</p>
            <p className="text-muted-foreground mt-2">Estamos gerando seu diagnóstico personalizado.</p>
          </div>
        );
      case 'completed':
        return result && <QuizResult result={result} onRestart={handleRestart} />;
      case 'idle':
      default:
        return (
          <Card className="w-full max-w-2xl text-center shadow-2xl shadow-primary/10">
            <CardHeader className="p-8 md:p-12">
              <div className="mx-auto bg-primary/10 p-4 rounded-full mb-6 border border-primary/20">
                 <BrainCircuit className="w-12 h-12 text-primary" />
              </div>
              <CardTitle className="text-3xl md:text-4xl font-extrabold">Descubra Seu Perfil de Estudante</CardTitle>
              <CardDescription className="text-muted-foreground text-lg pt-4">
                Responda 5 perguntas rápidas e receba um diagnóstico personalizado para eliminar a procrastinação e turbinar seus estudos.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 md:p-12 pt-0">
              <Button size="lg" onClick={handleStartQuiz} className="w-full text-lg font-bold">
                Começar o Quiz
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
