export const toArray = <T>(value: T | T[]): T[] => {
  return Array.isArray(value) ? value : [value];
}

export const last = <T>(array: T[]): T | undefined => {
  return array[array.length - 1];
}
