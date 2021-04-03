export const toArray = <T>(value: T | T[]): T[] => {
  return Array.isArray(value) ? value : [value];
}

export const toFilledArray = <T>(value: undefined | T | T[], defaultValue: T | T[]): T[] => {
  const defaultArray = toArray(defaultValue);
  const definedValue = value === undefined ? defaultArray : value;
  const array = toArray(definedValue);

  if (array.length) {
    return array;
  }

  return defaultArray;
}

export const last = <T>(array: T[]): T | undefined => {
  return array[array.length - 1];
}
