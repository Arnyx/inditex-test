import { useDragAndDrop } from "./useDragAndDrop";
import { useRowsManager } from "./useRowsManager";
import { useSaveGrid } from "./useSaveGrid";
import { useZoom } from "./useZoom";
import { useProducts } from "./useProducts";
import { useMemo } from "react";
import { createInditexRepository } from "@/infraestructure/factories/inditexRepositoryFactory";
import { useTemplates } from "./useTemplates";
import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

export const useGridEditor = () => {
  const repository = useMemo(() => createInditexRepository(), []);

  const { products, isLoading } = useProducts(repository);
  const { data: templates } = useTemplates(repository);

  const {
    rows,
    updateRows,
    addRow: handleAddRow,
    deleteRow: handleDeleteRow,
    handleTemplateChange,
  } = useRowsManager(products);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const {
    draggedRow,
    draggedProduct,
    overProductId,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  } = useDragAndDrop({ rows, updateRows });

  const { currentZoom, isMinZoom, isMaxZoom, handleZoomIn, handleZoomOut } =
    useZoom();

  const { handleSave, isSaving } = useSaveGrid(rows, repository);

  return {
    isLoading,
    templates,
    rows,
    draggedRow,
    draggedProduct,
    overProductId,
    isSaving,
    currentZoom,
    isMinZoom,
    isMaxZoom,
    sensors,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleAddRow,
    handleDeleteRow,
    handleTemplateChange,
    handleZoomIn,
    handleZoomOut,
    handleSave,
  };
};
