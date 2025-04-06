import { closestCenter, DndContext, DragOverlay } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Box, LinearProgress } from "@mui/material";
import { GridEditorActions } from "../../components/Actions";
import { ProductCard } from "../../components/Product/Card";
import { AddRowPlaceholder } from "../../components/Product/Row/AddRowPlaceholder";
import { SortableProductRow } from "../../components/Product/Row/SortableProductRow";
import { useGridEditor } from "../../hooks/useGridEditor";
import styles from "./styles.module.scss";
import logo from "/images/zara.svg";

export const EditorPage = () => {
  const {
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
    handleDragOver,
    handleDragStart,
    handleDragEnd,
    handleAddRow,
    handleDeleteRow,
    handleTemplateChange,
    handleZoomIn,
    handleZoomOut,
    handleSave,
  } = useGridEditor();

  return (
    <Box className={styles["editor-page"]}>
      <Box className={styles["editor-page__header"]}>
        <img src={logo} alt="Icon" className={styles["editor-page__logo"]} />
      </Box>

      {isLoading ? (
        <LinearProgress
          className={styles["editor-page__loader"]}
          color="inherit"
        />
      ) : (
        <>
          <Box className={styles["editor-page__body"]}>
            <Box
              className={styles["editor-page__rows"]}
              style={{ "--zoom-factor": currentZoom } as React.CSSProperties}
            >
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragOver={handleDragOver}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={rows}
                  strategy={verticalListSortingStrategy}
                >
                  {rows.map((row) => (
                    <SortableProductRow
                      key={row.id}
                      row={row}
                      draggedRow={draggedRow}
                      overProductId={overProductId}
                      currentZoom={currentZoom}
                      templates={templates}
                      onDelete={handleDeleteRow}
                      onTemplateChange={handleTemplateChange}
                    />
                  ))}
                </SortableContext>

                <DragOverlay>
                  {draggedProduct ? (
                    <ProductCard
                      product={draggedProduct}
                      hasDragOverlay
                      currentZoom={currentZoom}
                    />
                  ) : null}
                </DragOverlay>
              </DndContext>

              <AddRowPlaceholder onClick={handleAddRow} />
            </Box>
          </Box>

          <GridEditorActions
            isMinZoom={isMinZoom}
            isMaxZoom={isMaxZoom}
            isSaving={isSaving}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onSave={handleSave}
          />
        </>
      )}
    </Box>
  );
};
