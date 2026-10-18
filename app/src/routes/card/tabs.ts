export const tabs = ["attacks", "weaknesses", "legalities"] as const;
export type DetailTab = (typeof tabs)[number];
