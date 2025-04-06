import { CURRENCY, LOCALE } from "@/config/constants";

export const chunkArray = <T>(arr: Array<T>, size: number): Array<Array<T>> =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

export const roundDecimals = (value: number, decimals = 2): number =>
  parseFloat(value.toFixed(decimals));

export const formatPrice = (
  amount: number,
  locale: string = LOCALE,
  currency: string = CURRENCY
): string => {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(
    amount
  );
};
