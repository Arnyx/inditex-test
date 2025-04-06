import type { Product } from "@/domain/models/Product";
import type { DraftProductRow } from "../../models/DraftProductRow";
import {
  MAX_PRODUCTS_ROW_LENGTH,
  MIN_PRODUCTS_ROW_LENGTH,
} from "@/config/constants";

export const updateRowProductList = (
  rows: DraftProductRow[],
  rowIndex: number,
  products: Product[]
): DraftProductRow[] => {
  const updated = [...rows];
  updated[rowIndex] = { ...updated[rowIndex], products };
  return updated;
};

export const isRowId = (id: string): boolean => id.startsWith("row-");

export const findRowIndexByProductId = (
  rows: DraftProductRow[],
  productId: string
): number =>
  rows.findIndex((row) => row.products.some((p) => p.id === productId));

export const findProductIndex = (
  row: DraftProductRow,
  productId: string
): number => row.products.findIndex((p) => p.id === productId);

export const canMove = (
  sourceRow: DraftProductRow,
  targetRow: DraftProductRow,
  fromIndex: number,
  toIndex: number
): boolean => {
  return (
    fromIndex !== -1 &&
    toIndex !== -1 &&
    sourceRow.products.length > MIN_PRODUCTS_ROW_LENGTH &&
    targetRow.products.length < MAX_PRODUCTS_ROW_LENGTH
  );
};
