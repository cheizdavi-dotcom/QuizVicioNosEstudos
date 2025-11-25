'use client';

import { useState } from 'react';
import Image from 'next/image';
import Quiz from '@/components/quiz';
import QuizResult from '@/components/quiz-result';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit } from 'lucide-react';
import AnalyzingScreen from '@/components/analyzing-screen';

export type ResultProfile = {
  title: string;
  diagnosis: string[];
  pontoCritico: string;
  acaoAcreditavel: string;
  solucaoAcreditavel: string;
  cta: string;
};

const resultProfiles: Record<string, ResultProfile> = {
  "Focado(a), mas Bloqueado(a)": {
    title: "Focado(a), mas Bloqueado(a)",
    diagnosis: [
      "Seu cérebro entra em hiperalerta quando tenta focar.",
      "Você sabe o que fazer, mas a ansiedade cria micro-bloqueios que drenam sua energia."
    ],
    pontoCritico: "O cérebro procura alívio imediato → trava o foco.",
    acaoAcreditavel: "Rebaixar o nível de ativação emocional ANTES de tentar focar.",
    solucaoAcreditavel: "Ativar o protocolo de “Destravamento Neurológico de Foco” (técnicas rápidas que acalmam o cérebro e liberam o foco).",
    cta: "Quero Ativar Meu Destravamento Neurológico",
  },
  "Foco Fragmentado": {
    title: "Foco Fragmentado",
    diagnosis: [
      "Seu cérebro está condicionado a buscar picos rápidos de dopamina.",
      "Isso te dá a sensação de “foco quebrado”."
    ],
    pontoCritico: "Iniciar tarefas é difícil porque seu cérebro não está otimizado para profundidade.",
    acaoAcreditavel: "Reduzir competidores de dopamina antes de começar.",
    solucaoAcreditavel: "Ativar o “Modo Foco de 3 Minutos” para ensinar o cérebro a entrar em modo profundo.",
    cta: "Quero Ativar o Modo Foco",
  },
  "Energia Baixa Mental": {
    title: "Energia Baixa Mental",
    diagnosis: [
      "Seu problema não é preguiça real — e sim baixa ativação neurológica.",
      "Seu cérebro economiza energia sempre que pode."
    ],
    pontoCritico: "Perde energia mental muito rápido.",
    acaoAcreditavel: "Aumentar ativação pré-tarefa.",
    solucaoAcreditavel: "Aplicar o “Aquecimento de Foco” — microativação que liga o cérebro antes da tarefa.",
    cta: "Quero Fazer Meu Aquecimento de Foco",
  },
  "Ativo(a), mas Desorganizado(a)": {
    title: "Ativo(a), mas Desorganizado(a)",
    diagnosis: [
      "Seu cérebro tem energia, mas sua atenção se fragmenta.",
      "Você começa várias coisas e finaliza poucas."
    ],
    pontoCritico: "Alta ativação + baixa direção.",
    acaoAcreditavel: "Dar um único alvo para o cérebro por vez.",
    solucaoAcreditavel: "Protocolo “1 Meta por Ciclo” — técnica que fixa a atenção em blocos.",
    cta: "Quero Meu Protocolo de 1 Meta",
  },
};

export default function Home() {
  const [quizState, setQuizState] = useState<'idle' | 'in-progress' | 'analyzing' | 'completed'>('idle');
  const [result, setResult] = useState<ResultProfile | null>(null);

  const handleStartQuiz = () => {
    setResult(null);
    setQuizState('in-progress');
  };

  const handleQuizCompletion = (answerIndexes: number[]) => {
    const totalScore = answerIndexes.reduce((sum, index) => sum + (index + 1), 0);
    
    let profileKey: string;
    if (totalScore >= 5 && totalScore <= 7) {
      profileKey = "Focado(a), mas Bloqueado(a)";
    } else if (totalScore >= 8 && totalScore <= 11) {
      profileKey = "Foco Fragmentado";
    } else if (totalScore >= 12 && totalScore <= 15) {
      profileKey = "Energia Baixa Mental";
    } else { // 16-20
      profileKey = "Ativo(a), mas Desorganizado(a)";
    }

    setResult(resultProfiles[profileKey]);
    setQuizState('analyzing');

    setTimeout(() => {
        setQuizState('completed');
    }, 2500);
  };

  const handleRestart = () => {
    setQuizState('idle');
  };

  const renderContent = () => {
    switch (quizState) {
      case 'in-progress':
        return <Quiz onComplete={handleQuizCompletion} />;
      case 'analyzing':
        return <AnalyzingScreen />;
      case 'completed':
        return result && <QuizResult result={result} onRestart={handleRestart} />;
      case 'idle':
      default:
        return (
          <Card className="w-full max-w-2xl text-center shadow-2xl shadow-primary/20 animate-fade-in overflow-hidden rounded-lg">
            <Image 
              src="https://imgur.com/3sF4aiS.png"
              alt="Cérebro iluminado representando padrões de foco"
              width={1200}
              height={630}
              className="w-full h-auto object-cover"
              data-ai-hint="futuristic brain neon"
            />
            <CardHeader className="p-6">
              <div className="mx-auto bg-primary/10 p-3 rounded-full mb-4 border border-primary/20 shadow-lg shadow-primary/20">
                 <BrainCircuit className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl font-extrabold sm:text-3xl">Descubra o Padrão Cerebral Que Está Travando Seu Foco</CardTitle>
              <CardDescription className="text-sm text-muted-foreground pt-2 leading-relaxed max-w-prose mx-auto sm:text-base">
                90% das pessoas perdem o foco por padrões invisíveis no cérebro — descubra o seu em menos de 60 segundos.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <Button size="lg" onClick={handleStartQuiz} className="w-full font-bold sm:w-auto sm:px-12">
                Iniciar Meu Diagnóstico
              </Button>
               <p className="text-xs text-muted-foreground mt-3">+ de 42.000 diagnósticos realizados.</p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      {renderContent()}
    </main>
  );
}
