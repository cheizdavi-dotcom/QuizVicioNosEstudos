'use client';

import {
  Funnel,
  LabelList,
  FunnelChart as RechartsFunnelChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

type FunnelData = {
  name: string;
  value: number;
};

interface FunnelChartProps {
  data: FunnelData[];
}

export function FunnelChart({ data }: FunnelChartProps) {
  // Adiciona a taxa de conversão a cada etapa
  const dataWithConversion = useMemo(() => {
    return data.map((entry, index) => {
      if (index === 0) {
        return { ...entry, conversion: 100 };
      }
      const previousValue = data[index - 1].value;
      const conversion = previousValue > 0 ? (entry.value / previousValue) * 100 : 0;
      return { ...entry, conversion };
    });
  }, [data]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const previousData = payload[0].payload.index > 0 ? dataWithConversion[payload[0].payload.index - 1] : null;

      return (
        <div className="p-4 bg-background/80 backdrop-blur-sm border border-primary/30 rounded-lg shadow-lg">
          <p className="font-bold text-primary">{`${data.name}`}</p>
          <p className="text-foreground">{`Usuários: ${data.value}`}</p>
          {previousData && (
             <p className="text-sm text-muted-foreground">{`Conversão da etapa: ${data.conversion.toFixed(1)}%`}</p>
          )}
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="w-full h-96 md:h-[500px]">
       <ResponsiveContainer width="100%" height="100%">
        <RechartsFunnelChart data={dataWithConversion} margin={{ top: 20, right: 50, left: 50, bottom: 5 }}>
          <Tooltip content={<CustomTooltip />} />
          <Funnel
            dataKey="value"
            data={dataWithConversion}
            isAnimationActive
            lastShapeType="rectangle"
            fill="hsl(var(--primary) / 0.5)"
            stroke="hsl(var(--primary))"
            >
            <LabelList
                position="right"
                dataKey="name"
                fill="hsl(var(--foreground))"
                stroke="none"
                className="text-xs md:text-sm font-semibold"
            />
            <LabelList
                position="center"
                stroke="hsl(var(--primary-foreground))"
                className="text-sm md:text-base font-bold"
                formatter={(value: number, entry: any) => {
                    const index = dataWithConversion.findIndex(d => d.name === entry.payload.name);
                    if (index === 0) return `${value}`; // Total inicial
                    const prevValue = dataWithConversion[index - 1].value;
                    const percentage = prevValue > 0 ? ((value / prevValue) * 100).toFixed(1) : '0.0';
                    return `${value} (${percentage}%)`;
                }}
            />
          </Funnel>
        </RechartsFunnelChart>
      </ResponsiveContainer>
    </div>
  );
}
