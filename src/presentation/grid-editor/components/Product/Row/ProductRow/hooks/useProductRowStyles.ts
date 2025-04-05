import { Template, TemplateAlignment } from "@/domain/models/Template";
import styles from "../styles.module.scss";
import { MAX_PRODUCTS_ROW_LENGTH } from "@/config/constants";
import { DraftProductRow } from "@/presentation/grid-editor/models/DraftProductRow";

export const useProductRowStyles = ({
  draggedRow,
  rowId,
  products,
  isOver,
  selectedTemplate,
}: {
  draggedRow: DraftProductRow | null;
  rowId: string;
  products: DraftProductRow["products"];
  isOver: boolean;
  selectedTemplate?: Template;
}) => {
  const isSourceRow = draggedRow?.id === rowId;
  const isBlocked = products.length === MAX_PRODUCTS_ROW_LENGTH;

  const alignmentMap = {
    [TemplateAlignment.Left]: "flex-start",
    [TemplateAlignment.Center]: "center",
    [TemplateAlignment.Right]: "flex-end",
  };

  const justifyContent =
    alignmentMap[selectedTemplate?.alignment ?? TemplateAlignment.Left];

  const classNames = [
    styles.row,
    draggedRow ? styles["row--dragging"] : "",
    isSourceRow ? styles["row--active"] : "",
    isOver ? styles["row--over"] : "",
    isBlocked ? styles["row--blocked"] : "",
  ]
    .filter(Boolean)
    .join(" ");

  return { justifyContent, classNames };
};
