const classes: Record<string, string> = {
  Grass: "bg-type-grass",
  Colorless: "bg-type-colorless",
  Water: "bg-type-water",
  Psychic: "bg-type-psychic",
  Fighting: "bg-type-fighting",
  Lightning: "bg-type-lightning",
  Fire: "bg-type-fire",
  Darkness: "bg-type-darkness",
  Metal: "bg-type-metal",
  Dragon: "bg-type-dragon",
  Fairy: "bg-type-fairy",
};

export function typeColorClass(type: string): string {
  return classes[type] ?? "bg-type-colorless";
}
