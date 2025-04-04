import { DndContext } from "@dnd-kit/core";
import { Alert, Box, LinearProgress, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { ProductRow } from "../../components/Product/Row/ProductRow";
import { useGridEditor } from "../../hooks/useGridEditor";
import { useProducts } from "../../hooks/useProducts";
import styles from "./styles.module.scss";
import { AddRowPlaceholder } from "../../components/Product/Row/AddRowPlaceholder";

export const EditorPage = () => {
  const [params] = useSearchParams();
  const productIds = params.get("products")?.split(",") ?? null;
  const { data: products, isLoading } = useProducts(productIds);

  const {
    rows,
    draggedRow,
    handleDragStart,
    handleDragEnd,
    handleAddRow,
    handleDeleteRow,
  } = useGridEditor(products);

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

          <Box className={styles["editor-page__rows"]}>
            <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
              {rows.map(({ id, products }) => (
                <ProductRow
                  key={id}
                  id={id}
                  products={products ?? []}
                  draggedRow={draggedRow}
                  handleDelete={handleDeleteRow}
                />
              ))}
            </DndContext>
            <AddRowPlaceholder onClick={handleAddRow} />
          </Box>
        </>
      )}
    </Box>
  );
};
