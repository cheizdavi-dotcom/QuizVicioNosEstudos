import type { ResultProfile } from '@/app/page';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Brain, CheckCircle2, Lightbulb, MoveRight, Quote } from 'lucide-react';

interface QuizResultProps {
  result: ResultProfile;
  onRestart: () => void;
}

export default function QuizResult({ result, onRestart }: QuizResultProps) {
  const { title, diagnosis, cta } = result;

  const stories: Record<string, string> = {
    "Procrastinador Crônico": "Como muitos, você se vê preso na areia movediça da procrastinação. A intenção de estudar está lá, mas a ação nunca chega. Cada 'amanhã eu faço' alimenta um ciclo de culpa e frustração, mas a boa notícia é que seu cérebro está apenas seguindo um padrão aprendido — um padrão que pode ser reescrito.",
    "Estudante Inconstante": "Você tem picos de produtividade, mas eles são como tempestades de verão: intensos e passageiros. A consistência parece um objetivo distante, não por falta de capacidade, mas por falta de um sistema que sustente seu esforço nos dias em que a motivação não aparece.",
    "Focado, mas Bloqueado": "Sua mente sabe o que fazer, mas suas emoções montam uma barreira. A ansiedade sussurra dúvidas, o cansaço pesa nos ombros e a autocobrança transforma o estudo em um campo de batalha. Você está a um passo da fluidez, precisando apenas da chave para destravar seu cadeado emocional.",
    "Quase Viciado em Estudar": "Você já sente o prazer do aprendizado e a satisfação do dever cumprido. O motor está ligado e funcionando, mas ainda engasga de vez em quando. Falta apenas o ajuste fino, a estrutura que transforma seu bom desempenho em um hábito inabalável, um verdadeiro vício em evoluir.",
  }

  const diagnosisPoints = diagnosis.split('\n').filter(p => p.trim() !== '');

  return (
    <Card className="w-full max-w-3xl animate-fade-in-up bg-[#09090B] border-zinc-800 shadow-2xl shadow-primary/10">
      <CardHeader className="items-center text-center p-6">
        <div className="relative">
          <CheckCircle2 className="w-16 h-16 sm:w-20 sm:h-20 text-primary animate-scale-in" />
          <div className="absolute inset-0 -z-10 bg-primary/40 blur-2xl rounded-full animate-pulse"></div>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground mt-4">Resultado encontrado!</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold mt-2 text-center" style={{ color: '#CCFDC8' }}>
         Seu Perfil: {title}
        </h1>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 space-y-6">
        
        <div className="relative p-6 bg-[#0E0F12] rounded-lg border border-primary/20 animate-fade-in-up [animation-delay:200ms]">
            <Quote className="absolute top-4 left-4 w-6 h-6 sm:w-8 sm:h-8 text-primary/30 -translate-x-1 -translate-y-1" />
            <p className="italic font-medium text-muted-foreground leading-relaxed text-center text-sm sm:text-base">"{stories[title]}"</p>
        </div>

        <div className="p-6 bg-zinc-900/50 rounded-lg border border-zinc-800 space-y-6 shadow-inner-strong animate-fade-in-up [animation-delay:400ms]">
            <div>
              <p className="font-semibold text-base sm:text-lg text-foreground mb-4">Diagnóstico:</p>
              <ul className="space-y-3">
                {diagnosisPoints.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-3 mt-1 text-lg">•</span>
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{point}</p>
                    </li>
                ))}
              </ul>
            </div>
             
             <div className="border-t border-zinc-700/50 my-4"></div>

            <div className="relative p-6 bg-[#0E0F12] rounded-lg border border-primary/20 shadow-lg shadow-primary/5">
                <div className="flex items-start gap-4">
                  <Lightbulb className="w-10 h-10 sm:w-6 sm:h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-foreground mb-2">A Única Crença</h3>
                    <p className="text-muted-foreground font-semibold text-sm sm:text-base leading-relaxed">Ativar os gatilhos neurológicos de foco é a chave para estudar com disciplina — e a melhor forma de fazer isso é com o Método Viciado em Estudar.</p>
                  </div>
                </div>
            </div>
        </div>

      </CardContent>
      <CardFooter className="flex-col gap-4 p-6 pt-4">
        <div className="relative w-full my-4">
            <Button asChild size="lg" className="w-full h-14 text-base sm:text-lg font-bold group bg-gradient-to-t from-primary/80 to-primary text-primary-foreground transition-transform hover:scale-105">
              <a href="#">
                {cta}
                <MoveRight className="ml-3 transition-transform group-hover:translate-x-1.5" />
              </a>
            </Button>
            <div className="absolute inset-0 -z-10 bg-primary/30 blur-xl rounded-full animate-pulse"></div>
        </div>
        <p className="text-xs italic text-[#7D7D7D]">Disponível apenas para quem completou o diagnóstico.</p>
        <Button variant="link" onClick={onRestart} className="mt-4 text-[#8AFF9A] hover:text-primary hover:no-underline underline-offset-4 decoration-from-font">Fazer o quiz novamente</Button>
      </CardFooter>
    </Card>
  );
}
