export const TABS = ["attacks", "weaknesses", "legalities"] as const;

export type Tab = (typeof TABS)[number];

export function parseTab(value: unknown): Tab | undefined {
  return TABS.find((tab) => tab === value);
}

export function validateSearch(search: Record<string, unknown>): { tab?: Tab } {
  const tab = parseTab(search["tab"]);
  return tab === undefined ? {} : { tab };
}
