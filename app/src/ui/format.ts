const number = new Intl.NumberFormat("en");

export function formatCount(count: number): string {
  return number.format(count);
}

export function formatCards(count: number): string {
  return `${formatCount(count)} ${count === 1 ? "card" : "cards"}`;
}
