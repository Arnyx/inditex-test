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
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Box, LinearProgress } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { AddRowPlaceholder } from "../../components/Product/Row/AddRowPlaceholder";
import { useGridEditor } from "../../hooks/useGridEditor";
import { useProducts } from "../../hooks/useProducts";
import styles from "./styles.module.scss";
import { SortableProductRow } from "../../components/Product/Row/SortableProductRow";
import { ProductCard } from "../../components/Product/Card";
import { GridEditorActions } from "../../components/Actions";
import { useZoom } from "../../hooks/useZoom";
import { useTemplates } from "../../hooks/useTemplates";
import { useSnackbarStore } from "@/presentation/shared/store/snackbarStore";
import { useEffect, useMemo, useRef } from "react";
import { createInditexRepository } from "@/infraestructure/factories/inditexRepositoryFactory";
import logo from "/images/zara.svg";

const NO_PRODUCTS_MESSAGE_CLOSE_TIME = 10000; // 10 seconds

export const EditorPage = () => {
  const [params] = useSearchParams();
  const repository = useMemo(() => createInditexRepository(), []);
  const { addSnackbar } = useSnackbarStore();
  const productIds = params.get("products")?.split(",") ?? null;
  const { data: products, isLoading } = useProducts(repository, productIds);
  const { data: templates } = useTemplates(repository);
  const hasShownSnackbar = useRef(false);

  useEffect(() => {
    if (hasShownSnackbar.current || isLoading || productIds) return;
    hasShownSnackbar.current = true;

    addSnackbar({
      type: "info",
      closeTime: NO_PRODUCTS_MESSAGE_CLOSE_TIME,
      message: (
        <>
          No product IDs were specified in the URL. All products have been
          loaded. You can provide specific ones by adding{" "}
          <strong>?products=1,2,3</strong> to the URL.
        </>
      ),
    });
  }, [productIds, isLoading, addSnackbar]);

  const {
    rows,
    draggedRow,
    draggedProduct,
    overProductId,
    isSaving,
    handleDragOver,
    handleDragStart,
    handleDragEnd,
    handleAddRow,
    handleDeleteRow,
    handleTemplateChange,
    handleSave,
  } = useGridEditor(repository, products);

  const { currentZoom, isMinZoom, isMaxZoom, handleZoomIn, handleZoomOut } =
    useZoom();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
