import { useSearchParams } from "react-router-dom";
import { useSnackbarStore } from "@/presentation/shared/store/snackbarStore";
import { useEffect, useRef } from "react";
import { InditexRepositoryImpl } from "@/infraestructure/repositories/InditexRepositoryImpl";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@/domain/models/Product";

const NO_PRODUCTS_MESSAGE_CLOSE_TIME = 10000;

export const useProducts = (repository: InditexRepositoryImpl) => {
  const [params] = useSearchParams();
  const productIds = params.get("products")?.split(",") ?? null;

  const { data: products, isLoading } = useQuery<Array<Product>>({
    queryKey: ["products", productIds],
    queryFn: () => repository.getProductsByIds(productIds),
  });

  const hasShownSnackbar = useRef(false);
  const { addSnackbar } = useSnackbarStore();

  useEffect(() => {
    if (hasShownSnackbar.current || isLoading || !products || productIds)
      return;

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
  }, [productIds, products, isLoading, addSnackbar]);

  return { products, isLoading };
};
