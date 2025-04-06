import { renderHook } from "@testing-library/react";
import { useGridEditor } from "@/presentation/grid-editor/hooks/useGridEditor";
import { vi } from "vitest";

vi.mock("@/presentation/grid-editor/hooks/useProducts", () => ({
  useProducts: () => ({ products: [], isLoading: false }),
}));

vi.mock("@/presentation/grid-editor/hooks/useTemplates", () => ({
  useTemplates: () => ({ data: [] }),
}));

vi.mock("@/presentation/grid-editor/hooks/useRowsManager", () => ({
  useRowsManager: () => ({
    rows: [],
    updateRows: vi.fn(),
    addRow: vi.fn(),
    deleteRow: vi.fn(),
    handleTemplateChange: vi.fn(),
  }),
}));

vi.mock("@/presentation/grid-editor/hooks/useDragAndDrop", () => ({
  useDragAndDrop: () => ({
    draggedRow: null,
    draggedProduct: null,
    overProductId: null,
    handleDragStart: vi.fn(),
    handleDragOver: vi.fn(),
    handleDragEnd: vi.fn(),
  }),
}));

vi.mock("@/presentation/grid-editor/hooks/useZoom", () => ({
  useZoom: () => ({
    currentZoom: 1,
    isMinZoom: false,
    isMaxZoom: false,
    handleZoomIn: vi.fn(),
    handleZoomOut: vi.fn(),
  }),
}));

vi.mock("@/presentation/grid-editor/hooks/useSaveGrid", () => ({
  useSaveGrid: () => ({
    isSaving: false,
    handleSave: vi.fn(),
  }),
}));

describe("useGridEditor", () => {
  it("returns expected values", () => {
    const { result } = renderHook(() => useGridEditor());

    expect(result.current).toMatchObject({
      isLoading: false,
      templates: [],
      rows: [],
      draggedRow: null,
      draggedProduct: null,
      overProductId: null,
      isSaving: false,
      currentZoom: 1,
      isMinZoom: false,
      isMaxZoom: false,
      sensors: expect.any(Array),
      handleDragStart: expect.any(Function),
      handleDragOver: expect.any(Function),
      handleDragEnd: expect.any(Function),
      handleAddRow: expect.any(Function),
      handleDeleteRow: expect.any(Function),
      handleTemplateChange: expect.any(Function),
      handleZoomIn: expect.any(Function),
      handleZoomOut: expect.any(Function),
      handleSave: expect.any(Function),
    });
  });
});
