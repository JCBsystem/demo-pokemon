export function SkipLink() {
  return (
    <a
      href="#content"
      onClick={(event) => {
        event.preventDefault();
        document.getElementById("content")?.focus();
      }}
      className="sr-only rounded-full bg-ink px-4 py-2 font-extrabold text-white outline-none focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:ring-2 focus:ring-sun"
    >
      Skip to content
    </a>
  );
}
