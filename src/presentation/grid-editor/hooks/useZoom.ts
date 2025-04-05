import { roundDecimals } from "@/utils";
import { useState } from "react";

const MIN_ZOOM = 0.2;
const MAX_ZOOM = 1;
const ZOOM_STEP = 0.1;

export const useZoom = () => {
  const [currentZoom, setCurrentZoom] = useState(MAX_ZOOM);

  const handleZoomIn = () =>
    setCurrentZoom((prev) =>
      roundDecimals(Math.min(prev + ZOOM_STEP, MAX_ZOOM))
    );

  const handleZoomOut = () =>
    setCurrentZoom((prev) =>
      roundDecimals(Math.max(prev - ZOOM_STEP, MIN_ZOOM))
    );

  const handleResetZoom = () => setCurrentZoom(MAX_ZOOM);

  return {
    currentZoom,
    handleZoomIn,
    handleZoomOut,
    handleResetZoom,
    isMinZoom: currentZoom <= MIN_ZOOM,
    isMaxZoom: currentZoom >= MAX_ZOOM,
  };
};
