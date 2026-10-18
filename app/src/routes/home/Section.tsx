import { useId, type ReactNode } from "react";

export function Section({ title, children }: { title: ReactNode; children: ReactNode }) {
  const id = useId();

  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="mb-2 text-xs font-semibold tracking-wider text-zinc-600 uppercase">
        {title}
      </h2>
      {children}
    </section>
  );
}
