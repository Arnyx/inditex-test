import { renderHook, waitFor } from "@testing-library/react";
import { useProducts } from "@/presentation/grid-editor/hooks/useProducts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSnackbarStore } from "@/presentation/shared/store/snackbarStore";
import { useSearchParams } from "react-router-dom";
import { Product } from "@/domain/models/Product";
import { Mock, vi } from "vitest";
import { InditexRepositoryImpl } from "@/infraestructure/repositories/InditexRepositoryImpl";

vi.mock("react-router-dom", () => ({
  useSearchParams: vi.fn(),
}));

vi.mock("@/presentation/shared/store/snackbarStore", () => ({
  useSnackbarStore: vi.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useProducts", () => {
  const mockAddSnackbar = vi.fn();
  const mockGetProductsByIds = vi.fn();

  const repository = new InditexRepositoryImpl({
    getProductsByIds: mockGetProductsByIds,
    getTemplates: vi.fn(),
    saveGrid: vi.fn(),
  });

  beforeEach(() => {
    vi.clearAllMocks();

    (useSnackbarStore as unknown as Mock).mockReturnValue({
      addSnackbar: mockAddSnackbar,
    });
  });

  it("returns products and isLoading", async () => {
    const products = [
      { id: "1", name: "Product 1", price: 10, image: "" },
      { id: "2", name: "Product 2", price: 10, image: "" },
    ] as Product[];

    (useSearchParams as Mock).mockReturnValue([
      new URLSearchParams("?products=1"),
    ]);

    mockGetProductsByIds.mockResolvedValue(products);

    const { result } = renderHook(() => useProducts(repository), {
      wrapper: createWrapper(),
    });

    expect(mockGetProductsByIds).toHaveBeenCalledWith(["1"]);

    await waitFor(() => {
      expect(result.current.products).toEqual(products);
      expect(result.current.isLoading).toBe(false);
    });
  });

  it("shows snackbar if no productIds and products are loaded", async () => {
    const products = [{ id: "1", name: "Product", price: 10, image: "" }];

    (useSearchParams as Mock).mockReturnValue([new URLSearchParams("")]);

    mockGetProductsByIds.mockResolvedValue(products);

    renderHook(() => useProducts(repository), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(mockAddSnackbar).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "info",
        })
      );
    });
  });

  it("does not show snackbar if still loading", async () => {
    (useSearchParams as Mock).mockReturnValue([new URLSearchParams("")]);

    let resolveFn: (value: Product[]) => void;
    const loadingPromise = new Promise<Product[]>((res) => {
      resolveFn = res;
    });

    mockGetProductsByIds.mockReturnValue(loadingPromise);

    renderHook(() => useProducts(repository), {
      wrapper: createWrapper(),
    });

    await new Promise((r) => setTimeout(r, 100));

    expect(mockAddSnackbar).not.toHaveBeenCalled();

    resolveFn!([]);
  });

  it("does not show snackbar if productIds are present", async () => {
    (useSearchParams as Mock).mockReturnValue([
      new URLSearchParams("?products=1"),
    ]);

    mockGetProductsByIds.mockResolvedValue([
      { id: "1", name: "Product", price: 10, image: "" },
    ]);

    renderHook(() => useProducts(repository), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(mockAddSnackbar).not.toHaveBeenCalled();
    });
  });
});
