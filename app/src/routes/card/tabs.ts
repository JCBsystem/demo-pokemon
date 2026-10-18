export const TABS = ["attacks", "weaknesses", "legalities"] as const;
export type Tab = (typeof TABS)[number];

export function parseTab(raw: Record<string, unknown>): { tab?: Tab | undefined } {
  return TABS.includes(raw.tab as Tab) ? { tab: raw.tab as Tab } : {};
}
