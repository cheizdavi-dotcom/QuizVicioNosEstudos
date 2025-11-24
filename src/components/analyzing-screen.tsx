'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

export default function AnalyzingScreen() {
    const [progress, setProgress] = useState(10);

    useEffect(() => {
        const timer = setTimeout(() => setProgress(90), 200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Card className="w-full max-w-xl text-center animate-fade-in shadow-2xl shadow-primary/10">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Analisando seu perfil...</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                 <p className="text-muted-foreground">Carregando suas métricas de foco...</p>
                 <Progress value={progress} className="w-full h-2 transition-all duration-[2000ms] ease-in-out" />
            </CardContent>
        </Card>
    )
}