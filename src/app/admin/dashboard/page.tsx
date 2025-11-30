'use client';

import { useMemo } from 'react';
import { useFirebase } from '@/firebase/provider';
import { collectionGroup, getDocs, query } from 'firebase/firestore';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FunnelChart } from '@/components/funnel-chart';
import { BrainCircuit } from 'lucide-react';
import Link from 'next/link';

// As etapas do funil na ordem correta
const FUNNEL_STEPS = [
  'start_quiz',
  'answer_question_1',
  'answer_question_2',
  'answer_question_3',
  'answer_question_4',
  'answer_question_5',
  'view_results_page',
  'click_cta',
];

const STEP_LABELS: Record<string, string> = {
  start_quiz: 'Iniciou o Quiz',
  answer_question_1: 'Respondeu Pergunta 1',
  answer_question_2: 'Respondeu Pergunta 2',
  answer_question_3: 'Respondeu Pergunta 3',
  answer_question_4: 'Respondeu Pergunta 4',
  answer_question_5: 'Respondeu Pergunta 5',
  view_results_page: 'Viu a Página de Resultados',
  click_cta: 'Clicou no CTA Final',
};

type FunnelStepCompletion = {
  step: string;
  quizResultId: string;
};

// Função para buscar os dados
async function fetchFunnelData(firestore: any) {
  if (!firestore) return [];
  // Usamos uma collectionGroup query para buscar todos os 'funnelStepCompletions'
  // de todos os usuários e quizResults.
  // IMPORTANTE: Isso requer um índice no Firestore. O Firebase irá gerar um link de erro
  // no console do navegador na primeira vez que for executado, que você deve clicar para criar o índice.
  const q = query(collectionGroup(firestore, 'funnelStepCompletions'));
  const querySnapshot = await getDocs(q);
  const data: FunnelStepCompletion[] = [];
  querySnapshot.forEach((doc) => {
    // Extrai o quizResultId do caminho do documento pai
    const quizResultId = doc.ref.parent.parent?.id;
    if (quizResultId) {
      data.push({
          ...(doc.data() as Omit<FunnelStepCompletion, 'quizResultId'>),
          quizResultId,
      });
    }
  });
  return data;
}

function FunnelDashboard() {
  const { firestore } = useFirebase();
  const { data: funnelData, isLoading, error } = useQuery({
    queryKey: ['funnel-data'],
    queryFn: () => fetchFunnelData(firestore),
    enabled: !!firestore, // Só executa a query quando o firestore estiver disponível
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  const processedData = useMemo(() => {
    if (!funnelData) return [];

    // Agrupa todos os eventos por sessão (quizResultId)
    const sessions = funnelData.reduce((acc, event) => {
      const sessionId = event.quizResultId;
      if (!acc[sessionId]) {
        acc[sessionId] = new Set<string>();
      }
      acc[sessionId].add(event.step);
      return acc;
    }, {} as Record<string, Set<string>>);
    
    // Agora, para criar o efeito de "funil" onde os números são cumulativos e decrescentes,
    // garantimos que uma sessão só conta para uma etapa se tiver passado por todas as anteriores.
    const cumulativeStepCounts = FUNNEL_STEPS.map((step, stepIndex) => {
      let count = 0;

      // Itera sobre cada sessão
      Object.values(sessions).forEach(completedSteps => {
          // Verifica se a sessão completou todas as etapas ATÉ a etapa atual (inclusive)
          const requiredSteps = FUNNEL_STEPS.slice(0, stepIndex + 1);
          const hasCompletedAllRequired = requiredSteps.every(requiredStep => completedSteps.has(requiredStep));
          
          if (hasCompletedAllRequired) {
              count++;
          }
      });
      
      return {
          name: STEP_LABELS[step] || step,
          value: count,
      };
    });

    // Filtra etapas que não têm dados para não poluir o gráfico
    return cumulativeStepCounts.filter(d => d.value > 0);

  }, [funnelData]);

  if (error) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
            <Card className="max-w-xl bg-destructive/10 border-destructive">
                <CardHeader>
                    <CardTitle className="text-destructive">Erro ao Carregar Dados do Funil</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-destructive-foreground">Não foi possível buscar os dados do Firestore.</p>
                    <p className="text-xs text-muted-foreground bg-background/50 p-3 rounded">
                        <strong>Causa provável:</strong> O Firestore precisa de um índice para esta consulta. Verifique o console de desenvolvedor do seu navegador (F12). O Firebase deve ter logado um erro com um link para criar o índice necessário. Clique nesse link e crie o índice. A criação pode levar alguns minutos.
                    </p>
                    <pre className="text-left text-xs bg-black/20 p-2 rounded-md overflow-x-auto">
                        {error.message}
                    </pre>
                </CardContent>
            </Card>
        </div>
    )
  }
  
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
        <BrainCircuit className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
        <h1 className="text-xl sm:text-3xl font-bold text-foreground">
          Análise do Funil
        </h1>
      </div>
      
      <Card className="bg-card/60 backdrop-blur-xl border-primary/20">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Visualização do Funil de Engajamento</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
             <div className="w-full h-96 flex items-center justify-center">
                <p className="text-muted-foreground animate-pulse">Carregando dados do funil...</p>
             </div>
          ) : processedData.length > 0 ? (
            <FunnelChart data={processedData} />
          ) : (
            <div className="w-full h-96 flex flex-col items-center justify-center text-center gap-4 p-4">
                <p className="text-muted-foreground">Ainda não há dados de funil para exibir.</p>
                <Link href="/" className="text-sm text-primary hover:underline bg-primary/10 px-4 py-2 rounded-md border border-primary/20">
                    Clique aqui para fazer o quiz e gerar dados
                </Link>
            </div>
          )}
        </CardContent>
      </Card>
        <div className="text-center mt-8">
            <Link href="/" className="text-sm text-primary hover:underline">
                Voltar para o Quiz
            </Link>
        </div>
    </div>
  );
}

const queryClient = new QueryClient();

export default function DashboardPage() {
    return (
        <QueryClientProvider client={queryClient}>
            <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-2 futuristic-background">
                <div className="w-full max-w-5xl">
                    <FunnelDashboard />
                </div>
            </main>
        </QueryClientProvider>
    )
}
