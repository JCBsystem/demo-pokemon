import { typeColorClass } from "./typeColor";

export function TypeDot({ type, className = "" }: { type: string; className?: string }) {
  return <i aria-hidden="true" className={`dot ${typeColorClass(type)} ${className}`} />;
}
