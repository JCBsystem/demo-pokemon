import { getRouteApi } from "@tanstack/react-router";
import { Tab, TabList, TabPanel, Tabs } from "react-aria-components";
import type { Card } from "../../data/schema";
import { AttacksPane } from "./AttacksPane";
import { LegalitiesPane } from "./LegalitiesPane";
import { tabs, type DetailTab } from "./tabs";
import { WeaknessesPane } from "./WeaknessesPane";

const route = getRouteApi("/card/$id");

const panes = { attacks: AttacksPane, weaknesses: WeaknessesPane, legalities: LegalitiesPane };

type Props = { card: Card; color: string; tab: DetailTab };

export function DetailTabs({ card, color, tab }: Props) {
  const navigate = route.useNavigate();
  return (
    <Tabs
      selectedKey={tab}
      onSelectionChange={(key) => {
        const next = tabs.find((t) => t === key);
        if (next)
          void navigate({
            to: ".",
            search: { tab: next },
            replace: true,
            resetScroll: false,
            viewTransition: false,
          });
      }}
      className="pt-2"
    >
      <TabList aria-label="Card details" className="flex gap-7 border-b border-zinc-800">
        {tabs.map((t) => (
          <Tab
            key={t}
            id={t}
            data-testid={`tab-${t}`}
            className={({ isSelected }) =>
              `-mb-px cursor-pointer border-b-2 pb-3 text-sm font-semibold capitalize ${isSelected ? "text-white" : "border-transparent text-muted hover:text-zinc-300"}`
            }
            style={({ isSelected }) => (isSelected ? { borderColor: color } : {})}
          >
            {t}
          </Tab>
        ))}
      </TabList>
      {tabs.map((t) => {
        const Pane = panes[t];
        return (
          <TabPanel key={t} id={t} data-testid="tabpanel" className="pb-4 lg:max-w-xl">
            <Pane card={card} />
          </TabPanel>
        );
      })}
    </Tabs>
  );
}
