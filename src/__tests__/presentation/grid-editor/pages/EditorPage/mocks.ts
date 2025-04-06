import { vi } from "vitest";
import type { useGridEditor } from "@/presentation/grid-editor/hooks/useGridEditor";

export const createMockGridEditor = (
  overrides: Partial<ReturnType<typeof useGridEditor>> = {}
): ReturnType<typeof useGridEditor> => ({
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
  sensors: [],
  handleDragOver: vi.fn(),
  handleDragStart: vi.fn(),
  handleDragEnd: vi.fn(),
  handleAddRow: vi.fn(),
  handleDeleteRow: vi.fn(),
  handleTemplateChange: vi.fn(),
  handleZoomIn: vi.fn(),
  handleZoomOut: vi.fn(),
  handleSave: vi.fn(),
  ...overrides,
});
