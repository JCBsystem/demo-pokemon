import { PAGE_SIZE } from "../../data/paging";
import { Rings } from "../../ui/Rings";

const POCKETS = Array.from({ length: PAGE_SIZE }, (_, index) => index);

function EmptyPage({ className = "" }: { className?: string }) {
  return (
    <div className={`paper grid grid-cols-3 gap-2.5 ${className}`}>
      {POCKETS.map((index) => (
        <div key={index} className="pocket-empty splash-shimmer" />
      ))}
    </div>
  );
}

export function Splash() {
  return (
    <div data-testid="splash" className="relative lg:grid lg:grid-cols-2 lg:gap-[22px]">
      <Rings />
      <EmptyPage />
      <EmptyPage className="hidden lg:grid" />
      <output className="absolute inset-0 grid place-items-center font-display text-lg font-semibold">
        Opening the binder…
      </output>
    </div>
  );
}
