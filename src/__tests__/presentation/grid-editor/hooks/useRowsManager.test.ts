import { renderHook, act, waitFor } from "@testing-library/react";
import { useRowsManager } from "@/presentation/grid-editor/hooks/useRowsManager";
import type { Product } from "@/domain/models/Product";
import { MAX_PRODUCTS_ROW_LENGTH } from "@/config/constants";

const createProduct = (id: string): Product => ({
  id,
  name: `Product ${id}`,
  price: 10,
  image: "",
});

describe("useRowsManager", () => {
  it("should chunk initial products into rows", async () => {
    const initialProducts = Array.from({ length: 10 }, (_, i) =>
      createProduct(`${i}`)
    );

    const { result } = renderHook(() => useRowsManager(initialProducts));

    await waitFor(() => {
      expect(result.current.rows.length).toBe(
        Math.ceil(initialProducts.length / MAX_PRODUCTS_ROW_LENGTH)
      );
    });
  });

  it("should add a new row", async () => {
    const { result } = renderHook(() => useRowsManager([]));

    act(() => {
      result.current.addRow();
    });

    await waitFor(() => {
      expect(result.current.rows.length).toBe(1);
    });
  });

  it("should delete a row by id", async () => {
    const product = createProduct("1");

    const { result } = renderHook(() =>
      useRowsManager([product, product, product, product])
    );

    const targetId = result.current.rows[0].id;

    act(() => {
      result.current.deleteRow(targetId);
    });

    await waitFor(() => {
      expect(
        result.current.rows.find((r) => r.id === targetId)
      ).toBeUndefined();
    });
  });

  it("should update rows", () => {
    const { result } = renderHook(() => useRowsManager([]));

    const newRow = {
      id: "row-99",
      products: [createProduct("a")],
    };

    act(() => {
      result.current.updateRows([newRow]);
    });

    expect(result.current.rows).toEqual([newRow]);
  });

  it("should change template of a row", async () => {
    const product = createProduct("1");

    const { result } = renderHook(() => useRowsManager([product, product]));

    const targetId = result.current.rows[0].id;

    act(() => {
      result.current.handleTemplateChange(targetId, "template-123");
    });

    await waitFor(() => {
      expect(result.current.rows[0].templateId).toBe("template-123");
    });
  });
});
