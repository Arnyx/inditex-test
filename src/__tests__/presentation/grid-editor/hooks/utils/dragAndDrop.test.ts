import {
  updateRowProductList,
  isRowId,
  findRowIndexByProductId,
  findProductIndex,
  canMove,
} from "@/presentation/grid-editor/hooks/utils/dragAndDrop";

import type { DraftProductRow } from "@/presentation/grid-editor/models/DraftProductRow";
import { MAX_PRODUCTS_ROW_LENGTH } from "@/config/constants";

describe("dragAndDrop utils", () => {
  const row1 = {
    id: "row-1",
    products: [
      { id: "1", name: "P1", price: 10, image: "" },
      { id: "2", name: "P2", price: 15, image: "" },
    ],
  };

  const row2 = {
    id: "row-2",
    products: [{ id: "3", name: "P3", price: 20, image: "" }],
  };

  const rows: DraftProductRow[] = [row1, row2];

  describe("updateRowProductList", () => {
    it("should update the product list of a row", () => {
      const newProducts = [{ id: "4", name: "P4", price: 99, image: "" }];
      const updated = updateRowProductList(rows, 1, newProducts);

      expect(updated[1].products).toEqual(newProducts);
      expect(updated[0].products).toEqual(row1.products);
    });
  });

  describe("isRowId", () => {
    it("should return true for valid row id", () => {
      expect(isRowId("row-1")).toBe(true);
    });

    it("should return false for invalid row id", () => {
      expect(isRowId("product-1")).toBe(false);
    });
  });

  describe("findRowIndexByProductId", () => {
    it("should return correct row index containing product", () => {
      const index = findRowIndexByProductId(rows, "3");
      expect(index).toBe(1);
    });

    it("should return -1 if product not found", () => {
      const index = findRowIndexByProductId(rows, "999");
      expect(index).toBe(-1);
    });
  });

  describe("findProductIndex", () => {
    it("should return correct product index within row", () => {
      const index = findProductIndex(row1, "2");
      expect(index).toBe(1);
    });

    it("should return -1 if product not found", () => {
      const index = findProductIndex(row1, "999");
      expect(index).toBe(-1);
    });
  });

  describe("canMove", () => {
    it("should return true when move is valid", () => {
      const sourceRow = { ...row1 };
      const targetRow = { ...row2 };
      const result = canMove(sourceRow, targetRow, 1, 0);
      expect(result).toBe(true);
    });

    it("should return false if fromIndex or toIndex is -1", () => {
      expect(canMove(row1, row2, -1, 0)).toBe(false);
      expect(canMove(row1, row2, 0, -1)).toBe(false);
    });

    it("should return false if source row has min products", () => {
      const sourceRow = { ...row2 };
      const targetRow = { ...row1 };
      expect(canMove(sourceRow, targetRow, 0, 1)).toBe(false);
    });

    it("should return false if target row has max products", () => {
      const fullRow = {
        id: "row-full",
        products: Array(MAX_PRODUCTS_ROW_LENGTH).fill({
          id: "x",
          name: "",
          price: 0,
          image: "",
        }),
      };
      expect(canMove(row1, fullRow, 1, 0)).toBe(false);
    });
  });
});
