'use client';

import type { ResultProfile } from '@/app/page';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { MoveRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

// --- Ícones SVG embutidos como componentes React ---

const IconDisperso = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 18V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M22 12H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M6 12H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M4.92993 4.92993L7.75993 7.75993" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M19.07 4.92993L16.24 7.75993" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M7.75993 16.24L4.92993 19.07" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M15 9L18 6M18 6H15M18 6V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeJoin="round"/>
    <path d="M9 15L6 18M6 18H9M6 18V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeJoin="round"/>
  </svg>
);

const IconAnsioso = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeJoin="round"/>
    <path d="M15.5 8.5C15.5 8.5 17 7 19 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8.5 8.5C8.5 8.5 7 7 5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M15.5 15.5C15.5 15.5 17 17 19 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8.5 15.5C8.5 15.5 7 17 5 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="12" r="1" fill="currentColor"/>
  </svg>
);

const IconExausto = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M3 7C3 5.89543 3.89543 5 5 5H17C18.1046 5 19 5.89543 19 7V17C19 18.1046 18.1046 19 17 19H5C3.89543 19 3 18.1046 3 17V7Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M22 10V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="6" y="8" width="4" height="8" rx="1" fill="currentColor" fillOpacity="0.5" stroke="currentColor"/>
        <path d="M13 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5"/>
    </svg>
);

const IconTravado = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="16" r="1" fill="currentColor"/>
    <path d="M3 14H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M19 14H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);


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
        "bg-card/60 backdrop-blur-xl backdrop-saturate-150",
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
