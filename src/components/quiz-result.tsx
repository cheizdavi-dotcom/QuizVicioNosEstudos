import type { PersonalizedQuizResultOutput } from '@/ai/flows/generate-personalized-quiz-result';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, MoveRight } from 'lucide-react';

interface QuizResultProps {
  result: PersonalizedQuizResultOutput;
  onRestart: () => void;
}

export default function QuizResult({ result, onRestart }: QuizResultProps) {
  const { title, diagnosis, keyTakeaway, opportunity, cta } = result;

  const cleanText = (text: string, prefixRegex: RegExp) => {
    return text.replace(prefixRegex, '').replace(/"/g, '').trim();
  }

  const cleanTitle = cleanText(title, /^Title:\s*🔥 Seu Perfil:\s*/i);
  const cleanDiagnosis = cleanText(diagnosis, /^Diagnosis:\s*|Diagnóstico:\s*/i);
  const cleanKeyTakeaway = cleanText(keyTakeaway, /^Key Takeaway:\s*|Virada de chave:\s*/i);
  const cleanOpportunity = cleanText(opportunity, /^Opportunity:\s*|Oportunidade:\s*/i);
  const cleanCta = cleanText(cta, /^CTA:\s*👉\s*/i);

  return (
    <Card className="w-full max-w-3xl animate-fade-in shadow-2xl shadow-primary/10">
      <CardHeader className="items-center text-center p-6 md:p-8">
        <CheckCircle2 className="w-16 h-16 text-primary mb-4" />
        <p className="text-primary font-bold">Seu Diagnóstico Está Pronto!</p>
        <CardTitle className="text-3xl md:text-4xl font-extrabold mt-2 text-center">
         🔥 Seu Perfil: "{cleanTitle}"
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 md:px-8 space-y-6 text-lg">
        <div className="p-6 bg-secondary/50 rounded-lg border">
            <p className="font-semibold text-foreground mb-2">Diagnóstico:</p>
            <p className="text-muted-foreground">{cleanDiagnosis}</p>
        </div>
        <div className="p-6 bg-secondary/50 rounded-lg border">
            <p className="font-semibold text-foreground mb-2">Virada de Chave:</p>
            <p className="text-muted-foreground">{cleanKeyTakeaway}</p>
        </div>
        <div className="p-6 bg-primary/10 border border-primary/20 rounded-lg">
            <p className="font-semibold text-primary mb-2">Oportunidade:</p>
            <p className="text-foreground">{cleanOpportunity}</p>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-4 p-6 md:p-8">
        <Button asChild size="lg" className="w-full text-lg font-bold group animate-pulse">
          <a href="#">
            {cleanCta}
            <MoveRight className="ml-2 transition-transform group-hover:translate-x-1" />
          </a>
        </Button>
        <Button variant="link" onClick={onRestart} className="text-muted-foreground">Fazer o quiz novamente</Button>
      </CardFooter>
    </Card>
  );
}
