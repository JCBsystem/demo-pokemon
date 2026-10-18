const TYPE_COLOURS: Record<string, string> = {
  Grass: "#5f8f3e",
  Colorless: "#9d998c",
  Water: "#3d7fb5",
  Psychic: "#8b4f9e",
  Fighting: "#a8572f",
  Lightning: "#c9971a",
  Fire: "#c9452c",
  Darkness: "#3d3a40",
  Metal: "#7d8790",
  Dragon: "#6d5a2d",
  Fairy: "#cf6f9b",
};

type Props = { type: string; label?: boolean };

export function TypeDot({ type, label = false }: Props) {
  const dot = (
    <span
      {...(label ? { "aria-hidden": true } : { role: "img", "aria-label": type })}
      title={type}
      className="inline-grid place-items-center w-5 h-5 shrink-0 rounded-full text-[10px] font-semibold text-white"
      style={{ backgroundColor: TYPE_COLOURS[type] ?? "var(--color-mute)" }}
    >
      {type.charAt(0)}
    </span>
  );
  if (!label) return dot;
  return (
    <span className="inline-flex items-center gap-1.5">
      {dot}
      {type}
    </span>
  );
}
