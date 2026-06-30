import Papa from "papaparse";
import type { Question, SectionGroup } from "./types";

interface CsvRow {
  Secció: string;
  Pregunta: string;
  "Resposta Correcta": string;
  "Resposta Incorrecta 1": string;
  "Resposta Incorrecta 2": string;
  "Resposta Incorrecta 3": string;
}

export async function loadQuestions(): Promise<Question[]> {
  const response = await fetch("/questions.csv");

  if (!response.ok) {
    throw new Error("No s'ha pogut carregar el fitxer de preguntes.");
  }

  const csvText = await response.text();

  const parsed = Papa.parse<CsvRow>(csvText, {
    header: true,
    delimiter: ";",
    skipEmptyLines: true,
  });

  if (parsed.errors.length > 0) {
    throw new Error("Error en analitzar el fitxer CSV de preguntes.");
  }

  return parsed.data.map((row) => ({
    section: row.Secció.trim(),
    question: row.Pregunta.trim(),
    correctAnswer: row["Resposta Correcta"].trim(),
    incorrectAnswers: [
      row["Resposta Incorrecta 1"].trim(),
      row["Resposta Incorrecta 2"].trim(),
      row["Resposta Incorrecta 3"].trim(),
    ],
  }));
}

export function groupQuestionsBySection(questions: Question[]): SectionGroup[] {
  const sectionOrder: string[] = [];
  const sectionMap = new Map<string, Question[]>();

  for (const question of questions) {
    if (!sectionMap.has(question.section)) {
      sectionMap.set(question.section, []);
      sectionOrder.push(question.section);
    }
    sectionMap.get(question.section)!.push(question);
  }

  return sectionOrder.map((name) => ({
    name,
    questions: sectionMap.get(name)!,
  }));
}

export function flattenSections(sections: SectionGroup[]): Question[] {
  return sections.flatMap((section) => section.questions);
}

export function getQuestionPosition(
  questions: Question[],
  index: number
): { sectionName: string; questionInSection: number; totalInSection: number } {
  const sectionName = questions[index].section;
  const sectionQuestions = questions.filter((q) => q.section === sectionName);
  const questionInSection =
    sectionQuestions.findIndex((q) => q.question === questions[index].question) + 1;

  return {
    sectionName,
    questionInSection,
    totalInSection: sectionQuestions.length,
  };
}
