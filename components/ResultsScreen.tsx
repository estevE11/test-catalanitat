"use client";

import {
  Award,
  RefreshCw,
  Share2,
  Trophy,
} from "lucide-react";
import { useCallback, useState } from "react";
import {
  buildShareMessage,
  formatScore,
  getAnswerStats,
  getGlobalResult,
} from "@/lib/scoring";
import type { AnswerStats, SectionScore } from "@/lib/types";
import Toast from "./Toast";

interface ResultsScreenProps {
  totalScore: number;
  stats: AnswerStats;
  sectionScores: SectionScore[];
  onRetry: () => void;
}

export default function ResultsScreen({
  totalScore,
  stats,
  sectionScores,
  onRetry,
}: ResultsScreenProps) {
  const [toastVisible, setToastVisible] = useState(false);
  const result = getGlobalResult(totalScore);
  const penaltyPoints = Math.round(stats.incorrect * 0.33 * 100) / 100;

  const handleShare = useCallback(async () => {
    const message = buildShareMessage(totalScore, result.title);
    try {
      await navigator.clipboard.writeText(message);
      setToastVisible(true);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = message;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setToastVisible(true);
    }
  }, [totalScore, result.title]);

  return (
    <div className="mx-auto min-h-dvh w-full max-w-2xl px-4 py-6 sm:px-6 sm:py-10">
      <header className="mb-6 text-center sm:mb-8">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-catalan-yellow sm:h-20 sm:w-20">
          <Trophy className="h-9 w-9 text-exam-navy sm:h-10 sm:w-10" />
        </div>
        <p className="text-sm text-slate-500 sm:text-base">Resultats de l&apos;examen</p>
        <p className="mt-1 font-serif text-4xl font-bold text-exam-navy sm:text-5xl">
          {formatScore(totalScore)}
          <span className="text-xl font-normal text-slate-400 sm:text-2xl">/25</span>
        </p>
        <h1 className="mt-3 text-xl font-bold text-catalan-red sm:text-2xl">
          {result.title}
        </h1>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-exam-slate sm:text-base">
          {result.description}
        </p>
      </header>

      <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:mb-8 sm:p-5">
        <h2 className="mb-3 text-sm font-semibold text-exam-navy sm:text-base">
          Com s&apos;ha calculat la puntuació
        </h2>
        <div className="space-y-2 text-sm text-exam-slate sm:text-base">
          <div className="flex justify-between">
            <span>{stats.correct} respostes correctes</span>
            <span className="font-medium text-green-700">+{stats.correct}</span>
          </div>
          {stats.incorrect > 0 && (
            <div className="flex justify-between">
              <span>{stats.incorrect} respostes incorrectes</span>
              <span className="font-medium text-red-700">−{penaltyPoints}</span>
            </div>
          )}
          {stats.blank > 0 && (
            <div className="flex justify-between">
              <span>{stats.blank} preguntes en blanc</span>
              <span className="font-medium text-slate-500">0</span>
            </div>
          )}
          <div className="flex justify-between border-t border-slate-200 pt-2 font-semibold text-exam-navy">
            <span>Total</span>
            <span>{formatScore(totalScore)}/25</span>
          </div>
        </div>
      </section>

      <section className="mb-6 sm:mb-8">
        <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-exam-navy sm:text-lg">
          <Award className="h-5 w-5 text-catalan-red" />
          Puntuació per secció
        </h2>
        <div className="flex flex-col gap-2.5 sm:gap-3">
          {sectionScores.map((section) => (
            <div
              key={section.name}
              className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm sm:p-4"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                <p className="text-sm font-medium leading-snug text-exam-navy sm:text-base">
                  {section.name}
                </p>
                <p className="shrink-0 text-sm font-bold text-exam-navy sm:text-base">
                  {formatScore(section.score)}/5
                </p>
              </div>
              <p className="mt-1.5 inline-block rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-catalan-red sm:text-sm">
                {section.badge}
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer className="flex flex-col gap-3 pb-4 sm:flex-row sm:gap-4">
        <button
          type="button"
          onClick={handleShare}
          className="flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-xl bg-exam-navy px-5 py-3.5 text-sm font-semibold text-white shadow-md transition active:scale-[0.98] hover:bg-slate-800 sm:min-h-[56px] sm:text-base"
        >
          <Share2 className="h-5 w-5" />
          Compartir puntuació
        </button>
        <button
          type="button"
          onClick={onRetry}
          className="flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-xl border-2 border-catalan-red bg-white px-5 py-3.5 text-sm font-semibold text-catalan-red transition active:scale-[0.98] hover:bg-red-50 sm:min-h-[56px] sm:text-base"
        >
          <RefreshCw className="h-5 w-5" />
          Tornar a provar
        </button>
      </footer>

      <Toast
        message="Copiat al porta-retalls!"
        visible={toastVisible}
        onHide={() => setToastVisible(false)}
      />
    </div>
  );
}
