const TYPE_HEX: Record<string, string> = {
  Grass: "#3f9d4a",
  Colorless: "#a8a29e",
  Water: "#2b8fd6",
  Psychic: "#a855c7",
  Fighting: "#b45f2a",
  Lightning: "#e5b400",
  Fire: "#e2552c",
  Darkness: "#3f3f46",
  Metal: "#7c8a99",
  Dragon: "#0f8f86",
  Fairy: "#e46aa6",
};

export function TypeDot({ type, size = 10 }: { type: string; size?: number }) {
  return (
    <span
      aria-hidden
      title={type}
      className="inline-block shrink-0 rounded-full"
      style={{ width: size, height: size, background: TYPE_HEX[type] ?? "#999" }}
    />
  );
}
