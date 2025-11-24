'use client';

import { useState, useEffect } from 'react';
import { quizQuestions } from '@/lib/quiz-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface QuizProps {
  onComplete: (answers: string[]) => void;
}

export default function Quiz({ onComplete }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setProgress(((currentQuestionIndex) / quizQuestions.length) * 100);
  }, [currentQuestionIndex]);

  const handleAnswer = (answer: string) => {
    if (isAnimating) return;

    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    setIsAnimating(true);

    setTimeout(() => {
        if (currentQuestionIndex < quizQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setIsAnimating(false);
          } else {
            onComplete(newAnswers);
          }
    }, 300)
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <Card className="w-full max-w-3xl animate-fade-in shadow-2xl shadow-primary/10">
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
              className="text-left justify-start h-auto py-4 whitespace-normal text-base transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:border-primary focus:bg-accent focus:text-accent-foreground focus:border-primary"
              onClick={() => handleAnswer(option)}
            >
              {option}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
