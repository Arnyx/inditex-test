import { MAX_PRODUCTS_ROW_LENGTH } from "@/config/constants";
import { Product } from "@/domain/models/Product";
import { useDroppable } from "@dnd-kit/core";
import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Box, IconButton } from "@mui/material";
import styles from "./styles.module.scss";
import { SortableProductCard } from "../SortableProductCard";
import { ProductRow as ProductRowType } from "@/domain/models/ProductRow";
import { HTMLAttributes } from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

type Props = {
  id: string;
  products: Array<Product>;
  draggedRow: ProductRowType | null;
  overProductId: string | null;
  dragHandleProps?: HTMLAttributes<HTMLElement>;
  currentZoom: number;
  handleDelete: (id: string) => void;
};

export const ProductRow = ({
  id,
  products,
  draggedRow,
  overProductId,
  dragHandleProps,
  currentZoom,
  handleDelete,
}: Props) => {
  const { isOver, setNodeRef } = useDroppable({ id });

  const isSourceRow = draggedRow?.id === id;
  const isBlocked = products.length === MAX_PRODUCTS_ROW_LENGTH;
  const isDraggingClass = draggedRow ? styles["row--dragging"] : "";
  const isActiveClass = isSourceRow ? styles["row--active"] : "";
  const isOverClass = isOver ? styles["row--over"] : "";
  const isBlockedClass = isBlocked ? styles["row--blocked"] : "";

  return (
    <Box
      className={`${styles.row} ${isDraggingClass} ${isOverClass} ${isBlockedClass} ${isActiveClass}`}
      ref={setNodeRef}
    >
      <Box className={styles.row__actions}>
        {!products.length && (
          <IconButton
            className={styles.row__button}
            onClick={() => handleDelete(id)}
          >
            <DeleteOutlineIcon />
          </IconButton>
        )}
        <span {...dragHandleProps}>
          <IconButton
            className={styles.row__button}
            disableRipple
            disableFocusRipple
          >
            <DragIndicatorIcon fontSize="small" />
          </IconButton>
        </span>
      </Box>

      <Box component="ul" className={styles.row__list}>
        <SortableContext
          items={products.map((p) => p.id)}
          strategy={horizontalListSortingStrategy}
        >
          {products.map((product) => (
            <Box component="li" key={product.id}>
              <SortableProductCard
                product={product}
                isOver={overProductId === product.id}
                currentZoom={currentZoom}
              />
            </Box>
          ))}
        </SortableContext>
      </Box>
    </Box>
  );
};
