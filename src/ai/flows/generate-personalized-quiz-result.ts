'use server';

/**
 * @fileOverview Generates a personalized quiz result based on the user's answers.
 *
 * - generatePersonalizedQuizResult - A function that generates the personalized quiz result.
 * - PersonalizedQuizResultInput - The input type for the generatePersonalizedQuizResult function.
 * - PersonalizedQuizResultOutput - The return type for the generatePersonalizedQuizResult function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedQuizResultInputSchema = z.object({
  answers: z.array(
    z.string().describe('The answer provided by the user for each question.')
  ).length(5).describe('An array of 5 answers, one for each question in the quiz.'),
});
export type PersonalizedQuizResultInput = z.infer<typeof PersonalizedQuizResultInputSchema>;

const PersonalizedQuizResultOutputSchema = z.object({
  title: z.string().describe('A persuasive title based on the level of procrastination.'),
  diagnosis: z.string().describe('A diagnosis text that shows understanding of the user.'),
  keyTakeaway: z.string().describe('A key takeaway that shows there is a solution.'),
  opportunity: z.string().describe('An opportunity phrase that creates desire.'),
  cta: z.string().describe('A compelling and direct Call To Action.'),
});
export type PersonalizedQuizResultOutput = z.infer<typeof PersonalizedQuizResultOutputSchema>;

export async function generatePersonalizedQuizResult(
  input: PersonalizedQuizResultInput
): Promise<PersonalizedQuizResultOutput> {
  return generatePersonalizedQuizResultFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedQuizResultPrompt',
  input: {schema: PersonalizedQuizResultInputSchema},
  output: {schema: PersonalizedQuizResultOutputSchema},
  prompt: `You are an expert in study habits and motivation. You will generate a personalized quiz result based on the user's answers.

Here are the user's answers to the quiz questions:

Question 1: "Como você descreveria sua rotina de estudos hoje?"
Answer 1: {{{answers.0}}}

Question 2: "O que mais te atrapalha quando tenta estudar?"
Answer 2: {{{answers.1}}}

Question 3: "Depois de procrastinar, como você costuma se sentir?"
Answer 3: {{{answers.2}}}

Question 4: “O que faria diferença REAL no seu estudo hoje?”
Answer 4: {{{answers.3}}}

Question 5: "Quão útil seria um método simples e prático para ativar foco imediato no seu dia?"
Answer 5: {{{answers.4}}}

Based on these answers, generate a personalized quiz result, always delivering the following:

- A persuasive TITLE based on the level of procrastination
- A DIAGNOSIS text that shows that you understand the person
- A key TAKEAWAY that shows that there is a solution
- An OPPORTUNITY phrase that pulls desire
- A compelling and direct CTA

Use this model:

Title:
🔥 Seu Perfil: "[Personalized Title]"

Diagnosis:
[Personalized Diagnosis Text]

Key Takeaway:
[Personalized Key Takeaway]

Opportunity:
[Personalized Opportunity Phrase]

CTA:
👉 "Quero acessar o Método Viciado em Estudar agora"
`,
});

const generatePersonalizedQuizResultFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedQuizResultFlow',
    inputSchema: PersonalizedQuizResultInputSchema,
    outputSchema: PersonalizedQuizResultOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
