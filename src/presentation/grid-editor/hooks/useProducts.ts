import { useQuery } from "@tanstack/react-query";
import { Product } from "@/domain/models/Product";
import { createInditexRepository } from "@/infraestructure/factories/inditexRepositoryFactory";

const repository = createInditexRepository();

export const useProducts = (ids: Array<string> | null) => {
  return useQuery<Array<Product>>({
    queryKey: ["products", ids],
    queryFn: () => repository.getProductsByIds(ids),
  });
};
