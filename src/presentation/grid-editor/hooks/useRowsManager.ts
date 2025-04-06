import { MAX_PRODUCTS_ROW_LENGTH } from "@/config/constants";
import { Product } from "@/domain/models/Product";
import { chunkArray } from "@/utils";
import { useState, useRef, useEffect } from "react";
import { DraftProductRow } from "../models/DraftProductRow";

export const useRowsManager = (initialProducts: Product[] | undefined) => {
  const [rows, setRows] = useState<DraftProductRow[]>([]);
  const lastRowId = useRef(0);
  const initialized = useRef(false);

  useEffect(() => {
    const isValidProductArray =
      Array.isArray(initialProducts) && initialProducts.length > 0;

    if (initialized.current || !isValidProductArray) return;

    initialized.current = true;
    const chunked = chunkArray(initialProducts, MAX_PRODUCTS_ROW_LENGTH).map(
      (group, index) => ({
        id: `row-${index}`,
        products: group,
      })
    );

    lastRowId.current += chunked.length;
    setRows(chunked);
  }, [initialProducts, rows]);

  const addRow = () => {
    const newRow = { id: `row-${lastRowId.current}`, products: [] };
    setRows((prev) => [...prev, newRow]);
    lastRowId.current += 1;
  };

  const deleteRow = (id: string) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  const updateRows = (newRows: Array<DraftProductRow>) => {
    setRows(newRows);
  };

  const handleTemplateChange = (rowId: string, templateId: string) => {
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === rowId ? { ...row, templateId } : row))
    );
  };

  return { rows, updateRows, addRow, deleteRow, handleTemplateChange };
};
