'use client';

import { useState, useEffect } from 'react';
import { quizQuestions } from '@/lib/quiz-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface QuizProps {
  onComplete: (answerIndexes: number[]) => void;
}

export default function Quiz({ onComplete }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answerIndexes, setAnswerIndexes] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  useEffect(() => {
    setProgress(((currentQuestionIndex) / quizQuestions.length) * 100);
  }, [currentQuestionIndex]);

  const advanceToNext = (newAnswerIndexes: number[]) => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setSelectedAnswer(null); // Reset selection
        setIsAnimatingOut(false);
      } else {
        onComplete(newAnswerIndexes);
      }
  };

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);
    const newAnswerIndexes = [...answerIndexes, answerIndex];
    setAnswerIndexes(newAnswerIndexes);
    
    // Auto-advance after a short delay
    setTimeout(() => {
      setIsAnimatingOut(true);
      setTimeout(() => {
        advanceToNext(newAnswerIndexes);
      }, 300); // matches fade-out duration
    }, 500); // Short delay to show selection
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <Card className={cn(
        "w-full max-w-2xl shadow-2xl shadow-primary/10",
        "animate-fade-in-up",
        isAnimatingOut && "animate-fade-out-up"
    )}>
      <CardHeader className="p-4 sm:p-6">
        <Progress value={progress} className="w-full h-2 mb-4" />
        <p className="text-sm font-medium text-primary mb-2">
          Pergunta {currentQuestionIndex + 1} de {quizQuestions.length}
        </p>
        <CardTitle className="text-lg font-bold leading-tight sm:text-2xl">
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
                "text-left justify-start h-auto py-3 whitespace-normal text-sm sm:text-base transition-colors duration-150",
                selectedAnswer === index
                  ? 'bg-primary border-primary/50 text-primary-foreground'
                  : 'hover:bg-accent hover:text-accent-foreground'
              )}
              onClick={() => handleAnswer(index)}
              disabled={selectedAnswer !== null}
            >
              {option}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
