/** 다크 테마 입력 필드 */
export function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-foreground/90">
        {label}
      </span>
      <input
        {...props}
        className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-foreground placeholder:text-muted/60 outline-none transition-colors focus:border-accent"
      />
    </label>
  );
}
