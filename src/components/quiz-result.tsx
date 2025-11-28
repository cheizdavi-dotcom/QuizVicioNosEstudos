'use client';

import type { ResultProfile } from '@/app/page';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { MoveRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

import IconDisperso from './icons/IconDisperso';
import IconAnsioso from './icons/IconAnsioso';
import IconExausto from './icons/IconExausto';
import IconTravado from './icons/IconTravado';

interface QuizResultProps {
  result: ResultProfile;
  resultKey: string;
  onRestart: () => void;
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

const resultConfig = {
  "O Disperso": {
    icon: IconDisperso,
  },
  "O Ansioso Acumulador": {
    icon: IconAnsioso,
  },
  "O Exausto Mental": {
    icon: IconExausto,
  },
  "O Travado Perfeccionista": {
    icon: IconTravado,
  },
};

export default function QuizResult({ result, resultKey, onRestart }: QuizResultProps) {
  const { title, diagnosis, ponteParaSolucao, cta } = result;
  
  const config = resultConfig[resultKey as keyof typeof resultConfig] || resultConfig["O Disperso"];
  const ResultIcon = config.icon;

  return (
    <Card className={cn(
        "w-full max-w-2xl animate-fade-in-up",
        "bg-card/60 backdrop-blur-xl",
        "border border-primary/30 rounded-2xl",
        "shadow-2xl shadow-primary/20"
      )}>
      <CardHeader className="items-center text-center p-6 sm:p-10">
        <div className="result-icon-container filter drop-shadow-[0_0_8px_rgba(57,255,20,0.6)] animate-scale-in mb-4 sm:mb-6">
          <ResultIcon className="w-16 h-16 sm:w-20 sm:h-20 text-primary" />
        </div>
        <p className="text-sm sm:text-base text-primary font-medium">Resultado encontrado!</p>
        <h1 className="text-xl sm:text-3xl font-bold mt-1 text-center text-foreground">
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
              <a href="https://www.viciadonosestudos.site/" target="_blank" rel="noopener noreferrer">
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
