import { z } from "zod";

const typeValueSchema = z.object({ type: z.string(), value: z.string() });

export const cardSchema = z
  .object({
    id: z.string().includes("-"),
    name: z.string(),
    supertype: z.string(),
    number: z.string(),
    images: z.object({ small: z.string(), large: z.string() }),
    legalities: z.object({
      standard: z.string().optional(),
      expanded: z.string().optional(),
      unlimited: z.string().optional(),
    }),
    subtypes: z.array(z.string()).optional(),
    types: z.array(z.string()).optional(),
    hp: z.string().optional(),
    rarity: z.string().optional(),
    attacks: z
      .array(
        z.object({
          name: z.string(),
          cost: z.array(z.string()),
          damage: z.string(),
          text: z.string(),
        }),
      )
      .optional(),
    weaknesses: z.array(typeValueSchema).optional(),
    resistances: z.array(typeValueSchema).optional(),
    retreatCost: z.array(z.string()).optional(),
    evolvesFrom: z.string().optional(),
    evolvesTo: z.array(z.string()).optional(),
    artist: z.string().optional(),
    flavorText: z.string().optional(),
    nationalPokedexNumbers: z.array(z.number()).optional(),
    rules: z.array(z.string()).optional(),
    abilities: z
      .array(z.object({ name: z.string(), text: z.string(), type: z.string() }))
      .optional(),
    regulationMark: z.string().optional(),
    level: z.string().optional(),
  })
  .transform((card) => ({ ...card, setCode: card.id.slice(0, card.id.lastIndexOf("-")) }));

export type Card = z.infer<typeof cardSchema>;

export function parseCards(raw: unknown): Card[] {
  const items = z.array(z.unknown()).parse(raw);
  const cards: Card[] = [];
  const failures: { id: unknown; issues: string }[] = [];

  for (const item of items) {
    const result = cardSchema.safeParse(item);
    if (result.success) {
      cards.push(result.data);
    } else {
      const id = typeof item === "object" && item !== null && "id" in item ? item.id : undefined;
      failures.push({ id, issues: z.prettifyError(result.error) });
    }
  }

  if (failures.length > 0) {
    // TODO Sentry: report parse failures
    console.warn(`${failures.length} card(s) failed to parse`, failures);
  }

  return cards;
}
