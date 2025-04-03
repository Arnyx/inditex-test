import { Box } from "@mui/material";
import { Product } from "@/domain/models/Product";
import { ProductCard } from "../Card";

type Props = {
  products: Product[];
};

export const ProductRow = ({ products }: Props) => (
  <Box component="ul" sx={{ display: "flex", gap: 2, listStyle: "none", p: 0 }}>
    {products.map((product) => (
      <Box component="li" key={product.id}>
        <ProductCard product={product} />
      </Box>
    ))}
  </Box>
);
