export function countById(cards: { id: string }[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const { id } of cards) counts.set(id, (counts.get(id) ?? 0) + 1);
  return counts;
}
