import { renderHook, act } from "@testing-library/react";
import type {
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
} from "@dnd-kit/core";
import { useDragAndDrop } from "@/presentation/grid-editor/hooks/useDragAndDrop";
import { DraftProductRow } from "@/presentation/grid-editor/models/DraftProductRow";
import { MAX_PRODUCTS_ROW_LENGTH } from "@/config/constants";

const mockRows: DraftProductRow[] = [
  {
    id: "row-1",
    products: [{ id: "1", name: "Product 1", price: 10, image: "" }],
  },
  {
    id: "row-2",
    products: [{ id: "2", name: "Product 2", price: 20, image: "" }],
  },
];

describe("useDragAndDrop", () => {
  let rows: DraftProductRow[];
  let updateRows: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    rows = structuredClone(mockRows);
    updateRows = vi.fn();
  });

  it("should set draggedProduct and draggedRow on drag start", () => {
    const { result } = renderHook(() => useDragAndDrop({ rows, updateRows }));

    act(() => {
      result.current.handleDragStart({ active: { id: "1" } } as DragStartEvent);
    });

    expect(result.current.draggedProduct?.id).toBe("1");
    expect(result.current.draggedRow?.id).toBe("row-1");
  });

  it("should set overProductId on drag over", () => {
    const { result } = renderHook(() => useDragAndDrop({ rows, updateRows }));

    act(() => {
      result.current.handleDragOver({ over: { id: "2" } } as DragOverEvent);
    });

    expect(result.current.overProductId).toBe("2");
  });

  it("should reorder rows on drag end when moving rows", () => {
    const { result } = renderHook(() => useDragAndDrop({ rows, updateRows }));

    act(() => {
      result.current.handleDragEnd({
        active: { id: mockRows[0].id },
        over: { id: mockRows[1].id },
      } as DragEndEvent);
    });

    expect(updateRows).toHaveBeenCalledWith([mockRows[1], mockRows[0]]);
  });

  it("should not do anything if drag end over is null or same as active", () => {
    const { result } = renderHook(() => useDragAndDrop({ rows, updateRows }));

    act(() => {
      result.current.handleDragEnd({ active: { id: "1" } } as DragEndEvent);
    });

    expect(updateRows).not.toHaveBeenCalled();

    act(() => {
      result.current.handleDragEnd({
        active: { id: "1" },
        over: { id: "1" },
      } as DragEndEvent);
    });

    expect(updateRows).not.toHaveBeenCalled();
  });

  it("should reorder products within the same row", () => {
    const customRows = [
      {
        id: "row-1",
        products: [
          { id: "1", name: "Product 1", price: 10, image: "" },
          { id: "2", name: "Product 2", price: 20, image: "" },
        ],
      },
    ];

    const mockUpdate = vi.fn();

    const { result } = renderHook(() =>
      useDragAndDrop({ rows: customRows, updateRows: mockUpdate })
    );

    act(() => {
      result.current.handleDragEnd({
        active: { id: "1" },
        over: { id: "2" },
      } as DragEndEvent);
    });

    expect(mockUpdate).toHaveBeenCalledWith([
      {
        id: "row-1",
        products: [
          { id: "2", name: "Product 2", price: 20, image: "" },
          { id: "1", name: "Product 1", price: 10, image: "" },
        ],
      },
    ]);
  });

  it("should move product from one row to another", () => {
    const mockUpdate = vi.fn();

    const customRows = [
      {
        id: "row-1",
        products: [
          { id: "1", name: "P1", price: 10, image: "" },
          { id: "2", name: "P2", price: 20, image: "" },
        ],
      },
      {
        id: "row-2",
        products: [{ id: "3", name: "P3", price: 30, image: "" }],
      },
    ];

    const { result } = renderHook(() =>
      useDragAndDrop({ rows: customRows, updateRows: mockUpdate })
    );

    act(() => {
      result.current.handleDragEnd({
        active: { id: "2" },
        over: { id: "row-2" },
      } as DragEndEvent);
    });

    expect(mockUpdate).toHaveBeenCalledWith([
      {
        id: "row-1",
        products: [{ id: "1", name: "P1", price: 10, image: "" }],
      },
      {
        id: "row-2",
        products: [
          { id: "3", name: "P3", price: 30, image: "" },
          { id: "2", name: "P2", price: 20, image: "" },
        ],
      },
    ]);
  });

  it("should not move product if constraints are violated", () => {
    const mockUpdate = vi.fn();

    const customRows = [
      {
        id: "row-1",
        products: [{ id: "1", name: "P1", price: 10, image: "" }],
      },
      {
        id: "row-2",
        products: new Array(MAX_PRODUCTS_ROW_LENGTH).fill(null).map((_, i) => ({
          id: `${i + 2}`,
          name: `P${i + 2}`,
          price: 10,
          image: "",
        })),
      },
    ];

    const { result } = renderHook(() =>
      useDragAndDrop({ rows: customRows, updateRows: mockUpdate })
    );

    act(() => {
      result.current.handleDragEnd({
        active: { id: "1" },
        over: { id: "row-2" },
      } as DragEndEvent);
    });

    expect(mockUpdate).not.toHaveBeenCalled();
  });
});
