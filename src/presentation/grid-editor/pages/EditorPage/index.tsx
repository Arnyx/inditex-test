import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { Alert, Box, LinearProgress, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { AddRowPlaceholder } from "../../components/Product/Row/AddRowPlaceholder";
import { useGridEditor } from "../../hooks/useGridEditor";
import { useProducts } from "../../hooks/useProducts";
import styles from "./styles.module.scss";
import { SortableProductRow } from "../../components/Product/Row/SortableProductRow";
import { ProductCard } from "../../components/Product/Card";
import { GridEditorActions } from "../../components/Actions";
import { useZoom } from "../../hooks/useZoom";

export const EditorPage = () => {
  const [params] = useSearchParams();
  const productIds = params.get("products")?.split(",") ?? null;
  const { data: products, isLoading } = useProducts(productIds);

  const {
    rows,
    draggedRow,
    draggedProduct,
    overProductId,
    handleDragOver,
    handleDragStart,
    handleDragEnd,
    handleAddRow,
    handleDeleteRow,
  } = useGridEditor(products);

  const {
    currentZoom,
    isMinZoom,
    isMaxZoom,
    handleZoomIn,
    handleZoomOut,
    handleResetZoom,
  } = useZoom();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <Box className={styles["editor-page"]}>
      <Box className={styles["editor-page__title"]}>
        <Typography variant="h4">Editor de Parrillas</Typography>
      </Box>

      {isLoading ? (
        <LinearProgress
          className={styles["editor-page__loader"]}
          color="inherit"
        />
      ) : (
        <>
          {!productIds && (
            <Alert severity="info" sx={{ mb: 2 }}>
              No product IDs were specified in the URL. All products have been
              loaded. You can provide specific ones by adding{" "}
              <strong>?products=1,2,3</strong> to the URL.
            </Alert>
          )}

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
                <SortableContext items={rows}>
                  {rows.map((row) => (
                    <SortableProductRow
                      key={row.id}
                      row={row}
                      draggedRow={draggedRow}
                      overProductId={overProductId}
                      currentZoom={currentZoom}
                      handleDelete={handleDeleteRow}
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
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onReset={handleResetZoom}
          />
        </>
      )}
    </Box>
  );
};
