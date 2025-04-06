import { renderHook, act, waitFor } from "@testing-library/react";
import { useSaveGrid } from "@/presentation/grid-editor/hooks/useSaveGrid";
import { useSnackbarStore } from "@/presentation/shared/store/snackbarStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { InditexRepositoryImpl } from "@/infraestructure/repositories/InditexRepositoryImpl";
import { DraftProductRow } from "@/presentation/grid-editor/models/DraftProductRow";
import { vi, Mock } from "vitest";

vi.mock("@/presentation/shared/store/snackbarStore", () => ({
  useSnackbarStore: vi.fn(),
}));

vi.mock("@/presentation/grid-editor/mappers/mapDraftToDomain", () => ({
  mapDraftToDomain: vi.fn().mockReturnValue("mapped-grid"),
}));

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useSaveGrid", () => {
  const mockAddSnackbar = vi.fn();
  const mockSaveGrid = vi.fn();

  const validRows: DraftProductRow[] = [
    {
      id: "row-1",
      templateId: "template-1",
      products: [{ id: "p1", name: "Product", price: 10, image: "" }],
    },
  ];

  const repository = new InditexRepositoryImpl({
    getProductsByIds: vi.fn(),
    getTemplates: vi.fn(),
    saveGrid: mockSaveGrid,
  });

  beforeEach(() => {
    vi.clearAllMocks();
    (useSnackbarStore as unknown as Mock).mockReturnValue({
      addSnackbar: mockAddSnackbar,
    });
  });

  it("calls saveGrid if rows are valid", async () => {
    mockSaveGrid.mockResolvedValue(undefined);

    const { result } = renderHook(() => useSaveGrid(validRows, repository), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.handleSave();
    });

    await waitFor(() => {
      expect(mockSaveGrid).toHaveBeenCalledWith("mapped-grid");
      expect(mockAddSnackbar).toHaveBeenCalledWith({
        message: "Grid saved successfully",
        type: "success",
      });
    });
  });

  it("shows error if a row has no template", async () => {
    const invalidRows = [
      {
        id: "row-1",
        templateId: undefined,
        products: [{ id: "p1", name: "Product", price: 10, image: "" }],
      },
    ];

    const { result } = renderHook(() => useSaveGrid(invalidRows, repository), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.handleSave();
    });

    expect(mockSaveGrid).not.toHaveBeenCalled();
    expect(mockAddSnackbar).toHaveBeenCalledWith({
      message: "All rows must have a template",
      type: "error",
    });
  });

  it("shows error if a row has no products", async () => {
    const invalidRows = [
      {
        id: "row-1",
        templateId: "template-1",
        products: [],
      },
    ];

    const { result } = renderHook(() => useSaveGrid(invalidRows, repository), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.handleSave();
    });

    expect(mockSaveGrid).not.toHaveBeenCalled();
    expect(mockAddSnackbar).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "error",
      })
    );
  });

  it("shows error snackbar on saveGrid failure", async () => {
    mockSaveGrid.mockRejectedValue(new Error("Save failed"));

    const { result } = renderHook(() => useSaveGrid(validRows, repository), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.handleSave();
    });

    await waitFor(() => {
      expect(mockAddSnackbar).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "error",
        })
      );
    });
  });
});
