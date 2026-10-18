import type { ReactNode } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-aria-components";
import type { Card } from "../../data/schema";
import { AttacksPanel } from "./AttacksPanel";
import { LegalitiesPanel } from "./LegalitiesPanel";
import { parseTab, TABS, type Tab as TabId } from "./search";
import { WeaknessesPanel } from "./WeaknessesPanel";

const labels: Record<TabId, string> = {
  attacks: "Attacks",
  weaknesses: "Weaknesses",
  legalities: "Legalities",
};

const panels: Record<TabId, (props: { card: Card }) => ReactNode> = {
  attacks: AttacksPanel,
  weaknesses: WeaknessesPanel,
  legalities: LegalitiesPanel,
};

type Props = { card: Card; tab: TabId; onTabChange: (tab: TabId) => void };

export function CardTabs({ card, tab, onTabChange }: Props) {
  return (
    <Tabs
      selectedKey={tab}
      onSelectionChange={(key) => {
        const next = parseTab(key);
        if (next !== undefined) onTabChange(next);
      }}
      className="mt-5"
    >
      <TabList aria-label="Card details" className="flex gap-1 rounded-full bg-[#f1e3c9] p-1">
        {TABS.map((id) => (
          <Tab
            key={id}
            id={id}
            data-testid={`tab-${id}`}
            className="flex-1 cursor-pointer rounded-full py-2 text-center text-sm font-extrabold outline-none data-focus-visible:ring-2 data-focus-visible:ring-ink data-hovered:bg-white/60 data-selected:bg-ink data-selected:text-white"
          >
            {labels[id]}
          </Tab>
        ))}
      </TabList>
      {TABS.map((id) => {
        const Panel = panels[id];
        return (
          <TabPanel
            key={id}
            id={id}
            data-testid={`panel-${id}`}
            className="mt-4 rounded-2xl outline-none data-focus-visible:ring-2 data-focus-visible:ring-ink"
          >
            <Panel card={card} />
          </TabPanel>
        );
      })}
    </Tabs>
  );
}
