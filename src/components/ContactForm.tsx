"use client";

import { useState } from "react";
import { Field } from "@/components/ui/Field";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex h-full min-h-64 flex-col items-center justify-center text-center">
        <div className="text-5xl">✉️</div>
        <h3 className="mt-4 text-2xl text-foreground">문의가 접수되었습니다</h3>
        <p className="mt-2 text-muted">
          빠른 시일 내에 답변드리겠습니다. 감사합니다.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="space-y-4"
    >
      <Field label="이름" name="name" placeholder="홍길동" required />
      <Field label="이메일" name="email" type="email" placeholder="you@example.com" required />
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-foreground/90">
          문의 내용
        </span>
        <textarea
          name="message"
          rows={5}
          required
          placeholder="문의하실 내용을 입력해 주세요."
          className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted/60 outline-none transition-colors focus:border-accent"
        />
      </label>
      <button
        type="submit"
        className="w-full rounded-full bg-accent py-3.5 font-semibold text-background transition-colors hover:bg-accent-strong"
      >
        문의 보내기
      </button>
    </form>
  );
}
