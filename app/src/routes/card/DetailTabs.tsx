import { useState } from "react";
import {
  Tab,
  TabList,
  TabPanel,
  Tabs,
  ToggleButton,
  ToggleButtonGroup,
} from "react-aria-components";
import { TypeDot } from "../../components/TypeDot";
import type { Card } from "../../data/schema";
import { cardTabs, type CardTab } from "../../data/urlFilter";
import { StatRow } from "./StatRow";

type Props = {
  card: Card;
  tab: CardTab;
  onTabChange: (tab: CardTab) => void;
};

const labels: Record<CardTab, string> = {
  attacks: "Attacks",
  weaknesses: "Weaknesses",
  legalities: "Legalities",
};

export function DetailTabs({ card, tab, onTabChange }: Props) {
  const counts: Record<CardTab, number> = {
    attacks: card.attacks?.length ?? 0,
    weaknesses: card.weaknesses?.length ?? 0,
    legalities: 3,
  };

  return (
    <Tabs
      selectedKey={tab}
      onSelectionChange={(key) => {
        const next = cardTabs.find((candidate) => candidate === key);
        if (next) onTabChange(next);
      }}
      className="mt-4"
    >
      <TabList aria-label="Card details" className="flex gap-4 border-b border-zinc-200">
        {cardTabs.map((key) => (
          <Tab
            key={key}
            id={key}
            data-testid={`tab-${key}`}
            className={({ isSelected }) =>
              `-mb-px cursor-default rounded-t border-b-2 pb-2 ${isSelected ? "border-indigo-600 font-medium text-zinc-900" : "border-transparent text-zinc-600 hover:text-zinc-900"}`
            }
          >
            {labels[key]} <span className="font-mono text-xs text-zinc-600">{counts[key]}</span>
          </Tab>
        ))}
      </TabList>
      <TabPanel id="attacks" data-testid="tabpanel" data-tab="attacks">
        <AttacksPanel key={card.id} card={card} />
      </TabPanel>
      <TabPanel id="weaknesses" data-testid="tabpanel" data-tab="weaknesses">
        <WeaknessesPanel key={card.id} card={card} />
      </TabPanel>
      <TabPanel id="legalities" data-testid="tabpanel" data-tab="legalities">
        <dl className="mt-2 divide-y divide-zinc-200">
          {(["unlimited", "expanded", "standard"] as const).map((format) => (
            <StatRow key={format} label={format.charAt(0).toUpperCase() + format.slice(1)}>
              <Legality value={card.legalities[format]} />
            </StatRow>
          ))}
        </dl>
      </TabPanel>
    </Tabs>
  );
}

function AttacksPanel({ card }: { card: Card }) {
  const [selected, setSelected] = useState(0);
  const attacks = card.attacks ?? [];
  const attack = attacks[selected];

  return (
    <>
      {card.abilities?.map((ability) => (
        <div key={ability.name} className="mt-3 rounded-md border border-zinc-200 bg-white p-3">
          <p>
            <span className="text-xs font-medium text-rose-700">{ability.type}</span>{" "}
            <span className="font-medium">{ability.name}</span>
          </p>
          <p className="mt-1 leading-relaxed text-zinc-600">{ability.text}</p>
        </div>
      ))}
      {attack ? (
        <>
          <Chips
            label="Attack"
            options={attacks.map((item) => item.name)}
            selected={selected}
            onSelect={setSelected}
          />
          <div className="mt-2">
            <div className="flex items-center justify-between py-2">
              <span className="flex gap-1">
                {attack.cost.map((type, index) => (
                  <TypeDot key={index} type={type} size={14} />
                ))}
                <span className="sr-only">Cost: {attack.cost.join(", ") || "none"}</span>
              </span>
              <span className="font-mono text-lg">{attack.damage || "—"}</span>
            </div>
            <p className="leading-relaxed text-zinc-600">{attack.text || "No attack text."}</p>
          </div>
        </>
      ) : (
        !card.abilities?.length && (
          <div className="mt-3 space-y-2 leading-relaxed text-zinc-600">
            {card.rules?.length ? card.rules.map((rule) => <p key={rule}>{rule}</p>) : <p>None.</p>}
          </div>
        )
      )}
    </>
  );
}

function WeaknessesPanel({ card }: { card: Card }) {
  const [selected, setSelected] = useState(0);
  const list = selected === 0 ? card.weaknesses : card.resistances;

  return (
    <>
      <Chips
        label="Weakness details"
        options={["Weakness", "Resistance", "Retreat"]}
        selected={selected}
        onSelect={setSelected}
      />
      {selected === 2 ? (
        <dl className="mt-2">
          <StatRow label="Retreat cost">
            {card.retreatCost?.length ? (
              <span className="inline-flex items-center gap-2">
                <span className="inline-flex gap-1">
                  {card.retreatCost.map((type, index) => (
                    <TypeDot key={index} type={type} size={12} />
                  ))}
                </span>
                {card.retreatCost.length}
              </span>
            ) : (
              "—"
            )}
          </StatRow>
        </dl>
      ) : list?.length ? (
        <dl className="mt-2 divide-y divide-zinc-200">
          {list.map((entry) => (
            <StatRow
              key={entry.type}
              label={
                <span className="inline-flex items-center gap-2 text-zinc-800">
                  <TypeDot type={entry.type} />
                  {entry.type}
                </span>
              }
            >
              {entry.value}
            </StatRow>
          ))}
        </dl>
      ) : (
        <p className="mt-2 py-2 text-zinc-600">None.</p>
      )}
    </>
  );
}

type ChipsProps = {
  label: string;
  options: string[];
  selected: number;
  onSelect: (index: number) => void;
};

function Chips({ label, options, selected, onSelect }: ChipsProps) {
  return (
    <ToggleButtonGroup
      aria-label={label}
      selectionMode="single"
      disallowEmptySelection
      selectedKeys={[String(selected)]}
      onSelectionChange={(keys) => {
        const [key] = keys;
        if (key !== undefined) onSelect(Number(key));
      }}
      className="mt-3 flex flex-wrap gap-1.5"
    >
      {options.map((option, index) => (
        <ToggleButton
          key={index}
          id={String(index)}
          className={({ isSelected }) =>
            `h-7 rounded-full border px-2.5 text-xs ${isSelected ? "border-zinc-900 bg-zinc-900 text-white" : "border-zinc-200 hover:bg-zinc-50"}`
          }
        >
          {option}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

function Legality({ value }: { value: string | undefined }) {
  if (value === undefined) return <span className="text-xs text-zinc-600">Not listed</span>;
  return (
    <span
      className={`rounded px-2 py-0.5 text-xs ${value === "Legal" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}
    >
      {value}
    </span>
  );
}
