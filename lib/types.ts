export interface Question {
  section: string;
  question: string;
  correctAnswer: string;
  incorrectAnswers: [string, string, string];
}

export type AnswerChoice = "correct" | "incorrect" | "skipped";

export interface UserAnswer {
  questionIndex: number;
  section: string;
  selectedAnswer: string | null;
  choice: AnswerChoice;
}

export type AppScreen = "home" | "quiz" | "review" | "results";

export interface AnswerStats {
  correct: number;
  incorrect: number;
  blank: number;
  total: number;
}

export interface SectionGroup {
  name: string;
  questions: Question[];
}

export interface SectionScore {
  name: string;
  score: number;
  badge: string;
}

export interface GlobalResult {
  score: number;
  title: string;
  description: string;
}
