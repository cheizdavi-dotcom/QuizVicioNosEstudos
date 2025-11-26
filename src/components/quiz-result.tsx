'use client';

import type { ResultProfile } from '@/app/page';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { MoveRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

interface QuizResultProps {
  result: ResultProfile;
  resultKey: string;
  onRestart: () => void;
}

const ResultIcon = ({ resultKey }: { resultKey: string }) => {
    const iconProps = {
        className: "w-16 h-16 sm:w-20 sm:h-20 text-primary",
        strokeWidth: 1.5,
    };
    
    switch (resultKey) {
        case "O Disperso":
            return (
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...iconProps}>
                  <path d="M12 2V6" stroke="currentColor" strokeLinecap="round"/>
                  <path d="M12 18V22" stroke="currentColor" strokeLinecap="round"/>
                  <path d="M22 12H18" stroke="currentColor" strokeLinecap="round"/>
                  <path d="M6 12H2" stroke="currentColor" strokeLinecap="round"/>
                  <path d="M4.92993 4.92993L7.75993 7.75993" stroke="currentColor" strokeLinecap="round"/>
                  <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" strokeLinecap="round"/>
                  <path d="M19.07 4.92993L16.24 7.75993" stroke="currentColor" strokeLinecap="round"/>
                  <path d="M7.75993 16.24L4.92993 19.07" stroke="currentColor" strokeLinecap="round"/>
                  <circle cx="12" cy="12" r="3" stroke="currentColor" />
                  <path d="M15 9L18 6M18 6H15M18 6V9" stroke="currentColor" strokeLinecap="round" strokeJoin="round"/>
                  <path d="M9 15L6 18M6 18H9M6 18V15" stroke="currentColor" strokeLinecap="round" strokeJoin="round"/>
                </svg>
            );
        case "O Ansioso Acumulador":
            return (
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...iconProps}>
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeLinecap="round"/>
                  <path d="M12 6V12L16 14" stroke="currentColor" strokeLinecap="round" strokeJoin="round"/>
                  <path d="M15.5 8.5C15.5 8.5 17 7 19 7" stroke="currentColor" strokeLinecap="round"/>
                  <path d="M8.5 8.5C8.5 8.5 7 7 5 7" stroke="currentColor" strokeLinecap="round"/>
                  <path d="M15.5 15.5C15.5 15.5 17 17 19 17" stroke="currentColor" strokeLinecap="round"/>
                  <path d="M8.5 15.5C8.5 15.5 7 17 5 17" stroke="currentColor" strokeLinecap="round"/>
                  <circle cx="12" cy="12" r="1" fill="currentColor"/>
                </svg>
            );
        case "O Exausto Mental":
            return (
                 <svg {...iconProps} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5 4.5C5.08 4.5 2.5 8.31 2.5 13.5C2.5 18.69 5.08 22.5 9.5 22.5C13.92 22.5 16.5 18.69 16.5 13.5C16.5 9.41 14.7 6.44 11.5 4.96" stroke="currentColor" strokeOpacity="0.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14.5 19.5C18.92 19.5 21.5 15.69 21.5 10.5C21.5 5.31 18.92 1.5 14.5 1.5C10.08 1.5 7.5 5.31 7.5 10.5C7.5 14.59 9.3 17.56 12.5 19.04" stroke="currentColor" strokeOpacity="0.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="17" y="9" width="5" height="2.5" rx="1" stroke="currentColor" strokeOpacity="0.5" />
                    <path d="M3 13H7L9 11L11 15L13 13" stroke="currentColor" strokeOpacity="0.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            );
        case "O Travado Perfeccionista":
            return (
                <svg {...iconProps} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5 4.5C5.08 4.5 2.5 8.31 2.5 13.5C2.5 18.69 5.08 22.5 9.5 22.5C13.92 22.5 16.5 18.69 16.5 13.5C16.5 9.41 14.7 6.44 11.5 4.96" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14.5 19.5C18.92 19.5 21.5 15.69 21.5 10.5C21.5 5.31 18.92 1.5 14.5 1.5C10.08 1.5 7.5 5.31 7.5 10.5C7.5 14.59 9.3 17.56 12.5 19.04" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3"/>
                </svg>
            );
        default:
            return null;
    }
}

const HighlightedText = ({ text }: { text: string }) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return (
        <>
            {parts.map((part, index) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={index} className="font-semibold text-primary">{part.slice(2, -2)}</strong>;
                }
                return part;
            })}
        </>
    );
};

export default function QuizResult({ result, resultKey, onRestart }: QuizResultProps) {
  const { title, diagnosis, ponteParaSolucao, cta } = result;

  return (
    <Card className={cn(
        "w-full max-w-2xl animate-fade-in-up",
        "bg-[rgba(255,255,255,0.03)] backdrop-blur-lg",
        "border border-primary/30 rounded-2xl",
        "shadow-2xl shadow-primary/10 [box-shadow:0_0_20px_rgba(57,255,20,0.1),_inset_0_0_10px_rgba(57,255,20,0.05)]"
      )}>
      <CardHeader className="items-center text-center p-6 sm:p-10">
        <div className="result-icon-container filter drop-shadow-[0_0_8px_rgba(57,255,20,0.6)] animate-scale-in mb-4 sm:mb-6">
          <ResultIcon resultKey={resultKey} />
        </div>
        <p className="text-sm sm:text-base text-primary font-medium">Resultado encontrado!</p>
        <h1 className="text-2xl sm:text-3xl font-bold mt-1 text-center text-foreground">
         {title}
        </h1>
      </CardHeader>
      <CardContent className="px-6 sm:px-10 space-y-4">
        
        <div className="space-y-3 text-left">
          {diagnosis.map((point, index) => (
              <p key={index} className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  <HighlightedText text={point} />
              </p>
          ))}
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed pt-2">
            <HighlightedText text={ponteParaSolucao} />
          </p>
        </div>

      </CardContent>
      <CardFooter className="flex-col gap-4 p-6 sm:p-10 pt-6">
        <div className="w-full">
            <Button asChild size="lg" className="w-full h-14 text-base font-bold group text-black bg-gradient-to-b from-primary to-[#2eb312] hover:from-primary/90 hover:to-[#28a010] transition-all duration-300 ease-in-out hover:shadow-primary/60 shadow-lg shadow-primary/40 hover:-translate-y-0.5">
              <a href="https://quiz.cakto.com.br/preview/viciado-em-estudar-WVehoO">
                {cta}
                <MoveRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
        </div>
        <Button variant="link" onClick={onRestart} className="mt-2 text-sm text-primary/80 hover:text-primary hover:no-underline underline-offset-4 decoration-from-font">Fazer o quiz novamente</Button>
      </CardFooter>
    </Card>
  );
}
