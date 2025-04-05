import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ProductRow } from "../ProductRow";
import styles from "./styles.module.scss";
import type { Template } from "@/domain/models/Template";
import type { DraftProductRow } from "@/presentation/grid-editor/models/DraftProductRow";

type Props = {
  row: DraftProductRow;
  draggedRow: DraftProductRow | null;
  overProductId: string | null;
  currentZoom: number;
  templates?: Array<Template>;
  onDelete: (id: string) => void;
  onTemplateChange: (rowId: string, templateId: string) => void;
};

export const SortableProductRow = ({
  row,
  draggedRow,
  overProductId,
  currentZoom,
  templates,
  onDelete,
  onTemplateChange,
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
        row={row}
        draggedRow={draggedRow}
        overProductId={overProductId}
        dragHandleProps={{ ...attributes, ...listeners }}
        currentZoom={currentZoom}
        templates={templates}
        onDelete={onDelete}
        onTemplateChange={onTemplateChange}
      />
    </div>
  );
};
