const reNumber = /^[0-9]+/;

export const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
}

export const range = (start: number, end?: number | undefined, interval?: number | undefined): number[] => {
  let _start: number = start as number;
  let _end: number = end as number;
  const _interval: number = interval ?? 1;

  if (end === undefined) {
    _start = 0;
    _end = start;
  }

  const array: number[] = [];

  for (let i = _start; i <= _end; i += _interval) {
    array.push(i);
  }

  return array;
}

export const getDecimals = (number: number): number => {
  return +number.toString().replace(reNumber, '0');
}
