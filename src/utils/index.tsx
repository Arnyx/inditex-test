export const chunkArray = <T,>(arr: Array<T>, size: number): Array<Array<T>> =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

export const roundDecimals = (value: number, decimals = 2): number =>
  parseFloat(value.toFixed(decimals));
