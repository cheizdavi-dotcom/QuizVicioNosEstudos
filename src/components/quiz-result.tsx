import type { ResultProfile } from '@/app/page';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, MoveRight } from 'lucide-react';

interface QuizResultProps {
  result: ResultProfile;
  onRestart: () => void;
}

export default function QuizResult({ result, onRestart }: QuizResultProps) {
  const { title, diagnosis, cta } = result;

  const stories: Record<string, string> = {
    "O Procrastinador Crônico": "Como muitos, você se vê preso na areia movediça da procrastinação. A intenção de estudar está lá, mas a ação nunca chega. Cada 'amanhã eu faço' alimenta um ciclo de culpa e frustração, mas a boa notícia é que seu cérebro está apenas seguindo um padrão aprendido — um padrão que pode ser reescrito.",
    "O Estudante Inconstante": "Você tem picos de produtividade, mas eles são como tempestades de verão: intensos e passageiros. A consistência parece um objetivo distante, não por falta de capacidade, mas por falta de um sistema que sustente seu esforço nos dias em que a motivação não aparece.",
    "Focado, mas Bloqueado": "Sua mente sabe o que fazer, mas suas emoções montam uma barreira. A ansiedade sussurra dúvidas, o cansaço pesa nos ombros e a autocobrança transforma o estudo em um campo de batalha. Você está a um passo da fluidez, precisando apenas da chave para destravar seu cadeado emocional.",
    "Quase Viciado em Estudar": "Você já sente o prazer do aprendizado e a satisfação do dever cumprido. O motor está ligado e funcionando, mas ainda engasga de vez em quando. Falta apenas o ajuste fino, a estrutura que transforma seu bom desempenho em um hábito inabalável, um verdadeiro vício em evoluir.",
  }

  return (
    <Card className="w-full max-w-3xl animate-fade-in-up shadow-2xl shadow-primary/20">
      <CardHeader className="items-center text-center p-6 md:p-8">
        <CheckCircle2 className="w-14 h-14 sm:w-16 sm:h-16 text-primary mb-4 animate-scale-in" />
        <p className="text-primary font-bold">Resultado encontrado!</p>
        <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-extrabold mt-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-400">
         🔥 Seu Perfil: "{title}"
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 md:px-8 space-y-4 sm:space-y-6">
        <div className="p-4 sm:p-6 bg-secondary/30 rounded-lg border border-secondary">
            <p className="italic text-muted-foreground leading-relaxed">"{stories[title]}"</p>
        </div>
        <div className="p-4 sm:p-6 bg-secondary/50 rounded-lg border">
            <p className="font-semibold text-foreground mb-2">Diagnóstico Detalhado:</p>
            <p className="text-muted-foreground">{diagnosis}</p>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-4 p-6 md:p-8">
        <Button asChild size="lg" className="w-full text-base sm:text-lg font-bold group animate-pulse">
          <a href="#">
            {cta}
            <MoveRight className="ml-2 transition-transform group-hover:translate-x-1" />
          </a>
        </Button>
        <p className="text-xs text-muted-foreground mt-2">Disponível apenas para quem completou o diagnóstico.</p>
        <Button variant="link" onClick={onRestart} className="text-muted-foreground">Fazer o quiz novamente</Button>
      </CardFooter>
    </Card>
  );
}
