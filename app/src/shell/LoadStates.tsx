import { Button } from "react-aria-components";

const MAIN = "max-w-6xl mx-auto px-4 lg:px-8 pt-10 lg:pt-16 pb-24 min-h-dvh";

export function Splash() {
  return (
    <main data-testid="splash" aria-busy="true" className={MAIN}>
      <h1 className="font-serif text-2xl lg:text-3xl font-light">Opening the field guide…</h1>
      <div className="mt-6 h-0.5 max-w-xs bg-ink motion-safe:animate-pulse" />
    </main>
  );
}

type LoadErrorProps = { message: string; onRetry: () => void };

export function LoadError({ message, onRetry }: LoadErrorProps) {
  return (
    <main data-testid="error-state" className={MAIN}>
      <p className="kicker">Something went wrong</p>
      <h1 className="mt-3 font-serif text-4xl lg:text-5xl font-light tracking-tight">
        The collection did not load.
      </h1>
      <p className="mt-4 text-mute">{message}</p>
      <Button
        data-testid="retry"
        onPress={onRetry}
        className="mt-8 cursor-pointer border-b-2 border-ink pb-1 font-medium hover:text-accent hover:border-accent"
      >
        Try again
      </Button>
    </main>
  );
}
