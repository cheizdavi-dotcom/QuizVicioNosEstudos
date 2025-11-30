'use client';

import { useState, useEffect } from 'react';
import { quizQuestions } from '@/lib/quiz-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { useFirebase, addDocumentNonBlocking, useUser } from '@/firebase';
import { collection, serverTimestamp } from 'firebase/firestore';

interface QuizProps {
  onComplete: (answerIndexes: number[], finalProfileKey: string) => void;
  quizResultId: string | null;
}

export default function Quiz({ onComplete, quizResultId }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answerIndexes, setAnswerIndexes] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  const { firestore, user } = useFirebase();

  const trackFunnelStep = (step: string, data?: any) => {
    if (user && quizResultId && firestore) {
      const funnelStepRef = collection(firestore, `users/${user.uid}/quizResults/${quizResultId}/funnelStepCompletions`);
      addDocumentNonBlocking(funnelStepRef, {
        step,
        ...data,
        completedAt: serverTimestamp(),
      });
    }
  };


  useEffect(() => {
    setProgress(((currentQuestionIndex) / quizQuestions.length) * 100);
  }, [currentQuestionIndex]);

  const advanceToNext = (newAnswerIndexes: number[]) => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setIsAnimatingOut(false);
      } else {
        // Determine final profile on completion
        const counts: Record<string, number> = {
          "O Disperso": 0,
          "O Ansioso Acumulador": 0,
          "O Exausto Mental": 0,
          "O Travado Perfeccionista": 0,
        };
    
        const answerToProfileMap = [
          ["O Disperso", "O Travado Perfeccionista", "O Ansioso Acumulador", "O Disperso"], // Q1
          ["O Ansioso Acumulador", "O Exausto Mental", "O Disperso", "O Disperso"], // Q2
          ["O Ansioso Acumulador", "O Exausto Mental", "O Disperso", "O Exausto Mental"], // Q3
          ["O Ansioso Acumulador", "O Exausto Mental", "O Disperso", "O Travado Perfeccionista"], // Q4
          ["O Travado Perfeccionista", "O Ansioso Acumulador", "O Exausto Mental", "O Ansioso Acumulador"], // Q5
        ];
    
        newAnswerIndexes.forEach((answerIndex, questionIndex) => {
          const profile = answerToProfileMap[questionIndex][answerIndex];
          if (profile) {
            counts[profile]++;
          }
        });
    
        let maxCount = 0;
        let finalProfileKey = "O Disperso";
    
        for (const profile in counts) {
          if (counts[profile] > maxCount) {
            maxCount = counts[profile];
            finalProfileKey = profile;
          }
        }
        onComplete(newAnswerIndexes, finalProfileKey);
      }
  };

  const handleAnswer = (answerIndex: number) => {
    trackFunnelStep(`answer_question_${currentQuestionIndex + 1}`, {
      question: quizQuestions[currentQuestionIndex].question,
      answer: quizQuestions[currentQuestionIndex].options[answerIndex],
    });

    const newAnswerIndexes = [...answerIndexes, answerIndex];
    setAnswerIndexes(newAnswerIndexes);
    
    // Auto-advance immediately
    setIsAnimatingOut(true);
    setTimeout(() => {
      advanceToNext(newAnswerIndexes);
    }, 300); // matches fade-out duration
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <Card className={cn(
        "w-full max-w-2xl shadow-2xl shadow-primary/20 rounded-2xl border border-primary/30 bg-card/60 backdrop-blur-xl backdrop-saturate-150",
        "animate-fade-in-up",
        isAnimatingOut && "animate-fade-out-up"
    )}>
      <CardHeader className="p-4 sm:p-6">
        <Progress value={progress} className="w-full h-2 mb-4" />
        <p className="text-sm font-medium text-primary mb-2">
          Pergunta {currentQuestionIndex + 1} de {quizQuestions.length}
        </p>
        <CardTitle className="text-lg sm:text-2xl font-bold leading-tight">
          {currentQuestion.question}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <div className="grid grid-cols-1 gap-3">
          {currentQuestion.options.map((option, index) => (
            <Button
              key={`${currentQuestion.id}-${index}`} // Use a more stable key
              variant="outline"
              size="lg"
              className={cn(
                "text-left justify-start h-auto py-4 px-4 sm:py-3 whitespace-normal text-base sm:text-sm transition-all duration-200 border-primary/20 hover:border-primary/50",
                'bg-primary/5 hover:bg-primary/10'
              )}
              onClick={() => handleAnswer(index)}
            >
              {option}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
