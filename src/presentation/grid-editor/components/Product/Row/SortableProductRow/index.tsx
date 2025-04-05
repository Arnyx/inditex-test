import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ProductRow } from "../ProductRow";
import { ProductRow as ProductRowType } from "@/domain/models/ProductRow";
import styles from "./styles.module.scss";

type Props = {
  row: ProductRowType;
  draggedRow: ProductRowType | null;
  overProductId: string | null;
  currentZoom: number;
  handleDelete: (id: string) => void;
};

export const SortableProductRow = ({
  row,
  draggedRow,
  overProductId,
  currentZoom,
  handleDelete,
}: Props) => {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({ id: row.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: 1,
  };

  return (
    <div ref={setNodeRef} style={style} className={styles["sortable-row"]}>
      <ProductRow
        id={row.id}
        products={row.products}
        draggedRow={draggedRow}
        overProductId={overProductId}
        dragHandleProps={{ ...attributes, ...listeners }}
        currentZoom={currentZoom}
        handleDelete={handleDelete}
      />
    </div>
  );
};
