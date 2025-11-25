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
        <Card className="w-full max-w-md text-center animate-fade-in shadow-2xl shadow-primary/10">
            <CardHeader className="p-6">
                <CardTitle className="text-xl sm:text-2xl font-bold">Analisando seu perfil...</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-4">
                 <p className="text-muted-foreground text-sm sm:text-base">Carregando suas métricas de foco...</p>
                 <Progress value={progress} className="w-full h-2 transition-all duration-[2000ms] ease-in-out" />
            </CardContent>
        </Card>
    )
}
