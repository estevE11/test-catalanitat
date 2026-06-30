"use client";

import { AlertTriangle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ScoringLegend from "@/components/ScoringLegend";

interface StartExamModalProps {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function StartExamModal({
  open,
  loading,
  onClose,
  onConfirm,
}: StartExamModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="start-exam-title"
    >
      <button
        type="button"
        aria-label="Tancar"
        onClick={onClose}
        className="absolute inset-0 bg-exam-navy/60 backdrop-blur-sm"
      />

      <div
        className="modal-enter relative z-10 w-full max-w-md"
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event) => event.stopPropagation()}
      >
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="relative bg-gradient-to-br from-catalan-red to-red-800 px-5 py-5 text-white sm:px-6 sm:py-6">
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-lg p-1 text-white/80 transition hover:bg-white/10 hover:text-white"
              aria-label="Tancar"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="flex items-start gap-3 pr-8">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-red-100">
                  Abans de començar
                </p>
                <h2
                  id="start-exam-title"
                  className="mt-1 font-serif text-xl font-bold leading-tight sm:text-2xl"
                >
                  Les respostes incorrectes resten punts
                </h2>
              </div>
            </div>
          </div>

          <div className="space-y-4 px-5 py-5 sm:px-6 sm:py-6">
            <p className="text-sm leading-relaxed text-exam-slate sm:text-base">
              Aquest examen utilitza <strong>penalització negativa</strong>.
              Cada resposta errònia resta{" "}
              <strong className="text-red-700">0,33 punts</strong> de la teva
              puntuació final.
            </p>

            <ScoringLegend variant="full" />

            <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              Si no saps la resposta, és millor deixar la pregunta{" "}
              <strong>en blanc</strong> (0 punts) que respondre a l&apos;atzar.
            </p>

            <button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              className="flex w-full min-h-[52px] items-center justify-center rounded-xl bg-catalan-red px-5 py-3.5 text-sm font-semibold text-white shadow-md transition active:scale-[0.98] hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60 sm:min-h-[56px] sm:text-base"
            >
              {loading ? "Carregant preguntes…" : "Entesos. Començar examen"}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
