import { useState, useRef, useEffect } from "react";
import {
  MAX_PRODUCTS_ROW_LENGTH,
  MIN_PRODUCTS_ROW_LENGTH,
} from "@/config/constants";
import { chunkArray } from "@/utils";
import type { Product } from "@/domain/models/Product";
import type { ProductRow } from "@/domain/models/ProductRow";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";

export const useGridEditor = (products: Product[] | undefined) => {
  const [rows, setRows] = useState<ProductRow[]>([]);
  const [draggedRow, setDraggedRow] = useState<string | null>(null);
  const lastRowId = useRef(0);

  useEffect(() => {
    if (products) {
      const chunked = chunkArray(products, MAX_PRODUCTS_ROW_LENGTH).map(
        (group, index) => ({
          id: `row-${index}`,
          products: group,
        })
      );
      lastRowId.current += chunked.length;
      setRows(chunked);
    }
  }, [products]);

  const isMoveBlocked = (sourceIndex: number, targetIndex: number) => {
    const sourceLength = rows[sourceIndex].products.length;
    const targetLength = rows[targetIndex].products.length;
    return (
      sourceLength === MIN_PRODUCTS_ROW_LENGTH ||
      targetLength === MAX_PRODUCTS_ROW_LENGTH
    );
  };

  const handleDragStart = ({ active }: DragStartEvent) => {
    const sourceRow = rows.find((row) =>
      row.products.some((product) => product.id === active.id)
    );
    setDraggedRow(sourceRow?.id ?? null);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setDraggedRow(null);

    if (!over || active.id === over.id) return;

    const sourceIndex = rows.findIndex((row) =>
      row.products.some((product) => product.id === active.id)
    );
    const targetIndex = rows.findIndex((row) => row.id === over.id);

    if (isMoveBlocked(sourceIndex, targetIndex)) return;

    const product = rows[sourceIndex].products.find((p) => p.id === active.id);
    if (!product) return;

    const updatedRows = [...rows];
    updatedRows[sourceIndex].products = updatedRows[
      sourceIndex
    ].products.filter((product) => product.id !== active.id);
    updatedRows[targetIndex].products.push(product);

    setRows(updatedRows);
  };

  return {
    rows,
    draggedRow,
    handleDragStart,
    handleDragEnd,
  };
};
