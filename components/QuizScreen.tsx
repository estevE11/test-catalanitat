"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import ScoringLegend from "@/components/ScoringLegend";
import SectionProgressBars from "@/components/SectionProgressBars";
import type { SectionProgress } from "@/lib/sections";
import type { Question } from "@/lib/types";

interface QuizScreenProps {
  question: Question;
  options: string[];
  sectionName: string;
  questionInSection: number;
  totalInSection: number;
  currentIndex: number;
  totalQuestions: number;
  sectionProgress: SectionProgress[];
  selectedAnswer: string | undefined;
  onSelectAnswer: (answer: string | null) => void;
  onPrevious: () => void;
  onNext: () => void;
  onFinish: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export default function QuizScreen({
  question,
  options,
  sectionName,
  questionInSection,
  totalInSection,
  currentIndex,
  totalQuestions,
  sectionProgress,
  selectedAnswer,
  onSelectAnswer,
  onPrevious,
  onNext,
  onFinish,
  isFirst,
  isLast,
}: QuizScreenProps) {
  const handleSelect = (option: string) => {
    onSelectAnswer(selectedAnswer === option ? null : option);
  };

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-4 py-4 sm:px-6 sm:py-6">
      <header className="mb-4 shrink-0 sm:mb-6">
        <div className="mb-2 flex items-center justify-between text-xs text-slate-500 sm:text-sm">
          <span>
            Pregunta {currentIndex + 1}/{totalQuestions}
          </span>
          <span className="text-base sm:text-lg">
            {sectionProgress.find((s) => s.isActive)?.emoji ?? "📜"}
          </span>
        </div>
        <SectionProgressBars sections={sectionProgress} />
        <div className="mt-3">
          <ScoringLegend />
        </div>
        <p className="mt-2 text-xs text-slate-500 sm:text-sm">
          Torna a tocar una resposta seleccionada per deixar la pregunta en blanc.
        </p>
        <p className="mt-3 text-xs font-medium uppercase tracking-wide text-catalan-red sm:text-sm">
          Secció: {sectionName}
        </p>
        <p className="text-sm text-slate-500 sm:text-base">
          Pregunta {questionInSection}/{totalInSection}
        </p>
      </header>

      <main className="flex flex-1 flex-col">
        <article className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:mb-6 sm:p-6">
          <h2 className="text-base font-semibold leading-relaxed text-exam-navy sm:text-lg">
            {question.question}
          </h2>
        </article>

        <div
          className="flex flex-col gap-2.5 sm:gap-3"
          role="listbox"
          aria-label="Opcions de resposta"
        >
          {options.map((option, idx) => {
            const isSelected = selectedAnswer === option;

            return (
              <button
                key={`${currentIndex}-${idx}-${option.slice(0, 20)}`}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(option)}
                className={`flex min-h-[52px] w-full items-center gap-3 rounded-xl border-2 px-4 py-3.5 text-left text-sm leading-snug transition active:scale-[0.99] sm:min-h-[56px] sm:px-5 sm:text-base ${
                  isSelected
                    ? "border-catalan-red bg-red-50 text-exam-navy shadow-sm"
                    : "border-slate-200 bg-white text-exam-slate hover:border-catalan-red hover:bg-red-50/50"
                }`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold sm:h-9 sm:w-9 sm:text-sm ${
                    isSelected
                      ? "bg-catalan-red text-white"
                      : "bg-slate-100 text-exam-navy"
                  }`}
                >
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1">{option}</span>
              </button>
            );
          })}
        </div>
      </main>

      <footer className="mt-5 grid shrink-0 grid-cols-2 gap-2.5 pb-4 sm:mt-6 sm:gap-3">
        <button
          type="button"
          onClick={onPrevious}
          disabled={isFirst}
          className="flex min-h-[52px] items-center justify-center gap-1.5 rounded-xl border-2 border-slate-200 bg-white px-3 py-3.5 text-sm font-semibold text-exam-navy transition active:scale-[0.98] hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 sm:min-h-[56px] sm:gap-2 sm:text-base"
        >
          <ChevronLeft className="h-5 w-5 shrink-0" />
          Anterior
        </button>
        <button
          type="button"
          onClick={isLast ? onFinish : onNext}
          className="flex min-h-[52px] items-center justify-center gap-1.5 rounded-xl border-2 border-exam-navy bg-exam-navy px-3 py-3.5 text-sm font-semibold text-white transition active:scale-[0.98] hover:bg-slate-800 sm:min-h-[56px] sm:gap-2 sm:text-base"
        >
          {isLast ? "Finalitzar examen" : "Següent"}
          {!isLast && <ChevronRight className="h-5 w-5 shrink-0" />}
        </button>
      </footer>
    </div>
  );
}
