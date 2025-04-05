import { useQuery } from "@tanstack/react-query";
import { Product } from "@/domain/models/Product";
import { InditexRepositoryImpl } from "@/infraestructure/repositories/InditexRepositoryImpl";

export const useProducts = (
  repository: InditexRepositoryImpl,
  ids: Array<string> | null
) => {
  return useQuery<Array<Product>>({
    queryKey: ["products", ids],
    queryFn: () => repository.getProductsByIds(ids),
  });
};
