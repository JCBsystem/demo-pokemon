import { Button } from "react-aria-components";

export function LoadError() {
  return (
    <main data-testid="load-error" className="grid min-h-screen place-items-center p-6 text-center">
      <div>
        <h1 className="font-semibold">Could not load the collection</h1>
        <p className="mt-1 text-zinc-500">Check your connection and try again.</p>
        <Button
          onPress={() => window.location.reload()}
          className="mt-4 h-9 rounded-md bg-zinc-900 px-4 text-xs font-medium text-white hover:bg-zinc-700"
        >
          Reload
        </Button>
      </div>
    </main>
  );
}
