import { typeColor } from "./typeColor";

export function TypeDot({ type }: { type: string }) {
  return (
    <span
      title={type}
      className="inline-block size-3.5 shrink-0 rounded-full ring-1 ring-black/40"
      style={{ background: typeColor(type) }}
    />
  );
}
