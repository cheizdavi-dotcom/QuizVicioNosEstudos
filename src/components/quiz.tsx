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
    
    setTimeout(() => {
      const newAnswerIndexes = [...answerIndexes, answerIndex];
      setAnswerIndexes(newAnswerIndexes);
      setIsAnimatingOut(true);

      setTimeout(() => {
        if (currentQuestionIndex < quizQuestions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedAnswer(null);
          setIsAnimatingOut(false);
        } else {
          onComplete(newAnswerIndexes);
        }
      }, 350); // duration of the out animation
    }, 200); // Visual feedback duration
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <Card className={cn(
        "w-full max-w-3xl shadow-2xl shadow-primary/10",
        "animate-fade-in-up",
        isAnimatingOut && "animate-fade-out-up"
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
                  ? 'bg-green-500/80 border-green-400 text-white' // Feedback visual verde
                  : 'hover:bg-accent hover:text-accent-foreground'
              )}
              onClick={() => handleAnswer(index)}
              disabled={isAnimatingOut || selectedAnswer !== null}
            >
              {option}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
