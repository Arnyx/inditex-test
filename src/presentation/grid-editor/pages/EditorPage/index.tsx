import { Alert, Typography, Box, LinearProgress } from "@mui/material";
import { useProducts } from "../../hooks/useProducts";
import { useSearchParams } from "react-router-dom";
import { ProductRow } from "../../components/Product/Row";
import { chunkArray } from "@/utils";
import { PRODUCTS_ROW_COUNT } from "@/config/constants";
import { useEffect, useState } from "react";
import styles from "./EditorPage.module.scss";

export const EditorPage = () => {
  const [params] = useSearchParams();
  const productIds = params.get("products")?.split(",") ?? null;

  const { data: products, isLoading } = useProducts(productIds);
  const [rows, setRows] = useState<Array<typeof products>>([]);

  useEffect(() => {
    if (products) {
      const chunked = chunkArray(products, PRODUCTS_ROW_COUNT);
      setRows(chunked);
    }
  }, [products]);

  return (
    <>
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
          <Alert severity="info" sx={{ mb: 2 }}>
            No product IDs were specified in the URL. All products have been
            loaded. You can provide specific ones by adding{" "}
            <strong>?products=1,2,3</strong> to the URL.
          </Alert>
          {rows.map((productRow, index) => (
            <Box key={`row-${index}`} sx={{ mb: 3 }}>
              <ProductRow products={productRow ?? []} />
            </Box>
          ))}
        </>
      )}
    </>
  );
};
