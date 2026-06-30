"use client";

import { CheckCircle2 } from "lucide-react";
import { useEffect } from "react";

interface ToastProps {
  message: string;
  visible: boolean;
  onHide: () => void;
}

export default function Toast({ message, visible, onHide }: ToastProps) {
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(onHide, 2500);
    return () => clearTimeout(timer);
  }, [visible, onHide]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-exam-navy px-5 py-3 text-sm font-medium text-white shadow-lg sm:bottom-8 sm:text-base"
    >
      <CheckCircle2 className="h-5 w-5 shrink-0 text-catalan-yellow" />
      {message}
    </div>
  );
}
