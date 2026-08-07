"use client";

import { useState } from "react";

export function Faq({
  items,
  variant = "light",
  defaultOpen = 0,
}: {
  items: { q: string; a: string }[];
  variant?: "light" | "dark";
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const dark = variant === "dark";

  return (
    <div className="grid items-start gap-3 md:grid-cols-2">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className={`h-fit overflow-hidden rounded-2xl border ${
              dark ? "border-border-dark bg-dark-2" : "border-border bg-surface"
            }`}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex min-h-[72px] w-full items-center justify-between gap-4 px-6 py-4 text-left"
            >
              <span className="flex items-center gap-3">
                <span className={`text-sm font-bold ${dark ? "text-white/40" : "text-muted"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={`text-base font-medium ${dark ? "text-on-dark" : "text-foreground"}`}>
                  {item.q}
                </span>
              </span>
              <span
                className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45" : ""} ${
                  dark ? "text-white" : "text-foreground"
                }`}
              >
                ＋
              </span>
            </button>
            <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden">
                <p className={`whitespace-pre-line px-6 pb-5 pl-[3.4rem] leading-relaxed ${dark ? "text-on-dark-muted" : "text-muted"}`}>
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
