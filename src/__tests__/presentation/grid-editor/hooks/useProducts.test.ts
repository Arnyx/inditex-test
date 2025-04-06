import { renderHook } from "@testing-library/react";
import { useProducts } from "@/presentation/grid-editor/hooks/useProducts";
import { useQuery } from "@tanstack/react-query";
import { useSnackbarStore } from "@/presentation/shared/store/snackbarStore";
import { useSearchParams } from "react-router-dom";
import { Product } from "@/domain/models/Product";
import { Mock, vi } from "vitest";
import { InditexRepositoryImpl } from "@/infraestructure/repositories/InditexRepositoryImpl";

vi.mock("react-router-dom", () => ({
  useSearchParams: vi.fn(),
}));

vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(),
}));

vi.mock("@/presentation/shared/store/snackbarStore", () => ({
  useSnackbarStore: vi.fn(),
}));

describe("useProducts", () => {
  const mockAddSnackbar = vi.fn();

  const repository = new InditexRepositoryImpl({
    getProductsByIds: vi.fn(),
    getTemplates: vi.fn(),
    saveGrid: vi.fn(),
  });

  beforeEach(() => {
    vi.clearAllMocks();

    (useSnackbarStore as unknown as Mock).mockReturnValue({
      addSnackbar: mockAddSnackbar,
    });
  });

  it("returns products and isLoading", () => {
    const products = [
      { id: "1", name: "Product", price: 10, image: "" },
    ] as Product[];

    (useSearchParams as Mock).mockReturnValue([
      new URLSearchParams("?products=1"),
    ]);

    (useQuery as Mock).mockReturnValue({
      data: products,
      isLoading: false,
    });

    const { result } = renderHook(() => useProducts(repository));

    expect(result.current.products).toEqual(products);
    expect(result.current.isLoading).toBe(false);
  });

  it("shows snackbar if no productIds and products are loaded", () => {
    (useSearchParams as Mock).mockReturnValue([new URLSearchParams("")]);

    (useQuery as Mock).mockReturnValue({
      data: [{ id: "1", name: "P", price: 10, image: "" }],
      isLoading: false,
    });

    renderHook(() => useProducts(repository));

    expect(mockAddSnackbar).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "info",
      })
    );
  });

  it("does not show snackbar if still loading", () => {
    (useSearchParams as Mock).mockReturnValue([new URLSearchParams("")]);

    (useQuery as Mock).mockReturnValue({
      data: null,
      isLoading: true,
    });

    renderHook(() => useProducts(repository));

    expect(mockAddSnackbar).not.toHaveBeenCalled();
  });

  it("does not show snackbar if productIds are present", () => {
    (useSearchParams as Mock).mockReturnValue([
      new URLSearchParams("?products=1"),
    ]);

    (useQuery as Mock).mockReturnValue({
      data: [{ id: "1", name: "P", price: 10, image: "" }],
      isLoading: false,
    });

    renderHook(() => useProducts(repository));

    expect(mockAddSnackbar).not.toHaveBeenCalled();
  });
});
