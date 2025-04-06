import { renderHook, act } from "@testing-library/react";
import { useZoom } from "@/presentation/grid-editor/hooks/useZoom";
import { MAX_ZOOM, MIN_ZOOM, ZOOM_STEP } from "@/config/constants";

describe("useZoom", () => {
  it("should start at max zoom", () => {
    const { result } = renderHook(() => useZoom());
    expect(result.current.currentZoom).toBe(MAX_ZOOM);
  });

  it("should zoom out correctly", () => {
    const { result } = renderHook(() => useZoom());

    act(() => {
      result.current.handleZoomOut();
    });

    expect(result.current.currentZoom).toBe(MAX_ZOOM - ZOOM_STEP);
    expect(result.current.isMaxZoom).toBe(false);
  });

  test("should not go below min zoom", () => {
    const { result } = renderHook(() => useZoom());

    act(() => {
      for (let i = 0; i < 10; i++) result.current.handleZoomOut();
    });

    expect(result.current.currentZoom).toBe(MIN_ZOOM);
    expect(result.current.isMinZoom).toBe(true);
  });
});
