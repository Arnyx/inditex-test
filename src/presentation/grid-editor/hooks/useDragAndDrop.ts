import type { Product } from "@/domain/models/Product";
import type {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";
import type { DraftProductRow } from "../models/DraftProductRow";
import {
  canMove,
  findProductIndex,
  findRowIndexByProductId,
  isRowId,
  updateRowProductList,
} from "./utils/dragAndDrop";

interface UseDragAndDropParams {
  rows: Array<DraftProductRow>;
  updateRows: (newRows: Array<DraftProductRow>) => void;
}

export const useDragAndDrop = ({ rows, updateRows }: UseDragAndDropParams) => {
  const [draggedRow, setDraggedRow] = useState<DraftProductRow | null>(null);
  const [draggedProduct, setDraggedProduct] = useState<Product | null>(null);
  const [overProductId, setOverProductId] = useState<string | null>(null);

  const reorderRows = (activeRowId: string, overRowId: string) => {
    const oldIndex = rows.findIndex((row) => row.id === activeRowId);
    const newIndex = rows.findIndex((row) => row.id === overRowId);

    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = arrayMove(rows, oldIndex, newIndex);

    updateRows(reordered);
  };

  const reorderWithinRow = (
    rowIndex: number,
    sourceProductId: string,
    targetProductId: string
  ) => {
    const row = rows[rowIndex];
    const fromIndex = findProductIndex(row, sourceProductId);
    const toIndex = findProductIndex(row, targetProductId);

    if (fromIndex === -1 || toIndex === -1) return;

    const updatedProducts = arrayMove(row.products, fromIndex, toIndex);
    const updatedRows = updateRowProductList(rows, rowIndex, updatedProducts);
    updateRows(updatedRows);
  };

  const moveBetweenRows = (
    sourceRowIndex: number,
    targetRowIndex: number,
    sourceProductId: string,
    targetProductId: string
  ) => {
    const sourceRow = rows[sourceRowIndex];
    const targetRow = rows[targetRowIndex];

    const fromIndex = findProductIndex(sourceRow, sourceProductId);

    const isTargetRow = isRowId(targetProductId);
    const toIndex = isTargetRow
      ? targetRow.products.length
      : findProductIndex(targetRow, targetProductId);

    if (!canMove(sourceRow, targetRow, fromIndex, toIndex)) {
      return;
    }

    const product = sourceRow.products[fromIndex];
    const sourceProducts = sourceRow.products.filter((_, i) => i !== fromIndex);

    const updatedTargetProducts = [...targetRow.products];
    updatedTargetProducts.splice(toIndex, 0, product);

    const tempRows = updateRowProductList(rows, sourceRowIndex, sourceProducts);
    const updatedRows = updateRowProductList(
      tempRows,
      targetRowIndex,
      updatedTargetProducts
    );

    updateRows(updatedRows);
  };

  const handleDragStart = ({ active }: DragStartEvent) => {
    const sourceRow =
      rows.find((row) =>
        row.products.some((product) => product.id === active.id)
      ) ?? null;
    const product = sourceRow?.products.find((p) => p.id === active.id) ?? null;

    setDraggedProduct(product);
    setDraggedRow(sourceRow);
  };

  const handleDragOver = ({ over }: DragOverEvent) => {
    setOverProductId((over?.id as string) ?? null);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setDraggedRow(null);
    setOverProductId(null);

    if (!over || active.id === over.id) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (isRowId(activeId) && isRowId(overId)) {
      reorderRows(activeId, overId);
      return;
    }

    const sourceRowIndex = findRowIndexByProductId(rows, activeId);
    const targetRowIndex = isRowId(overId)
      ? rows.findIndex((row) => row.id === overId)
      : findRowIndexByProductId(rows, overId);

    if (sourceRowIndex === -1 || targetRowIndex === -1) return;

    if (sourceRowIndex === targetRowIndex) {
      reorderWithinRow(sourceRowIndex, activeId, overId);
    } else {
      moveBetweenRows(sourceRowIndex, targetRowIndex, activeId, overId);
    }
  };

  return {
    draggedRow,
    draggedProduct,
    overProductId,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
};
