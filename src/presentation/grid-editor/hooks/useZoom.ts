import { MAX_ZOOM, ZOOM_STEP, MIN_ZOOM } from "@/config/constants";
import { roundDecimals } from "@/utils";
import { useState } from "react";

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

  return {
    currentZoom,
    handleZoomIn,
    handleZoomOut,
    isMinZoom: currentZoom <= MIN_ZOOM,
    isMaxZoom: currentZoom >= MAX_ZOOM,
  };
};
