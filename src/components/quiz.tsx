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

  const handleAnswer = (answerIndex: number) => {
    if (isAnimatingOut) return;

    setSelectedAnswer(answerIndex);
    const newAnswerIndexes = [...answerIndexes, answerIndex];
    setAnswerIndexes(newAnswerIndexes);
    setIsAnimatingOut(true);

    // Feedback visual de 150ms
    setTimeout(() => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null); // Limpa a seleção
        setIsAnimatingOut(false);
      } else {
        onComplete(newAnswerIndexes);
      }
    }, 150);
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <Card className={cn(
        "w-full max-w-3xl shadow-2xl shadow-primary/10 transition-opacity duration-300",
        isAnimatingOut ? "opacity-0" : "opacity-100"
    )}>
      <CardHeader className="p-6 md:p-8">
        <Progress value={progress} className="w-full h-2 mb-6" />
        <p className="text-sm font-medium text-primary mb-2">
          Pergunta {currentQuestionIndex + 1} de {quizQuestions.length}
        </p>
        <CardTitle className="text-2xl md:text-3xl font-bold leading-tight">
          {currentQuestion.question}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 md:p-8 pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQuestion.options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              size="lg"
              className={cn(
                "text-left justify-start h-auto py-4 whitespace-normal text-base transition-colors duration-150",
                selectedAnswer === index
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent hover:text-accent-foreground'
              )}
              onClick={() => handleAnswer(index)}
              disabled={isAnimatingOut}
            >
              {option}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
