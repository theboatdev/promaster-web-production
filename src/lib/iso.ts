const ISO_PATTERN = /\biso\b/i;

export function mentionsIso(value: string): boolean {
  return ISO_PATTERN.test(value);
}

export function withoutIsoMentions<T extends string>(values: T[]): T[] {
  return values.filter((value) => !mentionsIso(value));
}
