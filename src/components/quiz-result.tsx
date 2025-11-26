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
        className: "w-16 h-16 text-primary",
        strokeWidth: 1.5,
    };
    
    switch (resultKey) {
        case "O Disperso":
            return (
                <svg {...iconProps} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5 4.5C5.08 4.5 2.5 8.31 2.5 13.5C2.5 18.69 5.08 22.5 9.5 22.5C13.92 22.5 16.5 18.69 16.5 13.5C16.5 9.41 14.7 6.44 11.5 4.96" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14.5 19.5C18.92 19.5 21.5 15.69 21.5 10.5C21.5 5.31 18.92 1.5 14.5 1.5C10.08 1.5 7.5 5.31 7.5 10.5C7.5 14.59 9.3 17.56 12.5 19.04" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15 4L14 2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19 8L21 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M20 13L22 14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 3L7 1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4 7L2 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            );
        case "O Ansioso Acumulador":
            return (
                <svg {...iconProps} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5 4.5C5.08 4.5 2.5 8.31 2.5 13.5C2.5 18.69 5.08 22.5 9.5 22.5C13.92 22.5 16.5 18.69 16.5 13.5C16.5 9.41 14.7 6.44 11.5 4.96" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14.5 19.5C18.92 19.5 21.5 15.69 21.5 10.5C21.5 5.31 18.92 1.5 14.5 1.5C10.08 1.5 7.5 5.31 7.5 10.5C7.5 14.59 9.3 17.56 12.5 19.04" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 12L10 14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 10L12 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 12L14 14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 10L12 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15 5L17 3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19 9L21 8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 5L7 3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5 9L3 8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            );
        case "O Exausto Mental":
            return (
                 <svg {...iconProps} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5 4.5C5.08 4.5 2.5 8.31 2.5 13.5C2.5 18.69 5.08 22.5 9.5 22.5C13.92 22.5 16.5 18.69 16.5 13.5C16.5 9.41 14.7 6.44 11.5 4.96" stroke="currentColor" stroke-opacity="0.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M14.5 19.5C18.92 19.5 21.5 15.69 21.5 10.5C21.5 5.31 18.92 1.5 14.5 1.5C10.08 1.5 7.5 5.31 7.5 10.5C7.5 14.59 9.3 17.56 12.5 19.04" stroke="currentColor" stroke-opacity="0.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <rect x="17" y="9" width="5" height="2.5" rx="1" stroke="currentColor" stroke-opacity="0.5" />
                    <path d="M3 13H7L9 11L11 15L13 13" stroke="currentColor" stroke-opacity="0.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            );
        case "O Travado Perfeccionista":
            return (
                <svg {...iconProps} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5 4.5C5.08 4.5 2.5 8.31 2.5 13.5C2.5 18.69 5.08 22.5 9.5 22.5C13.92 22.5 16.5 18.69 16.5 13.5C16.5 9.41 14.7 6.44 11.5 4.96" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14.5 19.5C18.92 19.5 21.5 15.69 21.5 10.5C21.5 5.31 18.92 1.5 14.5 1.5C10.08 1.5 7.5 5.31 7.5 10.5C7.5 14.59 9.3 17.56 12.5 19.04" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 3"/>
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
        <div className="result-icon-container filter drop-shadow-[0_0_8px_rgba(57,255,20,0.6)] animate-scale-in">
          <ResultIcon resultKey={resultKey} />
        </div>
        <p className="text-sm text-primary mt-4 font-medium">Resultado encontrado!</p>
        <h1 className="text-2xl sm:text-3xl font-bold mt-1 text-center text-foreground">
         {title}
        </h1>
      </CardHeader>
      <CardContent className="px-4 sm:px-10 space-y-4">
        
        <div className="space-y-3 text-left">
          {diagnosis.map((point, index) => (
              <p key={index} className="text-muted-foreground text-base leading-relaxed">
                  <HighlightedText text={point} />
              </p>
          ))}
          <p className="text-muted-foreground text-base leading-relaxed pt-2">
            <HighlightedText text={ponteParaSolucao} />
          </p>
        </div>

      </CardContent>
      <CardFooter className="flex-col gap-4 p-4 sm:p-10 pt-6">
        <div className="w-full">
            <Button asChild size="lg" className="w-full h-14 text-base font-bold group text-black bg-gradient-to-b from-primary to-[#2eb312] hover:from-primary/90 hover:to-[#28a010] transition-all duration-300 ease-in-out hover:shadow-primary/60 shadow-lg shadow-primary/40 hover:-translate-y-0.5">
              <a href="https://quiz.cakto.com.br/preview/viciado-em-estudar-WVehoO">
                {cta}
                <MoveRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
        </div>
        <Button variant="link" onClick={onRestart} className="mt-4 text-sm text-primary/80 hover:text-primary hover:no-underline underline-offset-4 decoration-from-font">Fazer o quiz novamente</Button>
      </CardFooter>
    </Card>
  );
}
