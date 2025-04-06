import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddRowPlaceholder } from "@/presentation/grid-editor/components/Product/Row/AddRowPlaceholder";

describe("AddRowPlaceholder", () => {
  it("renders the placeholder text", () => {
    render(<AddRowPlaceholder onClick={() => {}} />);
    expect(screen.getByText("Add new row")).toBeTruthy();
  });

  it("calls onClick when adding a new row", async () => {
    const handleClick = vi.fn();
    render(<AddRowPlaceholder onClick={handleClick} />);

    const clickable = screen.getByRole("region", { name: "Add row" });
    await userEvent.click(clickable);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
