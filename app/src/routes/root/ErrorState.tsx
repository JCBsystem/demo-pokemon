import { Button } from "react-aria-components";

type Props = { message: string; retrying: boolean; onRetry: () => void };

export function ErrorState({ message, retrying, onRetry }: Props) {
  return (
    <div data-testid="error-state" role="alert" className="paper px-6 py-12 text-center">
      <h2 className="font-display text-xl font-semibold">The binder would not open</h2>
      <p className="mt-1 text-sm text-muted">{message}</p>
      <Button
        data-testid="error-retry"
        isPending={retrying}
        onPress={onRetry}
        className="mt-4 rounded-full bg-cover px-5 py-2.5 font-extrabold text-white outline-none data-focus-visible:ring-2 data-focus-visible:ring-ink data-focus-visible:ring-offset-2 data-focus-visible:ring-offset-paper data-pending:opacity-70"
      >
        {retrying ? "Trying again…" : "Try again"}
      </Button>
    </div>
  );
}
