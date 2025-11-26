import type { ResultProfile } from '@/app/page';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { CheckCircle2, MoveRight } from 'lucide-react';

interface QuizResultProps {
  result: ResultProfile;
  onRestart: () => void;
}

export default function QuizResult({ result, onRestart }: QuizResultProps) {
  const { title, diagnosis, cta } = result;

  return (
    <Card className="w-full max-w-2xl animate-fade-in-up bg-[#09090B] border-zinc-800 shadow-2xl shadow-primary/10">
      <CardHeader className="items-center text-center p-6">
        <div className="relative">
          <CheckCircle2 className="w-16 h-16 text-primary animate-scale-in" />
          <div className="absolute inset-0 -z-10 bg-primary/40 blur-2xl rounded-full animate-pulse"></div>
        </div>
        <p className="text-sm text-muted-foreground mt-4">Resultado encontrado!</p>
        <h1 className="text-2xl sm:text-3xl font-extrabold mt-1 text-center text-foreground">
         {title}
        </h1>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 space-y-4">
        
        <div className="p-4 sm:p-6 bg-zinc-900/50 rounded-lg border border-zinc-800 space-y-4 shadow-inner-strong animate-fade-in-up [animation-delay:200ms]">
          <ul className="space-y-3">
            {diagnosis.map((point, index) => (
                <li key={index} className="text-muted-foreground text-sm leading-relaxed">{point}</li>
            ))}
          </ul>
        </div>

      </CardContent>
      <CardFooter className="flex-col gap-4 p-4 sm:p-6 pt-2">
        <div className="text-center w-full my-4">
           <h2 className="text-xl sm:text-2xl font-bold text-foreground">A Solução Para o Seu Padrão</h2>
           <p className="text-muted-foreground text-sm mt-2 max-w-md mx-auto">O Método Viciado em Estudar é o caminho para reprogramar seu cérebro, destravar o foco e construir uma disciplina que funciona para você.</p>
        </div>
        <div className="relative w-full">
            <Button asChild size="lg" className="w-full h-12 text-base font-bold group bg-gradient-to-t from-primary/80 to-primary text-primary-foreground transition-transform hover:scale-105">
              <a href="https://quiz.cakto.com.br/preview/viciado-em-estudar-WVehoO">
                {cta}
                <MoveRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <div className="absolute inset-0 -z-10 bg-primary/30 blur-xl rounded-full animate-pulse"></div>
        </div>
        <Button variant="link" onClick={onRestart} className="mt-2 text-sm text-primary/80 hover:text-primary hover:no-underline underline-offset-4 decoration-from-font">Fazer o quiz novamente</Button>
      </CardFooter>
    </Card>
  );
}
