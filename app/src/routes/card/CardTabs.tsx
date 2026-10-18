import { useNavigate, useSearch } from "@tanstack/react-router";
import { Tab, TabList, TabPanel, Tabs } from "react-aria-components";
import type { Card } from "../../data/schema";
import { Attacks, Legalities, Weaknesses } from "./Panels";
import { TABS, type Tab as TabId } from "./tabs";

const PANELS = { attacks: Attacks, weaknesses: Weaknesses, legalities: Legalities };

export function CardTabs({ card }: { card: Card }) {
  const { tab = "attacks" } = useSearch({ from: "/card/$id" });
  const navigate = useNavigate({ from: "/card/$id" });

  return (
    <Tabs
      selectedKey={tab}
      onSelectionChange={(key) =>
        void navigate({
          search: { tab: key === "attacks" ? undefined : (key as TabId) },
          replace: true,
          resetScroll: false,
          viewTransition: false,
        })
      }
    >
      <TabList aria-label="Card details" className="flex gap-7 border-b border-rule">
        {TABS.map((id) => (
          <Tab
            key={id}
            id={id}
            data-testid={`tab-${id}`}
            className="cursor-pointer -mb-px pb-3 border-b-2 border-transparent font-serif text-xl lg:text-2xl text-mute capitalize outline-none hover:text-ink data-selected:text-ink data-selected:border-ink data-focus-visible:outline-2 data-focus-visible:outline-ink motion-safe:transition-colors"
          >
            {id}
          </Tab>
        ))}
      </TabList>
      {TABS.map((id) => {
        const Panel = PANELS[id];
        return (
          <TabPanel key={id} id={id} data-testid="tab-panel" className="outline-none">
            <Panel card={card} />
          </TabPanel>
        );
      })}
    </Tabs>
  );
}
