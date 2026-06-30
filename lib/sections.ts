import type { Question } from "./types";
import { groupQuestionsBySection } from "./csvParser";

export interface SectionRange {
  name: string;
  startIndex: number;
  endIndex: number;
  total: number;
}

export interface SectionProgress {
  name: string;
  emoji: string;
  percent: number;
  isActive: boolean;
  questionInSection: number;
  total: number;
}

const SECTION_EMOJIS = ["📜", "🗺️", "🏛️", "📚", "⚖️"];

export function getSectionRanges(questions: Question[]): SectionRange[] {
  const sections = groupQuestionsBySection(questions);
  let startIndex = 0;

  return sections.map((section) => {
    const range: SectionRange = {
      name: section.name,
      startIndex,
      endIndex: startIndex + section.questions.length - 1,
      total: section.questions.length,
    };
    startIndex += section.questions.length;
    return range;
  });
}

export function getSectionProgress(
  questions: Question[],
  currentIndex: number
): SectionProgress[] {
  const ranges = getSectionRanges(questions);

  return ranges.map((range, index) => {
    const isActive =
      currentIndex >= range.startIndex && currentIndex <= range.endIndex;

    let percent = 0;
    let questionInSection = 0;

    if (currentIndex > range.endIndex) {
      percent = 100;
      questionInSection = range.total;
    } else if (isActive) {
      questionInSection = currentIndex - range.startIndex + 1;
      percent = (questionInSection / range.total) * 100;
    }

    return {
      name: range.name,
      emoji: SECTION_EMOJIS[index] ?? "❓",
      percent,
      isActive,
      questionInSection,
      total: range.total,
    };
  });
}
