interface ScoringLegendProps {
  variant?: "compact" | "full";
}

export default function ScoringLegend({ variant = "compact" }: ScoringLegendProps) {
  if (variant === "full") {
    return (
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        <div className="rounded-xl border border-green-200 bg-green-50 px-3 py-2.5 text-center sm:px-4 sm:py-3">
          <p className="text-lg font-bold text-green-700 sm:text-xl">+1</p>
          <p className="mt-0.5 text-xs font-medium text-green-800 sm:text-sm">
            Correcta
          </p>
        </div>
        <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-center sm:px-4 sm:py-3">
          <p className="text-lg font-bold text-red-700 sm:text-xl">−0,33</p>
          <p className="mt-0.5 text-xs font-medium text-red-800 sm:text-sm">
            Incorrecta
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-center sm:px-4 sm:py-3">
          <p className="text-lg font-bold text-slate-600 sm:text-xl">0</p>
          <p className="mt-0.5 text-xs font-medium text-slate-700 sm:text-sm">
            En blanc
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600 sm:text-sm">
      <span>
        <strong className="text-green-700">+1</strong> correcta
      </span>
      <span className="text-slate-300">·</span>
      <span>
        <strong className="text-red-700">−0,33</strong> error
      </span>
      <span className="text-slate-300">·</span>
      <span>
        <strong className="text-slate-700">0</strong> en blanc
      </span>
    </div>
  );
}
