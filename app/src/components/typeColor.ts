const colors: Record<string, string> = {
  Grass: "#4caf50",
  Fire: "#f0802c",
  Water: "#3d9be9",
  Lightning: "#f5c518",
  Psychic: "#b36ae2",
  Fighting: "#d0743c",
  Darkness: "#64748b",
  Metal: "#a3adb8",
  Dragon: "#c9a227",
  Fairy: "#ec79b1",
  Colorless: "#d4d4d8",
};

export function typeColor(type: string | undefined): string {
  return colors[type ?? ""] ?? "#3f3f46";
}
