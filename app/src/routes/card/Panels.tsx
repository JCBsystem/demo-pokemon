import type { Card } from "../../data/schema";
import { TypeDot } from "../../ui/TypeDot";

const ROW = "py-5 border-b border-rule";
const EMPTY = "py-5 font-serif text-2xl font-light text-mute";
const TEXT = "mt-3 text-[15px] leading-relaxed text-ink/80 max-w-prose";

export function Attacks({ card }: { card: Card }) {
  const { abilities = [], attacks = [], rules = [] } = card;
  return (
    <>
      {abilities.map((ability, i) => (
        <article key={`${ability.name}-${i}`} className={ROW}>
          <p className="kicker">{ability.type}</p>
          <h2 className="mt-1 font-serif text-2xl lg:text-3xl">{ability.name}</h2>
          <p className={TEXT}>{ability.text}</p>
        </article>
      ))}
      {attacks.map((attack, i) => (
        <article key={`${attack.name}-${i}`} className={ROW}>
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-serif text-2xl lg:text-3xl">{attack.name}</h2>
            <span className="font-serif text-3xl lg:text-4xl font-light tabular-nums">
              {attack.damage || "—"}
            </span>
          </div>
          {attack.cost.length > 0 && (
            <div className="mt-2 flex gap-1">
              {attack.cost.map((type, i) => (
                <TypeDot key={`${type}-${i}`} type={type} />
              ))}
            </div>
          )}
          {attack.text && <p className={TEXT}>{attack.text}</p>}
        </article>
      ))}
      {attacks.length === 0 &&
        (rules.length > 0 ? (
          <div className={ROW}>
            <p className="kicker">Rules</p>
            {rules.map((rule, i) => (
              <p key={i} className={TEXT}>
                {rule}
              </p>
            ))}
          </div>
        ) : (
          abilities.length === 0 && <p className={EMPTY}>No attacks.</p>
        ))}
    </>
  );
}

function TypeRows({ rows }: { rows: { type: string; value: string }[] }) {
  return rows.map(({ type, value }) => (
    <div key={type} className={`flex items-center justify-between ${ROW}`}>
      <span className="font-serif text-2xl lg:text-3xl">
        <TypeDot type={type} label />
      </span>
      <span className="font-serif text-3xl lg:text-4xl font-light tabular-nums">{value}</span>
    </div>
  ));
}

export function Weaknesses({ card }: { card: Card }) {
  const { weaknesses = [], resistances = [] } = card;
  return (
    <>
      {weaknesses.length > 0 ? (
        <TypeRows rows={weaknesses} />
      ) : (
        <p className={EMPTY}>No weaknesses.</p>
      )}
      {resistances.length > 0 && (
        <>
          <p className="kicker mt-8">Resistances</p>
          <TypeRows rows={resistances} />
        </>
      )}
    </>
  );
}

const FORMATS = ["unlimited", "expanded", "standard"] as const;

export function Legalities({ card }: { card: Card }) {
  return FORMATS.map((format) => (
    <div key={format} className={`flex items-baseline justify-between ${ROW}`}>
      <span className="font-serif text-2xl lg:text-3xl capitalize">{format}</span>
      {card.legalities[format] ? (
        <span className="text-sm font-medium uppercase tracking-wider">
          {card.legalities[format]}
        </span>
      ) : (
        <span className="text-sm text-mute">— not listed</span>
      )}
    </div>
  ));
}
