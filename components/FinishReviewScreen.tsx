"use client";

import { AlertTriangle, ChevronLeft, ClipboardCheck } from "lucide-react";
import ScoringLegend from "@/components/ScoringLegend";

interface FinishReviewScreenProps {
  blankQuestionNumbers: number[];
  onReview: () => void;
  onConfirm: () => void;
}

export default function FinishReviewScreen({
  blankQuestionNumbers,
  onReview,
  onConfirm,
}: FinishReviewScreenProps) {
  const hasBlanks = blankQuestionNumbers.length > 0;

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-4 py-6 sm:px-6 sm:py-10">
      <header className="mb-6 text-center sm:mb-8">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 sm:h-16 sm:w-16">
          <ClipboardCheck className="h-8 w-8 text-amber-700 sm:h-9 sm:w-9" />
        </div>
        <h1 className="font-serif text-2xl font-bold text-exam-navy sm:text-3xl">
          Revisió abans de lliurar
        </h1>
        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          Comprova el teu examen abans de veure la puntuació final.
        </p>
      </header>

      <main className="flex flex-1 flex-col gap-4 sm:gap-5">
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <h2 className="mb-3 text-base font-semibold text-exam-navy sm:text-lg">
            Sistema de puntuació
          </h2>
          <ScoringLegend variant="full" />
          <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-sm text-amber-900">
            <strong>Important:</strong> les respostes incorrectes resten punts.
            Si dubtes, és millor deixar la pregunta en blanc (0 punts) que
            respondre a l&apos;atzar.
          </p>
        </section>

        {hasBlanks && (
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <h2 className="mb-3 text-base font-semibold text-exam-navy sm:text-lg">
              Preguntes en blanc
            </h2>
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5">
              <p className="flex items-start gap-2 text-sm text-slate-700">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                <span>
                  Tens <strong>{blankQuestionNumbers.length} preguntes en blanc</strong>{" "}
                  (0 punts cadascuna):{" "}
                  {blankQuestionNumbers.map((n) => `#${n}`).join(", ")}
                </span>
              </p>
            </div>
          </section>
        )}
      </main>

      <footer className="mt-6 flex flex-col gap-2.5 pb-4 sm:mt-8 sm:gap-3">
        {hasBlanks && (
          <button
            type="button"
            onClick={onReview}
            className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl border-2 border-exam-navy bg-white px-4 py-3.5 text-sm font-semibold text-exam-navy transition active:scale-[0.98] hover:bg-slate-50 sm:min-h-[56px] sm:text-base"
          >
            <ChevronLeft className="h-5 w-5" />
            Revisar preguntes en blanc
          </button>
        )}
        <button
          type="button"
          onClick={onConfirm}
          className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-catalan-red px-4 py-3.5 text-sm font-semibold text-white shadow-md transition active:scale-[0.98] hover:bg-red-700 sm:min-h-[56px] sm:text-base"
        >
          Confirmar i veure resultats
        </button>
      </footer>
    </div>
  );
}
