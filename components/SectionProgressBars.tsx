import type { SectionProgress } from "@/lib/sections";

interface SectionProgressBarsProps {
  sections: SectionProgress[];
}

export default function SectionProgressBars({
  sections,
}: SectionProgressBarsProps) {
  return (
    <div className="space-y-2" aria-label="Progrés per secció">
      <div className="flex gap-1.5 sm:gap-2">
        {sections.map((section) => (
          <div
            key={section.name}
            className="flex flex-1 flex-col gap-1"
            title={`${section.name}: ${section.questionInSection}/${section.total}`}
          >
            <div className="h-2 overflow-hidden rounded-full bg-slate-200 sm:h-2.5">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  section.isActive ? "bg-catalan-red" : "bg-catalan-red/60"
                }`}
                style={{ width: `${section.percent}%` }}
              />
            </div>
            <span
              className={`text-center text-sm leading-none transition sm:text-base ${
                section.isActive ? "scale-110 opacity-100" : "opacity-40 grayscale"
              }`}
              aria-hidden
            >
              {section.emoji}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
