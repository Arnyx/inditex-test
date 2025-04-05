import { useState, useRef, useEffect } from "react";
import {
  MAX_PRODUCTS_ROW_LENGTH,
  MIN_PRODUCTS_ROW_LENGTH,
} from "@/config/constants";
import { chunkArray } from "@/utils";
import type { Product } from "@/domain/models/Product";
import type {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { DraftProductRow } from "../models/DraftProductRow";
import { useMutation } from "@tanstack/react-query";
import { InditexRepositoryImpl } from "@/infraestructure/repositories/InditexRepositoryImpl";
import { ProductRow } from "@/domain/models/ProductRow";
import { useSnackbarStore } from "@/presentation/shared/store/snackbarStore";
import { mapDraftToDomain } from "../mappers/toDomainGrid";

export const useGridEditor = (
  repository: InditexRepositoryImpl,
  products: Array<Product> | undefined
) => {
  const [rows, setRows] = useState<Array<DraftProductRow>>([]);
  const [draggedRow, setDraggedRow] = useState<DraftProductRow | null>(null);
  const [draggedProduct, setDraggedProduct] = useState<Product | null>(null);
  const [overProductId, setOverProductId] = useState<string | null>(null);
  const { addSnackbar } = useSnackbarStore();
  const lastRowId = useRef(0);

  const { mutate: save, isPending: isSaving } = useMutation({
    mutationFn: (grid: Array<ProductRow>) => repository.saveGrid(grid),
    onSuccess: () => {
      addSnackbar({
        message: "Grid saved successfully",
        type: "success",
      });
    },
    onError: (error) => {
      addSnackbar({
        message: error.message || "Error saving grid",
        type: "error",
      });
    },
  });

  useEffect(() => {
    if (!products) return;

    const chunked = chunkArray(products, MAX_PRODUCTS_ROW_LENGTH).map(
      (group, index) => ({
        id: `row-${index}`,
        products: group,
      })
    );

    lastRowId.current += chunked.length;
    setRows(chunked);
  }, [products]);

  const handleAddRow = () => {
    const newRow = {
      id: `row-${lastRowId.current}`,
      products: [],
    };
    setRows((prevRows) => [...prevRows, newRow]);
    lastRowId.current += 1;
  };

  const handleDeleteRow = (id: string) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  const handleDragOver = ({ over }: DragOverEvent) => {
    setOverProductId((over?.id as string) ?? null);
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

  const findRowIndexByProductId = (productId: string): number =>
    rows.findIndex((row) => row.products.some((p) => p.id === productId));

  const findProductIndex = (row: DraftProductRow, productId: string): number =>
    row.products.findIndex((p) => p.id === productId);

  const isRowId = (id: string) => id.startsWith("row-");

  const reorderRows = (activeRowId: string, overRowId: string) => {
    const oldIndex = rows.findIndex((row) => row.id === activeRowId);
    const newIndex = rows.findIndex((row) => row.id === overRowId);
    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = arrayMove(rows, oldIndex, newIndex);
    setRows(reordered);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setDraggedRow(null);
    setOverProductId(null);

    if (!over || active.id === over.id) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Moving rows
    if (isRowId(activeId) && isRowId(overId)) {
      reorderRows(activeId, overId);
      return;
    }

    // Moving products
    const sourceRowIndex = findRowIndexByProductId(activeId);
    const targetRowIndex = isRowId(overId)
      ? rows.findIndex((row) => row.id === overId)
      : findRowIndexByProductId(overId);

    if (sourceRowIndex === -1 || targetRowIndex === -1) return;

    if (sourceRowIndex === targetRowIndex) {
      reorderWithinRow(sourceRowIndex, activeId, overId);
    } else {
      moveBetweenRows(sourceRowIndex, targetRowIndex, activeId, overId);
    }
  };

  const reorderWithinRow = (rowIndex: number, fromId: string, toId: string) => {
    const row = rows[rowIndex];
    const fromIndex = findProductIndex(row, fromId);
    const toIndex = findProductIndex(row, toId);

    if (fromIndex === -1 || toIndex === -1) return;

    const updatedRows = [...rows];
    updatedRows[rowIndex] = {
      ...row,
      products: arrayMove(row.products, fromIndex, toIndex),
    };

    setRows(updatedRows);
  };

  const moveBetweenRows = (
    sourceRowIndex: number,
    targetRowIndex: number,
    fromId: string,
    toId: string
  ) => {
    const sourceRow = rows[sourceRowIndex];
    const targetRow = rows[targetRowIndex];

    const fromIndex = findProductIndex(sourceRow, fromId);

    const isTargetRow = isRowId(toId);
    const toIndex = isTargetRow
      ? targetRow.products.length
      : findProductIndex(targetRow, toId);

    if (
      fromIndex === -1 ||
      toIndex === -1 ||
      sourceRow.products.length === MIN_PRODUCTS_ROW_LENGTH ||
      targetRow.products.length === MAX_PRODUCTS_ROW_LENGTH
    ) {
      return;
    }

    const product = sourceRow.products[fromIndex];
    const updatedRows = [...rows];

    updatedRows[sourceRowIndex] = {
      ...sourceRow,
      products: sourceRow.products.filter((_, i) => i !== fromIndex),
    };

    const updatedTargetProducts = [...targetRow.products];
    updatedTargetProducts.splice(toIndex, 0, product);

    updatedRows[targetRowIndex] = {
      ...targetRow,
      products: updatedTargetProducts,
    };

    setRows(updatedRows);
  };

  const handleTemplateChange = (rowId: string, templateId: string) => {
    const index = rows.findIndex((row) => row.id === rowId);
    if (index === -1) return;

    setRows((prevRows) =>
      prevRows.map((row, i) => (i === index ? { ...row, templateId } : row))
    );
  };

  const handleSave = () => {
    if (rows.some((row) => !row.templateId)) {
      addSnackbar({
        message: "All rows must have a template",
        type: "error",
      });

      return;
    }

    if (rows.some((row) => !row.products.length)) {
      addSnackbar({
        message: "All rows must have at least one product",
        type: "error",
      });

      return;
    }

    save(mapDraftToDomain(rows));
  };

  return {
    rows,
    draggedRow,
    draggedProduct,
    overProductId,
    isSaving,
    handleDragOver,
    handleDragStart,
    handleDragEnd,
    handleAddRow,
    handleDeleteRow,
    handleTemplateChange,
    handleSave,
  };
};
