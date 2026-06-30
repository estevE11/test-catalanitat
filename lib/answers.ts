import { shuffleOptions } from "./shuffle";
import type { AnswerChoice, Question, UserAnswer } from "./types";

export type AnswersMap = Record<number, string>;

export function getChoice(
  question: Question,
  selectedAnswer: string | null
): AnswerChoice {
  if (selectedAnswer === null) return "skipped";
  return selectedAnswer === question.correctAnswer ? "correct" : "incorrect";
}

export function buildUserAnswers(
  questions: Question[],
  answersMap: AnswersMap
): UserAnswer[] {
  return questions.map((question, index) => {
    const selectedAnswer =
      index in answersMap ? answersMap[index] : null;

    return {
      questionIndex: index,
      section: question.section,
      selectedAnswer,
      choice: getChoice(question, selectedAnswer),
    };
  });
}

export function createShuffledOptionsMap(
  questions: Question[]
): Record<number, string[]> {
  return Object.fromEntries(
    questions.map((question, index) => [
      index,
      shuffleOptions(question.correctAnswer, [...question.incorrectAnswers]),
    ])
  );
}
