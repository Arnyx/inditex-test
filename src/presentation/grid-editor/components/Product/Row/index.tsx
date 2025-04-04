import { Box } from "@mui/material";
import { Product } from "@/domain/models/Product";
import { ProductCard } from "../Card";
import styles from "./Row.module.scss";
import { useDroppable } from "@dnd-kit/core";
import { MAX_PRODUCTS_ROW_LENGTH } from "@/config/constants";

type Props = {
  id: string;
  products: Array<Product>;
  draggedRow: string | null;
};

export const ProductRow = ({ id, products, draggedRow }: Props) => {
  const { isOver, setNodeRef } = useDroppable({ id });
  const isSourceRow = draggedRow === id;
  const isBlocked = products.length === MAX_PRODUCTS_ROW_LENGTH;
  const isDraggingClass = draggedRow ? styles["row--dragging"] : "";
  const isActiveClass = isSourceRow ? styles["row--active"] : "";
  const isOverClass = isOver ? styles["row--over"] : "";
  const isBlockedClass = isBlocked ? styles["row--blocked"] : "";

  return (
    <Box
      ref={setNodeRef}
      className={`${styles.row} ${isDraggingClass} ${isOverClass} ${isBlockedClass} ${isActiveClass}`}
    >
      <Box component="ul" className={styles.row__list}>
        {products.map((product) => (
          <Box component="li" key={product.id}>
            <ProductCard product={product} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
