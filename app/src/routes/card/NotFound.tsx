export function NotFound({ id }: { id: string }) {
  return (
    <div className="grid min-h-full place-content-center gap-2 py-10 text-center">
      <h2 className="font-display text-3xl font-semibold">This pocket is empty</h2>
      <p className="font-semibold text-muted">No card with id {id} in Ash's binder.</p>
    </div>
  );
}
