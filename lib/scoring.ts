import type { GlobalResult, SectionScore, UserAnswer, AnswerStats } from "./types";

const INCORRECT_PENALTY = 0.33;

export function getAnswerScore(choice: UserAnswer["choice"]): number {
  switch (choice) {
    case "correct":
      return 1;
    case "incorrect":
      return -INCORRECT_PENALTY;
    case "skipped":
      return 0;
  }
}

export function calculateTotalScore(answers: UserAnswer[]): number {
  const raw = answers.reduce((sum, a) => sum + getAnswerScore(a.choice), 0);
  return Math.round(raw * 100) / 100;
}

export function calculateSectionScores(answers: UserAnswer[]): SectionScore[] {
  const sectionMap = new Map<string, number>();

  for (const answer of answers) {
    const current = sectionMap.get(answer.section) ?? 0;
    sectionMap.set(answer.section, current + getAnswerScore(answer.choice));
  }

  return Array.from(sectionMap.entries()).map(([name, rawScore]) => {
    const score = Math.round(rawScore * 100) / 100;
    return { name, score, badge: getSectionBadge(name, score) };
  });
}

export function getGlobalResult(score: number): GlobalResult {
  if (score >= 22) {
    return {
      score,
      title: "Reencarnació de Pompeu Fabra",
      description:
        "Ciutadania concedida amb honors. Tens una plaça reservada a l'Institut d'Estudis Catalans.",
    };
  }
  if (score >= 15) {
    return {
      score,
      title: "Ciutadà de Ple Dret",
      description:
        "Examen superat. Pots votar, rebre la Grossa de Cap d'Any i queixar-te dels trens de Rodalies.",
    };
  }
  if (score >= 8) {
    return {
      score,
      title: "Resident amb permís temporal",
      description:
        "En saps prou per sobreviure. Immersió cultural urgent requerida.",
    };
  }
  return {
    score,
    title: "Guiri en potència / Turista",
    description:
      "Ciutadania denegada. La teva targeta del Club Super3 s'està revocant immediatament.",
  };
}

function getSectionBadge(sectionName: string, score: number): string {
  const tier = score >= 4 ? "high" : score >= 2 ? "mid" : "low";

  const badges: Record<string, Record<"high" | "mid" | "low", string>> = {
    "Història i Evolució Institucional": {
      high: "Cronista Reial",
      mid: "Lletraferit passatgable",
      low: "Anacrònic",
    },
    "Geografia Física i Territorial": {
      high: "Brúixola Humana",
      mid: "Usuari de GPS",
      low: "Guiri perdut",
    },
    "Institucions i Marc Polític": {
      high: "President del Parlament",
      mid: "Votant informat",
      low: "Abstencionista absolut",
    },
    "Llengua i Literatura Acadèmica": {
      high: "Hereu de Fabra",
      mid: "Catalanoparlant de carrer",
      low: 'Parles "Catañol"',
    },
    "Dret Civil Català i Societat": {
      high: "Notari de la Generalitat",
      mid: "Ciutadà protegit",
      low: "Fora de la llei",
    },
  };

  return badges[sectionName]?.[tier] ?? "Sense classificació";
}

export function getAnswerStats(answers: UserAnswer[]): AnswerStats {
  return {
    correct: answers.filter((a) => a.choice === "correct").length,
    incorrect: answers.filter((a) => a.choice === "incorrect").length,
    blank: answers.filter((a) => a.choice === "skipped").length,
    total: answers.length,
  };
}

export function getFirstBlankIndex(answers: UserAnswer[]): number | null {
  const blank = answers.find((a) => a.choice === "skipped");
  return blank ? blank.questionIndex : null;
}

export function formatScore(score: number): string {
  return Number.isInteger(score) ? String(score) : score.toFixed(2);
}

export function buildShareMessage(score: number, title: string): string {
  const url =
    typeof window !== "undefined" ? window.location.origin : "";
  const formatted = formatScore(score);
  return `He tret un ${formatted}/25 al Test de Catalanitat NIVELL EXPERT. Sóc ${title}! Pots superar-me? Prova-ho aquí: ${url}`;
}
