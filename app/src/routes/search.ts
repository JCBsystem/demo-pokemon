export function parseSearch(str: string): Record<string, string | string[]> {
  const search: Record<string, string | string[]> = {};
  for (const [key, value] of new URLSearchParams(str)) {
    const prev = search[key];
    search[key] = prev === undefined ? value : [...(Array.isArray(prev) ? prev : [prev]), value];
  }
  return search;
}

export function stringifySearch(search: Record<string, unknown>): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(search)) {
    for (const item of Array.isArray(value) ? (value as unknown[]) : [value]) {
      if (
        typeof item === "string"
          ? item !== ""
          : typeof item === "number" || typeof item === "boolean"
      ) {
        params.append(key, String(item));
      }
    }
  }
  const str = params.toString();
  return str === "" ? "" : `?${str}`;
}
