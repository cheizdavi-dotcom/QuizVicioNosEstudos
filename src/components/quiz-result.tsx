import type { ResultProfile } from '@/app/page';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Brain, CheckCircle2, AlertTriangle, Lightbulb, MoveRight, Zap, Target } from 'lucide-react';

interface QuizResultProps {
  result: ResultProfile;
  onRestart: () => void;
}

const icons: Record<string, React.ElementType> = {
  "Focado(a), mas Bloqueado(a)": Brain,
  "Foco Fragmentado": Zap,
  "Energia Baixa Mental": Lightbulb,
  "Ativo(a), mas Desorganizado(a)": Target,
}


export default function QuizResult({ result, onRestart }: QuizResultProps) {
  const { title, diagnosis, pontoCritico, acaoAcreditavel, solucaoAcreditavel, cta } = result;

  const ResultIcon = icons[title] || Brain;


  return (
    <Card className="w-full max-w-2xl animate-fade-in-up bg-[#09090B] border-zinc-800 shadow-2xl shadow-primary/10">
      <CardHeader className="items-center text-center p-6">
        <div className="relative">
          <CheckCircle2 className="w-16 h-16 text-primary animate-scale-in" />
          <div className="absolute inset-0 -z-10 bg-primary/40 blur-2xl rounded-full animate-pulse"></div>
        </div>
        <p className="text-sm text-muted-foreground mt-4">Resultado encontrado!</p>
        <h1 className="text-2xl sm:text-3xl font-extrabold mt-1 text-center" style={{ color: '#CCFDC8' }}>
         Seu Perfil: {title}
        </h1>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 space-y-4">
        
        <div className="p-4 sm:p-6 bg-zinc-900/50 rounded-lg border border-zinc-800 space-y-4 shadow-inner-strong animate-fade-in-up [animation-delay:200ms]">
            <div>
              <p className="font-semibold text-base text-foreground mb-3">Diagnóstico:</p>
              <ul className="space-y-2">
                {diagnosis.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-3 mt-1 text-lg">•</span>
                      <p className="text-muted-foreground text-sm leading-relaxed">{point}</p>
                    </li>
                ))}
              </ul>
            </div>
             
            <div className="border-t border-zinc-700/50"></div>

            <div className="flex items-start gap-3">
               <AlertTriangle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
               <div>
                  <h3 className="font-bold text-base text-foreground mb-1">Ponto Crítico</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{pontoCritico}</p>
               </div>
            </div>
        </div>

        <div className="relative p-4 sm:p-6 bg-[#0E0F12] rounded-lg border border-primary/20 shadow-lg shadow-primary/5 animate-fade-in-up [animation-delay:400ms]">
            <div className="flex items-start gap-3">
              <ResultIcon className="w-6 h-6 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-base text-foreground mb-2">Ação Acreditável</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{acaoAcreditavel}</p>
                <div className="border-t border-zinc-700/50 my-3"></div>
                <h3 className="font-bold text-base text-foreground mb-2">Solução Acreditável</h3>
                <p className="text-muted-foreground font-semibold text-sm leading-relaxed">{solucaoAcreditavel}</p>
              </div>
            </div>
        </div>

      </CardContent>
      <CardFooter className="flex-col gap-4 p-4 sm:p-6 pt-2">
        <div className="relative w-full my-4">
            <Button asChild size="lg" className="w-full h-12 text-base font-bold group bg-gradient-to-t from-primary/80 to-primary text-primary-foreground transition-transform hover:scale-105">
              <a href="https://quiz.cakto.com.br/preview/viciado-em-estudar-WVehoO">
                {cta}
                <MoveRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <div className="absolute inset-0 -z-10 bg-primary/30 blur-xl rounded-full animate-pulse"></div>
        </div>
        <p className="text-xs italic text-[#7D7D7D]">Disponível apenas para quem completou o diagnóstico.</p>
        <Button variant="link" onClick={onRestart} className="mt-2 text-sm text-[#8AFF9A] hover:text-primary hover:no-underline underline-offset-4 decoration-from-font">Fazer o quiz novamente</Button>
      </CardFooter>
    </Card>
  );
}
