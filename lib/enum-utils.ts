export type EnumMapValue<T extends string> = Record<string, T>;

const normalizeEnumKey = (value: string) => value.trim().toLowerCase();

export function createEnumMapper<T extends string>(mapping: EnumMapValue<T>) {
  const normalizedMap = new Map<string, T>(
    Object.entries(mapping).map(([key, value]) => [normalizeEnumKey(key), value])
  );

  return {
    map(value: unknown, fieldName: string): T {
      if (typeof value !== "string") {
        throw new Error(`Invalid ${fieldName} value: expected a string.`)
      }

      const normalized = normalizeEnumKey(value)
      const mapped = normalizedMap.get(normalized)

      if (!mapped) {
        const expected = Array.from(new Set(Object.values(mapping))).join(", ")
        throw new Error(
          `Invalid ${fieldName} value: ${value}. Expected one of ${expected}.`
        )
      }

      return mapped
    },

    values(): T[] {
      return Array.from(new Set(Object.values(mapping)))
    },
  }
}

export const difficultyEnum = {
  Beginner: "beginner",
  Intermediate: "intermediate",
  Advanced: "advanced",
  Easy: "beginner",
  Medium: "intermediate",
  Hard: "advanced",
} as const

export const stageEnum = {
  Idea: "idea",
  Building: "building",
  Beta: "beta",
  Published: "launched",
  Launched: "launched",
} as const

export const difficultyMapper = createEnumMapper(difficultyEnum)
export const stageMapper = createEnumMapper(stageEnum)
