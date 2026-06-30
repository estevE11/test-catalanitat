"use client";

import { BookOpen, Play, ShieldCheck } from "lucide-react";
import { useState } from "react";
import ScoringLegend from "@/components/ScoringLegend";
import StartExamModal from "@/components/StartExamModal";

interface HomeScreenProps {
  onStart: () => void;
  loading: boolean;
  error: string | null;
}

export default function HomeScreen({ onStart, loading, error }: HomeScreenProps) {
  const [showStartModal, setShowStartModal] = useState(false);

  const handleOpenModal = () => {
    setShowStartModal(true);
  };

  const handleConfirmStart = () => {
    setShowStartModal(false);
    onStart();
  };

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-4 py-6 sm:px-6 sm:py-10">
      <header className="mb-6 text-center sm:mb-10">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-catalan-red sm:h-16 sm:w-16">
          <ShieldCheck className="h-8 w-8 text-white sm:h-9 sm:w-9" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest text-catalan-red sm:text-sm">
          Generalitat de Catalunya
        </p>
        <h1 className="mt-2 font-serif text-2xl font-bold leading-tight text-exam-navy sm:text-4xl">
          Test de Catalanitat
        </h1>
        <p className="mt-1 text-base font-medium text-catalan-red sm:text-lg">
          NIVELL EXPERT
        </p>
      </header>

      <main className="flex flex-1 flex-col gap-4 sm:gap-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-exam-navy sm:text-lg">
            <BookOpen className="h-5 w-5 shrink-0 text-catalan-red" />
            Normes de l&apos;examen
          </h2>
          <ScoringLegend variant="full" />
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-exam-slate sm:text-base">
            <li className="flex gap-2">
              <span className="mt-0.5 shrink-0 font-bold text-catalan-red">•</span>
              <span>
                <strong>25 preguntes</strong> repartides en{" "}
                <strong>5 seccions</strong> de 5 preguntes cadascuna.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 shrink-0 font-bold text-catalan-red">•</span>
              <span>
                Cada pregunta ofereix <strong>4 opcions</strong> de resposta
                presentades en ordre aleatori.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 shrink-0 font-bold text-catalan-red">•</span>
              <span>
                Toca una resposta per seleccionar-la. Torna a tocar per
                desmarcar-la i deixar-la <strong>en blanc</strong>.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 shrink-0 font-bold text-catalan-red">•</span>
              <span>
                Utilitza <strong>Anterior</strong> / <strong>Següent</strong>{" "}
                per navegar i revisar les preguntes abans de lliurar.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 shrink-0 font-bold text-catalan-red">•</span>
              <span>
                Puntuació màxima: <strong>25 punts</strong> (5 per secció).
              </span>
            </li>
          </ul>
        </section>

        <section className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 sm:text-base">
          <strong>Atenció:</strong> les respostes incorrectes{" "}
          <strong>resten 0,33 punts</strong>. En cas de dubte, deixa la pregunta
          en blanc — no penalitza.
        </section>

        {error && (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 sm:text-base">
            {error}
          </p>
        )}
      </main>

      <footer className="mt-6 pb-4 sm:mt-8">
        <button
          type="button"
          onClick={handleOpenModal}
          className="flex w-full min-h-[52px] items-center justify-center gap-2 rounded-xl bg-catalan-red px-6 py-3.5 text-base font-semibold text-white shadow-md transition active:scale-[0.98] hover:bg-red-700 sm:min-h-[56px] sm:text-lg"
        >
          <Play className="h-5 w-5" />
          Començar l&apos;examen
        </button>
      </footer>

      <StartExamModal
        open={showStartModal}
        loading={loading}
        onClose={() => setShowStartModal(false)}
        onConfirm={handleConfirmStart}
      />
    </div>
  );
}
