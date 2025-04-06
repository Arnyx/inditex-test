import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import { useGridEditor } from "@/presentation/grid-editor/hooks/useGridEditor";
import { EditorPage } from "@/presentation/grid-editor/pages/EditorPage";
import { createMockGridEditor } from "./mocks";
import userEvent from "@testing-library/user-event";
import { DraftProductRow } from "@/presentation/grid-editor/models/DraftProductRow";

vi.mock(
  "@/presentation/grid-editor/components/Product/Row/SortableProductRow",
  () => ({
    SortableProductRow: ({ row }: { row: DraftProductRow }) => (
      <div data-testid="sortable-product-row">{row.id}</div>
    ),
  })
);
vi.mock("@/presentation/grid-editor/components/Product/Card", () => ({
  ProductCard: () => <div data-testid="product-card">Product</div>,
}));
vi.mock(
  "@/presentation/grid-editor/components/Product/Row/AddRowPlaceholder",
  () => ({
    AddRowPlaceholder: ({ onClick }: { onClick: () => void }) => (
      <button onClick={onClick}>Add Row</button>
    ),
  })
);
vi.mock("@/presentation/grid-editor/components/Actions", () => ({
  GridEditorActions: () => <div data-testid="grid-actions">Actions</div>,
}));

vi.mock("@/presentation/grid-editor/hooks/useGridEditor", async () => {
  const actual = await vi.importActual<
    typeof import("@/presentation/grid-editor/hooks/useGridEditor")
  >("@/presentation/grid-editor/hooks/useGridEditor");
  return {
    ...actual,
    useGridEditor: vi.fn(),
  };
});

describe("EditorPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should show loader while loading", () => {
    (useGridEditor as Mock).mockReturnValue(
      createMockGridEditor({ isLoading: true })
    );

    render(<EditorPage />);

    expect(screen.getByRole("progressbar")).toBeTruthy();
  });

  it("should render rows when not loading", () => {
    const rows: DraftProductRow[] = [
      {
        id: "row-1",
        products: [
          { id: "p-1", name: "Product 1", image: "fakeImage.png", price: 10 },
        ],
      },
      {
        id: "row-2",
        products: [
          { id: "p-2", name: "Product 2", image: "fakeImage.png", price: 20 },
        ],
      },
    ];
    (useGridEditor as Mock).mockReturnValue(createMockGridEditor({ rows }));

    render(<EditorPage />);

    const foundRows = screen.getAllByTestId("sortable-product-row");
    expect(foundRows).toHaveLength(2);
    expect(foundRows[0].textContent).toBe("row-1");
    expect(foundRows[1].textContent).toBe("row-2");
  });

  it("should call handleAddRow when Add Row button is clicked", async () => {
    const handleAddRow = vi.fn();
    (useGridEditor as Mock).mockReturnValue(
      createMockGridEditor({ handleAddRow })
    );
    const user = userEvent.setup();

    render(<EditorPage />);

    const button = screen.getByText("Add Row");
    await user.click(button);

    expect(handleAddRow).toHaveBeenCalled();
  });
});
