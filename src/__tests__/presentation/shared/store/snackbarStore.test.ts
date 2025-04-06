import { renderHook, act } from "@testing-library/react";
import { useSnackbarStore } from "@/presentation/shared/store/snackbarStore";

describe("useSnackbarStore", () => {
  beforeEach(() => {
    act(() => {
      useSnackbarStore.setState({ queue: [] });
    });
  });

  it("should add a snackbar to the queue", () => {
    const { result } = renderHook(() => useSnackbarStore());

    act(() => {
      result.current.addSnackbar({ message: "Hello", type: "info" });
    });

    expect(result.current.queue.length).toBe(1);
    expect(result.current.queue[0].message).toBe("Hello");
  });

  it("should remove a snackbar from the queue", () => {
    const { result } = renderHook(() => useSnackbarStore());

    act(() => {
      result.current.addSnackbar({ message: "First" });
      result.current.addSnackbar({ message: "Second" });
    });

    act(() => {
      result.current.removeSnackbar();
    });

    expect(result.current.queue.length).toBe(1);
    expect(result.current.queue[0].message).toBe("Second");
  });

  it("should handle empty queue gracefully on remove", () => {
    const { result } = renderHook(() => useSnackbarStore());

    act(() => {
      result.current.removeSnackbar();
    });

    expect(result.current.queue.length).toBe(0);
  });
});
